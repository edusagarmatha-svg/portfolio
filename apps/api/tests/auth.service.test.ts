import "dotenv/config";
import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword, signToken } from "../src/modules/auth/auth.service.js";
import jwt from "jsonwebtoken";
import { env } from "../src/config/env.js";

describe("auth service", () => {
  it("hashes and verifies passwords", async () => {
    const hash = await hashPassword("secret123");
    expect(await verifyPassword("secret123", hash)).toBe(true);
    expect(await verifyPassword("wrong", hash)).toBe(false);
  });

  it("signs a verifiable JWT", () => {
    const token = signToken("user-1", 0);
    const payload = jwt.verify(token, env.JWT_SECRET) as { sub: string; tv: number };
    expect(payload.sub).toBe("user-1");
    expect(payload.tv).toBe(0);
  });
});