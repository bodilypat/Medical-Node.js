/* *********************************************************************** */
/* File: #src/features/medical-records/constants/medicalRecordConstants.js */ 
/* *********************************************************************** */

export const MEDICAL_RECORD_STATUS = {
  ACTIVE: "ACTIVE",
  ARCHIVED: "ARCHIVED",
  DRAFT: "DRAFT",
};

export const MEDICAL_RECORD_STATUS_OPTIONS = [
  {
    value: MEDICAL_RECORD_STATUS.ACTIVE,
    label: "Active",
  },
  {
    value: MEDICAL_RECORD_STATUS.ARCHIVED,
    label: "Archived",
  },
  {
    value: MEDICAL_RECORD_STATUS.DRAFT,
    label: "Draft",
  },
];

export const RECORD_TYPES = {
  CONSULTATION: "CONSULTATION",
  FOLLOW_UP: "FOLLOW_UP",
  EMERGENCY: "EMERGENCY",
  DIAGNOSTIC: "DIAGNOSTIC",
  SURGERY: "SURGERY",
  HOSPITALIZATION: "HOSPITALIZATION",
};

export const RECORD_TYPE_OPTIONS = [
  {
    value: RECORD_TYPES.CONSULTATION,
    label: "Consultation",
  },
  {
    value: RECORD_TYPES.FOLLOW_UP,
    label: "Follow Up",
  },
  {
    value: RECORD_TYPES.EMERGENCY,
    label: "Emergency",
  },
  {
    value: RECORD_TYPES.DIAGNOSTIC,
    label: "Diagnostic",
  },
  {
    value: RECORD_TYPES.SURGERY,
    label: "Surgery",
  },
  {
    value: RECORD_TYPES.HOSPITALIZATION,
    label: "Hospitalization",
  },
];

export const DIAGNOSIS_TYPES = {
  PRIMARY: "PRIMARY",
  SECONDARY: "SECONDARY",
};

export const DIAGNOSIS_TYPE_OPTIONS = [
  {
    value: DIAGNOSIS_TYPES.PRIMARY,
    label: "Primary",
  },
  {
    value: DIAGNOSIS_TYPES.SECONDARY,
    label: "Secondary",
  },
];

export const MEDICAL_RECORD_PAGE_SIZE = 10;

export const DEFAULT_MEDICAL_RECORD_FILTERS = {
  search: "",
  patientId: "",
  doctorId: "",
  type: "",
  status: "",
  dateFrom: "",
  dateTo: "",
};
