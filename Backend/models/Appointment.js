//models/Apppointment.js 

const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    appointment_date : {
        type: Date,
        required: true
    },
    appointment_time : {
        type: String,
        required: true
    },
    appointment_type : {
        type: String,
        enum: ['Consultation', 'Follow-up', 'Emergency','Routine Checkup'],
        default: 'Consultation'
    },
    reason_for_visit : String,
    duration_minutes : {
        type: Number,
        default: 30
    },
    status : {
        type: String,
        enum: ['Scheduled', 'Completed', 'Cancelled', 'No-show'],
        default: 'Scheduled'
    },
    notes: String,
    is_deleted : {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

appointmentSchema.index({ doctor_id:1, appointment_date:1, appointment_time:1 });
appointmentSchema.index({ patient_id:1, appointment_date:1 });

module.exports = mongoose.model('Appointment', appointmentSchema);


