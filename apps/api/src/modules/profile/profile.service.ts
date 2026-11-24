import { prisma } from "../../lib/prisma.js";
import type { Prisma } from "@prisma/client";

export async function getPublicPortfolio(slug?: string) {
  if (slug) {
    return prisma.portfolio.findUnique({ where: { slug } });
  }
  return prisma.portfolio.findFirst({ orderBy: { createdAt: "asc" } });
}

export async function getPortfolioById(id: string) {
  return prisma.portfolio.findUnique({ where: { id } });
}

export async function updatePortfolio(id: string, data: Prisma.PortfolioUpdateInput) {
  return prisma.portfolio.update({ where: { id }, data });
}