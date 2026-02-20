//routes/doctorRoutes.js

const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');
const doctorController = require('../controllers/doctorController');

router.post('/', protect, authorize('admin'), doctorController.createDoctor);
router.get('/', protect, doctorController.getDoctors);
router.get('/:id', protect, doctorController.getDoctorById);
router.put('/:id', protect, authorize('admin'), doctorController.updateDoctor);
router.delete('/:id', protect, authorize('admin'), doctorController.deleteDoctor);

module.exports = router;
