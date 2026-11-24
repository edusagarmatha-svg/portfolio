import { z } from "zod";
const statuses = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;

export const serviceCreateSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  imageUrl: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  displayOrder: z.number().int().optional(),
  status: z.enum(statuses).optional().default("DRAFT"),
});
export const serviceUpdateSchema = serviceCreateSchema.partial();