import { z } from "zod";

export const contactCreateSchema = z.object({
  senderName: z.string().trim().min(1),
  senderEmail: z.string().trim().email(),
  subject: z.string().trim().optional().nullable().transform((v) => (v === "" ? null : v)),
  message: z.string().trim().min(1),
});