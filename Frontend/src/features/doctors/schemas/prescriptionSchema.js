/* ********************************************************* */
/* File: #src/features/doctors/schemas/prescriptionSchema.js */ 
/* ********************************************************* */

import { z } from "zod";

const medicineSchema = z.object({
  medicineId: z
    .string()
    .min(1, "Medicine is required"),

  dosage: z
    .string()
    .min(1, "Dosage is required"),

  frequency: z
    .string()
    .min(1, "Frequency is required"),

  duration: z
    .string()
    .min(1, "Duration is required"),

  instructions: z
    .string()
    .max(1000, "Instructions are too long")
    .optional()
    .or(z.literal("")),
});

export const prescriptionSchema = z.object({
  patientId: z
    .string()
    .min(1, "Patient is required"),

  medicalRecordId: z
    .string()
    .optional()
    .or(z.literal("")),

  diagnosis: z
    .string()
    .max(2000, "Diagnosis is too long")
    .optional()
    .or(z.literal("")),

  notes: z
    .string()
    .max(5000, "Notes are too long")
    .optional()
    .or(z.literal("")),

  medicines: z
    .array(medicineSchema)
    .min(1, "At least one medicine is required"),
});

export default prescriptionSchema;
