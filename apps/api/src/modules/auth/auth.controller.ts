import type { Request, Response, NextFunction } from "express";
import { env } from "../../config/env.js";
import { login, logout } from "./auth.service.js";
import { loginSchema } from "./auth.validation.js";

function cookieOptions() {
  return {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
}

export async function loginHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const { user, token } = await login(email, password);
    res.cookie(env.COOKIE_NAME, token, cookieOptions());
    res.json({
      success: true,
      data: { id: user.id, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
}

export async function logoutHandler(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.user) {
      await logout(req.user.id);
    }
    res.clearCookie(env.COOKIE_NAME, cookieOptions());
    res.json({ success: true, data: null });
  } catch (err) {
    next(err);
  }
}

export async function meHandler(req: Request, res: Response) {
  const user = req.user!;
  const portfolio = req.portfolio!;
  res.json({
    success: true,
    data: {
      user: { id: user.id, email: user.email, role: user.role },
      portfolio: { id: portfolio.id, fullName: portfolio.fullName, slug: portfolio.slug },
    },
  });
}