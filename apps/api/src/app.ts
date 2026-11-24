import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import { env } from "./config/env.js";
import { healthRouter } from "./modules/health/health.routes.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { dashboardRouter } from "./modules/dashboard/dashboard.routes.js";
import { publicPortfolioRouter, adminProfileRouter } from "./modules/profile/profile.routes.js";
import { publicExperienceRouter, adminExperienceRouter } from "./modules/experience/experience.routes.js";
import { publicProjectsRouter, adminProjectsRouter } from "./modules/projects/projects.routes.js";
import { errorHandler } from "./middleware/error-handler.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());

  const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(globalLimiter);

  app.get("/api/v1", (_req, res) => {
    res.json({ success: true, data: { name: "portfolio-cms-api", version: "v1" } });
  });

  app.use("/api/v1/health", healthRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/admin/dashboard", dashboardRouter);
  app.use("/api/v1/admin/profile", adminProfileRouter);
  app.use("/api/v1/public/portfolio", publicPortfolioRouter);
  app.use("/api/v1/public/experience", publicExperienceRouter);
  app.use("/api/v1/public/projects", publicProjectsRouter);
  app.use("/api/v1/admin/experience", adminExperienceRouter);
  app.use("/api/v1/admin/projects", adminProjectsRouter);

  app.use((_req, res) => {
    res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Route not found" } });
  });

  app.use(errorHandler);

  return app;
}