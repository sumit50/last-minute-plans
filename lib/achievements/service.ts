import { prisma } from '@/lib/db';

export async function evaluateAchievements(userId: string): Promise<string[]> {
  const unlocked: string[] = [];

  const [userProfile, attempts, existingUnlocks] = await Promise.all([
    prisma.userProfile.findUnique({ where: { userId } }),
    prisma.planAttempt.findMany({
      where: { userId },
      include: { plan: { include: { category: true } } },
    }),
    prisma.userAchievement.findMany({
      where: { userId },
      include: { achievement: true },
    }),
  ]);

  const unlockedCodes = new Set(existingUnlocks.map((u) => u.achievement.code));

  // Achievement 1: MOMO MASTER (3+ food attempts)
  if (!unlockedCodes.has('MOMO_MASTER')) {
    const foodCount = attempts.filter(
      (a) => a.plan.category.slug === 'FOOD' || a.plan.title.toLowerCase().includes('momo')
    ).length;
    if (foodCount >= 2) {
      await unlockUserAchievement(userId, 'MOMO_MASTER');
      unlocked.push('MOMO_MASTER');
    }
  }

  // Achievement 2: NIGHT OWL (Late night plan completed)
  if (!unlockedCodes.has('NIGHT_OWL')) {
    const nightAttempts = attempts.filter((a) => a.plan.bestTime === 'NIGHT');
    if (nightAttempts.length >= 1) {
      await unlockUserAchievement(userId, 'NIGHT_OWL');
      unlocked.push('NIGHT_OWL');
    }
  }

  // Achievement 3: CHAOTIC GOOD (Completed chaotic plan)
  if (!unlockedCodes.has('CHAOTIC_GOOD')) {
    const chaoticAttempts = attempts.filter((a) => a.plan.energyLevel === 'CHAOTIC' || a.plan.category.slug === 'CHAOS');
    if (chaoticAttempts.length >= 1) {
      await unlockUserAchievement(userId, 'CHAOTIC_GOOD');
      unlocked.push('CHAOTIC_GOOD');
    }
  }

  // Achievement 4: CHAI CONNOISSEUR (Logged 2+ chai plans)
  if (!unlockedCodes.has('CHAI_CONNOISSEUR')) {
    const chaiAttempts = attempts.filter((a) => a.plan.title.toLowerCase().includes('chai'));
    if (chaiAttempts.length >= 1) {
      await unlockUserAchievement(userId, 'CHAI_CONNOISSEUR');
      unlocked.push('CHAI_CONNOISSEUR');
    }
  }

  return unlocked;
}

async function unlockUserAchievement(userId: string, code: string) {
  const ach = await prisma.achievement.findUnique({ where: { code } });
  if (!ach) return;

  await prisma.userAchievement.upsert({
    where: {
      userId_achievementId: {
        userId,
        achievementId: ach.id,
      },
    },
    update: {},
    create: {
      userId,
      achievementId: ach.id,
    },
  });
}
