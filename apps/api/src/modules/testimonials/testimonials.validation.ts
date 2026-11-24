import { z } from "zod";
const statuses = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;

export const testimonialCreateSchema = z.object({
  clientName: z.string().trim().min(1),
  clientRole: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  organization: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  feedback: z.string().trim().min(1),
  photoUrl: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  displayOrder: z.number().int().optional(),
  status: z.enum(statuses).optional().default("DRAFT"),
});
export const testimonialUpdateSchema = testimonialCreateSchema.partial();