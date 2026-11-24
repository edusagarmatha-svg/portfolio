import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { validate } from "../../middleware/validate.js";
import { educationCreateSchema, educationUpdateSchema } from "./education.validation.js";
import * as svc from "./education.service.js";
import { AppError } from "../../middleware/error-handler.js";
import { prisma } from "../../lib/prisma.js";

export const validateCreate = validate(educationCreateSchema);
export const validateUpdate = validate(educationUpdateSchema);

export async function listHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const items = await svc.listEducation(req.portfolio!.id);
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
    const items = await svc.listEducation(portfolioId);
    res.json({ success: true, data: items });
  } catch (err) { next(err); }
}

export async function getHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await svc.getEducation(req.params.id as string, req.portfolio!.id);
    if (!item) throw new AppError(404, "Education not found", "NOT_FOUND");
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
}

export async function createHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await svc.createEducation(req.portfolio!.id, req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) { next(err); }
}

export async function updateHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await svc.updateEducation(req.params.id as string, req.portfolio!.id, req.body);
    if (!item) throw new AppError(404, "Education not found", "NOT_FOUND");
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
}

export async function deleteHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const ok = await svc.deleteEducation(req.params.id as string, req.portfolio!.id);
    if (!ok) throw new AppError(404, "Education not found", "NOT_FOUND");
    res.json({ success: true, data: null });
  } catch (err) { next(err); }
}