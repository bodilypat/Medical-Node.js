//controllers/appointmentController.js 

const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

exports.createAppointment = async (req, res, next) => {
    try{
        const {
            patient_id,
            doctor_id,
            appointment_datetime,
            appointment_type,
            reason_for_visit,
            duration_minutes
        } = req.body;

        // Check patient exists 
        const patient = await Patient.findById(patient_id);
        if(!patient){
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Check doctor exists
        const doctor = await Doctor.findById(doctor_id);
        if(!doctor){
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Prevent double booking
        const existingAppointment = await Appointment.findOne({
            doctor: doctor_id,
            appointment_datetime: new Date(appointment_datetime),
            appointment_status: { $in: ['Scheduled', 'In Progress'] },
            is_deleted: false
        });

        if(existingAppointment){
            return res.status(400).json({ message: 'Doctor is already booked for this time slot' });
        }

        const appointment = new Appointment({
            patient: patient_id,
            doctor: doctor_id,
            appointment_datetime: new Date(appointment_datetime),
            appointment_type,
            reason_for_visit,
            duration_minutes
        });

        await appointment.save();

        res.status(201).json({ message: 'Appointment created successfully', appointment });
    } catch (error) {
        next(error);
    }
};

exports.getAppointments = async (req, res, next) => {
    try {
        const { 
            page = 1,
            limit = 10,
            doctor_id,
            patient_id,
            appointment_status,
            start_date,
            end_date
        } = req.query;

        const query = { is_deleted: false };

        if(doctor_id){
            query.doctor = doctor_id;
        }
        if(patient_id){
            query.patient = patient_id;
        }
        if(appointment_status){
            query.appointment_status = appointment_status;
        }

        if(start_date && end_date){
            query.appointment_datetime = {
                $gte: new Date(start_date),
                $lte: new Date(end_date)
            };
        }

        const appointments = await Appointment.find(query)
            .populate('doctor', 'name specialty')
            .populate('patient', 'name date_of_birth')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const total = await Appointment.countDocuments(query);
        res.json({
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            appointments
        });
    } catch (error) {
        next(error);
    }
};

exports.getAppointmentById = async (req, res, next) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate('doctor', 'name specialty')
            .populate('patient', 'name date_of_birth');
        if(!appointment || appointment.is_deleted){
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json(appointment);
    } catch (error) {
        next(error);
    }
};

exports.updateAppointment = async (req, res, next) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if(!appointment || appointment.is_deleted){
            return res.status(404).json({ message: 'Appointment not found' });
        }
        Object.assign(appointment, req.body);
        await appointment.save();

        res.json({ message: 'Appointment updated successfully', appointment });
    } catch (error) {
        next(error);
    }
};

exports.updateAppointmentStatus = async (req, res, next) => {
    try {
        const { appointment_status } = req.body;

        const allowedStatuses = ['Scheduled', 'In Progress', 'Completed', 'Cancelled'];

        if(!allowedStatuses.includes(appointment_status)){
            return res.status(400).json({ message: 'Invalid appointment status' });
        }

        const appointment = await Appointment.findById(req.params.id);

        if(!appointment || appointment.is_deleted){
            return res.status(404).json({ message: 'Appointment not found' });
        }

        appointment.appointment_status = appointment_status;
        await appointment.save();

        res.json({ message: 'Appointment status updated successfully', appointment });
    } catch (error) {
        next(error);
    }
};

exports.deleteAppointment = async (req, res, next) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if(!appointment || appointment.is_deleted){
            return res.status(404).json({ message: 'Appointment not found' });
        }

        appointment.is_deleted = true;
        await appointment.save();

        res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        next(error);
    }
};

