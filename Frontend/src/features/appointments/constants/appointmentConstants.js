/* ****************************************************************** */
/* File: #src/features/appointments/constants/appointmentConstants.js */ 
/* ****************************************************************** */

export const APPOINTMENT_STATUS = {
  SCHEDULED: "SCHEDULED",
  CONFIRMED: "CONFIRMED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  NO_SHOW: "NO_SHOW",
};

export const APPOINTMENT_STATUS_OPTIONS = [
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
];

export const APPOINTMENT_TYPES = {
  CONSULTATION: "CONSULTATION",
  FOLLOW_UP: "FOLLOW_UP",
  CHECKUP: "CHECKUP",
  EMERGENCY: "EMERGENCY",
};

export const APPOINTMENT_TYPE_OPTIONS = [
  {
    value: APPOINTMENT_TYPES.CONSULTATION,
    label: "Consultation",
  },
  {
    value: APPOINTMENT_TYPES.FOLLOW_UP,
    label: "Follow Up",
  },
  {
    value: APPOINTMENT_TYPES.CHECKUP,
    label: "Checkup",
  },
  {
    value: APPOINTMENT_TYPES.EMERGENCY,
    label: "Emergency",
  },
];

export const APPOINTMENT_PAGE_SIZE = 10;

export const DEFAULT_APPOINTMENT_FILTERS = {
  search: "",
  status: "",
  doctorId: "",
  patientId: "",
  dateFrom: "",
  dateTo: "",
};
