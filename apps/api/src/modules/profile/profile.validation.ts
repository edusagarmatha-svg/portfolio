import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .optional()
  .nullable()
  .transform((v) => (v === "" ? null : v))
  .refine((v) => v === null || v === undefined || /^https?:\/\//.test(v), "Invalid URL");

const optionalEmail = z
  .string()
  .trim()
  .optional()
  .nullable()
  .transform((v) => (v === "" ? null : v))
  .refine((v) => v === null || v === undefined || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Invalid email");

export const profileUpdateSchema = z.object({
  fullName: z.string().trim().min(1).optional(),
  professionalTitle: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  introduction: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  biography: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  profileImageUrl: optionalUrl,
  resumeUrl: optionalUrl,
  email: optionalEmail,
  phone: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  location: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
});