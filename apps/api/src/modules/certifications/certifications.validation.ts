import { z } from "zod";

const statuses = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;

function toDate(v: unknown) {
  if (v === null || v === undefined || v === "") return null;
  const d = new Date(v as string);
  if (isNaN(d.getTime())) throw new Error("Invalid date");
  return d;
}

export const certificationCreateSchema = z.object({
  title: z.string().trim().min(1),
  issuer: z.string().trim().min(1),
  issueDate: z.string().min(1).transform((v) => new Date(v)),
  credentialUrl: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  certificateUrl: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  displayOrder: z.number().int().optional(),
  status: z.enum(statuses).optional().default("DRAFT"),
});

export const certificationUpdateSchema = certificationCreateSchema.partial();