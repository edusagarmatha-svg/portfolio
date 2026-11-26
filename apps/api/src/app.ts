import path from "node:path";
import { existsSync } from "node:fs";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import { env } from "./config/env.js";
import { UPLOADS_ROUTE, ensureUploadDir, uploadDir } from "./lib/storage.js";
import { healthRouter } from "./modules/health/health.routes.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { dashboardRouter } from "./modules/dashboard/dashboard.routes.js";
import { publicPortfolioRouter, adminProfileRouter } from "./modules/profile/profile.routes.js";
import { publicExperienceRouter, adminExperienceRouter } from "./modules/experience/experience.routes.js";
import { publicProjectsRouter, adminProjectsRouter } from "./modules/projects/projects.routes.js";
import { publicSkillsRouter, adminSkillsRouter } from "./modules/skills/skills.routes.js";
import { publicEducationRouter, adminEducationRouter } from "./modules/education/education.routes.js";
import { publicCertificationsRouter, adminCertificationsRouter } from "./modules/certifications/certifications.routes.js";
import { adminMediaRouter } from "./modules/media/media.routes.js";
import { publicContactRouter, adminMessagesRouter } from "./modules/contact/contact.routes.js";
import { publicSettingsRouter, adminSettingsRouter } from "./modules/settings/settings.routes.js";
import { publicServicesRouter, adminServicesRouter } from "./modules/services/services.routes.js";
import { publicTestimonialsRouter, adminTestimonialsRouter } from "./modules/testimonials/testimonials.routes.js";
import { errorHandler } from "./middleware/error-handler.js";

export function createApp() {
  const app = express();

  app.use(
    helmet({
      // Uploaded media and the SPA may be served from a different origin than
      // the page embedding them, and helmet's same-origin default blocks that.
      crossOriginResourcePolicy: { policy: "cross-origin" },
    }),
  );
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

  // Uploaded media lives on a mounted volume. Filenames are UUIDs, so a given
  // URL always points at the same bytes and can be cached indefinitely.
  ensureUploadDir();
  app.use(
    UPLOADS_ROUTE,
    express.static(uploadDir, {
      immutable: true,
      maxAge: "1y",
      index: false,
    }),
  );
  // A missing upload is a missing file, not a route for the SPA to render.
  app.use(UPLOADS_ROUTE, (_req, res) => {
    res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "File not found" } });
  });

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
  app.use("/api/v1/public/skills", publicSkillsRouter);
  app.use("/api/v1/public/education", publicEducationRouter);
  app.use("/api/v1/public/certifications", publicCertificationsRouter);
  app.use("/api/v1/admin/experience", adminExperienceRouter);
  app.use("/api/v1/admin/projects", adminProjectsRouter);
  app.use("/api/v1/admin/skills", adminSkillsRouter);
  app.use("/api/v1/admin/education", adminEducationRouter);
  app.use("/api/v1/admin/certifications", adminCertificationsRouter);
  app.use("/api/v1/admin/media", adminMediaRouter);
  app.use("/api/v1/public/contact", publicContactRouter);
  app.use("/api/v1/admin/messages", adminMessagesRouter);
  app.use("/api/v1/public/settings", publicSettingsRouter);
  app.use("/api/v1/admin/settings", adminSettingsRouter);
  app.use("/api/v1/public/services", publicServicesRouter);
  app.use("/api/v1/public/testimonials", publicTestimonialsRouter);
  app.use("/api/v1/admin/services", adminServicesRouter);
  app.use("/api/v1/admin/testimonials", adminTestimonialsRouter);

  // Serve the built SPA, when present, for everything that is not an API or
  // media path. Unknown API paths still get the JSON 404 below.
  const webDist = path.resolve(env.WEB_DIST_DIR);
  const indexHtml = path.join(webDist, "index.html");

  if (existsSync(indexHtml)) {
    app.use(express.static(webDist, { index: false }));
    app.get(/^(?!\/api\/).*/, (_req, res) => {
      res.sendFile(indexHtml);
    });
  }

  app.use((_req, res) => {
    res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Route not found" } });
  });

  app.use(errorHandler);

  return app;
}