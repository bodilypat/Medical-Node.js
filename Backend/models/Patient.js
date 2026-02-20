//models/Patient.js 

const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
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
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    contact_number: String,
    email: {
        type: String,
        unique: true,
        sparse: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip_code: String,
        country: String
    },
    blood_group: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    allergies: [String],
    medical_history: [String],
    emergency_contact: {
        name: String,
        relationship: String,
        contact_number: String
    }, 
    notes: String,
    is_active: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

patientSchema.index({ last_name: 1, first_name: 1 });
patientSchema.index({ date_of_birth: 1 });
patientSchema.index({ email: 1 });
patientSchema.index({ contact_number: 1 });
patientSchema.index({ 'address.city': 1 });

module.exports = mongoose.model('Patient', patientSchema);

