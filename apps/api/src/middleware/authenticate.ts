import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { prisma } from "../lib/prisma.js";
import { AppError } from "./error-handler.js";

interface TokenPayload {
  sub: string;
  tv: number;
}

export async function authenticate(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies?.[env.COOKIE_NAME];
  if (!token) {
    return next(new AppError(401, "Authentication required", "UNAUTHENTICATED"));
  }

  let payload: TokenPayload;
  try {
    payload = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
  } catch {
    return next(new AppError(401, "Invalid or expired token", "INVALID_TOKEN"));
  }

  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user || user.tokenVersion !== payload.tv) {
    return next(new AppError(401, "Invalid or expired token", "INVALID_TOKEN"));
  }

  const portfolio = await prisma.portfolio.findUnique({ where: { ownerId: user.id } });
  if (!portfolio) {
    return next(new AppError(404, "Portfolio not found", "PORTFOLIO_NOT_FOUND"));
  }

  req.user = user;
  req.portfolio = portfolio;
  next();
}