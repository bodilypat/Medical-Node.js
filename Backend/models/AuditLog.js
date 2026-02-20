//models/AuditLog.js 

const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    action: {
        type: String,
        required: true
    },
    collection_name: String,
    record_id: mongoose.Schema.Types.ObjectId,
    details: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

auditLogSchema.index({ user_id:1 });
auditLogSchema.index({ timestamp: -1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);

