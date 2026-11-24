import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.js";
import {
  listHandler,
  publicListHandler,
  getHandler,
  createHandler,
  updateHandler,
  deleteHandler,
  reorderHandler,
  validateCreate,
  validateUpdate,
  validateReorder,
} from "./experience.controller.js";

export const publicExperienceRouter = Router();
publicExperienceRouter.get("/", publicListHandler);

export const adminExperienceRouter = Router();
adminExperienceRouter.use(authenticate);
adminExperienceRouter.get("/", listHandler);
adminExperienceRouter.post("/", validateCreate, createHandler);
adminExperienceRouter.get("/:id", getHandler);
adminExperienceRouter.put("/:id", validateUpdate, updateHandler);
adminExperienceRouter.delete("/:id", deleteHandler);
adminExperienceRouter.post("/reorder", validateReorder, reorderHandler);