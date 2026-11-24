import { z } from "zod";

function toDate(v: unknown) {
  if (v === null || v === undefined || v === "") return null;
  const d = new Date(v as string);
  if (isNaN(d.getTime())) throw new Error("Invalid date");
  return d;
}

export const educationCreateSchema = z.object({
  institution: z.string().trim().min(1),
  qualification: z.string().trim().min(1),
  fieldOfStudy: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  description: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  startDate: z.string().min(1).transform((v) => new Date(v)),
  endDate: z.string().optional().nullable().transform(toDate),
  displayOrder: z.number().int().optional(),
});

export const educationUpdateSchema = educationCreateSchema.partial();