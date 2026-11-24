import { prisma } from "../../lib/prisma.js";

export async function createMessage(portfolioId: string, data: { senderName: string; senderEmail: string; subject?: string | null; message: string }) {
  return prisma.contactMessage.create({
    data: {
      portfolioId,
      senderName: data.senderName,
      senderEmail: data.senderEmail,
      subject: data.subject ?? null,
      message: data.message,
    },
  });
}

export async function listMessages(portfolioId: string) {
  return prisma.contactMessage.findMany({
    where: { portfolioId },
    orderBy: { createdAt: "desc" },
  });
}

export async function setMessageRead(id: string, portfolioId: string, read: boolean) {
  const existing = await prisma.contactMessage.findFirst({ where: { id, portfolioId } });
  if (!existing) return null;
  return prisma.contactMessage.update({
    where: { id },
    data: { readAt: read ? new Date() : null },
  });
}

export async function deleteMessage(id: string, portfolioId: string) {
  const existing = await prisma.contactMessage.findFirst({ where: { id, portfolioId } });
  if (!existing) return false;
  await prisma.contactMessage.delete({ where: { id } });
  return true;
}