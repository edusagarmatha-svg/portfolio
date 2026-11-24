import { z } from "zod";

const proficiencies = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"] as const;

export const skillCreateSchema = z.object({
  name: z.string().trim().min(1),
  category: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  proficiency: z.enum(proficiencies).optional().nullable(),
  displayOrder: z.number().int().optional(),
});

export const skillUpdateSchema = skillCreateSchema.partial();