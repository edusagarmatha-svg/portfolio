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
} from "./education.controller.js";

export const publicEducationRouter = Router();
publicEducationRouter.get("/", publicListHandler);

export const adminEducationRouter = Router();
adminEducationRouter.use(authenticate);
adminEducationRouter.get("/", listHandler);
adminEducationRouter.post("/", validateCreate, createHandler);
adminEducationRouter.get("/:id", getHandler);
adminEducationRouter.put("/:id", validateUpdate, updateHandler);
adminEducationRouter.delete("/:id", deleteHandler);