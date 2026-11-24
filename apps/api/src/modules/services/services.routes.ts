import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.js";
import { listHandler, publicListHandler, getHandler, createHandler, updateHandler, deleteHandler, validateCreate, validateUpdate } from "./services.controller.js";

export const publicServicesRouter = Router();
publicServicesRouter.get("/", publicListHandler);

export const adminServicesRouter = Router();
adminServicesRouter.use(authenticate);
adminServicesRouter.get("/", listHandler);
adminServicesRouter.post("/", validateCreate, createHandler);
adminServicesRouter.get("/:id", getHandler);
adminServicesRouter.put("/:id", validateUpdate, updateHandler);
adminServicesRouter.delete("/:id", deleteHandler);