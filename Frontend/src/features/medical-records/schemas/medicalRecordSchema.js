/* ****************************************************************** */
/* File: #src/features/medical-records/schemas/medicalRecordSchema.js */ 
/* ****************************************************************** */

import { z } from "zod";

export const medicalRecordSchema = z.object({
  patientId: z
    .string()
    .min(1, "Patient is required"),

  doctorId: z
    .string()
    .min(1, "Doctor is required"),

  recordDate: z
    .string()
    .min(1, "Record date is required"),

  type: z
    .string()
    .min(1, "Record type is required"),

  chiefComplaint: z
    .string()
    .trim()
    .max(2000, "Chief complaint is too long")
    .optional()
    .or(z.literal("")),

  symptoms: z
    .string()
    .trim()
    .max(5000, "Symptoms are too long")
    .optional()
    .or(z.literal("")),

  clinicalNotes: z
    .string()
    .trim()
    .max(10000, "Clinical notes are too long")
    .optional()
    .or(z.literal("")),

  treatmentPlan: z
    .string()
    .trim()
    .max(10000, "Treatment plan is too long")
    .optional()
    .or(z.literal("")),

  followUpDate: z
    .string()
    .optional()
    .or(z.literal("")),
});

export const diagnosisSchema = z.object({
  diagnosis: z
    .string()
    .trim()
    .min(1, "Diagnosis is required")
    .max(500, "Diagnosis is too long"),

  code: z
    .string()
    .trim()
    .max(50, "Diagnosis code is too long")
    .optional()
    .or(z.literal("")),

  type: z
    .string()
    .min(1, "Diagnosis type is required"),

  notes: z
    .string()
    .trim()
    .max(2000, "Diagnosis notes are too long")
    .optional()
    .or(z.literal("")),
});

export default medicalRecordSchema;
