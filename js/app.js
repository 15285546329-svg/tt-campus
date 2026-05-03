// ===== 数据存储 =====
let appData = {
    groups: [
        { id: 1, name: "Sam's Member Lime Juice (1L)", icon: '&#127864;', category: 'snacks', currentMembers: 3, totalMembers: 6, groupPrice: 12.9, originalPrice: 19.9, timeLeft: '04:22:15', tag: 'hot', tagText: 'Hot', spec: '1L bottle, refrigerated', pickup: '3号楼自提柜', pickupTime: 'Next day 12:00-18:00', leader: { name: 'Alex Chen', groups: 24, rating: '4.9' }, members: ['A','B','C'], notice: [{title:'Refund Policy',content:'Full refund if not completed within 24 hours. No cancellation after completion.'},{title:'Shelf Life',content:'Refrigerate 7 days'}] },
        { id: 2, name: "Sam's Swiss Roll 16pk", icon: '&#129384;', category: 'snacks', currentMembers: 3, totalMembers: 4, groupPrice: 56, originalPrice: 72, timeLeft: '00:45:00', tag: 'nearly', tagText: 'Almost', spec: '16 pieces, refrigerated 3 days', pickup: 'E栋教学楼', pickupTime: 'Today 16:00-19:00', leader: { name: 'Sarah Wang', groups: 18, rating: '4.8' }, members: ['D','E','F'], notice: [{title:'Refund Policy',content:'No refund after completion'},{title:'Shelf Life',content:'Refrigerate 3 days'}] },
        { id: 3, name: 'Calculus: Early Transcendentals', icon: '&#128218;', category: 'books', currentMembers: 5, totalMembers: 10, groupPrice: 45, originalPrice: 120, timeLeft: '12:05:00', tag: 'hot', tagText: 'Hot', spec: 'A4 printed, bound', pickup: 'Main Library', pickupTime: 'Within 2 days', leader: { name: 'Alex Chen', groups: 24, rating: '4.9' }, members: ['G','H','I','J','K'], notice: [{title:'Print Quality',content:'80g paper, clear print'},{title:'Pickup',content:'Contact captain for time'}] },
        { id: 4, name: 'Organic Harvest Bowl', icon: '&#127827;', category: 'fresh', currentMembers: 4, totalMembers: 6, groupPrice: 12.5, originalPrice: 22, timeLeft: '03:00:00', tag: 'nearly', tagText: 'Almost', spec: 'Fresh daily', pickup: '1号楼自提柜', pickupTime: 'Next day 10:00-14:00', leader: { name: 'Mike Liu', groups: 12, rating: '4.7' }, members: ['I','J','K','L'], notice: [{title:'Refund',content:'No refund for fresh items'},{title:'Storage',content:'Refrigerate, consume within 2 days'}] },
        { id: 5, name: 'Blue Moon Laundry Detergent 3kg', icon: '&#129527;', category: 'daily', currentMembers: 2, totalMembers: 4, groupPrice: 28, originalPrice: 45, timeLeft: '06:00:00', tag: 'hot', tagText: 'Hot', spec: '3kg, lavender scent', pickup: '3号楼自提柜', pickupTime: 'Today', leader: { name: 'Life Comm', groups: 6, rating: '4.5' }, members: ['M','N'], notice: [{title:'Refund',content:'No refund after opening'}] },
        { id: 6, name: "Sam's Beef Roll 6pk", icon: '&#129385;', category: 'snacks', currentMembers: 5, totalMembers: 6, groupPrice: 42, originalPrice: 59, timeLeft: '01:00:00', tag: 'nearly', tagText: 'Almost', spec: '6 pieces, frozen', pickup: '4号楼自提柜', pickupTime: 'Next day', leader: { name: 'Foodie', groups: 18, rating: '4.9' }, members: ['O','P','Q','R','S'], notice: [{title:'Storage',content:'Frozen 30 days'}] },
        { id: 7, name: 'Advanced Mathematics Textbook', icon: '&#128218;', category: 'books', currentMembers: 1, totalMembers: 3, groupPrice: 30, originalPrice: 98, timeLeft: '08:00:00', tag: 'hot', tagText: 'Hot', spec: 'A4 bound with solutions', pickup: 'Main Library', pickupTime: 'Within 2 days', leader: { name: 'Alex Chen', groups: 24, rating: '4.9' }, members: ['T'], notice: [{title:'Quality',content:'80g paper bound'}] },
        { id: 8, name: 'Imported Cherries 2jin', icon: '&#127826;', category: 'fresh', currentMembers: 3, totalMembers: 5, groupPrice: 68, originalPrice: 99, timeLeft: '04:00:00', tag: 'hot', tagText: 'Hot', spec: '2jin JJ grade', pickup: '1号楼自提柜', pickupTime: 'Next day', leader: { name: 'Mike Liu', groups: 12, rating: '4.7' }, members: ['U','V','W'], notice: [{title:'Refund',content:'No refund for fresh'}] },
        { id: 9, name: 'Campus Print Service 100pg', icon: '&#128736;', category: 'service', currentMembers: 4, totalMembers: 8, groupPrice: 15, originalPrice: 30, timeLeft: '12:00:00', tag: 'hot', tagText: 'Hot', spec: 'A4 double-sided B&W', pickup: '菜鸟驿站', pickupTime: 'Next day', leader: { name: 'Print Shop', groups: 50, rating: '4.8' }, members: ['X','Y','Z','AA'], notice: [{title:'Service',content:'Send files in advance'}] },
        { id: 10, name: 'Used Calculator', icon: '&#128222;', category: 'secondhand', currentMembers: 1, totalMembers: 2, groupPrice: 35, originalPrice: 80, timeLeft: '10:00:00', tag: 'hot', tagText: 'Hot', spec: 'Casio fx-991, 90% new', pickup: '3号楼自提柜', pickupTime: 'Negotiable', leader: { name: 'Senior', groups: 3, rating: '5.0' }, members: ['BB'], notice: [{title:'Condition',content:'Works fine, minor wear'}] }
    ],
    nearby: [
        { id: 101, leader: 'Captain Sarah', avatar: '&#128105;', product: 'Laundry Detergent Group', location: 'Parity Hall', distance: '200m', groupId: 5 },
        { id: 102, leader: 'Alex Wang', avatar: '&#128104;', product: 'Textbook Group Buy', location: 'Liberty Dorm', distance: '450m', groupId: 3 },
        { id: 103, leader: 'Snack Master', avatar: '&#128103;', product: "Sam's Snack Pack", location: 'Dorm 1', distance: '350m', groupId: 1 }
    ],
    orders: {
        pending: [
            { id: 'TT20260416001', name: "Sam's Member Lime Juice (1L)", icon: '&#127864;', status: 'pending', statusText: '1 person left', detail: '6 bottles | Dorm 3 Pickup', price: 12.9, action: 'Invite Friends', date: '2026-04-16' },
            { id: 'TT20260416002', name: 'Calculus: Early Transcendentals', icon: '&#128218;', status: 'pending', statusText: '5/10 joined', detail: 'A4 bound | Library', price: 45, action: 'Invite Friends', date: '2026-04-16' }
        ],
        pickup: [
            { id: 'TT20260415003', name: 'Organic Harvest Bowl', icon: '&#127827;', status: 'pickup', statusText: 'Pickup before 18:00 today', detail: 'Fresh | Dorm 1 Pickup', price: 12.5, action: 'Show QR Code', date: '2026-04-15' }
        ],
        completed: [
            { id: 'TT20260410004', name: "Sam's Swiss Roll 16pk", icon: '&#129384;', status: 'completed', statusText: 'Completed', detail: '16pk | Picked up', price: 56, action: 'Rejoin', date: '2026-04-10' },
            { id: 'TT20260408005', name: 'Blue Moon Laundry Detergent 3kg', icon: '&#129527;', status: 'completed', statusText: 'Completed', detail: '3kg | Picked up', price: 28, action: 'Rejoin', date: '2026-04-08' },
            { id: 'TT20260405010', name: 'Imported Cat Food 5kg', icon: '&#128049;', status: 'completed', statusText: 'Completed', detail: '5kg | Picked up', price: 128, action: 'No group', date: '2026-04-05' }
        ],
        refund: [
            { id: 'TT20260412006', name: 'Imported Cherries 2jin', icon: '&#127826;', status: 'refund', statusText: 'Refund processing', detail: '2jin | Quality issue', price: 68, action: 'Contact Support', date: '2026-04-12' }
        ]
    },
    myGroups: [
        { id: 'TT20260416001', name: "Sam's Member Lime Juice (1L)", icon: '&#127864;', status: 'pending', statusText: 'Pending', detail: '6 bottles | Dorm 3', price: 12.9, date: '2026-04-16' },
        { id: 'TT20260416002', name: 'Calculus: Early Transcendentals', icon: '&#128218;', status: 'pending', statusText: 'Pending', detail: 'A4 bound | Library', price: 45, date: '2026-04-16' },
        { id: 'TT20260415003', name: 'Organic Harvest Bowl', icon: '&#127827;', status: 'pickup', statusText: 'To Pick Up', detail: 'Fresh | Dorm 1', price: 12.5, date: '2026-04-15' },
        { id: 'TT20260410004', name: "Sam's Swiss Roll 16pk", icon: '&#129384;', status: 'completed', statusText: 'Completed', detail: '16pk', price: 56, date: '2026-04-10' }
    ],
    myCreated: [
        { id: 'TT20260414007', name: 'Dorm Snack Pack', icon: '&#127850;', status: 'completed', statusText: 'Completed', detail: '6 members | Dorm 3', price: 45, date: '2026-04-14', members: 6 },
        { id: 'TT20260412008', name: 'Print Service 200pg', icon: '&#128736;', status: 'completed', statusText: 'Completed', detail: '8 members | Building E', price: 20, date: '2026-04-12', members: 8 },
        { id: 'TT20260410009', name: 'Fruit Group - Mango', icon: '&#129382;', status: 'completed', statusText: 'Completed', detail: '4 members | Dorm 1', price: 28, date: '2026-04-10', members: 4 }
    ],
    wallet: {
        balance: 128.50,
        records: [
            { id: 1, type: 'deposit', title: 'Campus Card Deposit', amount: 100, time: '2026-04-15 14:30' },
            { id: 2, type: 'consume', title: "Sam's Lime Juice Group", amount: -12.9, time: '2026-04-16 10:20' },
            { id: 3, type: 'consume', title: 'Calculus Textbook Group', amount: -45, time: '2026-04-16 09:15' },
            { id: 4, type: 'withdraw', title: 'Withdraw to Alipay', amount: -50, time: '2026-04-14 16:45' },
            { id: 5, type: 'deposit', title: 'WeChat Deposit', amount: 200, time: '2026-04-12 11:20' },
            { id: 6, type: 'consume', title: "Sam's Swiss Roll Group", amount: -56, time: '2026-04-10 15:30' },
            { id: 7, type: 'consume', title: 'Laundry Detergent Group', amount: -28, time: '2026-04-08 12:10' },
            { id: 8, type: 'deposit', title: 'Failed Group Refund', amount: 68, time: '2026-04-07 09:00' }
        ]
    },
    pickupPoints: [
        { name: '1号楼自提柜', location: '1号宿舍楼1楼大厅', hours: '07:00-23:00', contact: 'Self-service' },
        { name: '2号楼自提柜', location: '2号宿舍楼1楼大厅', hours: '07:00-23:00', contact: 'Self-service' },
        { name: '3号楼自提柜', location: '3号宿舍楼1楼大厅', hours: '07:00-23:00', contact: 'Self-service' },
        { name: '4号楼自提柜', location: '4号宿舍楼1楼大厅', hours: '07:00-23:00', contact: 'Self-service' },
        { name: 'E栋教学楼', location: 'E栋1楼大厅', hours: '08:00-21:00', contact: 'Contact captain' },
        { name: '菜鸟驿站', location: '校园菜鸟驿站', hours: '09:00-19:00', contact: 'Station staff' }
    ],
    messages: [
        { id: 1, type: 'system', avatar: '&#128221;', avatarClass: 'orange', title: 'Group Progress', text: "Your Sam's Lime Juice group needs 1 more!", time: '10:30', badge: 1 },
        { id: 2, type: 'system', avatar: '&#128230;', avatarClass: 'green', title: 'Pickup Reminder', text: 'Pick up Organic Harvest Bowl before 18:00 today~', time: '09:15', badge: 1 },
        { id: 3, type: 'chat', avatar: '&#128104;', avatarClass: 'blue', title: 'Captain Alex', text: 'Sure, we can change to library pickup', time: 'Yesterday', badge: 1, chatId: 'leader-xm' },
        { id: 4, type: 'chat', avatar: '&#128105;', avatarClass: 'purple', title: 'Sarah Wang', text: 'Swiss rolls arrived, come pick up!', time: 'Monday', badge: 0, chatId: 'leader-ch' },
        { id: 5, type: 'system', avatar: '&#128176;', avatarClass: 'green', title: 'Refund Notice', text: 'Cherry order refund ¥68.00 received', time: 'Last week', badge: 0 }
    ],
    chats: {
        'leader-xm': {
            name: 'Captain Alex',
            messages: [
                { from: 'other', text: 'Hi, can we change the pickup point?', time: '14:20' },
                { from: 'me', text: 'Sure, where would you like?', time: '14:22' },
                { from: 'other', text: 'Library entrance? I study there this afternoon', time: '14:25' },
                { from: 'me', text: 'Sure, we can change to library pickup', time: '14:28' },
                { from: 'other', text: 'Great, thanks captain!', time: '14:30' }
            ]
        },
        'leader-ch': {
            name: 'Sarah Wang',
            messages: [
                { from: 'other', text: 'Swiss rolls arrived, come pick up!', time: '16:00' },
                { from: 'me', text: "OK, I'm coming", time: '16:05' },
                { from: 'other', text: 'Waiting at Building E station~', time: '16:06' }
            ]
        },
        'cs': {
            name: 'Support Assistant',
            messages: [
                { from: 'other', text: 'Hi, I am TT Support Assistant. How can I help?', time: '09:00' }
            ]
        }
    },
    nextGroupId: 11,
    nextOrderId: 10
};

const APP_STORAGE_KEY = 'tt_app_data_v2';
const USER_STORAGE_KEY = 'tt_user_session_v2';
const PENDING_PAYMENT_KEY = 'tt_pending_payment_v2';
const AUTH_STORAGE_KEY = 'tt_appwrite_auth_v1';
const API_BASE_URL = window.location.protocol === 'file:' ? 'http://localhost:3000' : '';
const DEFAULT_PAYMENT_QR = 'assets/merchant-payment-qr.jpg';
const defaultAppData = JSON.parse(JSON.stringify(appData));
const defaultUser = {
    name: 'Alex Chen',
    studentId: '201234567',
    email: '',
    appwriteUserId: '',
    defaultPickup: '1号楼自提柜',
    authMethod: 'student',
    emailVerified: false
};

// ===== 状态管理 =====
let currentView = 'home';
let viewHistory = ['home'];
let currentStep = 1;
let selectedTemplate = null;
let selectedPickup = '1号楼自提柜';
let currentOrderTab = 'pending';
let currentRecordTab = 'all';
let currentChatId = null;
let currentCategory = null;
let walletAction = 'deposit';
let currentDetailGroupId = null;
let currentLang = localStorage.getItem('tt_lang') || 'en';
let loginMode = 'student';
let currentUser = JSON.parse(JSON.stringify(defaultUser));
let emailOtpState = { userId: '', email: '' };
let authSession = null;
let paymentContext = null;
let selectedPaymentMethod = 'wallet';
let merchantConfig = { wechat: {}, alipay: {}, bank: {}, status: {} };
let selectedPaymentQr = DEFAULT_PAYMENT_QR;
let qrPaymentContext = null;

// ===== 翻译字典 =====
const translations = {
    en: {
        studentId: 'Student ID',
        password: 'Password',
        xjtluLogin: 'XJTLU Student Login',
        forgotPassword: 'Forgot Password',
        signUp: 'Sign Up',
        joinCommunity: 'Join the largest student group-buy community',
        searchPlaceholder: "Search Textbooks, Sam's, Fruit...",
        catSnacks: 'Snacks',
        catFresh: 'Fresh',
        catTextbooks: 'Textbooks',
        catCampus: 'Campus',
        catSecondhand: 'Secondhand',
        hotDeals: "Today's Hot Deals",
        seeAll: 'SEE ALL',
        nearbyCaptains: 'Nearby Captains',
        productDetails: 'Product Details',
        initiateGroupBuy: 'Initiate Group Buy',
        initiateDesc: "Let's set up your collective order for XJTLU community.",
        step1Select: 'Step 1: Select Category',
        foodDrinks: 'Food & Drinks',
        textbooks: 'Textbooks',
        grocery: 'Grocery',
        others: 'Others',
        orCustom: 'Or Custom Input',
        enterProduct: 'Enter product name',
        addPhoto: 'ADD PRODUCT PHOTO',
        next: 'NEXT',
        step2Logistics: 'Step 2: Logistics',
        expectedPrice: 'Expected Price (Per Person)',
        originalPrice: 'Original Price',
        memberLimit: 'Member Limit',
        deadline: 'Deadline',
        hours6: '6 hours',
        hours12: '12 hours',
        hours24: '24 hours',
        hours48: '48 hours',
        back: 'BACK',
        step3Pickup: 'Step 3: Pickup Point',
        customPickup: 'Custom Pickup Point',
        enterLocation: 'Enter custom location',
        publishBuy: 'PUBLISH BUY',
        orders: 'Orders',
        pending: 'Pending',
        toPickUp: 'To Pick Up',
        completed: 'Completed',
        refund: 'Refund',
        messages: 'Messages',
        message: 'Message',
        typeMessage: 'Type a message...',
        send: 'Send',
        captainLevel: 'Captain Level',
        myGroups: 'My Groups',
        initiatedGroups: 'Initiated Groups',
        activeParticipation: 'Active participation',
        manageLeads: 'Manage your leads',
        myWallet: 'My Wallet',
        pickupPoints: 'Pickup Points',
        manage: 'Manage',
        privacySettings: 'Privacy Settings',
        supportCenter: 'Support Center',
        signOut: 'Sign Out',
        availableBalance: 'Available Balance',
        deposit: 'Deposit',
        withdraw: 'Withdraw',
        all: 'All',
        spending: 'Spending',
        noRecords: 'No records',
        english: 'English',
        chinese: '中文',
        settings: 'Settings',
        language: 'Language',
        notifications: 'Notifications',
        groupAlerts: 'Group Alerts',
        pickupReminders: 'Pickup Reminders',
        clearCache: 'Clear Cache',
        aboutTT: 'About TT',
        adminPanel: 'Admin Panel',
        terms: 'Terms of Service',
        privacy: 'Privacy Policy',
        editProfile: 'Edit Profile',
        save: 'Save',
        changeAvatar: 'Change Avatar',
        displayName: 'Display Name',
        phone: 'Phone',
        defaultPickup: 'Default Pickup Point',
        home: 'Home',
        search: 'Search',
        initiate: 'Initiate',
        profile: 'Profile',
        faq: 'FAQ',
        faqRefund: 'How does refund work?',
        faqRefundAnswer: 'Full refund available if the group is not completed within 24 hours. No cancellation after group completion.',
        faqPickup: 'How to change pickup point?',
        faqPickupAnswer: 'Before group completion, captains can edit pickup info in "Initiated Groups". After completion, contact the captain.',
        faqQuality: 'Quality issues?',
        faqQualityAnswer: 'Report within 24 hours of pickup with photos. Contact captain or support for assistance.',
        faqCaptain: 'How to become a captain?',
        faqCaptainAnswer: 'Click "Initiate" on home page to start. After 3 successful groups, upgrade to Senior Captain.',
        contactSupport: 'Contact Support',
        onlineSupport: 'Online Support',
        supportHours: 'Hours: Mon-Fri 9:00-21:00',
        amount: 'Amount',
        confirm: 'Confirm',
        joinGroupBuy: 'Join Group Buy',
        joinNow: 'Join Now',
        inviteFriends: 'Invite Friends',
        showQRCode: 'Show QR Code',
        rejoin: 'Rejoin',
        contactSupportBtn: 'Contact Support',
        groupProgress: 'GROUP PROGRESS',
        members: 'members',
        slotsLeft: 'Only',
        slotLeft: 'slot left! Group expires in',
        groupCaptain: 'GROUP CAPTAIN',
        totalGroups: 'Total Groups',
        refundPolicy: 'Refund Policy',
        refundPolicyText: 'Full refund available if the group is not completed within 24 hours. No cancellation after group completion.',
        pickupInfo: 'Pickup Information',
        location: 'Location',
        time: 'Time',
        orderDetails: 'Order Details',
        orderId: 'Order ID',
        product: 'Product',
        status: 'Status',
        pickup: 'Pickup',
        amountLabel: 'Amount',
        date: 'Date',
        inviteFriendsTitle: 'Invite Friends',
        copyLink: 'Copy Link',
        pickupCode: 'Pickup Code',
        showCodeAtPickup: 'Show this code at pickup point',
        noOrders: 'No orders',
        noGroups: 'No groups in this category',
        personLeft: 'person left',
        joined: 'joined',
        pickupBefore: 'Pickup before',
        today: 'today',
        rejoinGroup: 'Rejoin',
        noGroupAvailable: 'This group has not been re-initiated. Check new groups on home page.',
        published: 'Published successfully!',
        joinedSuccess: 'Joined successfully!',
        checkOrders: 'Check "Orders" for details',
        groupFull: 'This group is full!',
        selectCategory: 'Please select a category or enter product name',
        fillPrice: 'Please fill in price information',
        selectPickup: 'Please select a pickup point',
        validAmount: 'Please enter a valid amount',
        depositSuccess: 'Deposit successful! Amount: ¥',
        withdrawSuccess: 'Withdraw successful! Amount: ¥',
        insufficientBalance: 'Insufficient balance',
        saved: 'Saved!',
        signOutConfirm: 'Sign out?',
        follow: 'Follow',
        followed: 'Followed!',
        away: 'away',
        membersJoined: 'members joined',
        originalImport: 'ORIGINAL IMPORT',
        freshDaily: 'FRESH DAILY',
        campusAccountLogin: 'Campus Account',
        phoneLogin: 'Phone Login',
        emailLogin: 'Email Login',
        email: 'Email',
        emailVerificationCode: 'Email Verification Code',
        emailLoginHint: 'Send an Appwrite 6-digit email code, then enter it here to sign in.',
        sendEmailCode: 'Send Email',
        emailLoginSubmit: 'Email Login',
        emailSignupSent: 'Verification code sent. Check your mailbox.',
        emailOtpSent: 'Appwrite verification code sent. Enter the 6-digit code from your email.',
        emailLoginSuccess: 'Email login successful',
        invalidEmail: 'Please enter a valid email address',
        invalidPassword: 'Password is not needed for Appwrite email code login',
        appwriteApiUnavailable: 'Appwrite auth backend is unavailable. Please check server and environment variables.',
        phoneNumber: 'Phone Number',
        verificationCode: 'Verification Code',
        sendCode: 'Send Code',
        resendCode: 'Resend in ',
        phoneLoginHint: 'Use your campus-linked mobile number to receive a one-time code.',
        loginWithPhone: 'Login with SMS Code',
        invalidPhone: 'Please enter a valid phone number',
        codeSent: 'Verification code sent. Demo code: ',
        demoCodeAutoFilled: 'Demo code has been filled in automatically.',
        codeSentByServer: 'Verification code sent by SMS.',
        smsApiUnavailable: 'SMS backend is unavailable. Please start the server first.',
        invalidCode: 'Please enter the 6-digit verification code',
        codeExpired: 'Verification code expired, please resend',
        loginSuccessPhone: 'Phone verified successfully',
        secureCheckout: 'Secure Checkout',
        walletPay: 'Wallet Pay',
        merchantIncome: 'Merchant Income',
        merchantSetup: 'Merchant Setup',
        configure: 'Configure',
        wechatMerchant: 'WeChat Merchant',
        alipayMerchant: 'Alipay Merchant',
        bankSettlement: 'Bank Settlement',
        accountName: 'Account Name',
        bankName: 'Bank Name',
        bankCardNumber: 'Bank Card Number',
        bankBranch: 'Branch',
        settlementNote: 'Real settlement is controlled by WeChat Pay / Alipay merchant account rules. The bank card here records your payout account for the app.',
        saveMerchantConfig: 'Save Merchant Config',
        merchantSaved: 'Merchant config saved',
        merchantLoadFailed: 'Failed to load merchant config',
        merchantStatusReady: 'Ready',
        merchantStatusMissing: 'Not ready',
        bankBound: 'Bank card bound',
        bankNotBound: 'Bank card not bound',
        wechatPay: 'WeChat Pay',
        alipay: 'Alipay',
        recommendedFast: 'Fast campus checkout',
        recommendedSecure: 'Protected transaction',
        paymentTip: 'Scan the captain payment QR code and confirm after paying.',
        paymentQrUpload: 'Merchant Payment QR Code',
        uploadPaymentQr: 'UPLOAD PAYMENT QR',
        qrPaymentTitle: 'Scan to Pay',
        scanQrToPay: 'Scan this merchant QR code to pay the captain.',
        confirmPaid: 'I have paid',
        qrPaymentNotice: 'Please complete payment in WeChat or Alipay before confirming.',
        confirmPay: 'Confirm Payment',
        paymentSuccess: 'Payment successful!',
        redirectingToPay: 'Redirecting to payment...',
        paymentCancelled: 'Payment cancelled',
        paymentGatewayUnavailable: 'Payment gateway is unavailable. Please try again later.',
        paymentMerchantMissing: 'Merchant payment configuration is missing. Real WeChat Pay / Alipay requires a merchant account and private key.',
        paymentMethod: 'Payment Method',
        walletBalance: 'Balance',
        rechargeFirst: 'Wallet balance is insufficient. Please top up or switch payment method.',
        phoneVerifiedStatus: 'Verified',
        smsLoginBadge: 'SMS login enabled'
    },
    zh: {
        studentId: '学号',
        password: '密码',
        xjtluLogin: '西浦学生登录',
        forgotPassword: '忘记密码',
        signUp: '注册',
        joinCommunity: '加入最大的学生拼团社区',
        searchPlaceholder: '搜索教材、山姆、水果...',
        catSnacks: '零食',
        catFresh: '生鲜',
        catTextbooks: '教材',
        catCampus: '校园',
        catSecondhand: '二手',
        hotDeals: '今日热门',
        seeAll: '查看全部',
        nearbyCaptains: '附近团长',
        productDetails: '商品详情',
        initiateGroupBuy: '发起拼团',
        initiateDesc: '为西浦社区创建你的集体订单。',
        step1Select: '第一步：选择分类',
        foodDrinks: '食品饮料',
        textbooks: '教材',
        grocery: '日用品',
        others: '其他',
        orCustom: '或手动输入',
        enterProduct: '输入商品名称',
        addPhoto: '添加商品图片',
        next: '下一步',
        step2Logistics: '第二步：物流信息',
        expectedPrice: '人均价格',
        originalPrice: '原价',
        memberLimit: '成团人数',
        deadline: '截止时间',
        hours6: '6小时',
        hours12: '12小时',
        hours24: '24小时',
        hours48: '48小时',
        back: '上一步',
        step3Pickup: '第三步：自提点',
        customPickup: '自定义自提点',
        enterLocation: '输入自定义位置',
        publishBuy: '发布拼团',
        orders: '订单',
        pending: '待成团',
        toPickUp: '待取货',
        completed: '已完成',
        refund: '售后中',
        messages: '消息',
        message: '消息详情',
        typeMessage: '输入消息...',
        send: '发送',
        captainLevel: '团长等级',
        myGroups: '我的拼团',
        initiatedGroups: '我发起的拼团',
        activeParticipation: '参与的拼团',
        manageLeads: '管理发起的拼团',
        myWallet: '我的钱包',
        pickupPoints: '自提点位',
        manage: '管理',
        privacySettings: '隐私设置',
        supportCenter: '客服中心',
        signOut: '退出登录',
        availableBalance: '可用余额',
        deposit: '充值',
        withdraw: '提现',
        all: '全部',
        spending: '消费',
        noRecords: '暂无记录',
        english: 'English',
        chinese: '中文',
        settings: '设置',
        language: '语言',
        notifications: '消息通知',
        groupAlerts: '拼团提醒',
        pickupReminders: '取货提醒',
        clearCache: '清除缓存',
        aboutTT: '关于TT',
        adminPanel: '管理后台',
        terms: '用户协议',
        privacy: '隐私政策',
        editProfile: '编辑资料',
        save: '保存',
        changeAvatar: '更换头像',
        displayName: '昵称',
        phone: '手机号',
        defaultPickup: '常用自提点',
        home: '首页',
        search: '搜索',
        initiate: '发起',
        profile: '我的',
        faq: '常见问题',
        faqRefund: '拼团失败怎么退款？',
        faqRefundAnswer: '拼团失败后，系统将在24小时内自动将款项原路退回至您的支付账户，无需手动操作。',
        faqPickup: '如何修改自提点？',
        faqPickupAnswer: '在拼团成团前，团长可以在"我发起的拼团"中编辑自提点信息。成团后请联系团长协商。',
        faqQuality: '商品有质量问题怎么办？',
        faqQualityAnswer: '请在取货后24小时内拍照并联系团长或客服，我们将协助您处理售后问题。',
        faqCaptain: '如何成为团长？',
        faqCaptainAnswer: '在首页点击"发起拼团"即可成为团长。成功开团3次后升级为"资深团长"，享受更多权益。',
        contactSupport: '联系客服',
        onlineSupport: '在线客服',
        supportHours: '服务时间：周一至周五 9:00-21:00',
        amount: '金额',
        confirm: '确认',
        joinGroupBuy: '加入拼团',
        joinNow: '立即参团',
        inviteFriends: '邀请好友',
        showQRCode: '显示取件码',
        rejoin: '再次拼团',
        contactSupportBtn: '联系客服',
        groupProgress: '拼团进度',
        members: '人',
        slotsLeft: '还差',
        slotLeft: '人成团！截止于',
        groupCaptain: '团长信息',
        totalGroups: '次拼团',
        refundPolicy: '退款政策',
        refundPolicyText: '拼团失败后24小时内全额退款。成团后不可取消。',
        pickupInfo: '取货信息',
        location: '地点',
        time: '时间',
        orderDetails: '订单详情',
        orderId: '订单号',
        product: '商品',
        status: '状态',
        pickup: '取货',
        amountLabel: '金额',
        date: '日期',
        inviteFriendsTitle: '邀请好友',
        copyLink: '复制链接',
        pickupCode: '取件码',
        showCodeAtPickup: '请在自提点出示此码',
        noOrders: '暂无订单',
        noGroups: '该分类暂无拼团',
        personLeft: '人成团',
        joined: '人已加入',
        pickupBefore: '今日',
        today: '前取货',
        rejoinGroup: '再次拼团',
        noGroupAvailable: '该拼团暂未重新发起，请关注首页新拼团',
        published: '发布成功！',
        joinedSuccess: '参团成功！',
        checkOrders: '可在"订单"中查看',
        groupFull: '该拼团已满员！',
        selectCategory: '请选择分类或输入商品名称',
        fillPrice: '请填写价格信息',
        selectPickup: '请选择自提点',
        validAmount: '请输入有效金额',
        depositSuccess: '充值成功！金额：¥',
        withdrawSuccess: '提现成功！金额：¥',
        insufficientBalance: '余额不足',
        saved: '保存成功！',
        signOutConfirm: '确定退出登录？',
        follow: '关注',
        followed: '已关注！',
        away: '米',
        membersJoined: '人已加入',
        originalImport: '原装进口',
        freshDaily: '每日新鲜',
        campusAccountLogin: '校园账号登录',
        phoneLogin: '手机号登录',
        emailLogin: '邮箱登录',
        email: '邮箱',
        emailVerificationCode: '邮箱验证码',
        emailLoginHint: '发送 Appwrite 6 位邮箱验证码，然后在这里输入登录。',
        sendEmailCode: '发送邮件',
        emailLoginSubmit: '邮箱登录',
        emailSignupSent: '验证码已发送，请查看邮箱。',
        emailOtpSent: 'Appwrite 验证码已发送，请输入邮件里的 6 位数字。',
        emailLoginSuccess: '邮箱登录成功',
        invalidEmail: '请输入有效邮箱',
        invalidPassword: 'Appwrite 邮箱验证码登录不需要密码',
        appwriteApiUnavailable: 'Appwrite 登录后端不可用，请检查服务器和环境变量。',
        phoneNumber: '手机号',
        verificationCode: '验证码',
        sendCode: '发送验证码',
        resendCode: '重新发送 ',
        phoneLoginHint: '使用已绑定校园账号的手机号接收一次性验证码。',
        loginWithPhone: '短信验证码登录',
        invalidPhone: '请输入正确的手机号',
        codeSent: '验证码已发送，演示码：',
        demoCodeAutoFilled: '演示验证码已自动填入。',
        codeSentByServer: '验证码已通过短信发送。',
        smsApiUnavailable: '短信后端暂不可用，请先启动服务器。',
        invalidCode: '请输入 6 位验证码',
        codeExpired: '验证码已过期，请重新发送',
        loginSuccessPhone: '手机号验证成功',
        secureCheckout: '安全支付',
        walletPay: '钱包支付',
        merchantIncome: '团长收款',
        merchantSetup: '商户收款设置',
        configure: '配置',
        wechatMerchant: '微信商户',
        alipayMerchant: '支付宝商户',
        bankSettlement: '银行卡结算',
        accountName: '账户姓名',
        bankName: '开户银行',
        bankCardNumber: '银行卡号',
        bankBranch: '开户支行',
        settlementNote: '真实结算由微信支付/支付宝商户平台控制。这里记录 app 内展示和提现用的银行卡信息。',
        saveMerchantConfig: '保存商户配置',
        merchantSaved: '商户配置已保存',
        merchantLoadFailed: '商户配置加载失败',
        merchantStatusReady: '已就绪',
        merchantStatusMissing: '未就绪',
        bankBound: '已绑定银行卡',
        bankNotBound: '未绑定银行卡',
        wechatPay: '微信支付',
        alipay: '支付宝',
        recommendedFast: '校园场景快捷支付',
        recommendedSecure: '交易受保护',
        paymentTip: '请扫描团长收款码付款，付款后再确认。',
        paymentQrUpload: '商家收款码',
        uploadPaymentQr: '上传收款码',
        qrPaymentTitle: '扫码付款',
        scanQrToPay: '扫描此商家收款码向团长付款。',
        confirmPaid: '我已付款',
        qrPaymentNotice: '请先在微信或支付宝完成付款，再点击确认。',
        confirmPay: '确认支付',
        paymentSuccess: '支付成功！',
        redirectingToPay: '正在跳转支付...',
        paymentCancelled: '支付已取消',
        paymentGatewayUnavailable: '支付网关暂不可用，请稍后再试。',
        paymentMerchantMissing: '缺少商户支付配置。真实微信/支付宝支付需要商户号和私钥/证书。',
        paymentMethod: '支付方式',
        walletBalance: '余额',
        rechargeFirst: '钱包余额不足，请先充值或切换支付方式。',
        phoneVerifiedStatus: '已认证',
        smsLoginBadge: '已开通短信登录'
    }
};

// ===== 语言切换功能 =====
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    localStorage.setItem('tt_lang', currentLang);
    applyLanguage();
}

function t(key) {
    return translations[currentLang][key] || key;
}

function applyLanguage() {
    const lang = translations[currentLang];
    
    // 更新所有带有 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        const key = el.getAttribute('data-i18n');
        if (lang[key]) {
            el.textContent = lang[key];
        }
    });
    
    // 更新所有带有 data-i18n-placeholder 属性的元素
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
        const key = el.getAttribute('data-i18n-placeholder');
        if (lang[key]) {
            el.placeholder = lang[key];
        }
    });
    
    // 更新语言显示
    var langDisplay = document.getElementById('lang-display');
    if (langDisplay) {
        langDisplay.textContent = (currentLang === 'en' ? lang.chinese : lang.english) + ' >';
    }
    
    // 更新钱包余额显示
    var walletSub = document.getElementById('wallet-balance-display');
    if (walletSub) {
        walletSub.textContent = '¥' + appData.wallet.balance.toFixed(2) + ' ' + (currentLang === 'en' ? 'Available' : '可用');
    }
    updateWalletDisplays();

    var loginBtn = document.getElementById('login-submit-btn');
    if (loginBtn) {
        loginBtn.textContent = getLoginSubmitText();
    }
    
    // 重新渲染所有动态内容
    renderHome();
    renderOrders(currentOrderTab);
    renderMessages();
    renderWalletRecords(currentRecordTab);
    renderPickupPoints();
    
    // 如果当前在详情页，重新渲染
    if (currentView === 'detail' && currentDetailGroupId) {
        showDetail(currentDetailGroupId);
    }
    
    // 更新订单标签
    document.querySelectorAll('.order-tab').forEach(function(tab) {
        var tabKey = tab.getAttribute('data-tab');
        var labels = { pending: 'pending', pickup: 'toPickUp', completed: 'completed', refund: 'refund' };
        if (labels[tabKey] && lang[labels[tabKey]]) {
            tab.textContent = lang[labels[tabKey]];
        }
    });
    
    // 更新记录标签
    document.querySelectorAll('.record-tab').forEach(function(tab) {
        var type = tab.getAttribute('data-type');
        if (type && lang[type === 'consume' ? 'spending' : type]) {
            tab.textContent = lang[type === 'consume' ? 'spending' : type];
        }
    });
    
    // 更新底部导航
    document.querySelectorAll('.nav-item span:last-child').forEach(function(span) {
        var navView = span.parentElement.getAttribute('data-view');
        var labels = { home: 'home', orders: 'search', create: 'initiate', messages: 'messages', profile: 'profile' };
        if (labels[navView] && lang[labels[navView]]) {
            span.textContent = lang[labels[navView]];
        }
    });

    syncUserUI();
    renderMerchantConfig();
    updatePaymentMethodLabels();
}

function hydrateAppState() {
    var storedApp = localStorage.getItem(APP_STORAGE_KEY);
    var storedUser = localStorage.getItem(USER_STORAGE_KEY);

    if (storedApp) {
        try {
            appData = JSON.parse(storedApp);
        } catch (error) {
            appData = JSON.parse(JSON.stringify(defaultAppData));
        }
    }

    if (storedUser) {
        try {
            currentUser = Object.assign({}, defaultUser, JSON.parse(storedUser));
        } catch (error) {
            currentUser = JSON.parse(JSON.stringify(defaultUser));
        }
    }
}

function persistAppState() {
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(appData));
}

function persistUserState() {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
}

function persistAuthSession(session) {
    authSession = session || null;
    if (authSession) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authSession));
    } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
    }
}

function hydrateAuthSession() {
    var stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return;
    try {
        authSession = JSON.parse(stored);
    } catch (error) {
        authSession = null;
    }
}

function ensureWalletShape() {
    if (typeof appData.wallet.merchantIncome !== 'number') {
        appData.wallet.merchantIncome = 0;
    }
}

function updateWalletDisplays() {
    ensureWalletShape();
    var balEl = document.getElementById('wallet-balance');
    if (balEl) balEl.textContent = appData.wallet.balance.toFixed(2);

    var balDisplay = document.getElementById('wallet-balance-display');
    if (balDisplay) {
        balDisplay.textContent = '¥' + appData.wallet.balance.toFixed(2) + ' ' + (currentLang === 'en' ? 'Available' : '可用');
    }

    var incomeEl = document.getElementById('merchant-income');
    if (incomeEl) incomeEl.textContent = '¥' + appData.wallet.merchantIncome.toFixed(2);
}

async function loadMerchantConfig() {
    try {
        var data = await fetch(API_BASE_URL + '/api/merchant/config').then(function(response) {
            return response.json();
        });
        if (data.ok && data.config) {
            merchantConfig = data.config;
            renderMerchantConfig();
        }
    } catch (error) {
        var status = document.getElementById('merchant-status');
        if (status) status.textContent = t('merchantLoadFailed');
    }
}

function renderMerchantConfig() {
    var status = merchantConfig.status || {};
    var merchantStatus = document.getElementById('merchant-status');
    var bankStatus = document.getElementById('bank-status');
    if (merchantStatus) {
        merchantStatus.textContent = t('wechatPay') + ': ' + (status.wechatReady ? t('merchantStatusReady') : t('merchantStatusMissing')) +
            ' · ' + t('alipay') + ': ' + (status.alipayReady ? t('merchantStatusReady') : t('merchantStatusMissing'));
    }
    if (bankStatus) {
        bankStatus.textContent = status.bankBound ? t('bankBound') : t('bankNotBound');
    }

    var wechat = merchantConfig.wechat || {};
    var alipay = merchantConfig.alipay || {};
    var bank = merchantConfig.bank || {};
    setInputValue('wechat-mch-id', wechat.mchId);
    setInputValue('wechat-app-id', wechat.appId);
    setInputValue('wechat-serial-no', wechat.serialNo);
    setInputValue('wechat-key-path', wechat.privateKeyPath);
    setInputValue('wechat-notify-url', wechat.notifyUrl);
    setInputValue('alipay-app-id', alipay.appId);
    setInputValue('alipay-key-path', alipay.privateKeyPath);
    setInputValue('alipay-notify-url', alipay.notifyUrl);
    setInputValue('alipay-gateway', alipay.gateway || 'https://openapi.alipay.com/gateway.do');
    setInputValue('bank-account-name', bank.accountName);
    setInputValue('bank-name', bank.bankName);
    setInputValue('bank-card-number', bank.cardNumber);
    setInputValue('bank-branch', bank.branch);
}

function setInputValue(id, value) {
    var input = document.getElementById(id);
    if (input) input.value = value || '';
}

function openMerchantModal() {
    renderMerchantConfig();
    document.getElementById('merchant-modal').classList.add('active');
}

function closeMerchantModal() {
    document.getElementById('merchant-modal').classList.remove('active');
}

async function saveMerchantConfig() {
    try {
        var payload = {
            wechat: {
                mchId: document.getElementById('wechat-mch-id').value,
                appId: document.getElementById('wechat-app-id').value,
                serialNo: document.getElementById('wechat-serial-no').value,
                privateKeyPath: document.getElementById('wechat-key-path').value,
                notifyUrl: document.getElementById('wechat-notify-url').value
            },
            alipay: {
                appId: document.getElementById('alipay-app-id').value,
                privateKeyPath: document.getElementById('alipay-key-path').value,
                notifyUrl: document.getElementById('alipay-notify-url').value,
                gateway: document.getElementById('alipay-gateway').value
            },
            bank: {
                accountName: document.getElementById('bank-account-name').value,
                bankName: document.getElementById('bank-name').value,
                cardNumber: document.getElementById('bank-card-number').value,
                branch: document.getElementById('bank-branch').value
            }
        };
        var data = await postJson('/api/merchant/config', payload);
        merchantConfig = data.config;
        renderMerchantConfig();
        alert(t('merchantSaved'));
        closeMerchantModal();
    } catch (error) {
        alert(error.message || t('merchantLoadFailed'));
    }
}

function getReturnUrl() {
    var url = new URL(window.location.href);
    url.searchParams.delete('paymentStatus');
    url.searchParams.delete('provider');
    url.searchParams.delete('providerOrderId');
    return url.toString();
}

function getPaymentMethodText(method) {
    return method === 'wallet' ? t('walletPay') : method === 'wechat' ? t('wechatPay') : t('alipay');
}

function getGroupPaymentQr(group) {
    return group && group.paymentQr ? group.paymentQr : DEFAULT_PAYMENT_QR;
}

function handlePaymentReturn() {
    var params = new URLSearchParams(window.location.search);
    var status = params.get('paymentStatus');
    if (!status) return;

    var pendingRaw = localStorage.getItem(PENDING_PAYMENT_KEY);
    var pending = null;
    try {
        pending = pendingRaw ? JSON.parse(pendingRaw) : null;
    } catch (error) {
        pending = null;
    }
    localStorage.removeItem(PENDING_PAYMENT_KEY);

    var cleanUrl = getReturnUrl();
    window.history.replaceState({}, document.title, cleanUrl);

    if (status !== 'success') {
        alert(t('paymentCancelled'));
        return;
    }

    if (!pending) {
        alert(t('paymentSuccess'));
        return;
    }

    var group = appData.groups.find(function(x) { return String(x.id) === String(pending.groupId); });
    if (!group) {
        alert(t('paymentSuccess'));
        return;
    }

    finishJoinGroup(group, pending.method, pending.providerOrderId || params.get('providerOrderId'));
    alert(t('paymentSuccess') + '\n' + group.name + '\n¥' + group.groupPrice.toFixed(2) + '\n\n' + t('checkOrders'));
}

function maskPhone(phone) {
    if (!phone || phone.length < 7) return phone || '';
    return phone.slice(0, 3) + '****' + phone.slice(-4);
}

function syncUserUI() {
    var nameEl = document.getElementById('user-name');
    if (nameEl) nameEl.textContent = currentUser.name;

    var editName = document.getElementById('edit-name');
    if (editName) editName.value = currentUser.name;

    var studentReadonly = document.querySelector('#view-edit-profile input[readonly]');
    if (studentReadonly) studentReadonly.value = currentUser.studentId;

    var badge = document.querySelector('.profile-badge');
    if (badge) {
        var authText = currentUser.emailVerified ? ' · ' + t('emailLogin') : '';
        badge.innerHTML = '&#127942; ' + t('captainLevel') + ': Rookie' + authText;
    }
}

function getLoginSubmitText() {
    if (loginMode === 'student') return t('xjtluLogin');
    return t('emailLoginSubmit');
}

function switchLoginMode(mode) {
    loginMode = mode;
    document.getElementById('login-mode-student').classList.toggle('active', mode === 'student');
    document.getElementById('login-mode-email').classList.toggle('active', mode === 'email');
    document.getElementById('student-login-panel').classList.toggle('active', mode === 'student');
    document.getElementById('email-login-panel').classList.toggle('active', mode === 'email');
    document.getElementById('login-submit-btn').textContent = getLoginSubmitText();
}

async function postJson(path, payload) {
    var response = await fetch(API_BASE_URL + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    var data = await response.json().catch(function() { return {}; });
    if (!response.ok || data.ok === false) {
        throw new Error(data.message || 'Request failed');
    }
    return data;
}

async function sendPhoneCode() {
    return;
/*
    var phone = document.getElementById('login-phone').value.trim();
    if (!/^1\d{10}$/.test(phone)) {
        alert(t('invalidPhone'));
        return;
    }

    var btn = document.getElementById('send-code-btn');
    if (btn) btn.disabled = true;

    try {
        var result = await postJson('/api/sms/send', { phone: phone });
        smsCodeState.code = '';
        smsCodeState.expiresAt = Date.now() + (result.expiresIn || 300) * 1000;
        smsCodeState.countdown = 60;

        var codeInput = document.getElementById('login-code');
        var tip = document.getElementById('sms-tip');

        if (result.devCode) {
            if (codeInput) codeInput.value = result.devCode;
            if (tip) tip.textContent = t('codeSent') + result.devCode + ' · ' + t('demoCodeAutoFilled');
            alert(t('codeSent') + result.devCode + '\n' + t('demoCodeAutoFilled'));
        } else {
            if (codeInput) codeInput.value = '';
            if (tip) tip.textContent = t('codeSentByServer');
            alert(t('codeSentByServer'));
        }

        if (smsCodeState.timer) {
            clearInterval(smsCodeState.timer);
        }
        smsCodeState.timer = setInterval(function() {
            smsCodeState.countdown -= 1;
            updateSendCodeButton();
            if (smsCodeState.countdown <= 0) {
                clearInterval(smsCodeState.timer);
                smsCodeState.timer = null;
            }
        }, 1000);
    } catch (error) {
        var tipError = document.getElementById('sms-tip');
        if (tipError) tipError.textContent = t('smsApiUnavailable');
        alert(t('smsApiUnavailable') + '\n' + error.message);
    } finally {
        updateSendCodeButton();
    }
*/
}

function updateSendCodeButton() {
    return;
}

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    hydrateAppState();
    hydrateAuthSession();
    ensureWalletShape();
    syncUserUI();
    applyLanguage();
    setupPaymentQrUpload();
    loadMerchantConfig();
    handlePaymentReturn();
    renderHome();
    renderOrders('pending');
    renderMessages();
    renderWalletRecords('all');
    renderPickupPoints();
    switchLoginMode('student');
    handleAuthCallback();
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getEmailAuthPayload() {
    return {
        email: document.getElementById('login-email').value.trim(),
        name: document.getElementById('email-name').value.trim() || defaultUser.name,
        studentId: document.getElementById('student-id').value.trim() || currentUser.studentId || defaultUser.studentId,
        userId: emailOtpState.userId || currentUser.appwriteUserId || ''
    };
}

function applyAuthUser(user, session, fallback) {
    fallback = fallback || {};
    currentUser.name = fallback.name || user.name || user.email || currentUser.name;
    currentUser.studentId = fallback.studentId || currentUser.studentId || defaultUser.studentId;
    currentUser.email = user.email || fallback.email || currentUser.email;
    currentUser.appwriteUserId = user.$id || user.id || fallback.userId || currentUser.appwriteUserId;
    currentUser.authMethod = 'email';
    currentUser.emailVerified = true;
    persistAuthSession(session || authSession);
}

async function handleEmailSignup() {
    switchLoginMode('email');
    var payload = getEmailAuthPayload();
    if (!isValidEmail(payload.email)) {
        alert(t('invalidEmail'));
        return;
    }

    try {
        var result = await postJson('/api/auth/email-otp', payload);
        emailOtpState.userId = result.userId || '';
        emailOtpState.email = payload.email;
        currentUser.appwriteUserId = result.userId || currentUser.appwriteUserId;
        currentUser.email = payload.email;
        persistUserState();
        alert(t('emailSignupSent'));
    } catch (error) {
        alert(t('appwriteApiUnavailable') + '\n' + error.message);
    }
}

async function sendEmailOtp() {
    switchLoginMode('email');
    var payload = getEmailAuthPayload();
    if (!isValidEmail(payload.email)) {
        alert(t('invalidEmail'));
        return;
    }

    var btn = document.getElementById('send-email-code-btn');
    if (btn) btn.disabled = true;
    try {
        var result = await postJson('/api/auth/email-otp', payload);
        emailOtpState.userId = result.userId || '';
        emailOtpState.email = payload.email;
        currentUser.appwriteUserId = result.userId || currentUser.appwriteUserId;
        currentUser.email = payload.email;
        persistUserState();
        var tip = document.getElementById('email-tip');
        if (tip) tip.textContent = t('emailOtpSent');
        alert(t('emailOtpSent'));
    } catch (error) {
        alert(t('appwriteApiUnavailable') + '\n' + error.message);
    } finally {
        if (btn) btn.disabled = false;
    }
}

async function handleEmailLogin() {
    var payload = getEmailAuthPayload();
    var code = document.getElementById('email-code').value.trim();
    if (!isValidEmail(payload.email)) {
        alert(t('invalidEmail'));
        return false;
    }

    try {
        if (!code) {
            alert(t('invalidCode'));
            return false;
        }
        if (!emailOtpState.userId && !currentUser.appwriteUserId) {
            alert(t('emailOtpSent'));
            return false;
        }
        var result = await postJson('/api/auth/email-verify', {
            email: payload.email,
            userId: emailOtpState.userId || currentUser.appwriteUserId,
            code: code,
            name: payload.name,
            studentId: payload.studentId
        });
        applyAuthUser(result.user, result.session, payload);
        alert(t('emailLoginSuccess'));
        return true;
    } catch (error) {
        alert(t('appwriteApiUnavailable') + '\n' + error.message);
        return false;
    }
}

function completeLogin() {
    persistUserState();
    syncUserUI();
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('main-app').style.display = 'block';
    switchTab('home');
}

async function handleAuthCallback() {
    return;
}

function setupPaymentQrUpload() {
    var input = document.getElementById('payment-qr-upload');
    if (!input) return;

    input.addEventListener('change', function(event) {
        var file = event.target.files && event.target.files[0];
        if (!file) return;

        var reader = new FileReader();
        reader.onload = function(loadEvent) {
            selectedPaymentQr = loadEvent.target.result;
            var preview = document.getElementById('payment-qr-preview');
            if (preview) preview.src = selectedPaymentQr;
        };
        reader.readAsDataURL(file);
    });
}

// ===== 登录 =====
async function handleLogin() {
    if (loginMode === 'student') {
        currentUser.studentId = document.getElementById('student-id').value.trim() || defaultUser.studentId;
        currentUser.authMethod = 'student';
    } else {
        var emailLoggedIn = await handleEmailLogin();
        if (!emailLoggedIn) return;
    }

    completeLogin();
    if (typeof UserLogger !== 'undefined') {
        var sid = currentUser.studentId;
        UserLogger.log('login', 'User login: ' + sid, 'Method: ' + currentUser.authMethod + ', Email: ' + currentUser.email);
    }
}

function handleLogout() {
    if (confirm(t('signOutConfirm'))) {
        persistAuthSession(null);
        document.getElementById('main-app').style.display = 'none';
        document.getElementById('login-page').style.display = 'flex';
        if (typeof UserLogger !== 'undefined') {
            UserLogger.log('logout', 'User logout', 'Student ID: ' + document.getElementById('student-id').value);
        }
    }
}

// ===== Tab切换 =====
function switchTab(view) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    viewHistory = [view];
    currentView = view;
    
    document.getElementById('view-' + view).classList.add('active');
    var navBtn = document.querySelector('[data-view="' + view + '"]');
    if (navBtn) navBtn.classList.add('active');
    
    if (view === 'orders') renderOrders('pending');
    if (view === 'messages') renderMessages();
    if (view === 'home') renderHome();
    if (view === 'create') resetCreateForm();
    
    if (typeof UserLogger !== 'undefined') {
        UserLogger.log('switch_tab', 'Switched to: ' + view, 'From: ' + (viewHistory.length > 1 ? viewHistory[viewHistory.length - 2] : 'unknown'));
    }
}

// ===== 视图导航 =====
function openView(viewName) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + viewName).classList.add('active');
    viewHistory.push(viewName);
    currentView = viewName;
    
    if (viewName === 'wallet') renderWalletRecords(currentRecordTab);
    if (viewName === 'pickup-points') renderPickupPoints();
}

function goBack() {
    if (viewHistory.length > 1) {
        viewHistory.pop();
        var prevView = viewHistory[viewHistory.length - 1];
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById('view-' + prevView).classList.add('active');
        currentView = prevView;
        
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        var navBtn = document.querySelector('[data-view="' + prevView + '"]');
        if (navBtn) navBtn.classList.add('active');
    } else {
        switchTab('home');
    }
}

// ===== 首页渲染 =====
function renderHome() {
    var hotContainer = document.getElementById('home-hot-groups');
    hotContainer.innerHTML = appData.groups.slice(0, 4).map(function(g) { return createProductCard(g); }).join('');
    
    var nearbyContainer = document.getElementById('home-nearby-groups');
    nearbyContainer.innerHTML = appData.nearby.map(function(n) {
        return '<div class="nearby-card" onclick="showDetail(' + n.groupId + ')">' +
            '<div class="nearby-avatar">' + n.avatar + '<span class="online-dot"></span></div>' +
            '<div class="nearby-info"><div class="nearby-name">' + n.leader + '</div>' +
            '<div class="nearby-location">' + n.location + ' • ' + n.distance + ' ' + t('away') + '</div></div>' +
            '<button class="btn-follow" onclick="event.stopPropagation(); alert(\'' + t('followed') + '\')">' + t('follow') + '</button></div>';
    }).join('');
}

function createProductCard(g) {
    var progress = Math.round((g.currentMembers / g.totalMembers) * 100);
    var joinedText = g.currentMembers + '/' + g.totalMembers + ' ' + t('membersJoined');
    return '<div class="product-card" onclick="showDetail(' + g.id + ')">' +
        '<div class="product-image">' + g.icon +
        '<span class="product-timer">' + g.timeLeft + '</span></div>' +
        '<div class="product-info">' +
        '<div class="product-header"><div class="product-name">' + g.name + '</div>' +
        '<div class="product-price"><div class="price-current">¥' + g.groupPrice + '</div>' +
        '<div class="price-original">¥' + g.originalPrice + '</div></div></div>' +
        '<div class="product-meta"><div class="product-avatars">' +
        g.members.slice(0, 3).map(function() { return '<span class="mini-avatar">&#128100;</span>'; }).join('') +
        '</div><span class="product-progress-text">' + joinedText + '</span></div>' +
        '<div class="progress-bar"><div class="progress-fill" style="width:' + progress + '%"></div></div>' +
        '<button class="btn-join" onclick="event.stopPropagation(); showDetail(' + g.id + ')">' + t('joinGroupBuy') + '</button>' +
        '</div></div>';
}

// ===== 分类页 =====
function openCategory(cat) {
    currentCategory = cat;
    var catNames = { snacks: t('catSnacks'), fresh: t('catFresh'), books: t('catTextbooks'), service: t('catCampus'), secondhand: t('catSecondhand') };
    document.getElementById('category-title').textContent = catNames[cat];
    
    var filtered = appData.groups.filter(function(g) { return g.category === cat; });
    var container = document.getElementById('category-content');
    
    if (filtered.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--outline);">' + t('noGroups') + '</div>';
    } else {
        container.innerHTML = filtered.map(function(g) { return createProductCard(g); }).join('');
    }
    
    openView('category');
}

// ===== 拼团详情 =====
function showDetail(id) {
    var g = appData.groups.find(function(x) { return x.id === id; });
    if (!g) return;
    
    currentDetailGroupId = id;
    var progress = Math.round((g.currentMembers / g.totalMembers) * 100);
    var slotsLeft = g.totalMembers - g.currentMembers;
    
    document.getElementById('detail-content').innerHTML =
        '<div class="detail-image">' + g.icon + '</div>' +
        '<div class="detail-header"><div class="detail-name">' + g.name + '</div>' +
        '<div class="detail-price"><div class="price-current">¥' + g.groupPrice + '</div>' +
        '<div class="price-original">¥' + g.originalPrice + '</div></div></div>' +
        '<div class="detail-tags"><span class="detail-tag">' + t('originalImport') + '</span><span class="detail-tag">' + t('freshDaily') + '</span></div>' +
        '<div class="progress-card">' +
        '<div class="progress-label">' + t('groupProgress') + '</div>' +
        '<div class="progress-count">' + g.currentMembers + '/' + g.totalMembers + ' ' + t('members') + '</div>' +
        '<div class="progress-bar" style="height:6px;margin-bottom:16px;"><div class="progress-fill" style="width:' + progress + '%"></div></div>' +
        '<div class="progress-footer">' +
        '<div class="progress-avatars">' +
        g.members.map(function() { return '<span class="mini-avatar">&#128100;</span>'; }).join('') +
        '</div><span class="progress-expiry">' + t('slotsLeft') + ' ' + slotsLeft + ' ' + t('slotLeft') + ' ' + g.timeLeft + '</span>' +
        '<button class="btn-invite" onclick="inviteFriend(\'TT' + id + '\')">&#128101; ' + t('inviteFriends') + '</button>' +
        '</div></div>' +
        '<div class="captain-section"><div class="captain-label">' + t('groupCaptain') + '</div>' +
        '<div class="captain-card" onclick="openChat(\'' + g.leader.name + '\', \'leader-' + g.id + '\')">' +
        '<div class="captain-avatar">&#128100;</div>' +
        '<div class="captain-info"><div class="captain-name">' + g.leader.name + '</div>' +
        '<div class="captain-stats">★ ' + g.leader.rating + ' • ' + g.leader.groups + ' ' + t('totalGroups') + '</div></div>' +
        '<span class="captain-arrow">></span></div></div>' +
        '<div class="info-section">' +
        '<div class="info-item"><div class="info-icon">&#128737;</div><div class="info-content">' +
        '<div class="info-title">' + t('refundPolicy') + '</div>' +
        '<div class="info-text">' + t('refundPolicyText') + '</div></div></div>' +
        '<div class="info-item"><div class="info-icon">&#128205;</div><div class="info-content">' +
        '<div class="info-title">' + t('pickupInfo') + '</div>' +
        '<div class="info-text">' + t('location') + ': XJTLU ' + g.pickup + '. ' + t('time') + ': ' + g.pickupTime + '.</div></div></div>' +
        '</div>' +
        '<div class="bottom-spacer"></div>';
    
    // Update bottom button
    var joinBtn = document.getElementById('btn-join-bottom');
    if (joinBtn) {
        joinBtn.textContent = t('joinNow') + ' · ¥' + g.groupPrice;
        joinBtn.onclick = function() { joinGroup(id); };
    }
    
    openView('detail');
}

function getPendingStatusText(leftCount) {
    return currentLang === 'en' ? 'Paid • ' + leftCount + ' left' : '已支付 · 还差 ' + leftCount + ' 人';
}

// ===== 参团功能 =====
function joinGroup(id) {
    var g = appData.groups.find(function(x) { return x.id === id; });
    if (!g) return;
    
    if (g.currentMembers >= g.totalMembers) {
        alert(t('groupFull'));
        return;
    }

    paymentContext = { groupId: id };
    openPaymentModal(g);
}

function openPaymentModal(group) {
    selectedPaymentMethod = 'wallet';
    document.getElementById('payment-product-name').textContent = group.name;
    document.getElementById('payment-product-pickup').textContent = group.pickup + ' · ' + group.pickupTime;
    document.getElementById('payment-amount').textContent = '¥' + group.groupPrice.toFixed(2);
    updatePaymentMethodLabels();
    selectPaymentMethod('wallet');
    document.getElementById('payment-modal').classList.add('active');
}

function closePaymentModal() {
    document.getElementById('payment-modal').classList.remove('active');
    paymentContext = null;
}

function selectPaymentMethod(method) {
    selectedPaymentMethod = method;
    document.querySelectorAll('.payment-method').forEach(function(item) {
        item.classList.toggle('active', item.getAttribute('data-method') === method);
    });
    var tip = document.getElementById('payment-tip');
    if (!tip) return;
    tip.textContent = method === 'wallet'
        ? t('paymentTip')
        : (method === 'wechat' ? t('recommendedFast') : t('recommendedSecure'));
}

function updatePaymentMethodLabels() {
    var walletBalance = document.getElementById('wallet-pay-balance');
    if (walletBalance) {
        walletBalance.textContent = t('walletBalance') + ' ¥' + appData.wallet.balance.toFixed(2);
    }
}

async function confirmGroupPayment() {
    if (!paymentContext) return;

    var g = appData.groups.find(function(x) { return x.id === paymentContext.groupId; });
    if (!g) return;

    if (selectedPaymentMethod === 'wallet' && appData.wallet.balance < g.groupPrice) {
        alert(t('rechargeFirst'));
        return;
    }

    if (selectedPaymentMethod === 'wallet') {
        finishJoinGroup(g, selectedPaymentMethod);
        closePaymentModal();
        alert(t('paymentSuccess') + '\n' + g.name + '\n¥' + g.groupPrice.toFixed(2) + '\n\n' + t('checkOrders'));
        return;
    }

    openQrPaymentModal(g, selectedPaymentMethod);
}

function openQrPaymentModal(group, method) {
    qrPaymentContext = {
        groupId: group.id,
        method: method
    };
    closePaymentModal();
    document.getElementById('qr-payment-product').textContent = group.name;
    document.getElementById('qr-payment-method').textContent = getPaymentMethodText(method);
    document.getElementById('qr-payment-amount').textContent = '¥' + group.groupPrice.toFixed(2);
    document.getElementById('qr-payment-image').src = getGroupPaymentQr(group);
    document.getElementById('qr-payment-modal').classList.add('active');
}

function closeQrPaymentModal() {
    document.getElementById('qr-payment-modal').classList.remove('active');
    qrPaymentContext = null;
}

function confirmQrPayment() {
    if (!qrPaymentContext) return;
    var group = appData.groups.find(function(x) { return x.id === qrPaymentContext.groupId; });
    if (!group) return;

    finishJoinGroup(group, qrPaymentContext.method, 'QR' + Date.now());
    closeQrPaymentModal();
    alert(t('paymentSuccess') + '\n' + group.name + '\n¥' + group.groupPrice.toFixed(2) + '\n\n' + t('checkOrders'));
}

function finishJoinGroup(g, paymentMethod, providerOrderId) {
    var now = new Date();
    var timeStr = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0') + ' ' + String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
    var orderId = 'TT' + now.getFullYear() + String(now.getMonth()+1).padStart(2,'0') + String(now.getDate()).padStart(2,'0') + String(appData.nextOrderId++).padStart(3, '0');
    
    g.currentMembers++;
    g.members.push(currentUser.name);
    
    var newOrder = {
        id: orderId,
        name: g.name,
        icon: g.icon,
        status: 'pending',
        statusText: getPendingStatusText(g.totalMembers - g.currentMembers),
        detail: g.totalMembers + ' members | ' + g.pickup,
        price: g.groupPrice,
        date: timeStr.split(' ')[0],
        paymentMethod: paymentMethod,
        providerOrderId: providerOrderId || ''
    };
    
    appData.myGroups.unshift(newOrder);
    appData.orders.pending.unshift({
        id: orderId,
        name: g.name,
        icon: g.icon,
        status: 'pending',
        statusText: getPendingStatusText(g.totalMembers - g.currentMembers),
        detail: newOrder.detail,
        price: g.groupPrice,
        action: 'Invite Friends',
        date: timeStr.split(' ')[0],
        paymentMethod: paymentMethod,
        providerOrderId: providerOrderId || ''
    });

    if (paymentMethod === 'wallet') {
        appData.wallet.balance -= g.groupPrice;
    }
    if (paymentMethod !== 'wallet' && g.leader && g.leader.name === 'Me') {
        ensureWalletShape();
        appData.wallet.merchantIncome += g.groupPrice;
    }
    appData.wallet.records.unshift({
        id: Date.now(),
        type: 'consume',
        title: g.name + ' Group · ' + getPaymentMethodText(paymentMethod),
        amount: paymentMethod === 'wallet' ? -g.groupPrice : 0,
        displayAmount: -g.groupPrice,
        time: timeStr
    });
    
    updateWalletDisplays();
    
    if (g.currentMembers >= g.totalMembers) {
        g.tag = 'nearly';
        g.tagText = 'Completed';
    }
    
    renderHome();
    renderOrders(currentOrderTab);
    renderWalletRecords(currentRecordTab);
    updatePaymentMethodLabels();
    persistAppState();
    
    if (typeof UserLogger !== 'undefined') {
        UserLogger.log('join_group', 'Joined group: ' + g.name, 'Order: ' + orderId + ', Amount: ¥' + g.groupPrice + ', Method: ' + paymentMethod);
    }
}

function joinCurrentGroup() {
    if (currentDetailGroupId) {
        joinGroup(currentDetailGroupId);
    }
}

// ===== 发起拼团 =====
function handlePickupChange() {
    var select = document.getElementById('pickup-point');
    var customGroup = document.getElementById('custom-pickup-group');
    if (select && select.value === 'custom') {
        customGroup.style.display = 'block';
    } else if (customGroup) {
        customGroup.style.display = 'none';
    }
}

function selectPickup(el, name) {
    selectedPickup = name;
    document.querySelectorAll('.pickup-option').forEach(function(opt) {
        opt.classList.remove('selected');
        var check = opt.querySelector('.pickup-check');
        if (check) check.remove();
    });
    el.classList.add('selected');
    if (!el.querySelector('.pickup-check')) {
        var check = document.createElement('div');
        check.className = 'pickup-check';
        check.innerHTML = '&#10003;';
        el.appendChild(check);
    }
}

function resetCreateForm() {
    currentStep = 1;
    selectedTemplate = null;
    selectedPickup = '1号楼自提柜';
    selectedPaymentQr = DEFAULT_PAYMENT_QR;
    updateStepIndicator();
    document.querySelectorAll('.create-step').forEach(function(s) { s.classList.remove('active'); });
    document.getElementById('create-step1').classList.add('active');
    document.querySelectorAll('.template-card').forEach(function(c) { c.classList.remove('selected'); });
    document.getElementById('custom-product').value = '';
    document.getElementById('group-price').value = '';
    document.getElementById('original-price').value = '';
    document.getElementById('group-count').value = 4;
    document.getElementById('deadline').value = '24';
    if (document.getElementById('custom-pickup')) document.getElementById('custom-pickup').value = '';
    if (document.getElementById('custom-pickup-group')) document.getElementById('custom-pickup-group').style.display = 'none';
    if (document.getElementById('payment-qr-preview')) document.getElementById('payment-qr-preview').src = DEFAULT_PAYMENT_QR;
    if (document.getElementById('payment-qr-upload')) document.getElementById('payment-qr-upload').value = '';
}

function selectTemplate(template, el) {
    selectedTemplate = template;
    document.querySelectorAll('.template-card').forEach(function(c) { c.classList.remove('selected'); });
    el.classList.add('selected');
}

function nextStep(step) {
    if (step === 2 && !selectedTemplate && !document.getElementById('custom-product').value) {
        alert(t('selectCategory'));
        return;
    }
    if (step === 3) {
        if (!document.getElementById('group-price').value || !document.getElementById('original-price').value) {
            alert(t('fillPrice'));
            return;
        }
    }
    currentStep = step;
    updateStepIndicator();
    document.querySelectorAll('.create-step').forEach(function(s) { s.classList.remove('active'); });
    document.getElementById('create-step' + step).classList.add('active');
}

function updateStepIndicator() {
    for (var i = 1; i <= 3; i++) {
        var dot = document.getElementById('step' + i + '-dot');
        if (dot) dot.classList.toggle('active', i <= currentStep);
    }
}

function adjustNumber(id, delta) {
    var input = document.getElementById(id);
    var val = parseInt(input.value) + delta;
    input.value = Math.max(parseInt(input.min), Math.min(parseInt(input.max), val));
}

function getTemplateName(t) {
    var names = { snacks: "Sam's Snack Group", books: 'Textbook Group', daily: 'Grocery Group', fresh: 'Fresh Food Group' };
    return names[t] || 'Custom Group';
}

function publishGroup() {
    var name = selectedTemplate ? getTemplateName(selectedTemplate) : document.getElementById('custom-product').value;
    var price = parseFloat(document.getElementById('group-price').value);
    var origPrice = parseFloat(document.getElementById('original-price').value);
    var count = parseInt(document.getElementById('group-count').value);
    var deadline = document.getElementById('deadline').value;
    var pickupText = selectedPickup;
    
    if (!pickupText) {
        alert(t('selectPickup'));
        return;
    }
    
    var icons = { snacks: '&#127850;', books: '&#128218;', daily: '&#129527;', fresh: '&#127823;' };
    var categories = { snacks: 'snacks', books: 'books', daily: 'daily', fresh: 'fresh' };
    
    var newGroup = {
        id: appData.nextGroupId++,
        name: name,
        icon: icons[selectedTemplate] || '&#128230;',
        category: categories[selectedTemplate] || 'snacks',
        currentMembers: 1,
        totalMembers: count,
        groupPrice: price,
        originalPrice: origPrice,
        timeLeft: deadline + ' hours',
        tag: 'hot',
        tagText: 'New',
        spec: 'Custom',
        pickup: pickupText,
        pickupTime: 'Within ' + deadline + ' hours',
        leader: { name: 'Me', groups: 3, rating: '5.0' },
        members: ['Me'],
        paymentQr: selectedPaymentQr || DEFAULT_PAYMENT_QR,
        notice: [{ title: 'Refund Policy', content: 'No refund after completion' }]
    };
    
    appData.groups.unshift(newGroup);
    
    var now = new Date();
    var timeStr = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0');
    var orderId = 'TT' + now.getFullYear() + String(now.getMonth()+1).padStart(2,'0') + String(now.getDate()).padStart(2,'0') + String(appData.nextOrderId++).padStart(3, '0');
    
    var newOrder = {
        id: orderId,
        name: name,
        icon: newGroup.icon,
        status: 'pending',
        statusText: 'Pending',
        detail: count + ' members | ' + pickupText,
        price: price,
        date: timeStr
    };
    appData.myCreated.unshift(newOrder);
    appData.myGroups.unshift(newOrder);
    appData.orders.pending.unshift({
        id: orderId,
        name: newOrder.name,
        icon: newOrder.icon,
        status: 'pending',
        statusText: getPendingStatusText(count - 1),
        detail: newOrder.detail,
        price: newOrder.price,
        action: 'Invite Friends',
        date: timeStr
    });
    
    persistAppState();
    alert(t('published'));
    switchTab('home');
    
    if (typeof UserLogger !== 'undefined') {
        UserLogger.log('create_group', 'Published group: ' + name, 'Price: ¥' + price + ', Members: ' + count);
    }
}

// ===== 订单页 =====
function switchOrderTab(tab) {
    currentOrderTab = tab;
    document.querySelectorAll('.order-tab').forEach(function(t) { t.classList.remove('active'); });
    document.querySelector('[data-tab="' + tab + '"]').classList.add('active');
    renderOrders(tab);
}

function renderOrders(tab) {
    var orders = appData.orders[tab] || [];
    var container = document.getElementById('orders-list');
    
    if (orders.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--outline);">' + t('noOrders') + '</div>';
        return;
    }
    
    container.innerHTML = orders.map(function(o) {
        var btnHtml = '';
        if (o.status === 'pending') {
            btnHtml = '<button class="order-btn primary" onclick="event.stopPropagation(); inviteFriend(\'' + o.id + '\')">' + t('inviteFriends') + '</button>';
        } else if (o.status === 'pickup') {
            btnHtml = '<button class="order-btn secondary" onclick="event.stopPropagation(); showPickupCode(\'' + o.id + '\')">' + t('showQRCode') + '</button>';
        } else if (o.status === 'completed') {
            var groupExists = appData.groups.some(function(g) { return g.name === o.name && g.leader.name !== 'Me'; });
            if (groupExists) {
                btnHtml = '<button class="order-btn primary" onclick="event.stopPropagation(); rejoinGroup(\'' + o.name + '\')">' + t('rejoin') + '</button>';
            }
        } else if (o.status === 'refund') {
            btnHtml = '<button class="order-btn secondary" onclick="event.stopPropagation(); openChat(\'Support Assistant\', \'cs\')">' + t('contactSupportBtn') + '</button>';
        }
        
        return '<div class="order-card" onclick="viewOrderDetail(\'' + o.id + '\')">' +
            '<div class="order-header"><span class="order-id">GROUP BUY #' + o.id.slice(-4) + '</span>' +
            '<span class="order-status">' + o.statusText + '</span></div>' +
            '<div class="order-body"><div class="order-img">' + o.icon + '</div>' +
            '<div class="order-info"><div class="order-name">' + o.name + '</div>' +
            '<div class="order-detail">' + o.detail + '</div>' +
            '<div class="order-price">¥' + o.price + '</div></div></div>' +
            '<div class="order-actions">' + btnHtml + '</div></div>';
    }).join('');
}

// ===== 订单操作功能 =====
function inviteFriend(orderId) {
    var order = findOrderById(orderId);
    if (!order) return;
    
    var shareLink = 'https://tt-xjtlu.com/group/' + orderId;
    var shareText = 'I am joining "' + order.name + '" group buy, need 1 more!';
    
    var modalHtml = '<div id="share-modal" class="modal active">' +
        '<div class="modal-content">' +
        '<div class="modal-header"><h3>' + t('inviteFriendsTitle') + '</h3><button class="modal-close" onclick="closeShareModal()">&times;</button></div>' +
        '<div class="modal-body">' +
        '<div class="share-preview">' +
        '<div class="share-icon">' + order.icon + '</div>' +
        '<div class="share-name">' + order.name + '</div>' +
        '<div class="share-price">¥' + order.price + '</div>' +
        '</div>' +
        '<div class="share-text">' + shareText + '</div>' +
        '<div class="share-link">' + shareLink + '</div>' +
        '<button class="btn-confirm" onclick="copyShareLink(\'' + shareLink + '\', \'' + shareText + '\')">&#128203; ' + t('copyLink') + '</button>' +
        '<div class="share-channels">' +
        '<button class="share-channel wechat" onclick="alert(\'Shared to WeChat\')">&#128172; WeChat</button>' +
        '</div></div></div></div>';
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    if (typeof UserLogger !== 'undefined') {
        UserLogger.log('invite_friend', 'Invited friends for: ' + order.name, 'Order: ' + orderId);
    }
}

function closeShareModal() {
    var modal = document.getElementById('share-modal');
    if (modal) modal.remove();
}

function copyShareLink(link, text) {
    alert('Copied!\n\n' + text + '\n' + link);
    closeShareModal();
}

function showPickupCode(orderId) {
    var order = findOrderById(orderId);
    if (!order) return;
    
    var code = 'TT' + orderId.slice(-6) + Math.floor(Math.random() * 9000 + 1000);
    
    var modalHtml = '<div id="pickup-modal" class="modal active">' +
        '<div class="modal-content">' +
        '<div class="modal-header"><h3>' + t('pickupCode') + '</h3><button class="modal-close" onclick="closePickupModal()">&times;</button></div>' +
        '<div class="modal-body" style="text-align:center;">' +
        '<div class="pickup-code-display">' + code + '</div>' +
        '<p style="color:var(--on-surface-variant);font-size:13px;margin:10px 0;">' + t('showCodeAtPickup') + '</p>' +
        '<p style="font-size:14px;margin-bottom:5px;"><strong>' + order.name + '</strong></p>' +
        '<p style="font-size:13px;color:var(--on-surface-variant);">' + order.detail + '</p>' +
        '</div></div></div>';
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closePickupModal() {
    var modal = document.getElementById('pickup-modal');
    if (modal) modal.remove();
}

function viewOrderDetail(orderId) {
    var order = findOrderById(orderId);
    if (!order) return;
    
    var group = appData.groups.find(function(g) { return g.name === order.name; });
    if (group) {
        showDetail(group.id);
    } else {
        var modalHtml = '<div id="order-detail-modal" class="modal active">' +
            '<div class="modal-content">' +
            '<div class="modal-header"><h3>' + t('orderDetails') + '</h3><button class="modal-close" onclick="closeOrderDetailModal()">&times;</button></div>' +
            '<div class="modal-body">' +
            '<div style="text-align:center;margin-bottom:16px;"><div style="width:64px;height:64px;border-radius:12px;background:var(--surface-low);display:inline-flex;align-items:center;justify-content:center;font-size:32px;">' + order.icon + '</div></div>' +
            '<div class="order-detail-content">' +
            '<div class="detail-row"><span class="detail-label">' + t('orderId') + '</span><span class="detail-value">' + order.id + '</span></div>' +
            '<div class="detail-row"><span class="detail-label">' + t('product') + '</span><span class="detail-value">' + order.name + '</span></div>' +
            '<div class="detail-row"><span class="detail-label">' + t('status') + '</span><span class="detail-value">' + order.statusText + '</span></div>' +
            '<div class="detail-row"><span class="detail-label">' + t('pickup') + '</span><span class="detail-value">' + order.detail + '</span></div>' +
            '<div class="detail-row"><span class="detail-label">' + t('paymentMethod') + '</span><span class="detail-value">' + getPaymentMethodText(order.paymentMethod || 'wallet') + '</span></div>' +
            '<div class="detail-row"><span class="detail-label">' + t('amountLabel') + '</span><span class="detail-value" style="color:var(--primary);font-weight:700;">¥' + order.price + '</span></div>' +
            '<div class="detail-row"><span class="detail-label">' + t('date') + '</span><span class="detail-value">' + order.date + '</span></div>' +
            '</div></div></div></div>';
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
    
    if (typeof UserLogger !== 'undefined') {
        UserLogger.log('view_order', 'Viewed order: ' + order.name, 'Order: ' + orderId);
    }
}

function closeOrderDetailModal() {
    var modal = document.getElementById('order-detail-modal');
    if (modal) modal.remove();
}

function rejoinGroup(name) {
    var group = appData.groups.find(function(g) { return g.name === name && g.leader.name !== 'Me'; });
    if (group) {
        showDetail(group.id);
    } else {
        alert(t('noGroupAvailable'));
    }
}

function findOrderById(orderId) {
    var tabs = ['pending', 'pickup', 'completed', 'refund'];
    for (var i = 0; i < tabs.length; i++) {
        var order = appData.orders[tabs[i]].find(function(o) { return o.id === orderId; });
        if (order) return order;
    }
    return null;
}

// ===== 我的订单子页面 =====
function openMyOrders(type) {
    switchTab('orders');
    
    if (type === 'my-groups') {
        switchOrderTab('pending');
    } else {
        switchOrderTab('completed');
    }
}

// ===== 消息页 =====
function renderMessages() {
    var container = document.getElementById('messages-list');
    container.innerHTML = appData.messages.map(function(m) {
        var onclick = m.type === 'chat' ? "openChat('" + m.title + "', '" + m.chatId + "')" : "openMsgDetail(" + m.id + ")";
        var badge = m.badge > 0 ? '<span class="msg-badge"></span>' : '';
        return '<div class="message-item" onclick="' + onclick + '">' +
            '<div class="msg-avatar ' + m.avatarClass + '">' + m.avatar + '</div>' +
            '<div class="msg-content"><div class="msg-header">' +
            '<span class="msg-title">' + m.title + '</span>' +
            '<span class="msg-time">' + m.time + '</span></div>' +
            '<p class="msg-text">' + m.text + '</p></div>' + badge + '</div>';
    }).join('');
    
    var totalBadge = appData.messages.reduce(function(sum, m) { return sum + m.badge; }, 0);
    var badgeEl = document.getElementById('msg-badge');
    badgeEl.textContent = totalBadge;
    badgeEl.style.display = totalBadge > 0 ? 'flex' : 'none';
}

// ===== 消息详情页 =====
function openMsgDetail(msgId) {
    var msg = appData.messages.find(function(m) { return m.id === msgId; });
    if (!msg) return;
    
    msg.badge = 0;
    
    document.getElementById('msg-detail-title').textContent = msg.title;
    document.getElementById('msg-detail-content').innerHTML =
        '<div class="msg-detail-card">' +
        '<div class="msg-detail-icon ' + msg.avatarClass + '">' + msg.avatar + '</div>' +
        '<div class="msg-detail-detail">' + msg.text + '</div>' +
        '<div class="msg-detail-time">' + msg.time + '</div>' +
        '</div>';
    
    openView('msg-detail');
    renderMessages();
}

// ===== 聊天页 =====
function openChat(name, chatId) {
    currentChatId = chatId;
    document.getElementById('chat-title').textContent = name;
    
    var msg = appData.messages.find(function(m) { return m.chatId === chatId; });
    if (msg) msg.badge = 0;
    
    if (!appData.chats[chatId]) {
        appData.chats[chatId] = { name: name, messages: [{ from: 'other', text: currentLang === 'en' ? 'Hi!' : '你好！', time: currentLang === 'en' ? 'Now' : '现在' }] };
    }
    
    renderChat();
    openView('chat');
    renderMessages();
    
    setTimeout(function() {
        var container = document.getElementById('chat-messages');
        container.scrollTop = container.scrollHeight;
        document.getElementById('chat-input').focus();
    }, 100);
}

function renderChat() {
    var chat = appData.chats[currentChatId];
    if (!chat) return;
    
    var container = document.getElementById('chat-messages');
    container.innerHTML = chat.messages.map(function(m) {
        var cls = m.from === 'me' ? 'chat-msg sent' : 'chat-msg';
        var avatar = m.from === 'me' ? '&#128100;' : '&#128104;';
        return '<div class="' + cls + '"><div class="msg-bubble-avatar">' + avatar + '</div>' +
            '<div><div class="msg-bubble">' + m.text + '</div>' +
            '<div class="msg-time-bubble">' + m.time + '</div></div></div>';
    }).join('');
    
    container.scrollTop = container.scrollHeight;
}

function sendMessage() {
    var input = document.getElementById('chat-input');
    var text = input.value.trim();
    if (!text || !currentChatId) return;
    
    var now = new Date();
    var time = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
    
    appData.chats[currentChatId].messages.push({ from: 'me', text: text, time: time });
    input.value = '';
    renderChat();
    
    setTimeout(function() {
        var repliesEn = ['Got it!', 'Sure~', 'On it', 'Thanks!', 'OK', 'Understood', 'Will do'];
        var repliesZh = ['收到！', '好的~', '马上处理', '谢谢！', 'OK', '了解了', '没问题'];
        var replies = currentLang === 'en' ? repliesEn : repliesZh;
        var reply = replies[Math.floor(Math.random() * replies.length)];
        var replyTime = now.getHours() + ':' + String(now.getMinutes() + 1).padStart(2, '0');
        appData.chats[currentChatId].messages.push({ from: 'other', text: reply, time: replyTime });
        renderChat();
    }, 800);
    
    if (typeof UserLogger !== 'undefined') {
        UserLogger.log('send_message', 'Sent message to: ' + appData.chats[currentChatId].name, 'Content: ' + text.substring(0, 50));
    }
}

function handleChatKeypress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
}

// ===== 钱包 =====
function openWalletModal(action) {
    walletAction = action;
    document.getElementById('modal-title').textContent = action === 'deposit' ? t('deposit') : t('withdraw');
    document.getElementById('wallet-amount').value = '';
    document.getElementById('wallet-modal').classList.add('active');
}

function closeWalletModal() {
    document.getElementById('wallet-modal').classList.remove('active');
}

function setAmount(amount) {
    document.getElementById('wallet-amount').value = amount;
}

function confirmWalletAction() {
    var amount = parseFloat(document.getElementById('wallet-amount').value);
    if (!amount || amount <= 0) {
        alert(t('validAmount'));
        return;
    }
    
    var now = new Date();
    var time = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0') + ' ' + String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
    
    if (walletAction === 'deposit') {
        appData.wallet.balance += amount;
        appData.wallet.records.unshift({ id: Date.now(), type: 'deposit', title: t('deposit'), amount: amount, time: time });
        alert(t('depositSuccess') + amount);
        
        if (typeof UserLogger !== 'undefined') {
            UserLogger.log('deposit', 'Deposit successful', 'Amount: ¥' + amount + ', Balance: ¥' + appData.wallet.balance.toFixed(2));
        }
    } else {
        if (amount > appData.wallet.balance) {
            alert(t('insufficientBalance'));
            return;
        }
        appData.wallet.balance -= amount;
        appData.wallet.records.unshift({ id: Date.now(), type: 'withdraw', title: t('withdraw'), amount: -amount, time: time });
        alert(t('withdrawSuccess') + amount);
        
        if (typeof UserLogger !== 'undefined') {
            UserLogger.log('withdraw', 'Withdraw successful', 'Amount: ¥' + amount + ', Balance: ¥' + appData.wallet.balance.toFixed(2));
        }
    }
    
    updateWalletDisplays();
    renderWalletRecords(currentRecordTab);
    persistAppState();
    closeWalletModal();
}

function switchRecordTab(tab) {
    currentRecordTab = tab;
    document.querySelectorAll('.record-tab').forEach(function(t) { t.classList.remove('active'); });
    document.querySelector('[data-type="' + tab + '"]').classList.add('active');
    renderWalletRecords(tab);
}

function renderWalletRecords(tab) {
    var records = appData.wallet.records;
    if (tab !== 'all') records = records.filter(function(r) { return r.type === tab; });
    
    var container = document.getElementById('wallet-records');
    if (records.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:30px;color:var(--outline);">' + t('noRecords') + '</div>';
        return;
    }
    
    container.innerHTML = records.map(function(r) {
        var shownAmount = typeof r.displayAmount === 'number' ? r.displayAmount : r.amount;
        var cls = shownAmount > 0 ? 'income' : 'expense';
        var sign = shownAmount > 0 ? '+' : '';
        return '<div class="record-item"><div class="record-info">' +
            '<div class="record-title">' + r.title + '</div>' +
            '<div class="record-time">' + r.time + '</div></div>' +
            '<div class="record-amount ' + cls + '">' + sign + '¥' + Math.abs(shownAmount).toFixed(2) + '</div></div>';
    }).join('');
}

// ===== 自提点 =====
function renderPickupPoints() {
    var container = document.getElementById('pickup-content');
    container.innerHTML = appData.pickupPoints.map(function(p) {
        return '<div class="pickup-card"><div class="pickup-name">' + p.name + '</div>' +
            '<div class="pickup-detail">&#128205; ' + p.location + '</div>' +
            '<div class="pickup-detail">&#128222; ' + p.contact + '</div>' +
            '<span class="pickup-hours">&#9200; ' + p.hours + '</span></div>';
    }).join('');
}

// ===== 客服中心 =====
function toggleFaq(el) {
    el.classList.toggle('open');
}

// ===== 编辑资料 =====
async function saveProfile() {
    var name = document.getElementById('edit-name').value;
    if (name) {
        currentUser.name = name;
    }
    persistUserState();
    syncUserUI();
    if (currentUser.appwriteUserId) {
        try {
            await postJson('/api/auth/profile', {
                userId: currentUser.appwriteUserId,
                email: currentUser.email,
                name: currentUser.name,
                studentId: currentUser.studentId
            });
        } catch (error) {
            alert(t('appwriteApiUnavailable') + '\n' + error.message);
            return;
        }
    }
    alert(t('saved'));
    goBack();
    
    if (typeof UserLogger !== 'undefined') {
        UserLogger.log('update_profile', 'Updated profile', 'Name: ' + name + ', Student ID: ' + currentUser.studentId);
    }
}
