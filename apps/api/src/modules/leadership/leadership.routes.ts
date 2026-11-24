import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.js";
import { listHandler, publicListHandler, getHandler, createHandler, updateHandler, deleteHandler, validateCreate, validateUpdate } from "./leadership.controller.js";

export const publicLeadershipRouter = Router();
publicLeadershipRouter.get("/", publicListHandler);

export const adminLeadershipRouter = Router();
adminLeadershipRouter.use(authenticate);
adminLeadershipRouter.get("/", listHandler);
adminLeadershipRouter.post("/", validateCreate, createHandler);
adminLeadershipRouter.get("/:id", getHandler);
adminLeadershipRouter.put("/:id", validateUpdate, updateHandler);
adminLeadershipRouter.delete("/:id", deleteHandler);
