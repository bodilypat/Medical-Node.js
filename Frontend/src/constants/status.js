/* ****************************** */
/* File: #src/constants/status.js */
/* ****************************** */

export const APPOINTMENT_STATUS = Object.freeze({
	SCHEDULED: 'scheduled',
	CONFIRMED: 'confirmed',
	COMPLETED: 'completed',
	CANCELLED: 'cancelled',
	NO_SHOW: 'no_show',
});

export const PATIENT_STATUS = Object.freeze({
	ACTIVE: 'active',
	INACTIVE: 'inactive',
});

export const BILLING_STATUS = Object.freeze({
	PENDING: 'pending',
	PAID: 'paid',
	OVERDUE: 'overdue',
	CANCELLED: 'cancelled',
});
