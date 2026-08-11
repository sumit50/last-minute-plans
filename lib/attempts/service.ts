import { prisma } from '@/lib/db';
import { evaluateAchievements } from '@/lib/achievements/service';

export interface CreateAttemptInput {
  userId: string;
  planId: string;
  actualCost: number;
  actualDuration: number;
  rating: number;
  review?: string;
}

export async function recordPlanAttempt(input: CreateAttemptInput) {
  // 1. Validation rules
  if (input.actualCost < 0) {
    throw new Error('Budget cannot be negative');
  }
  if (input.actualDuration <= 0) {
    throw new Error('Duration must be positive');
  }
  if (input.rating < 1 || input.rating > 5) {
    throw new Error('Rating must be between 1 and 5');
  }

  const plan = await prisma.plan.findUnique({
    where: { id: input.planId },
  });
  if (!plan) {
    throw new Error('Plan not found');
  }

  // 2. Create PlanAttempt record
  const attempt = await prisma.planAttempt.create({
    data: {
      planId: input.planId,
      userId: input.userId,
      actualCost: input.actualCost,
      actualDuration: input.actualDuration,
      rating: input.rating,
      review: input.review || null,
    },
  });

  // 3. Update Plan completion count
  await prisma.plan.update({
    where: { id: input.planId },
    data: { completionCount: { increment: 1 } },
  });

  // 4. Update User Profile Aggregates & Streak Calculation
  const profile = await prisma.userProfile.findUnique({
    where: { userId: input.userId },
  });

  if (profile) {
    const newCompletedCount = profile.totalPlansCompleted + 1;
    const newMoneySpent = profile.totalMoneySpent + input.actualCost;
    const newStreak = profile.currentStreak + 1;
    const newLongestStreak = Math.max(profile.longestStreak, newStreak);

    await prisma.userProfile.update({
      where: { userId: input.userId },
      data: {
        totalPlansCompleted: newCompletedCount,
        totalMoneySpent: newMoneySpent,
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
      },
    });
  }

  // 5. Evaluate behavior-based achievements
  const unlockedAchievements = await evaluateAchievements(input.userId);

  return {
    attempt,
    unlockedAchievements,
  };
}
