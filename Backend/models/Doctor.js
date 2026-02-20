//models/Doctor.js 

const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        default: 'Other'
    },
    specialty: {
        type: String,
        required: true
    },
    contact_number: String,
    email: {
        type: String,
        unique: true,
        spare: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip_code: String
    },
}, { timestamps: true });

DoctorSchema.index({ specialty: 'text' });

module.exports = mongoose.model('Doctor', DoctorSchema);


