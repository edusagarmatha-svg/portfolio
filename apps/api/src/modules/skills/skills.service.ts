import { prisma } from "../../lib/prisma.js";

export async function listSkills(portfolioId: string) {
  return prisma.skill.findMany({
    where: { portfolioId },
    orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
  });
}

export async function getSkill(id: string, portfolioId: string) {
  return prisma.skill.findFirst({ where: { id, portfolioId } });
}

export async function createSkill(portfolioId: string, data: Record<string, unknown>) {
  const max = await prisma.skill.aggregate({ where: { portfolioId }, _max: { displayOrder: true } });
  const nextOrder = (max._max.displayOrder ?? -1) + 1;
  return prisma.skill.create({
    data: {
      portfolioId,
      name: data.name as string,
      category: (data.category as string | null) ?? null,
      proficiency: (data.proficiency as any) ?? null,
      displayOrder: (data.displayOrder as number) ?? nextOrder,
    },
  });
}

export async function updateSkill(id: string, portfolioId: string, data: Record<string, unknown>) {
  const existing = await prisma.skill.findFirst({ where: { id, portfolioId } });
  if (!existing) return null;
  const update: Record<string, unknown> = {};
  if (data.name !== undefined) update.name = data.name;
  if (data.category !== undefined) update.category = data.category;
  if (data.proficiency !== undefined) update.proficiency = data.proficiency;
  if (data.displayOrder !== undefined) update.displayOrder = data.displayOrder;
  return prisma.skill.update({ where: { id }, data: update as any });
}

export async function deleteSkill(id: string, portfolioId: string) {
  const existing = await prisma.skill.findFirst({ where: { id, portfolioId } });
  if (!existing) return false;
  await prisma.skill.delete({ where: { id } });
  return true;
}