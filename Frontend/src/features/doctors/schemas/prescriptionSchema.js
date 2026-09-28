/* ********************************************************* */
/* File: #src/features/doctors/schemas/prescriptionSchema.js */ 
/* ********************************************************* */

import { z } from "zod";

const requiredText = (message) => z
  .string()
  .trim()
  .min(1, message);

const optionalText = (maxLength, message) => z
  .string()
  .trim()
  .max(maxLength, message)
  .optional()
  .or(z.literal(""));

const medicineSchema = z.object({
  medicineId: requiredText("Medicine is required"),

  dosage: requiredText("Dosage is required"),

  frequency: requiredText("Frequency is required"),

  duration: requiredText("Duration is required"),

  instructions: optionalText(1000, "Instructions are too long"),
}).strict();

export const prescriptionSchema = z.object({
  patientId: requiredText("Patient is required"),

  medicalRecordId: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),

  diagnosis: optionalText(2000, "Diagnosis is too long"),

  notes: optionalText(5000, "Notes are too long"),

  medicines: z
    .array(medicineSchema)
    .min(1, "At least one medicine is required"),
}).strict();

export default prescriptionSchema;
