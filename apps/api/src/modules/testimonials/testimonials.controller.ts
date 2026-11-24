import type { Request, Response, NextFunction } from "express";
import { validate } from "../../middleware/validate.js";
import { testimonialCreateSchema, testimonialUpdateSchema } from "./testimonials.validation.js";
import * as svc from "./testimonials.service.js";
import { AppError } from "../../middleware/error-handler.js";
import { prisma } from "../../lib/prisma.js";

export const validateCreate = validate(testimonialCreateSchema);
export const validateUpdate = validate(testimonialUpdateSchema);

export async function listHandler(req: Request, res: Response, next: NextFunction) {
  try { res.json({ success: true, data: await svc.listTestimonials(req.portfolio!.id) }); }
  catch (err) { next(err); }
}
export async function publicListHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const slug = typeof req.query.slug === "string" ? req.query.slug : undefined;
    let portfolioId: string | null = null;
    if (slug) { const p = await prisma.portfolio.findUnique({ where: { slug } }); portfolioId = p?.id ?? null; }
    else { const p = await prisma.portfolio.findFirst({ orderBy: { createdAt: "asc" } }); portfolioId = p?.id ?? null; }
    if (!portfolioId) return res.json({ success: true, data: [] });
    res.json({ success: true, data: await svc.listTestimonials(portfolioId, true) });
  } catch (err) { next(err); }
}
export async function getHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await svc.getTestimonial(req.params.id as string, req.portfolio!.id);
    if (!item) throw new AppError(404, "Testimonial not found", "NOT_FOUND");
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
}
export async function createHandler(req: Request, res: Response, next: NextFunction) {
  try { res.status(201).json({ success: true, data: await svc.createTestimonial(req.portfolio!.id, req.body) }); }
  catch (err) { next(err); }
}
export async function updateHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await svc.updateTestimonial(req.params.id as string, req.portfolio!.id, req.body);
    if (!item) throw new AppError(404, "Testimonial not found", "NOT_FOUND");
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
}
export async function deleteHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const ok = await svc.deleteTestimonial(req.params.id as string, req.portfolio!.id);
    if (!ok) throw new AppError(404, "Testimonial not found", "NOT_FOUND");
    res.json({ success: true, data: null });
  } catch (err) { next(err); }
}