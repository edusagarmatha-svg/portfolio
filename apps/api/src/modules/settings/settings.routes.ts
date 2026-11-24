import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.js";
import { getAdminHandler, updateAdminHandler, publicHandler, validateUpdate } from "./settings.controller.js";

export const publicSettingsRouter = Router();
publicSettingsRouter.get("/", publicHandler);

export const adminSettingsRouter = Router();
adminSettingsRouter.use(authenticate);
adminSettingsRouter.get("/", getAdminHandler);
adminSettingsRouter.put("/", validateUpdate, updateAdminHandler);