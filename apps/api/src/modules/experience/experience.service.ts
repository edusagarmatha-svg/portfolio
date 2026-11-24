import { prisma } from "../../lib/prisma.js";
import type { ContentStatus } from "@prisma/client";

export async function listExperience(portfolioId: string, publishedOnly = false) {
  return prisma.experience.findMany({
    where: { portfolioId, ...(publishedOnly ? { status: "PUBLISHED" } : {}) },
    orderBy: [{ displayOrder: "asc" }, { startDate: "desc" }],
  });
}

export async function getExperience(id: string, portfolioId: string) {
  return prisma.experience.findFirst({ where: { id, portfolioId } });
}

export async function createExperience(portfolioId: string, data: Record<string, unknown>) {
  const max = await prisma.experience.aggregate({
    where: { portfolioId },
    _max: { displayOrder: true },
  });
  const nextOrder = (max._max.displayOrder ?? -1) + 1;
  return prisma.experience.create({
    data: {
      portfolioId,
      company: data.company as string,
      position: data.position as string,
      employmentType: (data.employmentType as any) ?? null,
      description: (data.description as string | null) ?? null,
      startDate: data.startDate as Date,
      endDate: (data.endDate as Date | null) ?? null,
      isCurrent: (data.isCurrent as boolean) ?? false,
      displayOrder: (data.displayOrder as number) ?? nextOrder,
      status: (data.status as ContentStatus) ?? "DRAFT",
    },
  });
}

export async function updateExperience(id: string, portfolioId: string, data: Record<string, unknown>) {
  const existing = await prisma.experience.findFirst({ where: { id, portfolioId } });
  if (!existing) return null;
  return prisma.experience.update({
    where: { id },
    data: {
      ...(data.company !== undefined ? { company: data.company as string } : {}),
      ...(data.position !== undefined ? { position: data.position as string } : {}),
      ...(data.employmentType !== undefined ? { employmentType: data.employmentType as any } : {}),
      ...(data.description !== undefined ? { description: data.description as string | null } : {}),
      ...(data.startDate !== undefined ? { startDate: data.startDate as Date } : {}),
      ...(data.endDate !== undefined ? { endDate: data.endDate as Date | null } : {}),
      ...(data.isCurrent !== undefined ? { isCurrent: data.isCurrent as boolean } : {}),
      ...(data.displayOrder !== undefined ? { displayOrder: data.displayOrder as number } : {}),
      ...(data.status !== undefined ? { status: data.status as ContentStatus } : {}),
    },
  });
}

export async function deleteExperience(id: string, portfolioId: string) {
  const existing = await prisma.experience.findFirst({ where: { id, portfolioId } });
  if (!existing) return false;
  await prisma.experience.delete({ where: { id } });
  return true;
}

export async function reorderExperience(portfolioId: string, ids: string[]) {
  await prisma.$transaction(
    ids.map((id, index) =>
      prisma.experience.updateMany({
        where: { id, portfolioId },
        data: { displayOrder: index },
      }),
    ),
  );
}