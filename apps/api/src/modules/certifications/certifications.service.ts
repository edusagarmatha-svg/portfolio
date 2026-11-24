import { prisma } from "../../lib/prisma.js";
import type { ContentStatus } from "@prisma/client";

export async function listCertifications(portfolioId: string, publishedOnly = false) {
  return prisma.certification.findMany({
    where: { portfolioId, ...(publishedOnly ? { status: "PUBLISHED" } : {}) },
    orderBy: [{ displayOrder: "asc" }, { issueDate: "desc" }],
  });
}

export async function getCertification(id: string, portfolioId: string) {
  return prisma.certification.findFirst({ where: { id, portfolioId } });
}

export async function createCertification(portfolioId: string, data: Record<string, unknown>) {
  const max = await prisma.certification.aggregate({ where: { portfolioId }, _max: { displayOrder: true } });
  const nextOrder = (max._max.displayOrder ?? -1) + 1;
  return prisma.certification.create({
    data: {
      portfolioId,
      title: data.title as string,
      issuer: data.issuer as string,
      issueDate: data.issueDate as Date,
      credentialUrl: (data.credentialUrl as string | null) ?? null,
      certificateUrl: (data.certificateUrl as string | null) ?? null,
      displayOrder: (data.displayOrder as number) ?? nextOrder,
      status: (data.status as ContentStatus) ?? "DRAFT",
    },
  });
}

export async function updateCertification(id: string, portfolioId: string, data: Record<string, unknown>) {
  const existing = await prisma.certification.findFirst({ where: { id, portfolioId } });
  if (!existing) return null;
  const update: Record<string, unknown> = {};
  if (data.title !== undefined) update.title = data.title;
  if (data.issuer !== undefined) update.issuer = data.issuer;
  if (data.issueDate !== undefined) update.issueDate = data.issueDate;
  if (data.credentialUrl !== undefined) update.credentialUrl = data.credentialUrl;
  if (data.certificateUrl !== undefined) update.certificateUrl = data.certificateUrl;
  if (data.displayOrder !== undefined) update.displayOrder = data.displayOrder;
  if (data.status !== undefined) update.status = data.status;
  return prisma.certification.update({ where: { id }, data: update as any });
}

export async function deleteCertification(id: string, portfolioId: string) {
  const existing = await prisma.certification.findFirst({ where: { id, portfolioId } });
  if (!existing) return false;
  await prisma.certification.delete({ where: { id } });
  return true;
}