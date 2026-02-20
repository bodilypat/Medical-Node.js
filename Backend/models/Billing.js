//models/Billing.js 

const mongoose = require('mongoose');

const billingItemSchema = new mongoose.Schema({
    description: String,
    cost: Number,
}, { _id: false });

const billingSchema = new mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    billing_date: {
        type: Date,
        default: Date.now
    },
    payment_status: {
        type: String,
        enum: ['Pending', 'Paid', 'Overdue'],
        default: 'Pending'
    },
    items: [billingItemSchema],
}, { timestamps: true });

billingSchema.index({ patient_id: 1 });
billingSchema.index({ billing_date: 1 });

module.exports = mongoose.model('Billing', billingSchema);
