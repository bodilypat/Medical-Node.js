/* ***************************************************** */
/* File: #src/features/admin/constants/adminConstants.js */
/* ***************************************************** */

export const ADMIN_ROUTES = {
	DASHBOARD: '/admin/dashboard',
	PATIENTS: '/admin/patients',
	DOCTORS: '/admin/doctors',
	APPOINTMENTS: '/admin/appointments',
	DEPARTMENTS: '/admin/departments',
	STAFF: '/admin/staff',
	MEDICAL_RECORDS: '/admin/medical-records',
	PRESCRIPTIONS: '/admin/prescriptions',
	BILLING: '/admin/billing',
	INVENTORY: '/admin/inventory',
	REPORTS: '/admin/reports',
	SETTINGS: '/admin/settings',
};

export const ADMIN_NAVIGATION = [
	{ label: 'Dashboard', path: ADMIN_ROUTES.DASHBOARD, icon: 'dashboard' },
	{ label: 'Patients', path: ADMIN_ROUTES.PATIENTS, icon: 'people' },
	{ label: 'Doctors', path: ADMIN_ROUTES.DOCTORS, icon: 'medical_services' },
	{ label: 'Appointments', path: ADMIN_ROUTES.APPOINTMENTS, icon: 'event' },
	{ label: 'Departments', path: ADMIN_ROUTES.DEPARTMENTS, icon: 'domain' },
	{ label: 'Staff', path: ADMIN_ROUTES.STAFF, icon: 'badge' },
	{ label: 'Medical records', path: ADMIN_ROUTES.MEDICAL_RECORDS, icon: 'folder_shared' },
	{ label: 'Prescriptions', path: ADMIN_ROUTES.PRESCRIPTIONS, icon: 'medication' },
	{ label: 'Billing', path: ADMIN_ROUTES.BILLING, icon: 'receipt_long' },
	{ label: 'Inventory', path: ADMIN_ROUTES.INVENTORY, icon: 'inventory_2' },
	{ label: 'Reports', path: ADMIN_ROUTES.REPORTS, icon: 'bar_chart' },
	{ label: 'Settings', path: ADMIN_ROUTES.SETTINGS, icon: 'settings' },
];

export const APPOINTMENT_STATUSES = {
	SCHEDULED: 'scheduled',
	CONFIRMED: 'confirmed',
	COMPLETED: 'completed',
	CANCELLED: 'cancelled',
	NO_SHOW: 'no_show',
};

export const PATIENT_STATUSES = {
	ACTIVE: 'active',
	INACTIVE: 'inactive',
};

export const STAFF_ROLES = {
	ADMIN: 'admin',
	DOCTOR: 'doctor',
	NURSE: 'nurse',
	RECEPTIONIST: 'receptionist',
	PHARMACIST: 'pharmacist',
};

export const PAGINATION = {
	DEFAULT_PAGE: 1,
	DEFAULT_PAGE_SIZE: 10,
	PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
};

export const DATE_FORMAT = 'YYYY-MM-DD';
