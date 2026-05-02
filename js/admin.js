// ===== 管理后台逻辑 =====
var currentAdminTab = 'dashboard';
var refreshInterval = null;
var lastLogCount = 0;

document.addEventListener('DOMContentLoaded', function() {
    loadDashboard();
    loadUserFilter();
    lastLogCount = UserLogger.getLogs().length;
    
    // 定时刷新（每2秒）
    startAutoRefresh();
    
    // 监听其他标签页的 localStorage 变化
    window.addEventListener('storage', function(e) {
        if (e.key === 'tt_user_logs') {
            refreshCurrentTab();
        }
    });
});

function startAutoRefresh() {
    if (refreshInterval) clearInterval(refreshInterval);
    refreshInterval = setInterval(function() {
        var currentCount = UserLogger.getLogs().length;
        if (currentCount !== lastLogCount) {
            lastLogCount = currentCount;
            refreshCurrentTab();
        }
    }, 2000);
}

function stopAutoRefresh() {
    if (refreshInterval) {
        clearInterval(refreshInterval);
        refreshInterval = null;
    }
}

function refreshCurrentTab() {
    if (currentAdminTab === 'dashboard') loadDashboard();
    else if (currentAdminTab === 'logs') applyFilters();
    else if (currentAdminTab === 'charts') loadCharts();
    
    updateRefreshIndicator();
    updateLastUpdateTime();
}

function updateLastUpdateTime() {
    var now = new Date();
    var timeStr = now.getHours().toString().padStart(2, '0') + ':' + 
                  now.getMinutes().toString().padStart(2, '0') + ':' + 
                  now.getSeconds().toString().padStart(2, '0');
    var el = document.getElementById('last-update');
    if (el) el.textContent = '上次更新: ' + timeStr;
}

function updateRefreshIndicator() {
    var indicator = document.getElementById('refresh-indicator');
    if (indicator) {
        indicator.classList.add('active');
        setTimeout(function() { indicator.classList.remove('active'); }, 500);
    }
}

function switchAdminTab(tab) {
    currentAdminTab = tab;
    document.querySelectorAll('.admin-tab').forEach(function(t) { t.classList.remove('active'); });
    document.querySelectorAll('.admin-view').forEach(function(v) { v.classList.remove('active'); });
    document.querySelector('[data-tab="' + tab + '"]').classList.add('active');
    document.getElementById('admin-' + tab).classList.add('active');

    if (tab === 'dashboard') loadDashboard();
    if (tab === 'logs') loadLogs();
    if (tab === 'charts') loadCharts();
}

function loadDashboard() {
    var stats = UserLogger.getStats();

    document.getElementById('stat-total').textContent = stats.totalActions;
    document.getElementById('stat-users').textContent = Object.keys(stats.activeUsers).length;
    document.getElementById('stat-messages').textContent = stats.actionsByType['send_message'] || 0;
    document.getElementById('stat-wallet').textContent = (stats.actionsByType['deposit'] || 0) + (stats.actionsByType['withdraw'] || 0);

    var barsContainer = document.getElementById('action-type-bars');
    var maxCount = 0;
    var typeLabels = {
        login: '登录', logout: '登出', create_group: '创建拼团', join_group: '参与拼团',
        send_message: '发送消息', deposit: '充值', withdraw: '提现', update_profile: '更新资料',
        view_detail: '查看详情', invite_friend: '邀请好友', view_order: '查看订单', switch_tab: '切换页面'
    };

    Object.keys(stats.actionsByType).forEach(function(type) {
        if (stats.actionsByType[type] > maxCount) maxCount = stats.actionsByType[type];
    });

    barsContainer.innerHTML = Object.keys(stats.actionsByType).map(function(type) {
        var count = stats.actionsByType[type];
        var pct = maxCount > 0 ? (count / maxCount * 100) : 0;
        return '<div class="bar-item">' +
            '<span class="bar-label">' + (typeLabels[type] || type) + '</span>' +
            '<div class="bar-track"><div class="bar-fill" style="width:' + pct + '%">' +
            '<span class="bar-value">' + count + '</span></div></div></div>';
    }).join('');

    var usersContainer = document.getElementById('active-users-list');
    var sortedUsers = Object.keys(stats.activeUsers).sort(function(a, b) {
        return stats.activeUsers[b] - stats.activeUsers[a];
    }).slice(0, 10);

    usersContainer.innerHTML = sortedUsers.map(function(uid) {
        var logs = UserLogger.getLogs().filter(function(l) { return l.userId === uid; });
        var name = logs.length > 0 ? logs[0].userName : uid;
        return '<div class="user-item">' +
            '<span class="user-item-name">' + name + ' (' + uid + ')</span>' +
            '<span class="user-item-count">' + stats.activeUsers[uid] + ' 次操作</span></div>';
    }).join('') || '<div style="text-align:center;color:#8e8e93;padding:20px;">暂无数据</div>';

    var recentBody = document.getElementById('recent-logs-body');
    recentBody.innerHTML = stats.recentActions.map(function(entry) {
        return '<tr>' +
            '<td>' + entry.timestamp + '</td>' +
            '<td>' + entry.userName + '</td>' +
            '<td><span class="action-badge ' + entry.actionType + '">' + (typeLabels[entry.actionType] || entry.actionType) + '</span></td>' +
            '<td>' + entry.details + '</td></tr>';
    }).join('') || '<tr><td colspan="4" style="text-align:center;color:#8e8e93;">暂无日志</td></tr>';
}

function loadUserFilter() {
    var users = UserLogger.getUniqueUsers();
    var select = document.getElementById('filter-user');
    select.innerHTML = '<option value="">全部用户</option>';
    Object.keys(users).forEach(function(uid) {
        var opt = document.createElement('option');
        opt.value = uid;
        opt.textContent = users[uid] + ' (' + uid + ')';
        select.appendChild(opt);
    });
}

function loadLogs() {
    loadUserFilter();
    applyFilters();
}

function applyFilters() {
    var filters = {
        userId: document.getElementById('filter-user').value,
        actionType: document.getElementById('filter-action').value,
        startDate: document.getElementById('filter-start').value,
        endDate: document.getElementById('filter-end').value
    };

    var logs = UserLogger.filterLogs(filters);
    document.getElementById('log-count-num').textContent = logs.length;

    var typeLabels = {
        login: '登录', logout: '登出', create_group: '创建拼团', join_group: '参与拼团',
        send_message: '发送消息', deposit: '充值', withdraw: '提现', update_profile: '更新资料',
        view_detail: '查看详情', invite_friend: '邀请好友', view_order: '查看订单', switch_tab: '切换页面'
    };

    var tbody = document.getElementById('logs-table-body');
    tbody.innerHTML = logs.map(function(entry) {
        return '<tr>' +
            '<td>' + entry.timestamp + '</td>' +
            '<td>' + entry.userId + '</td>' +
            '<td>' + entry.userName + '</td>' +
            '<td><span class="action-badge ' + entry.actionType + '">' + (typeLabels[entry.actionType] || entry.actionType) + '</span></td>' +
            '<td>' + entry.details + '</td>' +
            '<td>' + (entry.content || '-') + '</td></tr>';
    }).join('') || '<tr><td colspan="6" style="text-align:center;color:#8e8e93;">无匹配记录</td></tr>';
}

function resetFilters() {
    document.getElementById('filter-user').value = '';
    document.getElementById('filter-action').value = '';
    document.getElementById('filter-start').value = '';
    document.getElementById('filter-end').value = '';
    applyFilters();
}

function clearAllLogs() {
    if (confirm('确定要清空所有日志吗？此操作不可恢复。')) {
        UserLogger.clearLogs();
        lastLogCount = 0;
        loadDashboard();
        alert('日志已清空');
    }
}

function loadCharts() {
    var stats = UserLogger.getStats();
    drawDailyChart(stats.actionsByDate);
    drawTypesChart(stats.actionsByType);
    drawUsersChart(stats.activeUsers);
}

function drawDailyChart(data) {
    var canvas = document.getElementById('chart-daily');
    var ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth - 40;
    canvas.height = 250;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var dates = Object.keys(data).sort();
    if (dates.length === 0) {
        ctx.fillStyle = '#8e8e93';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('暂无数据', canvas.width / 2, canvas.height / 2);
        return;
    }

    var values = dates.map(function(d) { return data[d]; });
    var maxVal = Math.max.apply(null, values);
    var padding = { top: 20, right: 20, bottom: 40, left: 50 };
    var chartW = canvas.width - padding.left - padding.right;
    var chartH = canvas.height - padding.top - padding.bottom;
    var barW = Math.min(40, chartW / dates.length - 10);

    ctx.strokeStyle = '#e5e5ea';
    ctx.lineWidth = 1;
    for (var i = 0; i <= 4; i++) {
        var y = padding.top + (chartH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(canvas.width - padding.right, y);
        ctx.stroke();
        ctx.fillStyle = '#8e8e93';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(maxVal - (maxVal / 4) * i), padding.left - 8, y + 4);
    }

    dates.forEach(function(date, idx) {
        var x = padding.left + (chartW / dates.length) * idx + (chartW / dates.length - barW) / 2;
        var h = maxVal > 0 ? (values[idx] / maxVal) * chartH : 0;
        var y = padding.top + chartH - h;

        var gradient = ctx.createLinearGradient(x, y, x, y + h);
        gradient.addColorStop(0, '#7B61FF');
        gradient.addColorStop(1, '#4A6CF7');
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barW, h);

        ctx.fillStyle = '#8e8e93';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(date.slice(5), x + barW / 2, canvas.height - padding.bottom + 15);
    });
}

function drawTypesChart(data) {
    var canvas = document.getElementById('chart-types');
    var ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth - 40;
    canvas.height = 250;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var entries = Object.keys(data).map(function(k) { return { name: k, value: data[k] }; });
    var total = entries.reduce(function(s, e) { return s + e.value; }, 0);

    if (total === 0) {
        ctx.fillStyle = '#8e8e93';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('暂无数据', canvas.width / 2, canvas.height / 2);
        return;
    }

    var colors = ['#4A6CF7', '#7B61FF', '#FF6B35', '#34C759', '#FF3B30', '#FF2D55', '#5856D6', '#007AFF', '#FF9500', '#AF52DE', '#5AC8FA', '#30D158'];
    var cx = canvas.width * 0.3;
    var cy = canvas.height / 2;
    var radius = Math.min(cx - 20, cy - 20);
    var startAngle = -Math.PI / 2;

    entries.forEach(function(entry, idx) {
        var sliceAngle = (entry.value / total) * 2 * Math.PI;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[idx % colors.length];
        ctx.fill();
        startAngle += sliceAngle;
    });

    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();

    ctx.fillStyle = '#3a3a3c';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(total, cx, cy + 5);

    var legendX = canvas.width * 0.6;
    var legendY = 30;
    entries.slice(0, 8).forEach(function(entry, idx) {
        ctx.fillStyle = colors[idx % colors.length];
        ctx.fillRect(legendX, legendY + idx * 22, 12, 12);
        ctx.fillStyle = '#3a3a3c';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        var labels = { login: '登录', logout: '登出', create_group: '创建拼团', join_group: '参与拼团', send_message: '发消息', deposit: '充值', withdraw: '提现', update_profile: '更新资料', view_detail: '查看详情', invite_friend: '邀请好友', view_order: '查看订单', switch_tab: '切换页面' };
        ctx.fillText((labels[entry.name] || entry.name) + ' ' + entry.value, legendX + 18, legendY + idx * 22 + 10);
    });
}

function drawUsersChart(data) {
    var canvas = document.getElementById('chart-users');
    var ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth - 40;
    canvas.height = 250;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var users = Object.keys(data).sort(function(a, b) { return data[b] - data[a]; }).slice(0, 10);
    if (users.length === 0) {
        ctx.fillStyle = '#8e8e93';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('暂无数据', canvas.width / 2, canvas.height / 2);
        return;
    }

    var values = users.map(function(u) { return data[u]; });
    var maxVal = Math.max.apply(null, values);
    var padding = { top: 20, right: 20, bottom: 20, left: 120 };
    var chartW = canvas.width - padding.left - padding.right;
    var chartH = canvas.height - padding.top - padding.bottom;
    var barH = Math.min(20, chartH / users.length - 8);

    var logs = UserLogger.getLogs();
    users.forEach(function(uid, idx) {
        var y = padding.top + (chartH / users.length) * idx + (chartH / users.length - barH) / 2;
        var w = maxVal > 0 ? (values[idx] / maxVal) * chartW : 0;

        var gradient = ctx.createLinearGradient(padding.left, y, padding.left + w, y);
        gradient.addColorStop(0, '#4A6CF7');
        gradient.addColorStop(1, '#7B61FF');
        ctx.fillStyle = gradient;
        ctx.fillRect(padding.left, y, w, barH);

        var userLogs = logs.filter(function(l) { return l.userId === uid; });
        var name = userLogs.length > 0 ? userLogs[0].userName : uid;
        ctx.fillStyle = '#3a3a3c';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(name, padding.left - 8, y + barH / 2 + 4);

        ctx.fillStyle = '#8e8e93';
        ctx.textAlign = 'left';
        ctx.fillText(values[idx], padding.left + w + 8, y + barH / 2 + 4);
    });
}
