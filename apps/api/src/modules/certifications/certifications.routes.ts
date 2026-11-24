import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.js";
import {
  listHandler,
  publicListHandler,
  getHandler,
  createHandler,
  updateHandler,
  deleteHandler,
  validateCreate,
  validateUpdate,
} from "./certifications.controller.js";

export const publicCertificationsRouter = Router();
publicCertificationsRouter.get("/", publicListHandler);

export const adminCertificationsRouter = Router();
adminCertificationsRouter.use(authenticate);
adminCertificationsRouter.get("/", listHandler);
adminCertificationsRouter.post("/", validateCreate, createHandler);
adminCertificationsRouter.get("/:id", getHandler);
adminCertificationsRouter.put("/:id", validateUpdate, updateHandler);
adminCertificationsRouter.delete("/:id", deleteHandler);