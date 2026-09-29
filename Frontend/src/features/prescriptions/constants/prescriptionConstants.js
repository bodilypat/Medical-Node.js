/* ******************************************************************** */
/* File: #src/features/prescriptions/constants/prescriptionConstants.js */
/* ******************************************************************** */

/** Supported prescription lifecycle states. */
export const PRESCRIPTION_STATUS = Object.freeze({
	DRAFT: 'draft',
	ACTIVE: 'active',
	COMPLETED: 'completed',
	CANCELLED: 'cancelled',
});

/** Defaults used when creating a prescription. */
export const PRESCRIPTION_DEFAULTS = Object.freeze({
	status: PRESCRIPTION_STATUS.DRAFT,
	quantity: 1,
	refills: 0,
});

/** Validation limits for prescription form fields. */
export const PRESCRIPTION_FIELD_LIMITS = Object.freeze({
	medicationName: 200,
	dosage: 100,
	instructions: 1000,
});

/** Frontend paths for prescription management. */
export const PRESCRIPTION_PATHS = Object.freeze({
	list: '/prescriptions',
	create: '/prescriptions/new',
	details: (id) => `/prescriptions/${encodeURIComponent(id)}`,
	edit: (id) => `/prescriptions/${encodeURIComponent(id)}/edit`,
});
