/* ********************************************************** */
/* File: #src/features/doctors/schemas/medicalRecordSchema.js */ 
/* ********************************************************** */

import { z } from "zod";

export const medicalRecordSchema = z.object({
  patientId: z
    .string()
    .min(1, "Patient is required"),

  appointmentId: z
    .string()
    .optional()
    .or(z.literal("")),

  symptoms: z
    .string()
    .trim()
    .max(5000, "Symptoms are too long")
    .optional()
    .or(z.literal("")),

  diagnosis: z
    .string()
    .trim()
    .min(1, "Diagnosis is required")
    .max(5000, "Diagnosis is too long"),

  treatment: z
    .string()
    .trim()
    .max(5000, "Treatment is too long")
    .optional()
    .or(z.literal("")),

  clinicalNotes: z
    .string()
    .trim()
    .max(10000, "Clinical notes are too long")
    .optional()
    .or(z.literal("")),

  followUpDate: z
    .string()
    .optional()
    .or(z.literal("")),
});

export default medicalRecordSchema;
