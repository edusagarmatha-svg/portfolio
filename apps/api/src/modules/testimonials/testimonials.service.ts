import { prisma } from "../../lib/prisma.js";
import type { ContentStatus } from "@prisma/client";

export async function listTestimonials(portfolioId: string, publishedOnly = false) {
  return prisma.testimonial.findMany({
    where: { portfolioId, ...(publishedOnly ? { status: "PUBLISHED" } : {}) },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });
}
export async function getTestimonial(id: string, portfolioId: string) {
  return prisma.testimonial.findFirst({ where: { id, portfolioId } });
}
export async function createTestimonial(portfolioId: string, data: Record<string, unknown>) {
  const max = await prisma.testimonial.aggregate({ where: { portfolioId }, _max: { displayOrder: true } });
  const nextOrder = (max._max.displayOrder ?? -1) + 1;
  return prisma.testimonial.create({
    data: {
      portfolioId,
      clientName: data.clientName as string,
      clientRole: (data.clientRole as string | null) ?? null,
      organization: (data.organization as string | null) ?? null,
      feedback: data.feedback as string,
      photoUrl: (data.photoUrl as string | null) ?? null,
      displayOrder: (data.displayOrder as number) ?? nextOrder,
      status: (data.status as ContentStatus) ?? "DRAFT",
    },
  });
}
export async function updateTestimonial(id: string, portfolioId: string, data: Record<string, unknown>) {
  const existing = await prisma.testimonial.findFirst({ where: { id, portfolioId } });
  if (!existing) return null;
  const update: Record<string, unknown> = {};
  if (data.clientName !== undefined) update.clientName = data.clientName;
  if (data.clientRole !== undefined) update.clientRole = data.clientRole;
  if (data.organization !== undefined) update.organization = data.organization;
  if (data.feedback !== undefined) update.feedback = data.feedback;
  if (data.photoUrl !== undefined) update.photoUrl = data.photoUrl;
  if (data.displayOrder !== undefined) update.displayOrder = data.displayOrder;
  if (data.status !== undefined) update.status = data.status;
  return prisma.testimonial.update({ where: { id }, data: update as any });
}
export async function deleteTestimonial(id: string, portfolioId: string) {
  const existing = await prisma.testimonial.findFirst({ where: { id, portfolioId } });
  if (!existing) return false;
  await prisma.testimonial.delete({ where: { id } });
  return true;
}