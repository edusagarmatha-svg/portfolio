import { z } from "zod";

const statuses = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;

export const projectCreateSchema = z.object({
  title: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  summary: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  description: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  coverImageUrl: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  technologies: z.array(z.string().trim().min(1)).optional().default([]),
  liveUrl: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  sourceUrl: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  featured: z.boolean().optional().default(false),
  displayOrder: z.number().int().optional(),
  status: z.enum(statuses).optional().default("DRAFT"),
});

export const projectUpdateSchema = projectCreateSchema.partial();