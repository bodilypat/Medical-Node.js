/* ****************************************************************** */
/* File: #src/features/medical-records/schemas/medicalRecordSchema.js */ 
/* ****************************************************************** */

import { z } from "zod";

const dateSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date")
  .refine((value) => {
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return (
      date.getUTCFullYear() === year &&
      date.getUTCMonth() === month - 1 &&
      date.getUTCDate() === day
    );
  }, "Enter a valid date");

export const medicalRecordSchema = z.object({
  patientId: z
    .string()
    .trim()
    .min(1, "Patient is required"),

  doctorId: z
    .string()
    .trim()
    .min(1, "Doctor is required"),

  recordDate: dateSchema,

  type: z
    .string()
    .trim()
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

  followUpDate: dateSchema.optional().or(z.literal("")),
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
    .trim()
    .min(1, "Diagnosis type is required"),

  notes: z
    .string()
    .trim()
    .max(2000, "Diagnosis notes are too long")
    .optional()
    .or(z.literal("")),
});

export default medicalRecordSchema;
