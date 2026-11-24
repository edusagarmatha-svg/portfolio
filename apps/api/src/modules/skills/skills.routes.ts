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
} from "./skills.controller.js";

export const publicSkillsRouter = Router();
publicSkillsRouter.get("/", publicListHandler);

export const adminSkillsRouter = Router();
adminSkillsRouter.use(authenticate);
adminSkillsRouter.get("/", listHandler);
adminSkillsRouter.post("/", validateCreate, createHandler);
adminSkillsRouter.get("/:id", getHandler);
adminSkillsRouter.put("/:id", validateUpdate, updateHandler);
adminSkillsRouter.delete("/:id", deleteHandler);