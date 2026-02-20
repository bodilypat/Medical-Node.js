//routes/billingRoutes.js 

const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');
const billingController = require('../controllers/billingController');

router.post('/', protect, authorize('admin', 'user'), billingController.createBilling);
router.get('/', protect, authorize('admin'), billingController.getAllBillings);
router.get('/revenue/summary', protect, authorize('admin'), billingController.getRevenueSummary);
router.get('/:id', protect, authorize('admin', 'user'), billingController.getBillingById);
router.put('/:id', protect, authorize('admin'), billingController.updateBilling);
router.delete('/:id', protect, authorize('admin'), billingController.deleteBilling);

module.exports = router;


