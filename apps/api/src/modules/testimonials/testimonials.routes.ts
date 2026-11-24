import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.js";
import { listHandler, publicListHandler, getHandler, createHandler, updateHandler, deleteHandler, validateCreate, validateUpdate } from "./testimonials.controller.js";

export const publicTestimonialsRouter = Router();
publicTestimonialsRouter.get("/", publicListHandler);

export const adminTestimonialsRouter = Router();
adminTestimonialsRouter.use(authenticate);
adminTestimonialsRouter.get("/", listHandler);
adminTestimonialsRouter.post("/", validateCreate, createHandler);
adminTestimonialsRouter.get("/:id", getHandler);
adminTestimonialsRouter.put("/:id", validateUpdate, updateHandler);
adminTestimonialsRouter.delete("/:id", deleteHandler);