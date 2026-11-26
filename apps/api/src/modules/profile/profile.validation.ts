import { z } from "zod";

/**
 * Accepts an absolute URL (media uploaded to an external host before the
 * switch to a mounted volume) or an app-relative upload path such as
 * "/uploads/<id>.webp".
 */
const optionalUrl = z
  .string()
  .trim()
  .optional()
  .nullable()
  .transform((v) => (v === "" ? null : v))
  .refine(
    (v) => v === null || v === undefined || /^https?:\/\//.test(v) || /^\/uploads\//.test(v),
    "Invalid URL",
  );

const optionalEmail = z
  .string()
  .trim()
  .optional()
  .nullable()
  .transform((v) => (v === "" ? null : v))
  .refine((v) => v === null || v === undefined || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Invalid email");

const optionalText = z
  .string()
  .trim()
  .optional()
  .nullable()
  .transform((v) => (v === "" ? null : v));

export const profileUpdateSchema = z.object({
  fullName: z.string().trim().min(1).optional(),
  professionalTitle: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  introduction: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  biography: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  profileImageUrl: optionalUrl,
  profileImagePublicId: optionalText,
  resumeUrl: optionalUrl,
  email: optionalEmail,
  phone: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  location: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
});