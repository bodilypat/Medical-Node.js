/* ********************************************************* */
/* File: #src/features/laboratory/schemas/labResultSchema.js */
/* ********************************************************* */

import * as yup from 'yup';

const optionalText = (max, label) =>
	yup.string().trim().max(max, `${label} must be ${max} characters or fewer`).nullable();

const labResultSchema = yup.object({
	patientId: yup.string().trim().required('Patient is required'),
	testId: yup.string().trim().required('Laboratory test is required'),
	testName: yup.string().trim().required('Test name is required'),
	result: yup
		.mixed()
		.required('Result is required')
		.test('valid-result', 'Enter a valid result', (value) =>
			typeof value === 'number'
				? Number.isFinite(value)
				: typeof value === 'string' && value.trim().length > 0,
		),
	unit: optionalText(40, 'Unit'),
	referenceRange: optionalText(100, 'Reference range'),
	status: yup
		.string()
		.oneOf(['pending', 'completed', 'verified', 'cancelled'], 'Invalid result status')
		.default('pending'),
	notes: optionalText(1000, 'Notes'),
	performedAt: yup
		.date()
		.typeError('Enter a valid performed date')
		.nullable()
		.max(new Date(), 'Performed date cannot be in the future'),
	verifiedBy: yup.string().trim().nullable(),
});

export { labResultSchema };
export default labResultSchema;
