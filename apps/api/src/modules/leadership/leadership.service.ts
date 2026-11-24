import { prisma } from "../../lib/prisma.js";
import type { ContentStatus } from "@prisma/client";

export async function listLeadership(portfolioId: string, publishedOnly = false) {
  return prisma.leadership.findMany({
    where: { portfolioId, ...(publishedOnly ? { status: "PUBLISHED" } : {}) },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });
}
export async function getLeadership(id: string, portfolioId: string) {
  return prisma.leadership.findFirst({ where: { id, portfolioId } });
}
export async function createLeadership(portfolioId: string, data: Record<string, unknown>) {
  const max = await prisma.leadership.aggregate({ where: { portfolioId }, _max: { displayOrder: true } });
  const nextOrder = (max._max.displayOrder ?? -1) + 1;
  return prisma.leadership.create({
    data: {
      portfolioId,
      title: data.title as string,
      organization: (data.organization as string | null) ?? null,
      description: (data.description as string | null) ?? null,
      displayOrder: (data.displayOrder as number) ?? nextOrder,
      status: (data.status as ContentStatus) ?? "DRAFT",
    },
  });
}
export async function updateLeadership(id: string, portfolioId: string, data: Record<string, unknown>) {
  const existing = await prisma.leadership.findFirst({ where: { id, portfolioId } });
  if (!existing) return null;
  const update: Record<string, unknown> = {};
  if (data.title !== undefined) update.title = data.title;
  if (data.organization !== undefined) update.organization = data.organization;
  if (data.description !== undefined) update.description = data.description;
  if (data.displayOrder !== undefined) update.displayOrder = data.displayOrder;
  if (data.status !== undefined) update.status = data.status;
  return prisma.leadership.update({ where: { id }, data: update as any });
}
export async function deleteLeadership(id: string, portfolioId: string) {
  const existing = await prisma.leadership.findFirst({ where: { id, portfolioId } });
  if (!existing) return false;
  await prisma.leadership.delete({ where: { id } });
  return true;
}
