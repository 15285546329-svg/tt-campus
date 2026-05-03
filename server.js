const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

loadEnvFile(path.join(__dirname, '.env'));

const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;
const MERCHANT_CONFIG_PATH = path.join(ROOT, 'merchant-config.local.json');
const codeStore = new Map();
const rateLimitStore = new Map();
const paymentStore = new Map();

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

function loadEnvFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const equalsIndex = trimmed.indexOf('=');
        if (equalsIndex === -1) return;
        const key = trimmed.slice(0, equalsIndex).trim();
        let value = trimmed.slice(equalsIndex + 1).trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }
        if (!process.env[key]) {
            process.env[key] = value;
        }
    });
}

function sendJson(res, status, payload) {
    res.writeHead(status, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(JSON.stringify(payload));
}

function getAppwriteConfig() {
    return {
        endpoint: (process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1').replace(/\/$/, ''),
        projectId: process.env.APPWRITE_PROJECT_ID || '',
        apiKey: process.env.APPWRITE_API_KEY || '',
        databaseId: process.env.APPWRITE_DATABASE_ID || '',
        profilesTableId: process.env.APPWRITE_PROFILES_TABLE_ID || process.env.APPWRITE_PROFILES_COLLECTION_ID || 'profiles'
    };
}

function ensureAppwriteConfigured(requireDatabase = false) {
    const config = getAppwriteConfig();
    if (!config.endpoint || !config.projectId || (requireDatabase && (!config.apiKey || !config.databaseId || !config.profilesTableId))) {
        throw new Error('Appwrite is not configured. Set APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_API_KEY, APPWRITE_DATABASE_ID, and APPWRITE_PROFILES_TABLE_ID.');
    }
    return config;
}

async function appwriteRequest(pathname, options = {}, useApiKey = false) {
    const config = ensureAppwriteConfigured(useApiKey);
    const headers = Object.assign({
        'X-Appwrite-Project': config.projectId,
        'X-Appwrite-Response-Format': '1.8.0',
        'Content-Type': 'application/json'
    }, options.headers || {});
    if (useApiKey) {
        headers['X-Appwrite-Key'] = config.apiKey;
    }

    const response = await fetch(config.endpoint + pathname, Object.assign({}, options, { headers }));
    const text = await response.text();
    let data = {};
    try {
        data = text ? JSON.parse(text) : {};
    } catch (error) {
        data = { message: text };
    }
    if (!response.ok) {
        throw new Error(data.message || data.error || `Appwrite request failed: ${response.status}`);
    }
    return data;
}

function normalizeEmail(email) {
    return String(email || '').trim().toLowerCase();
}

function createAppwriteUserId() {
    return 'user_' + crypto.randomBytes(15).toString('hex');
}

function getProfileFromAppwriteUser(user, overrides = {}) {
    const now = new Date().toISOString();
    return {
        user_id: user.$id || overrides.userId || '',
        email: user.email || overrides.email || '',
        name: String(overrides.name || user.name || user.email || '').trim(),
        student_id: String(overrides.studentId || '').trim(),
        auth_method: overrides.authMethod || 'email_otp',
        created_at: now,
        updated_at: now
    };
}

async function upsertAppwriteProfile(user, overrides = {}) {
    const config = ensureAppwriteConfigured(true);
    const userId = user.$id || overrides.userId;
    if (!userId) return null;
    const profile = getProfileFromAppwriteUser(user, Object.assign({}, overrides, { userId }));
    const pathBase = `/tablesdb/${encodeURIComponent(config.databaseId)}/tables/${encodeURIComponent(config.profilesTableId)}/rows`;
    return appwriteRequest(`${pathBase}/${encodeURIComponent(userId)}`, {
        method: 'PUT',
        body: JSON.stringify({
            data: profile,
            permissions: [
                `read("user:${userId}")`,
                `update("user:${userId}")`
            ]
        })
    }, true);
}

async function getAppwriteUser(userId) {
    return appwriteRequest(`/users/${encodeURIComponent(userId)}`, {
        method: 'GET'
    }, true);
}

async function listAppwriteProfiles() {
    const config = ensureAppwriteConfigured(true);
    const pathBase = `/tablesdb/${encodeURIComponent(config.databaseId)}/tables/${encodeURIComponent(config.profilesTableId)}/rows`;
    return appwriteRequest(pathBase, {
        method: 'GET'
    }, true);
}

function loadMerchantConfig() {
    if (!fs.existsSync(MERCHANT_CONFIG_PATH)) {
        return { wechat: {}, alipay: {}, bank: {} };
    }
    try {
        return JSON.parse(fs.readFileSync(MERCHANT_CONFIG_PATH, 'utf8'));
    } catch (error) {
        return { wechat: {}, alipay: {}, bank: {} };
    }
}

function saveMerchantConfig(config) {
    fs.writeFileSync(MERCHANT_CONFIG_PATH, JSON.stringify(config, null, 2));
}

function getMerchantValue(section, key, envKey) {
    const config = loadMerchantConfig();
    return process.env[envKey] || (config[section] && config[section][key]) || '';
}

function isMaskedSecret(value) {
    return typeof value === 'string' && value.startsWith('***');
}

function maskSecret(value) {
    if (!value) return '';
    return '***' + String(value).slice(-6);
}

function publicMerchantConfig() {
    const config = loadMerchantConfig();
    return {
        wechat: {
            mchId: config.wechat.mchId || process.env.WECHAT_PAY_MCH_ID || '',
            appId: config.wechat.appId || process.env.WECHAT_PAY_APP_ID || '',
            serialNo: config.wechat.serialNo || process.env.WECHAT_PAY_SERIAL_NO || '',
            privateKeyPath: config.wechat.privateKeyPath || process.env.WECHAT_PAY_PRIVATE_KEY_PATH || '',
            privateKey: maskSecret(config.wechat.privateKey || process.env.WECHAT_PAY_PRIVATE_KEY || ''),
            notifyUrl: config.wechat.notifyUrl || process.env.WECHAT_PAY_NOTIFY_URL || ''
        },
        alipay: {
            appId: config.alipay.appId || process.env.ALIPAY_APP_ID || '',
            privateKeyPath: config.alipay.privateKeyPath || process.env.ALIPAY_PRIVATE_KEY_PATH || '',
            privateKey: maskSecret(config.alipay.privateKey || process.env.ALIPAY_PRIVATE_KEY || ''),
            notifyUrl: config.alipay.notifyUrl || process.env.ALIPAY_NOTIFY_URL || '',
            gateway: config.alipay.gateway || process.env.ALIPAY_GATEWAY || 'https://openapi.alipay.com/gateway.do'
        },
        bank: config.bank || {},
        status: {
            wechatReady: isWechatPayConfigured(),
            alipayReady: isAlipayConfigured(),
            bankBound: Boolean(config.bank && config.bank.cardNumber)
        }
    };
}

function parseJsonBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
            if (body.length > 1_000_000) {
                reject(new Error('Request body too large'));
                req.destroy();
            }
        });
        req.on('end', () => {
            if (!body) {
                resolve({});
                return;
            }
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(new Error('Invalid JSON body'));
            }
        });
    });
}

function normalizePhone(phone) {
    const value = String(phone || '').trim();
    if (/^1\d{10}$/.test(value)) return '+86' + value;
    if (/^\+\d{8,15}$/.test(value)) return value;
    return '';
}

function maskPhone(phone) {
    if (!phone || phone.length < 7) return phone || '';
    return phone.slice(0, 3) + '****' + phone.slice(-4);
}

function generateCode() {
    return String(crypto.randomInt(100000, 1000000));
}

function createOrderId(prefix) {
    return `${prefix}${Date.now()}${crypto.randomInt(1000, 10000)}`;
}

function readSecretValue(value, filePath) {
    if (value) return value.replace(/\\n/g, '\n');
    if (filePath) return fs.readFileSync(path.resolve(filePath), 'utf8');
    return '';
}

function yuanToCents(amount) {
    return Math.round(Number(amount) * 100);
}

function hasSecret(value, filePath) {
    if (value) return true;
    if (!filePath) return false;
    return fs.existsSync(path.resolve(filePath));
}

function isWechatPayConfigured() {
    return Boolean(
        getMerchantValue('wechat', 'mchId', 'WECHAT_PAY_MCH_ID') &&
        getMerchantValue('wechat', 'appId', 'WECHAT_PAY_APP_ID') &&
        getMerchantValue('wechat', 'serialNo', 'WECHAT_PAY_SERIAL_NO') &&
        hasSecret(
            getMerchantValue('wechat', 'privateKey', 'WECHAT_PAY_PRIVATE_KEY'),
            getMerchantValue('wechat', 'privateKeyPath', 'WECHAT_PAY_PRIVATE_KEY_PATH')
        ) &&
        getMerchantValue('wechat', 'notifyUrl', 'WECHAT_PAY_NOTIFY_URL')
    );
}

function isAlipayConfigured() {
    return Boolean(
        getMerchantValue('alipay', 'appId', 'ALIPAY_APP_ID') &&
        hasSecret(
            getMerchantValue('alipay', 'privateKey', 'ALIPAY_PRIVATE_KEY'),
            getMerchantValue('alipay', 'privateKeyPath', 'ALIPAY_PRIVATE_KEY_PATH')
        )
    );
}

function signWechatRequest(method, urlPath, body) {
    const mchId = getMerchantValue('wechat', 'mchId', 'WECHAT_PAY_MCH_ID');
    const serialNo = getMerchantValue('wechat', 'serialNo', 'WECHAT_PAY_SERIAL_NO');
    const nonce = crypto.randomBytes(16).toString('hex');
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const privateKey = readSecretValue(
        getMerchantValue('wechat', 'privateKey', 'WECHAT_PAY_PRIVATE_KEY'),
        getMerchantValue('wechat', 'privateKeyPath', 'WECHAT_PAY_PRIVATE_KEY_PATH')
    );
    const message = `${method}\n${urlPath}\n${timestamp}\n${nonce}\n${body}\n`;
    const signature = crypto.sign('RSA-SHA256', Buffer.from(message), privateKey).toString('base64');

    return `WECHATPAY2-SHA256-RSA2048 mchid="${mchId}",nonce_str="${nonce}",signature="${signature}",timestamp="${timestamp}",serial_no="${serialNo}"`;
}

async function createWechatH5Payment({ amount, subject, returnUrl, providerOrderId, req }) {
    if (!isWechatPayConfigured()) {
        throw new Error('WeChat Pay is not configured. Set WECHAT_PAY_MCH_ID, WECHAT_PAY_APP_ID, WECHAT_PAY_SERIAL_NO, WECHAT_PAY_PRIVATE_KEY or WECHAT_PAY_PRIVATE_KEY_PATH, and WECHAT_PAY_NOTIFY_URL.');
    }

    const urlPath = '/v3/pay/transactions/h5';
    const body = JSON.stringify({
        appid: getMerchantValue('wechat', 'appId', 'WECHAT_PAY_APP_ID'),
        mchid: getMerchantValue('wechat', 'mchId', 'WECHAT_PAY_MCH_ID'),
        description: subject.slice(0, 127),
        out_trade_no: providerOrderId,
        notify_url: getMerchantValue('wechat', 'notifyUrl', 'WECHAT_PAY_NOTIFY_URL'),
        amount: {
            total: yuanToCents(amount),
            currency: 'CNY'
        },
        scene_info: {
            payer_client_ip: req.socket.remoteAddress || '127.0.0.1',
            h5_info: {
                type: 'Wap'
            }
        }
    });

    const response = await fetch('https://api.mch.weixin.qq.com' + urlPath, {
        method: 'POST',
        headers: {
            Authorization: signWechatRequest('POST', urlPath, body),
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body
    });

    const text = await response.text();
    if (!response.ok) {
        throw new Error(`WeChat Pay order failed: ${response.status} ${text}`);
    }

    const data = JSON.parse(text);
    const h5Url = new URL(data.h5_url);
    h5Url.searchParams.set('redirect_url', returnUrl);
    return h5Url.toString();
}

function signAlipayParams(params) {
    const privateKey = readSecretValue(
        getMerchantValue('alipay', 'privateKey', 'ALIPAY_PRIVATE_KEY'),
        getMerchantValue('alipay', 'privateKeyPath', 'ALIPAY_PRIVATE_KEY_PATH')
    );
    const content = Object.keys(params)
        .filter(key => params[key] !== undefined && params[key] !== '')
        .sort()
        .map(key => `${key}=${params[key]}`)
        .join('&');
    return crypto.sign('RSA-SHA256', Buffer.from(content, 'utf8'), privateKey).toString('base64');
}

function createAlipayWapPayment({ amount, subject, returnUrl, providerOrderId }) {
    if (!isAlipayConfigured()) {
        throw new Error('Alipay is not configured. Set ALIPAY_APP_ID and ALIPAY_PRIVATE_KEY or ALIPAY_PRIVATE_KEY_PATH.');
    }

    const gateway = getMerchantValue('alipay', 'gateway', 'ALIPAY_GATEWAY') || 'https://openapi.alipay.com/gateway.do';
    const params = {
        app_id: getMerchantValue('alipay', 'appId', 'ALIPAY_APP_ID'),
        method: 'alipay.trade.wap.pay',
        format: 'JSON',
        charset: 'utf-8',
        sign_type: 'RSA2',
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
        version: '1.0',
        return_url: returnUrl,
        notify_url: getMerchantValue('alipay', 'notifyUrl', 'ALIPAY_NOTIFY_URL') || '',
        biz_content: JSON.stringify({
            out_trade_no: providerOrderId,
            total_amount: Number(amount).toFixed(2),
            subject: subject.slice(0, 256),
            product_code: 'QUICK_WAP_WAY'
        })
    };
    params.sign = signAlipayParams(params);

    const url = new URL(gateway);
    Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== '') {
            url.searchParams.set(key, params[key]);
        }
    });
    return url.toString();
}

function canSendCode(phone) {
    const now = Date.now();
    const lastSentAt = rateLimitStore.get(phone) || 0;
    if (now - lastSentAt < 60 * 1000) return false;
    rateLimitStore.set(phone, now);
    return true;
}

async function sendViaTwilio(to, code) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_FROM;

    if (!accountSid || !authToken || !from) {
        throw new Error('Twilio environment variables are incomplete');
    }

    const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
    const form = new URLSearchParams({
        From: from,
        To: to,
        Body: `Your TT campus verification code is ${code}. It expires in 5 minutes.`
    });

    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: form
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Twilio send failed: ${response.status} ${text}`);
    }
}

async function sendSmsCode(phone, code) {
    const provider = (process.env.SMS_PROVIDER || 'dev').toLowerCase();
    if (provider === 'twilio') {
        await sendViaTwilio(phone, code);
        return { provider: 'twilio' };
    }

    console.log(`[dev sms] ${phone} verification code: ${code}`);
    return { provider: 'dev', devCode: code };
}

async function handleSendCode(req, res) {
    try {
        const body = await parseJsonBody(req);
        const phone = normalizePhone(body.phone);
        if (!phone) {
            sendJson(res, 400, { ok: false, message: 'Invalid phone number' });
            return;
        }

        if (!canSendCode(phone)) {
            sendJson(res, 429, { ok: false, message: 'Please wait before requesting another code' });
            return;
        }

        const code = generateCode();
        const expiresAt = Date.now() + 5 * 60 * 1000;
        const smsResult = await sendSmsCode(phone, code);

        codeStore.set(phone, {
            code,
            expiresAt,
            attempts: 0
        });

        sendJson(res, 200, {
            ok: true,
            provider: smsResult.provider,
            phone: maskPhone(phone),
            expiresIn: 300,
            devCode: smsResult.devCode
        });
    } catch (error) {
        sendJson(res, 500, { ok: false, message: error.message });
    }
}

async function handlePhoneLogin(req, res) {
    try {
        const body = await parseJsonBody(req);
        const phone = normalizePhone(body.phone);
        const code = String(body.code || '').trim();
        const record = codeStore.get(phone);

        if (!phone || !/^\d{6}$/.test(code)) {
            sendJson(res, 400, { ok: false, message: 'Invalid phone or code' });
            return;
        }

        if (!record || Date.now() > record.expiresAt) {
            codeStore.delete(phone);
            sendJson(res, 400, { ok: false, message: 'Verification code expired' });
            return;
        }

        record.attempts += 1;
        if (record.attempts > 5) {
            codeStore.delete(phone);
            sendJson(res, 429, { ok: false, message: 'Too many verification attempts' });
            return;
        }

        if (record.code !== code) {
            sendJson(res, 400, { ok: false, message: 'Incorrect verification code' });
            return;
        }

        codeStore.delete(phone);
        sendJson(res, 200, {
            ok: true,
            user: {
                phone,
                phoneVerified: true,
                authMethod: 'phone'
            }
        });
    } catch (error) {
        sendJson(res, 500, { ok: false, message: error.message });
    }
}

async function handleEmailSignup(req, res) {
    await handleEmailOtp(req, res);
}

async function handleEmailLogin(req, res) {
    await handleEmailVerify(req, res);
}

async function handleEmailOtp(req, res) {
    try {
        const body = await parseJsonBody(req);
        const email = normalizeEmail(body.email);
        const name = String(body.name || '').trim();
        const studentId = String(body.studentId || '').trim();

        if (!email || !email.includes('@')) {
            sendJson(res, 400, { ok: false, message: 'Invalid email' });
            return;
        }

        const requestedUserId = String(body.userId || '').trim();
        const token = await appwriteRequest('/account/tokens/email', {
            method: 'POST',
            body: JSON.stringify({
                userId: requestedUserId || createAppwriteUserId(),
                email,
                phrase: false
            })
        });

        const userId = token.userId || token.$id || requestedUserId;
        if (userId) {
            await upsertAppwriteProfile({ $id: userId, email, name }, { userId, name, studentId, email });
        }
        sendJson(res, 200, { ok: true, userId, token });
    } catch (error) {
        sendJson(res, 500, { ok: false, message: error.message });
    }
}

async function handleEmailVerify(req, res) {
    try {
        const body = await parseJsonBody(req);
        const email = normalizeEmail(body.email);
        const userId = String(body.userId || '').trim();
        const secret = String(body.code || body.token || body.secret || '').trim();
        if (!userId || !email || !email.includes('@') || !secret) {
            sendJson(res, 400, { ok: false, message: 'Invalid email or verification code' });
            return;
        }

        const session = await appwriteRequest('/account/sessions/token', {
            method: 'POST',
            body: JSON.stringify({ userId, secret })
        });

        let user = null;
        try {
            user = await getAppwriteUser(userId);
        } catch (error) {
            user = { $id: userId, email, name: body.name || email };
        }

        const profile = await upsertAppwriteProfile(user, {
            userId,
            name: body.name,
            studentId: body.studentId,
            email
        });
        sendJson(res, 200, { ok: true, user, session, profile });
    } catch (error) {
        sendJson(res, 500, { ok: false, message: error.message });
    }
}

async function handleAuthProfile(req, res) {
    try {
        const body = await parseJsonBody(req);
        const userId = String(body.userId || '').trim();
        if (!userId) {
            sendJson(res, 401, { ok: false, message: 'Missing Appwrite user ID' });
            return;
        }

        let user = null;
        try {
            user = await getAppwriteUser(userId);
        } catch (error) {
            user = { $id: userId, email: body.email || '', name: body.name || '' };
        }

        const profile = await upsertAppwriteProfile(user, {
            userId,
            name: body.name,
            studentId: body.studentId,
            email: user.email || body.email
        });
        sendJson(res, 200, {
            ok: true,
            user,
            profile
        });
    } catch (error) {
        sendJson(res, 500, { ok: false, message: error.message });
    }
}

async function handleStudentLogin(req, res) {
    try {
        const body = await parseJsonBody(req);
        const studentId = String(body.studentId || '').trim();
        const name = String(body.name || 'Student ' + studentId).trim();
        if (!studentId) {
            sendJson(res, 400, { ok: false, message: 'Missing student ID' });
            return;
        }

        const safeId = studentId.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 48);
        const userId = `student_${safeId}`;
        const email = `student-${safeId}@tt-campus.local`;
        const user = { $id: userId, email, name };
        const profile = await upsertAppwriteProfile(user, {
            userId,
            name,
            studentId,
            email,
            authMethod: 'student_id'
        });
        sendJson(res, 200, {
            ok: true,
            user,
            profile
        });
    } catch (error) {
        sendJson(res, 500, { ok: false, message: error.message });
    }
}

async function handleAdminProfiles(req, res) {
    try {
        const data = await listAppwriteProfiles();
        const rows = data.rows || data.documents || [];
        sendJson(res, 200, {
            ok: true,
            total: data.total || rows.length,
            rows: rows.map(row => {
                const source = row.data || row;
                return {
                    id: row.$id || source.user_id || '',
                    user_id: source.user_id || row.$id || '',
                    email: source.email || '',
                    name: source.name || '',
                    student_id: source.student_id || '',
                    auth_method: source.auth_method || '',
                    created_at: source.created_at || row.$createdAt || '',
                    updated_at: source.updated_at || row.$updatedAt || ''
                };
            })
        });
    } catch (error) {
        sendJson(res, 500, { ok: false, message: error.message });
    }
}

async function handleGetMerchantConfig(req, res) {
    sendJson(res, 200, {
        ok: true,
        config: publicMerchantConfig()
    });
}

async function handleSaveMerchantConfig(req, res) {
    try {
        const body = await parseJsonBody(req);
        const current = loadMerchantConfig();
        const next = {
            wechat: Object.assign({}, current.wechat),
            alipay: Object.assign({}, current.alipay),
            bank: Object.assign({}, current.bank)
        };

        if (body.wechat) {
            next.wechat.mchId = String(body.wechat.mchId || '').trim();
            next.wechat.appId = String(body.wechat.appId || '').trim();
            next.wechat.serialNo = String(body.wechat.serialNo || '').trim();
            next.wechat.privateKeyPath = String(body.wechat.privateKeyPath || '').trim();
            next.wechat.notifyUrl = String(body.wechat.notifyUrl || '').trim();
            if (body.wechat.privateKey && !isMaskedSecret(body.wechat.privateKey)) {
                next.wechat.privateKey = String(body.wechat.privateKey).trim();
            }
        }

        if (body.alipay) {
            next.alipay.appId = String(body.alipay.appId || '').trim();
            next.alipay.privateKeyPath = String(body.alipay.privateKeyPath || '').trim();
            next.alipay.notifyUrl = String(body.alipay.notifyUrl || '').trim();
            next.alipay.gateway = String(body.alipay.gateway || 'https://openapi.alipay.com/gateway.do').trim();
            if (body.alipay.privateKey && !isMaskedSecret(body.alipay.privateKey)) {
                next.alipay.privateKey = String(body.alipay.privateKey).trim();
            }
        }

        if (body.bank) {
            next.bank.accountName = String(body.bank.accountName || '').trim();
            next.bank.bankName = String(body.bank.bankName || '').trim();
            next.bank.cardNumber = String(body.bank.cardNumber || '').replace(/\s+/g, '');
            next.bank.branch = String(body.bank.branch || '').trim();
            next.bank.updatedAt = new Date().toISOString();
        }

        saveMerchantConfig(next);
        sendJson(res, 200, {
            ok: true,
            config: publicMerchantConfig()
        });
    } catch (error) {
        sendJson(res, 500, { ok: false, message: error.message });
    }
}

async function handleCreatePayment(req, res) {
    try {
        const body = await parseJsonBody(req);
        const method = String(body.method || '').trim();
        const amount = Number(body.amount);
        const subject = String(body.subject || 'TT Campus Group Buy').trim();
        const groupId = String(body.groupId || '').trim();
        const returnUrl = String(body.returnUrl || '').trim();

        if (!['wechat', 'alipay'].includes(method)) {
            sendJson(res, 400, { ok: false, message: 'Unsupported payment method' });
            return;
        }

        if (!Number.isFinite(amount) || amount <= 0 || !groupId || !returnUrl) {
            sendJson(res, 400, { ok: false, message: 'Invalid payment request' });
            return;
        }

        const providerOrderId = createOrderId(method === 'wechat' ? 'WX' : 'ALI');
        paymentStore.set(providerOrderId, {
            providerOrderId,
            method,
            amount,
            subject,
            groupId,
            status: 'created',
            createdAt: Date.now()
        });

        let payUrl = '';
        if (method === 'wechat') {
            payUrl = await createWechatH5Payment({ amount, subject, returnUrl, providerOrderId, req });
        } else {
            payUrl = createAlipayWapPayment({ amount, subject, returnUrl, providerOrderId });
        }

        sendJson(res, 200, {
            ok: true,
            provider: method,
            providerOrderId,
            payUrl
        });
    } catch (error) {
        sendJson(res, 500, { ok: false, message: error.message });
    }
}

function serveStatic(req, res) {
    const urlPath = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
    const requestedPath = urlPath === '/' ? '/index.html' : urlPath;
    const filePath = path.normalize(path.join(ROOT, requestedPath));
    const blockedFiles = new Set(['.env', 'merchant-config.local.json']);

    if (!filePath.startsWith(ROOT)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    if (blockedFiles.has(path.basename(filePath)) || path.extname(filePath) === '.pem') {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    fs.readFile(filePath, (error, data) => {
        if (error) {
            res.writeHead(404);
            res.end('Not found');
            return;
        }

        res.writeHead(200, {
            'Content-Type': MIME_TYPES[path.extname(filePath)] || 'application/octet-stream'
        });
        if (req.method === 'HEAD') {
            res.end();
            return;
        }
        res.end(data);
    });
}

const server = http.createServer(async (req, res) => {
    if (req.method === 'OPTIONS') {
        sendJson(res, 204, {});
        return;
    }

    if (req.method === 'POST' && req.url === '/api/sms/send') {
        await handleSendCode(req, res);
        return;
    }

    if (req.method === 'POST' && req.url === '/api/auth/phone-login') {
        await handlePhoneLogin(req, res);
        return;
    }

    if (req.method === 'POST' && req.url === '/api/auth/email-signup') {
        await handleEmailSignup(req, res);
        return;
    }

    if (req.method === 'POST' && req.url === '/api/auth/student-login') {
        await handleStudentLogin(req, res);
        return;
    }

    if (req.method === 'POST' && req.url === '/api/auth/email-login') {
        await handleEmailLogin(req, res);
        return;
    }

    if (req.method === 'POST' && req.url === '/api/auth/email-otp') {
        await handleEmailOtp(req, res);
        return;
    }

    if (req.method === 'POST' && req.url === '/api/auth/email-verify') {
        await handleEmailVerify(req, res);
        return;
    }

    if (req.method === 'POST' && req.url === '/api/auth/profile') {
        await handleAuthProfile(req, res);
        return;
    }

    if (req.method === 'GET' && req.url === '/api/admin/profiles') {
        await handleAdminProfiles(req, res);
        return;
    }

    if (req.method === 'GET' && req.url === '/api/merchant/config') {
        await handleGetMerchantConfig(req, res);
        return;
    }

    if (req.method === 'POST' && req.url === '/api/merchant/config') {
        await handleSaveMerchantConfig(req, res);
        return;
    }

    if (req.method === 'POST' && req.url === '/api/payments/create') {
        await handleCreatePayment(req, res);
        return;
    }

    if (req.method === 'GET' || req.method === 'HEAD') {
        serveStatic(req, res);
        return;
    }

    sendJson(res, 405, { ok: false, message: 'Method not allowed' });
});

server.listen(PORT, () => {
    console.log(`TT app server running at http://localhost:${PORT}`);
    console.log(`SMS provider: ${(process.env.SMS_PROVIDER || 'dev').toLowerCase()}`);
});
