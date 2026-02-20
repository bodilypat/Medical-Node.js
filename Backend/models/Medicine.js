//models/Medicine.js 

const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    medicine_name: {
        type: String,
        required: true,
    },
    manufacturer: String,
    batch_number: String,
    expiry_date: Date,
    stock_quantity: {
        type: Number,
        default: 0,
    }, 
}, { timestamps: true });

medicineSchema.index({ medicine_name: 1 });
medicineSchema.index({ expiry_date: 1 });

module.exports = mongoose.model('Medicine', medicineSchema);
