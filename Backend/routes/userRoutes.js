//routes/userRoutes.js 

const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');
const userController = require('../controllers/userController');

// Auth routes 
router.post('/login', userController.login);

// User management routes (admin only)
router.post('/', protect, authorize('admin'), userController.createUser);
router.get('/', protect, authorize('admin'), userController.getUsers);
router.get('/:id', protect, authorize('admin'), userController.getUserById);
router.put('/:id', protect, authorize('admin'), userController.updateUser);
router.delete('/:id', protect, authorize('admin'), userController.deleteUser);

module.exports = router;

