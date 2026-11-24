import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.js";
import {
  getPublicPortfolioHandler,
  getAdminProfileHandler,
  updateAdminProfileHandler,
  validateProfileUpdate,
} from "./profile.controller.js";

export const publicPortfolioRouter = Router();
publicPortfolioRouter.get("/", getPublicPortfolioHandler);

export const adminProfileRouter = Router();
adminProfileRouter.use(authenticate);
adminProfileRouter.get("/", getAdminProfileHandler);
adminProfileRouter.put("/", validateProfileUpdate, updateAdminProfileHandler);