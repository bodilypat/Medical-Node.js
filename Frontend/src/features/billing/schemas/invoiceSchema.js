/* **************************************************** */
/* File: #src/features/billing/schemas/invoiceSchema.js */
/* **************************************************** */

import * as yup from 'yup';

const positiveAmount = yup
	.number()
	.typeError('Amount must be a number')
	.min(0, 'Amount cannot be negative')
	.required('Amount is required');

const invoiceItemSchema = yup.object({
	serviceId: yup.string().trim().required('Service is required'),
	description: yup.string().trim().required('Description is required'),
	quantity: yup
		.number()
		.typeError('Quantity must be a number')
		.integer('Quantity must be a whole number')
		.min(1, 'Quantity must be at least 1')
		.required('Quantity is required'),
	unitPrice: positiveAmount,
	discount: yup
		.number()
		.typeError('Discount must be a number')
		.min(0, 'Discount cannot be negative')
		.default(0),
	tax: yup
		.number()
		.typeError('Tax must be a number')
		.min(0, 'Tax cannot be negative')
		.default(0),
});

const invoiceSchema = yup.object({
	invoiceNumber: yup.string().trim().required('Invoice number is required'),
	patientId: yup.string().trim().required('Patient is required'),
	patientName: yup.string().trim().required('Patient name is required'),
	providerId: yup.string().trim().required('Provider is required'),
	issueDate: yup.date().typeError('Issue date is invalid').required('Issue date is required'),
	dueDate: yup
		.date()
		.typeError('Due date is invalid')
		.min(yup.ref('issueDate'), 'Due date cannot be before issue date')
		.required('Due date is required'),
	status: yup
		.mixed()
		.oneOf(['draft', 'issued', 'partially_paid', 'paid', 'overdue', 'cancelled'])
		.default('draft'),
	currency: yup.string().trim().length(3).uppercase().default('USD'),
	items: yup
		.array()
		.of(invoiceItemSchema)
		.min(1, 'At least one service is required')
		.required('Invoice items are required'),
	subtotal: positiveAmount,
	taxAmount: positiveAmount,
	discountAmount: positiveAmount,
	totalAmount: positiveAmount,
	amountPaid: positiveAmount,
	paymentMethod: yup
		.mixed()
		.oneOf(['cash', 'card', 'bank_transfer', 'insurance', 'other'])
		.nullable(),
	notes: yup.string().trim().max(1000, 'Notes cannot exceed 1000 characters').nullable(),
});

export { invoiceItemSchema };
export default invoiceSchema;
