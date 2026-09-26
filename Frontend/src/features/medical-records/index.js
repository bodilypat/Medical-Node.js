/* ******************************************** */
/* File: #src/features/medical-records/index.js */ 
/* ******************************************** */

export {
  default as MedicalRecords,
} from "./pages/MedicalRecords";

export {
  default as MedicalRecordDetails,
} from "./pages/MedicalRecordDetails";

export {
  default as CreateMedicalRecord,
} from "./pages/CreateMedicalRecord";

export {
  default as MedicalRecordTable,
} from "./components/MedicalRecordTable";

export {
  default as MedicalRecordCard,
} from "./components/MedicalRecordCard";

export {
  default as MedicalRecordForm,
} from "./components/MedicalRecordForm";

export {
  default as MedicalRecordDetailsView,
} from "./components/MedicalRecordDetails";

export {
  default as MedicalRecordFilters,
} from "./components/MedicalRecordFilters";

export {
  default as DiagnosisForm,
} from "./components/DiagnosisForm";

export {
  default as ClinicalNotes,
} from "./components/ClinicalNotes";

export {
  default as TreatmentPlan,
} from "./components/TreatmentPlan";

export {
  default as RecordTimeline,
} from "./components/RecordTimeline";

export {
  default as useMedicalRecords,
} from "./hooks/useMedicalRecords";

export {
  default as useMedicalRecord,
} from "./hooks/useMedicalRecord";

export {
  default as useCreateMedicalRecord,
} from "./hooks/useCreateMedicalRecord";

export {
  default as useMedicalRecordActions,
} from "./hooks/useMedicalRecordActions";

export {
  default as medicalRecordService,
} from "./services/medicalRecordService";

export {
  default as medicalRecordSchema,
  diagnosisSchema,
} from "./schemas/medicalRecordSchema";

export * from "./constants/medicalRecordConstants";
