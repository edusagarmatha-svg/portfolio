import type { Request, Response, NextFunction } from "express";
import { profileUpdateSchema } from "./profile.validation.js";
import { getPublicPortfolio, getPortfolioById, updatePortfolio } from "./profile.service.js";
import { validate } from "../../middleware/validate.js";
import { authenticate } from "../../middleware/authenticate.js";

export const validateProfileUpdate = validate(profileUpdateSchema);

export async function getPublicPortfolioHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const slug = typeof req.query.slug === "string" ? req.query.slug : undefined;
    const portfolio = await getPublicPortfolio(slug);
    if (!portfolio) {
      return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Portfolio not found" } });
    }
    res.json({
      success: true,
      data: {
        fullName: portfolio.fullName,
        professionalTitle: portfolio.professionalTitle,
        introduction: portfolio.introduction,
        biography: portfolio.biography,
        profileImageUrl: portfolio.profileImageUrl,
        resumeUrl: portfolio.resumeUrl,
        email: portfolio.email,
        phone: portfolio.phone,
        location: portfolio.location,
        slug: portfolio.slug,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getAdminProfileHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const portfolio = await getPortfolioById(req.portfolio!.id);
    res.json({ success: true, data: portfolio });
  } catch (err) {
    next(err);
  }
}

export async function updateAdminProfileHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const updated = await updatePortfolio(req.portfolio!.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}