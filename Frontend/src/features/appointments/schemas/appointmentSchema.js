/* ************************************************************* */
/* File: #src/features/appointments/schemas/appointmentSchema.js */ 
/* ************************************************************* */

import { z } from "zod";

export const appointmentSchema = z.object({
  patientId: z
    .string()
    .min(1, "Patient is required"),

  doctorId: z
    .string()
    .min(1, "Doctor is required"),

  appointmentDate: z
    .string()
    .min(1, "Appointment date is required"),

  appointmentTime: z
    .string()
    .min(1, "Appointment time is required"),

  type: z
    .string()
    .min(1, "Appointment type is required"),

  reason: z
    .string()
    .trim()
    .max(2000, "Reason is too long")
    .optional()
    .or(z.literal("")),

  notes: z
    .string()
    .trim()
    .max(5000, "Notes are too long")
    .optional()
    .or(z.literal("")),
});

export default appointmentSchema;
