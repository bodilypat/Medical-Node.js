//models/LabTest.js 

const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    result_details: String,
    result_date: Date
}, { _id: false });

const labTestSchema = new mongoose.Schema({
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
    test_name: String,
    test_date: Date,
    results: [resultSchema],
}, { timestamps: true });

labTestSchema.index({ patient_id: 1 });
labTestSchema.index({ test_name: 1 });

module.exports = mongoose.model('LabTest', labTestSchema);
