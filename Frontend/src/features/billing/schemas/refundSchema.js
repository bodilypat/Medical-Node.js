/* *************************************************** */
/* File: #src/features/billing/schemas/refundSchema.js */
/* *************************************************** */

import * as Yup from 'yup';

const refundSchema = Yup.object({
	invoiceId: Yup.string().trim().required('Invoice is required'),
	paymentId: Yup.string().trim().required('Payment is required'),
	refundAmount: Yup.number()
		.typeError('Refund amount must be a number')
		.positive('Refund amount must be greater than zero')
		.test(
			'decimal-places',
			'Refund amount can have up to two decimal places',
			(value) => value == null || Number.isInteger(value * 100),
		)
		.required('Refund amount is required'),
	reason: Yup.string()
		.trim()
		.min(3, 'Reason must be at least 3 characters')
		.max(500, 'Reason must not exceed 500 characters')
		.required('Refund reason is required'),
	notes: Yup.string()
		.trim()
		.max(1000, 'Notes must not exceed 1000 characters')
		.nullable(),
});

export default refundSchema;
export { refundSchema };
