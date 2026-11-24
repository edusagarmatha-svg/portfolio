import { prisma } from "../../lib/prisma.js";

export async function listEducation(portfolioId: string) {
  return prisma.education.findMany({
    where: { portfolioId },
    orderBy: [{ displayOrder: "asc" }, { startDate: "desc" }],
  });
}

export async function getEducation(id: string, portfolioId: string) {
  return prisma.education.findFirst({ where: { id, portfolioId } });
}

export async function createEducation(portfolioId: string, data: Record<string, unknown>) {
  const max = await prisma.education.aggregate({ where: { portfolioId }, _max: { displayOrder: true } });
  const nextOrder = (max._max.displayOrder ?? -1) + 1;
  return prisma.education.create({
    data: {
      portfolioId,
      institution: data.institution as string,
      qualification: data.qualification as string,
      fieldOfStudy: (data.fieldOfStudy as string | null) ?? null,
      description: (data.description as string | null) ?? null,
      startDate: data.startDate as Date,
      endDate: (data.endDate as Date | null) ?? null,
      displayOrder: (data.displayOrder as number) ?? nextOrder,
    },
  });
}

export async function updateEducation(id: string, portfolioId: string, data: Record<string, unknown>) {
  const existing = await prisma.education.findFirst({ where: { id, portfolioId } });
  if (!existing) return null;
  const update: Record<string, unknown> = {};
  if (data.institution !== undefined) update.institution = data.institution;
  if (data.qualification !== undefined) update.qualification = data.qualification;
  if (data.fieldOfStudy !== undefined) update.fieldOfStudy = data.fieldOfStudy;
  if (data.description !== undefined) update.description = data.description;
  if (data.startDate !== undefined) update.startDate = data.startDate;
  if (data.endDate !== undefined) update.endDate = data.endDate;
  if (data.displayOrder !== undefined) update.displayOrder = data.displayOrder;
  return prisma.education.update({ where: { id }, data: update as any });
}

export async function deleteEducation(id: string, portfolioId: string) {
  const existing = await prisma.education.findFirst({ where: { id, portfolioId } });
  if (!existing) return false;
  await prisma.education.delete({ where: { id } });
  return true;
}