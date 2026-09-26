/* ******************************************************** */
/* File: #src/features/doctors/constants/doctorConstants.js */ 
/* ******************************************************** */

export const APPOINTMENT_STATUS = Object.freeze({
  SCHEDULED: "SCHEDULED",
  CONFIRMED: "CONFIRMED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  NO_SHOW: "NO_SHOW",
});

export const MEDICAL_RECORD_STATUS = Object.freeze({
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
});

export const PRESCRIPTION_STATUS = Object.freeze({
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
});

export const APPOINTMENT_STATUS_OPTIONS = Object.freeze([
  {
    value: APPOINTMENT_STATUS.SCHEDULED,
    label: "Scheduled",
  },
  {
    value: APPOINTMENT_STATUS.CONFIRMED,
    label: "Confirmed",
  },
  {
    value: APPOINTMENT_STATUS.COMPLETED,
    label: "Completed",
  },
  {
    value: APPOINTMENT_STATUS.CANCELLED,
    label: "Cancelled",
  },
  {
    value: APPOINTMENT_STATUS.NO_SHOW,
    label: "No Show",
  },
]);

export const MEDICAL_RECORD_STATUS_OPTIONS = Object.freeze([
  {
    value: MEDICAL_RECORD_STATUS.ACTIVE,
    label: "Active",
  },
  {
    value: MEDICAL_RECORD_STATUS.COMPLETED,
    label: "Completed",
  },
]);

export const PRESCRIPTION_STATUS_OPTIONS = Object.freeze([
  {
    value: PRESCRIPTION_STATUS.ACTIVE,
    label: "Active",
  },
  {
    value: PRESCRIPTION_STATUS.COMPLETED,
    label: "Completed",
  },
  {
    value: PRESCRIPTION_STATUS.CANCELLED,
    label: "Cancelled",
  },
]);

export const DOCTOR_PAGE_SIZE = 10;
