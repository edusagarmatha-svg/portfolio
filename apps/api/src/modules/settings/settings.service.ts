import { prisma } from "../../lib/prisma.js";

const PUBLIC_KEYS = ["socialLinks", "sectionVisibility", "seo"];

export async function getSettings(portfolioId: string) {
  const rows = await prisma.siteSetting.findMany({ where: { portfolioId } });
  const out: Record<string, unknown> = {};
  for (const r of rows) out[r.key] = r.value;
  return out;
}

export async function upsertSettings(portfolioId: string, data: Record<string, unknown>) {
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined) continue;
    await prisma.siteSetting.upsert({
      where: { portfolioId_key: { portfolioId, key } },
      update: { value: value as any },
      create: { portfolioId, key, value: value as any },
    });
  }
}

export async function getPublicSettings(portfolioId: string) {
  const rows = await prisma.siteSetting.findMany({
    where: { portfolioId, key: { in: PUBLIC_KEYS } },
  });
  const out: Record<string, unknown> = {};
  for (const r of rows) out[r.key] = r.value;
  return out;
}