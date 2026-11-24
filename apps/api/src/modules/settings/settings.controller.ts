import type { Request, Response, NextFunction } from "express";
import { validate } from "../../middleware/validate.js";
import { settingsUpdateSchema } from "./settings.validation.js";
import * as svc from "./settings.service.js";
import { prisma } from "../../lib/prisma.js";

export const validateUpdate = validate(settingsUpdateSchema);

export async function getAdminHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const settings = await svc.getSettings(req.portfolio!.id);
    res.json({ success: true, data: settings });
  } catch (err) { next(err); }
}

export async function updateAdminHandler(req: Request, res: Response, next: NextFunction) {
  try {
    await svc.upsertSettings(req.portfolio!.id, req.body);
    const settings = await svc.getSettings(req.portfolio!.id);
    res.json({ success: true, data: settings });
  } catch (err) { next(err); }
}

export async function publicHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const slug = typeof req.query.slug === "string" ? req.query.slug : undefined;
    let portfolioId: string | null = null;
    if (slug) { const p = await prisma.portfolio.findUnique({ where: { slug } }); portfolioId = p?.id ?? null; }
    else { const p = await prisma.portfolio.findFirst({ orderBy: { createdAt: "asc" } }); portfolioId = p?.id ?? null; }
    if (!portfolioId) return res.json({ success: true, data: {} });
    res.json({ success: true, data: await svc.getPublicSettings(portfolioId) });
  } catch (err) { next(err); }
}