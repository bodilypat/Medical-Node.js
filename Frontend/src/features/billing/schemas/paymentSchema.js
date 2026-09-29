/* **************************************************** */
/* File: #src/features/billing/schemas/paymentSchema.js */
/* **************************************************** */

import * as Yup from 'yup';

/**
 * Validation schema for recording a patient payment.
 * Keep the schema independent of the payment provider so it can be reused by
 * the billing forms and API adapters.
 */
export const paymentSchema = Yup.object({
	patientId: Yup.string().trim().required('Patient is required'),
	invoiceId: Yup.string().trim().required('Invoice is required'),
	amount: Yup.number()
		.typeError('Amount must be a number')
		.positive('Amount must be greater than zero')
		.max(999999999, 'Amount is too large')
		.required('Amount is required'),
	currency: Yup.string()
		.trim()
		.uppercase()
		.length(3, 'Currency must be a 3-letter code')
		.required('Currency is required'),
	paymentMethod: Yup.string()
		.oneOf(['cash', 'card', 'bank_transfer', 'mobile_money', 'insurance', 'other'])
		.required('Payment method is required'),
	transactionId: Yup.string().trim().max(100, 'Transaction ID is too long'),
	paidAt: Yup.date()
		.typeError('Payment date must be valid')
		.max(new Date(), 'Payment date cannot be in the future')
		.required('Payment date is required'),
	notes: Yup.string().trim().max(500, 'Notes cannot exceed 500 characters'),
});

export default paymentSchema;
