import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.js";
import { listHandler, publicListHandler, getHandler, createHandler, updateHandler, deleteHandler, validateCreate, validateUpdate } from "./insights.controller.js";

export const publicInsightsRouter = Router();
publicInsightsRouter.get("/", publicListHandler);

export const adminInsightsRouter = Router();
adminInsightsRouter.use(authenticate);
adminInsightsRouter.get("/", listHandler);
adminInsightsRouter.post("/", validateCreate, createHandler);
adminInsightsRouter.get("/:id", getHandler);
adminInsightsRouter.put("/:id", validateUpdate, updateHandler);
adminInsightsRouter.delete("/:id", deleteHandler);
