//routes/appointmentRoutes.js 

const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');
const controller = require('../controllers/appointmentController');

router.post('/', protect, authorize('admin', 'doctor', 'patient'), controller.createAppointment);
router.get('/', protect, authorize('admin', 'doctor', 'patient'), controller.getAppointments);
router.get('/:id', protect, authorize('admin', 'doctor', 'patient'), controller.getAppointmentById);
router.put('/:id', protect, authorize('admin', 'doctor'), controller.updateAppointment);
router.delete('/:id', protect, authorize('admin'), controller.deleteAppointment);

module.exports = router;

