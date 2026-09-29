/* ******************************************************** */
/* File: #src/features/laboratory/schemas/labOrderSchema.js */
/* ******************************************************** */

import * as Yup from 'yup';

const requiredString = (label) =>
	Yup.string().trim().required(`${label} is required`);

export const labOrderSchema = Yup.object({
	patientId: requiredString('Patient'),
	orderingProviderId: requiredString('Ordering provider'),
	orderDate: Yup.date()
		.typeError('Order date must be a valid date')
		.required('Order date is required'),
	priority: Yup.string()
		.oneOf(['routine', 'urgent', 'stat'], 'Select a valid priority')
		.required('Priority is required'),
	specimenType: requiredString('Specimen type'),
	tests: Yup.array()
		.of(
			Yup.object({
				testId: requiredString('Laboratory test'),
				testName: Yup.string().trim().nullable(),
				specimenType: Yup.string().trim().nullable(),
				notes: Yup.string().trim().max(500, 'Notes cannot exceed 500 characters'),
			}),
		)
		.min(1, 'Select at least one laboratory test')
		.required('At least one laboratory test is required'),
	clinicalNotes: Yup.string()
		.trim()
		.max(1000, 'Clinical notes cannot exceed 1000 characters')
		.nullable(),
	diagnosis: Yup.string()
		.trim()
		.max(500, 'Diagnosis cannot exceed 500 characters')
		.nullable(),
	fastingRequired: Yup.boolean().default(false),
	collectionDate: Yup.date()
		.typeError('Collection date must be a valid date')
		.nullable()
		.when('status', {
			is: 'collected',
			then: (schema) => schema.required('Collection date is required'),
		}),
	status: Yup.string()
		.oneOf(
			['draft', 'ordered', 'collected', 'processing', 'completed', 'cancelled'],
			'Select a valid order status',
		)
		.default('draft')
		.required('Status is required'),
	notes: Yup.string()
		.trim()
		.max(1000, 'Notes cannot exceed 1000 characters')
		.nullable(),
});

export default labOrderSchema;
