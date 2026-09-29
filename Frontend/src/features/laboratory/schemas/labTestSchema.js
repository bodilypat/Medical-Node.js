/* ******************************************************* */
/* File: #src/features/laboratory/schemas/labTestSchema.js */
/* ******************************************************* */

/** Fields and validation rules for laboratory test management. */
export const LAB_TEST_CATEGORIES = Object.freeze([
	'hematology',
	'clinical-chemistry',
	'microbiology',
	'immunology',
	'pathology',
	'urinalysis',
	'other',
]);

export const LAB_TEST_STATUSES = Object.freeze(['active', 'inactive']);

export const labTestSchema = Object.freeze({
	name: { type: 'string', required: true, minLength: 2, maxLength: 120 },
	code: { type: 'string', required: true, minLength: 2, maxLength: 32 },
	category: { type: 'string', required: true, enum: LAB_TEST_CATEGORIES },
	specimen: { type: 'string', required: true, maxLength: 100 },
	description: { type: 'string', required: false, maxLength: 1000 },
	price: { type: 'number', required: true, min: 0 },
	turnaroundTimeHours: { type: 'number', required: true, min: 0 },
	status: { type: 'string', required: true, enum: LAB_TEST_STATUSES },
});

/**
 * Validate a laboratory test object. Returns `{}` when valid, otherwise a
 * map of field names to validation messages.
 */
export function validateLabTest(input) {
	const errors = {};
	const test = input && typeof input === 'object' ? input : {};

	for (const [field, rules] of Object.entries(labTestSchema)) {
		const value = test[field];
		if (value === undefined || value === null || value === '') {
			if (rules.required) errors[field] = `${field} is required`;
			continue;
		}

		if (rules.type === 'string') {
			if (typeof value !== 'string') {
				errors[field] = `${field} must be a string`;
				continue;
			}
			const normalized = value.trim();
			if (normalized.length < (rules.minLength || 0)) {
				errors[field] = `${field} must be at least ${rules.minLength} characters`;
			} else if (normalized.length > rules.maxLength) {
				errors[field] = `${field} must be no more than ${rules.maxLength} characters`;
			} else if (rules.enum && !rules.enum.includes(normalized)) {
				errors[field] = `${field} must be one of: ${rules.enum.join(', ')}`;
			}
		} else if (rules.type === 'number') {
			if (typeof value !== 'number' || !Number.isFinite(value)) {
				errors[field] = `${field} must be a valid number`;
			} else if (value < rules.min) {
				errors[field] = `${field} must be at least ${rules.min}`;
			}
		}
	}

	return errors;
}

export default labTestSchema;
