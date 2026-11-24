import "express";
import type { User, Portfolio } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      portfolio?: Portfolio;
    }
  }
}