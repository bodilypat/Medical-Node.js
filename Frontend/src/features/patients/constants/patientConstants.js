/* ********************************************************** */
/* File: #src/features/patients/constants/patientConstants.js */ 
/* ********************************************************** */

export const PATIENT_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
};

export const GENDER = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
};

export const BLOOD_GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

export const PATIENT_STATUS_OPTIONS = [
  {
    value: PATIENT_STATUS.ACTIVE,
    label: "Active",
  },
  {
    value: PATIENT_STATUS.INACTIVE,
    label: "Inactive",
  },
];

export const GENDER_OPTIONS = [
  {
    value: GENDER.MALE,
    label: "Male",
  },
  {
    value: GENDER.FEMALE,
    label: "Female",
  },
  {
    value: GENDER.OTHER,
    label: "Other",
  },
];

export const BLOOD_GROUP_OPTIONS = BLOOD_GROUPS.map((group) => ({
  value: group,
  label: group,
}));
