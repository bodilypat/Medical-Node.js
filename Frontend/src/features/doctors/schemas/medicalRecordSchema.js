/* ********************************************************** */
/* File: #src/features/doctors/schemas/medicalRecordSchema.js */ 
/* ********************************************************** */

import { z } from "zod";

const optionalText = (maxLength, message) =>
  z
    .string()
    .trim()
    .max(maxLength, message)
    .optional()
    .or(z.literal(""));

const followUpDateSchema = z
  .string()
  .trim()
  .refine((value) => {
    if (value === "") return true;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

    const date = new Date(`${value}T00:00:00.000Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }, "Follow-up date must be a valid date in YYYY-MM-DD format")
  .optional()
  .or(z.literal(""));

export const medicalRecordSchema = z.object({
  patientId: z
    .string()
    .trim()
    .min(1, "Patient is required"),

  appointmentId: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),

  symptoms: optionalText(5000, "Symptoms are too long"),

  diagnosis: z
    .string()
    .trim()
    .min(1, "Diagnosis is required")
    .max(5000, "Diagnosis is too long"),

  treatment: optionalText(5000, "Treatment is too long"),

  clinicalNotes: optionalText(10000, "Clinical notes are too long"),

  followUpDate: followUpDateSchema,
});

export default medicalRecordSchema;
