import { Router } from "express";
import { prisma } from "../../lib/prisma.js";
import { authenticate } from "../../middleware/authenticate.js";

export const dashboardRouter = Router();

dashboardRouter.get("/", authenticate, async (req, res, next) => {
  try {
    const portfolioId = req.portfolio!.id;
    const [projects, experiences, certifications, unreadMessages] = await Promise.all([
      prisma.project.count({ where: { portfolioId } }),
      prisma.experience.count({ where: { portfolioId } }),
      prisma.certification.count({ where: { portfolioId } }),
      prisma.contactMessage.count({ where: { portfolioId, readAt: null } }),
    ]);
    res.json({
      success: true,
      data: { projects, experiences, certifications, unreadMessages },
    });
  } catch (err) {
    next(err);
  }
});