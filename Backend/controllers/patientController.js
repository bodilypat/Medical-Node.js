//controllers/patientController.js 

const Patient = require('../models/Patient');

exports.createPatient = async (req, res) => {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
};

exports.getPatients = async (req, res) => {
    const patients = await Patient.find();
    res.status(200).json(patients);
};

exports.getPatientById = async (req, res) => {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
};

exports.updatePatient = async (req, res) => {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
};

exports.deletePatient = async (req, res) => {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
};

