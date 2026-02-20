//models/MedicalRecord.js 

const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    medical_name: String,
    dosage: String,
    frequency: String,
    start_date: Date,
    end_date: Date,
    instructions: String
}, { _id : false });

const medicalRecordSchema = new mongoose.Schema({
    patient_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Patient', 
        required: true
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    visit_date: {
        type: Date,
        required: true
    },
    diagnosis: {type: String, required: true},
    treatment: String,
    notes: String,
    prescriptions: [prescriptionSchema],
    notes: String,
}, { timestamps: true });

medicalRecordSchema.index({ patient_id: 1});
medicalRecordSchema.index({ doctor_id: 1});
medicalRecordSchema.index({ visit_date: 1 });

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);

