import { z } from "zod";
const statuses = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;

export const insightCreateSchema = z.object({
  title: z.string().trim().min(1),
  excerpt: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  content: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  displayOrder: z.number().int().optional(),
  status: z.enum(statuses).optional().default("DRAFT"),
});
export const insightUpdateSchema = insightCreateSchema.partial();
