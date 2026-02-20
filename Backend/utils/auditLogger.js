//utils/auditLogger.js 

const AuditLog = require('../models/AuditLog');

const auditLogger = async ({ userId, action, tablename, record_id = null, details = null }) => {
    try {
        const auditLog = new AuditLog({
            user_id: userId,
            action,
            table_name: tablename,
            record_id,
            details
        });
        await auditLog.save();
    } catch (error) {
        console.error('Error logging audit:', error);
    }
};

module.exports = auditLogger;

