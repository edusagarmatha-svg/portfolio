import { z } from "zod";

const employmentTypes = ["FULL_TIME", "PART_TIME", "CONTRACT", "FREELANCE", "INTERNSHIP", "OTHER"] as const;
const statuses = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;

function toDate(v: unknown) {
  if (v === null || v === undefined || v === "") return null;
  const d = new Date(v as string);
  if (isNaN(d.getTime())) throw new Error("Invalid date");
  return d;
}

export const experienceCreateSchema = z.object({
  company: z.string().trim().min(1),
  position: z.string().trim().min(1),
  employmentType: z.enum(employmentTypes).optional().nullable(),
  description: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  startDate: z.string().min(1).transform((v) => new Date(v)),
  endDate: z.string().optional().nullable().transform(toDate),
  isCurrent: z.boolean().optional().default(false),
  displayOrder: z.number().int().optional(),
  status: z.enum(statuses).optional().default("DRAFT"),
});

export const experienceUpdateSchema = experienceCreateSchema.partial();