import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { validate } from "../../middleware/validate.js";
import { contactCreateSchema } from "./contact.validation.js";
import * as svc from "./contact.service.js";
import { AppError } from "../../middleware/error-handler.js";
import { prisma } from "../../lib/prisma.js";

export const validateCreate = validate(contactCreateSchema);

export async function publicCreateHandler(req: Request, res: Response, next: NextFunction) {
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
    if (!portfolioId) throw new AppError(404, "Portfolio not found", "NOT_FOUND");
    const msg = await svc.createMessage(portfolioId, req.body);
    res.status(201).json({ success: true, data: { id: msg.id } });
  } catch (err) { next(err); }
}

export async function listHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const items = await svc.listMessages(req.portfolio!.id);
    res.json({ success: true, data: items });
  } catch (err) { next(err); }
}

const readSchema = z.object({ read: z.boolean() });
export const validateRead = validate(readSchema);

export async function setReadHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await svc.setMessageRead(req.params.id as string, req.portfolio!.id, req.body.read);
    if (!item) throw new AppError(404, "Message not found", "NOT_FOUND");
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
}

export async function deleteHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const ok = await svc.deleteMessage(req.params.id as string, req.portfolio!.id);
    if (!ok) throw new AppError(404, "Message not found", "NOT_FOUND");
    res.json({ success: true, data: null });
  } catch (err) { next(err); }
}