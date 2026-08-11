import { prisma } from '@/lib/db';

export async function togglePlanReaction(userId: string, planId: string, type: string) {
  const existing = await prisma.reaction.findUnique({
    where: {
      planId_userId_type: {
        planId,
        userId,
        type,
      },
    },
  });

  if (existing) {
    await prisma.reaction.delete({
      where: { id: existing.id },
    });
    return { reacted: false };
  } else {
    await prisma.reaction.create({
      data: {
        planId,
        userId,
        type,
      },
    });
    return { reacted: true };
  }
}
