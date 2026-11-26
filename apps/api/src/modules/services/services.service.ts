import { prisma } from "../../lib/prisma.js";
import type { ContentStatus } from "@prisma/client";

export async function listServices(portfolioId: string, publishedOnly = false) {
  return prisma.service.findMany({
    where: { portfolioId, ...(publishedOnly ? { status: "PUBLISHED" } : {}) },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });
}
export async function getService(id: string, portfolioId: string) {
  return prisma.service.findFirst({ where: { id, portfolioId } });
}
export async function createService(portfolioId: string, data: Record<string, unknown>) {
  const max = await prisma.service.aggregate({ where: { portfolioId }, _max: { displayOrder: true } });
  const nextOrder = (max._max.displayOrder ?? -1) + 1;
  return prisma.service.create({
    data: {
      portfolioId,
      title: data.title as string,
      description: (data.description as string | null) ?? null,
      imageUrl: (data.imageUrl as string | null) ?? null,
      imagePublicId: (data.imagePublicId as string | null) ?? null,
      displayOrder: (data.displayOrder as number) ?? nextOrder,
      status: (data.status as ContentStatus) ?? "DRAFT",
    },
  });
}
export async function updateService(id: string, portfolioId: string, data: Record<string, unknown>) {
  const existing = await prisma.service.findFirst({ where: { id, portfolioId } });
  if (!existing) return null;
  const update: Record<string, unknown> = {};
  if (data.title !== undefined) update.title = data.title;
  if (data.description !== undefined) update.description = data.description;
  if (data.imageUrl !== undefined) update.imageUrl = data.imageUrl;
  if (data.imagePublicId !== undefined) update.imagePublicId = data.imagePublicId;
  if (data.displayOrder !== undefined) update.displayOrder = data.displayOrder;
  if (data.status !== undefined) update.status = data.status;
  return prisma.service.update({ where: { id }, data: update as any });
}
export async function deleteService(id: string, portfolioId: string) {
  const existing = await prisma.service.findFirst({ where: { id, portfolioId } });
  if (!existing) return false;
  await prisma.service.delete({ where: { id } });
  return true;
}