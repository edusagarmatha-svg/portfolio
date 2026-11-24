import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.js";
import { uploadMiddleware, uploadHandler, deleteHandler } from "./media.controller.js";

export const adminMediaRouter = Router();
adminMediaRouter.use(authenticate);
adminMediaRouter.post("/upload", uploadMiddleware, uploadHandler);
adminMediaRouter.delete("/:publicId", deleteHandler);