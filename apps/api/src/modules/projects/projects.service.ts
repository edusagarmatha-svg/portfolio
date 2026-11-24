import { prisma } from "../../lib/prisma.js";
import type { ContentStatus } from "@prisma/client";

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function listProjects(portfolioId: string, publishedOnly = false) {
  return prisma.project.findMany({
    where: { portfolioId, ...(publishedOnly ? { status: "PUBLISHED" } : {}) },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    include: { images: true },
  });
}

export async function getProject(id: string, portfolioId: string) {
  return prisma.project.findFirst({ where: { id, portfolioId }, include: { images: true } });
}

export async function createProject(portfolioId: string, data: Record<string, unknown>) {
  const max = await prisma.project.aggregate({
    where: { portfolioId },
    _max: { displayOrder: true },
  });
  const nextOrder = (max._max.displayOrder ?? -1) + 1;
  const title = data.title as string;
  const slug = (data.slug as string | undefined)?.trim() || slugify(title);
  // ensure unique slug per portfolio
  let finalSlug = slug;
  let i = 1;
  while (await prisma.project.findUnique({ where: { portfolioId_slug: { portfolioId, slug: finalSlug } } })) {
    finalSlug = `${slug}-${i++}`;
  }
  return prisma.project.create({
    data: {
      portfolioId,
      title,
      slug: finalSlug,
      summary: (data.summary as string | null) ?? null,
      description: (data.description as string | null) ?? null,
      coverImageUrl: (data.coverImageUrl as string | null) ?? null,
      technologies: (data.technologies as string[]) ?? [],
      liveUrl: (data.liveUrl as string | null) ?? null,
      sourceUrl: (data.sourceUrl as string | null) ?? null,
      featured: (data.featured as boolean) ?? false,
      displayOrder: (data.displayOrder as number) ?? nextOrder,
      status: (data.status as ContentStatus) ?? "DRAFT",
    },
    include: { images: true },
  });
}

export async function updateProject(id: string, portfolioId: string, data: Record<string, unknown>) {
  const existing = await prisma.project.findFirst({ where: { id, portfolioId } });
  if (!existing) return null;
  const update: Record<string, unknown> = {};
  if (data.title !== undefined) update.title = data.title;
  if (data.slug !== undefined && data.slug) update.slug = data.slug;
  if (data.summary !== undefined) update.summary = data.summary;
  if (data.description !== undefined) update.description = data.description;
  if (data.coverImageUrl !== undefined) update.coverImageUrl = data.coverImageUrl;
  if (data.technologies !== undefined) update.technologies = data.technologies;
  if (data.liveUrl !== undefined) update.liveUrl = data.liveUrl;
  if (data.sourceUrl !== undefined) update.sourceUrl = data.sourceUrl;
  if (data.featured !== undefined) update.featured = data.featured;
  if (data.displayOrder !== undefined) update.displayOrder = data.displayOrder;
  if (data.status !== undefined) update.status = data.status;
  return prisma.project.update({ where: { id }, data: update as any, include: { images: true } });
}

export async function deleteProject(id: string, portfolioId: string) {
  const existing = await prisma.project.findFirst({ where: { id, portfolioId } });
  if (!existing) return false;
  await prisma.project.delete({ where: { id } });
  return true;
}

export async function reorderProjects(portfolioId: string, ids: string[]) {
  await prisma.$transaction(
    ids.map((id, index) =>
      prisma.project.updateMany({ where: { id, portfolioId }, data: { displayOrder: index } }),
    ),
  );
}