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
} from "./projects.controller.js";

export const publicProjectsRouter = Router();
publicProjectsRouter.get("/", publicListHandler);

export const adminProjectsRouter = Router();
adminProjectsRouter.use(authenticate);
adminProjectsRouter.get("/", listHandler);
adminProjectsRouter.post("/", validateCreate, createHandler);
adminProjectsRouter.get("/:id", getHandler);
adminProjectsRouter.put("/:id", validateUpdate, updateHandler);
adminProjectsRouter.delete("/:id", deleteHandler);
adminProjectsRouter.post("/reorder", validateReorder, reorderHandler);