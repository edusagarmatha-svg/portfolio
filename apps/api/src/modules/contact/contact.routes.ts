import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { authenticate } from "../../middleware/authenticate.js";
import {
  publicCreateHandler,
  listHandler,
  setReadHandler,
  deleteHandler,
  validateCreate,
  validateRead,
} from "./contact.controller.js";

export const publicContactRouter = Router();
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});
publicContactRouter.post("/", contactLimiter, validateCreate, publicCreateHandler);

export const adminMessagesRouter = Router();
adminMessagesRouter.use(authenticate);
adminMessagesRouter.get("/", listHandler);
adminMessagesRouter.patch("/:id/read", validateRead, setReadHandler);
adminMessagesRouter.delete("/:id", deleteHandler);