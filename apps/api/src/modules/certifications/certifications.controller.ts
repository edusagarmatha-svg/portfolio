import type { Request, Response, NextFunction } from "express";
import { validate } from "../../middleware/validate.js";
import { certificationCreateSchema, certificationUpdateSchema } from "./certifications.validation.js";
import * as svc from "./certifications.service.js";
import { AppError } from "../../middleware/error-handler.js";
import { prisma } from "../../lib/prisma.js";

export const validateCreate = validate(certificationCreateSchema);
export const validateUpdate = validate(certificationUpdateSchema);

export async function listHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const items = await svc.listCertifications(req.portfolio!.id);
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
    const items = await svc.listCertifications(portfolioId, true);
    res.json({ success: true, data: items });
  } catch (err) { next(err); }
}

export async function getHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await svc.getCertification(req.params.id as string, req.portfolio!.id);
    if (!item) throw new AppError(404, "Certification not found", "NOT_FOUND");
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
}

export async function createHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await svc.createCertification(req.portfolio!.id, req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) { next(err); }
}

export async function updateHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await svc.updateCertification(req.params.id as string, req.portfolio!.id, req.body);
    if (!item) throw new AppError(404, "Certification not found", "NOT_FOUND");
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
}

export async function deleteHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const ok = await svc.deleteCertification(req.params.id as string, req.portfolio!.id);
    if (!ok) throw new AppError(404, "Certification not found", "NOT_FOUND");
    res.json({ success: true, data: null });
  } catch (err) { next(err); }
}