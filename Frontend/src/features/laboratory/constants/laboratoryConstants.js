/* *************************************************************** */
/* File: #src/features/laboratory/constants/laboratoryConstants.js */
/* *************************************************************** */

export const LABORATORY_MODULES = Object.freeze({
	DASHBOARD: 'dashboard',
	TEST_CATALOG: 'test-catalog',
	TEST_ORDERS: 'test-orders',
	SPECIMENS: 'specimens',
	RESULTS: 'results',
	QUALITY_CONTROL: 'quality-control',
	EQUIPMENT: 'equipment',
	INVENTORY: 'inventory',
	REPORTS: 'reports',
	SETTINGS: 'settings',
});

export const LABORATORY_ORDER_STATUSES = Object.freeze({
	PENDING: 'pending',
	COLLECTED: 'collected',
	IN_PROGRESS: 'in-progress',
	COMPLETED: 'completed',
	CANCELLED: 'cancelled',
});

export const LABORATORY_SPECIMEN_STATUSES = Object.freeze({
	NOT_COLLECTED: 'not-collected',
	COLLECTED: 'collected',
	RECEIVED: 'received',
	REJECTED: 'rejected',
	PROCESSED: 'processed',
});

export const LABORATORY_RESULT_STATUSES = Object.freeze({
	PENDING: 'pending',
	PRELIMINARY: 'preliminary',
	FINAL: 'final',
	AMENDED: 'amended',
});

export const LABORATORY_PRIORITY_LEVELS = Object.freeze({
	ROUTINE: 'routine',
	URGENT: 'urgent',
	STAT: 'stat',
});
