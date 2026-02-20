//controllers/billingController.js 

const Billing = require('../models/Billing');
const Patient = require('../models/Patient');
const mongoose = require('mongoose');

// Helper: Calculate total amount from billing items
const calculateTotal = (items) => {
    if (!items || !Array.isArray(items)) return 0;
    return items.reduce((total, item) => {
        const itemTotal = (item.quantity || 0) * (item.price || 0);
        return total + itemTotal;
    }, 0);
};

// Create a new billing record
exports.createBilling = async (req, res, next) => {
    try {
        const { patient_id, billing_date, items, status } = req.body;

        const patient = await Patient.findById(patient_id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        const total_amount = calculateTotal(items);

        const bill = new Billing.create({
            patient_id,
            billing_date,
            items,
            total_amount,
            status
        });

        res.status(201).json(bill);
    } catch (error) {
        next(error);
    }
};

// Get billing records with pagination and filtering
exports.getBillings = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 10,
            patient_id,
            status,
            start_date,
            end_date,
        } = req.query;

        const query = {};
        if (patient_id) {
            query.patient_id = patient_id;
        }   
        if (status) {
            query.status = status;
        }

        if (start_date && end_date) {
            query.billing_date = {
                $gte: new Date(start_date),
                $lte: new Date(end_date)
            };
        }

        const billings = await Billing.find(query)
            .populate('patient_id', 'name')
            .sort({ billing_date: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Billing.countDocuments(query);

        res.json({
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            billings
        });
    } catch (error) {
        next(error);
    }
};

// Get a single billing record by ID
exports.getBillingById = async (req, res, next) => {
    try {
        const bill = await Billing.findById(req.params.id).populate('patient_id', 'first_name last_name contact_number email');

        if (!bill) {
            return res.status(404).json({ error: 'Billing record not found' });
        }

        res.json(bill);
    } catch (error) {
        next(error);
    }
};

// Update a billing record
exports.updateBilling = async (req, res, next) => {
    try {
        const bill = await Billing.findById(req.params.id);

        if (!bill) {
            return res.status(404).json({ error: 'Billing record not found' });
        }

        // if items updated -> recalc amount 
        if (req.body.items) {
            req.body.total_amount = calculateTotal(req.body.items);
        }

        Object.assign(bill, req.body);
        await bill.save();

        res.json(bill);
    } catch (error) {
        next(error);
    }
};

// Delete a billing record
exports.deleteBilling = async (req, res, next) => {
    try {
        const bill = await Billing.findByIdAndDelete(req.params.id);

        if (!bill) {
            return res.status(404).json({ error: 'Billing record not found' });
        }

        // soft delete: (if you add is_deleted field in model)
        bill.is_deleted = true;
        await bill.save();

        res.json({ message: 'Billing record deleted successfully' });
    } catch (error) {
        next(error);
    }
};

