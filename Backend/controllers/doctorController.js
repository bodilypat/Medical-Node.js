//controllers/doctorController.js 

const Doctor = require('../models/Doctor');

exports.createDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.create(req.body);
        res.status(201).json(doctor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getDoctors = async (req, res) => {
    try {
        const { page = 1, plimit = 10, specialty, search } = req.query;

        const query = {};

        if (specialty) {
            query.specialty = specialty;
        }
    
        if (search) {
            query.$or = [
                { first_name: { $regex: search, $options: 'i' } },
                { last_name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }
    
        const doctors = await Doctor.find(query)
            .skip((page - 1) * plimit)
            .limit(parseInt(plimit));
        
            const total = await Doctor.countDocuments(query);

            res.json({
                doctors,
                total,
                page: parseInt(page),
                plimit: parseInt(plimit)
            });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        // soft delete(recommend)
        doctor.is_deleted = true;
        await doctor.save();

        res.json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

