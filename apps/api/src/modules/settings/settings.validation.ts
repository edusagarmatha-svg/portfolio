import { z } from "zod";

export const settingsUpdateSchema = z.object({
  socialLinks: z.array(z.object({ label: z.string().trim().min(1), url: z.string().trim().url() })).optional(),
  sectionVisibility: z.record(z.string(), z.boolean()).optional(),
  seo: z.object({
    title: z.string().trim().optional().nullable(),
    description: z.string().trim().optional().nullable(),
  }).optional(),
});