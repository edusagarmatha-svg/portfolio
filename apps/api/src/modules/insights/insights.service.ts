import { prisma } from "../../lib/prisma.js";
import type { ContentStatus } from "@prisma/client";

export async function listInsights(portfolioId: string, publishedOnly = false) {
  return prisma.insight.findMany({
    where: { portfolioId, ...(publishedOnly ? { status: "PUBLISHED" } : {}) },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });
}
export async function getInsight(id: string, portfolioId: string) {
  return prisma.insight.findFirst({ where: { id, portfolioId } });
}
export async function createInsight(portfolioId: string, data: Record<string, unknown>) {
  const max = await prisma.insight.aggregate({ where: { portfolioId }, _max: { displayOrder: true } });
  const nextOrder = (max._max.displayOrder ?? -1) + 1;
  return prisma.insight.create({
    data: {
      portfolioId,
      title: data.title as string,
      excerpt: (data.excerpt as string | null) ?? null,
      content: (data.content as string | null) ?? null,
      displayOrder: (data.displayOrder as number) ?? nextOrder,
      status: (data.status as ContentStatus) ?? "DRAFT",
    },
  });
}
export async function updateInsight(id: string, portfolioId: string, data: Record<string, unknown>) {
  const existing = await prisma.insight.findFirst({ where: { id, portfolioId } });
  if (!existing) return null;
  const update: Record<string, unknown> = {};
  if (data.title !== undefined) update.title = data.title;
  if (data.excerpt !== undefined) update.excerpt = data.excerpt;
  if (data.content !== undefined) update.content = data.content;
  if (data.displayOrder !== undefined) update.displayOrder = data.displayOrder;
  if (data.status !== undefined) update.status = data.status;
  return prisma.insight.update({ where: { id }, data: update as any });
}
export async function deleteInsight(id: string, portfolioId: string) {
  const existing = await prisma.insight.findFirst({ where: { id, portfolioId } });
  if (!existing) return false;
  await prisma.insight.delete({ where: { id } });
  return true;
}
