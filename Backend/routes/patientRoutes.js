//routes/patientRoutes.js 

const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');
const patientController = require('../controllers/patientController');

router.route('/')
    .post(protect, authorize('admin', 'doctor', 'nurse'), patientController.createPatient)
    .get(protect, authorize('admin', 'doctor', 'nurse'), patientController.getPatients);
router.route('/:id')
    .get(protect, authorize('admin', 'doctor', 'nurse'), patientController.getPatientById)
    .put(protect, authorize('admin', 'doctor', 'nurse'), patientController.updatePatient)
    .delete(protect, authorize('admin'), patientController.deletePatient);

module.exports = router;
