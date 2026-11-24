import type { Request, Response, NextFunction } from "express";
import { validate } from "../../middleware/validate.js";
import { prisma } from "../../lib/prisma.js";
import { experienceCreateSchema, experienceUpdateSchema } from "./experience.validation.js";
import * as svc from "./experience.service.js";
import { AppError } from "../../middleware/error-handler.js";
import { z } from "zod";

const reorderSchema = z.object({ ids: z.array(z.string().uuid()) });

export const validateCreate = validate(experienceCreateSchema);
export const validateUpdate = validate(experienceUpdateSchema);
export const validateReorder = validate(reorderSchema);

export async function listHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const items = await svc.listExperience(req.portfolio!.id);
    res.json({ success: true, data: items });
  } catch (err) { next(err); }
}

export async function publicListHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const slug = typeof req.query.slug === "string" ? req.query.slug : undefined;
    let portfolioId: string | null = null;
    if (slug) {
      const p = await prisma.portfolio.findUnique({ where: { slug } });
      portfolioId = p?.id ?? null;
    } else {
      const p = await prisma.portfolio.findFirst({ orderBy: { createdAt: "asc" } });
      portfolioId = p?.id ?? null;
    }
    if (!portfolioId) return res.json({ success: true, data: [] });
    const items = await svc.listExperience(portfolioId, true);
    res.json({ success: true, data: items });
  } catch (err) { next(err); }
}

export async function getHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await svc.getExperience(req.params.id as string, req.portfolio!.id);
    if (!item) throw new AppError(404, "Experience not found", "NOT_FOUND");
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
}

export async function createHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await svc.createExperience(req.portfolio!.id, req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) { next(err); }
}

export async function updateHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await svc.updateExperience(req.params.id as string, req.portfolio!.id, req.body);
    if (!item) throw new AppError(404, "Experience not found", "NOT_FOUND");
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
}

export async function deleteHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const ok = await svc.deleteExperience(req.params.id as string, req.portfolio!.id);
    if (!ok) throw new AppError(404, "Experience not found", "NOT_FOUND");
    res.json({ success: true, data: null });
  } catch (err) { next(err); }
}

export async function reorderHandler(req: Request, res: Response, next: NextFunction) {
  try {
    await svc.reorderExperience(req.portfolio!.id, req.body.ids);
    res.json({ success: true, data: null });
  } catch (err) { next(err); }
}