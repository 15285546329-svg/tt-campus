// ===== 用户行为日志系统 =====
const UserLogger = (function() {
    var STORAGE_KEY = 'tt_user_logs';
    var MAX_LOGS = 5000;

    function getUserId() {
        var sid = document.getElementById('student-id');
        return sid ? sid.value : 'anonymous';
    }

    function getUserName() {
        var nameEl = document.getElementById('user-name');
        return nameEl ? nameEl.textContent : '未知用户';
    }

    function getTimestamp() {
        var now = new Date();
        return now.getFullYear() + '-' +
            String(now.getMonth() + 1).padStart(2, '0') + '-' +
            String(now.getDate()).padStart(2, '0') + ' ' +
            String(now.getHours()).padStart(2, '0') + ':' +
            String(now.getMinutes()).padStart(2, '0') + ':' +
            String(now.getSeconds()).padStart(2, '0');
    }

    function getLogs() {
        try {
            var data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    }

    function saveLogs(logs) {
        if (logs.length > MAX_LOGS) {
            logs = logs.slice(logs.length - MAX_LOGS);
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    }

    function log(actionType, details, content) {
        var entry = {
            id: Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            userId: getUserId(),
            userName: getUserName(),
            actionType: actionType,
            details: details || '',
            content: content || '',
            timestamp: getTimestamp(),
            userAgent: navigator.userAgent.substring(0, 100),
            page: window.location.pathname
        };

        var logs = getLogs();
        logs.push(entry);
        saveLogs(logs);
        return entry;
    }

    function getStats() {
        var logs = getLogs();
        var stats = {
            totalActions: logs.length,
            actionsByType: {},
            activeUsers: {},
            actionsByDate: {},
            recentActions: logs.slice(-10).reverse()
        };

        logs.forEach(function(entry) {
            stats.actionsByType[entry.actionType] = (stats.actionsByType[entry.actionType] || 0) + 1;
            stats.activeUsers[entry.userId] = (stats.activeUsers[entry.userId] || 0) + 1;
            var date = entry.timestamp.split(' ')[0];
            stats.actionsByDate[date] = (stats.actionsByDate[date] || 0) + 1;
        });

        return stats;
    }

    function filterLogs(filters) {
        var logs = getLogs();
        if (filters.userId) {
            logs = logs.filter(function(l) { return l.userId === filters.userId; });
        }
        if (filters.actionType) {
            logs = logs.filter(function(l) { return l.actionType === filters.actionType; });
        }
        if (filters.startDate) {
            logs = logs.filter(function(l) { return l.timestamp >= filters.startDate; });
        }
        if (filters.endDate) {
            logs = logs.filter(function(l) { return l.timestamp <= filters.endDate + ' 23:59:59'; });
        }
        return logs.reverse();
    }

    function getUniqueUsers() {
        var logs = getLogs();
        var users = {};
        logs.forEach(function(l) {
            users[l.userId] = l.userName;
        });
        return users;
    }

    function clearLogs() {
        localStorage.removeItem(STORAGE_KEY);
    }

    return {
        log: log,
        getLogs: getLogs,
        getStats: getStats,
        filterLogs: filterLogs,
        getUniqueUsers: getUniqueUsers,
        clearLogs: clearLogs
    };
})();
