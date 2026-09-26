/* ***************************************************** */
/* File: #src/features/patients/schemas/patientSchema.js */ 
/* ***************************************************** */

import { z } from "zod";

export const patientSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name is too long"),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name is too long"),

  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required"),

  gender: z
    .string()
    .min(1, "Gender is required"),

  bloodGroup: z
    .string()
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20, "Phone number is too long"),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("")),

  address: z
    .string()
    .trim()
    .max(250, "Address is too long")
    .optional()
    .or(z.literal("")),

  emergencyContactName: z
    .string()
    .trim()
    .max(100, "Name is too long")
    .optional()
    .or(z.literal("")),

  emergencyContactPhone: z
    .string()
    .trim()
    .max(20, "Phone number is too long")
    .optional()
    .or(z.literal("")),

  allergies: z
    .string()
    .max(1000, "Allergies information is too long")
    .optional()
    .or(z.literal("")),

  medicalHistory: z
    .string()
    .max(5000, "Medical history is too long")
    .optional()
    .or(z.literal("")),

  status: z
    .string()
    .optional(),
});

export default patientSchema;
