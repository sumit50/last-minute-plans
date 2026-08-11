import { prisma } from '@/lib/db';

export async function getUserProfileData(userId?: string) {
  let user = null;

  if (userId) {
    user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        achievements: { include: { achievement: true } },
        attempts: { include: { plan: true } },
        savedPlans: { include: { plan: { include: { category: true } } } },
      },
    });
  }

  // Fallback to first seeded demo user if unauthenticated
  if (!user) {
    user = await prisma.user.findFirst({
      include: {
        profile: true,
        achievements: { include: { achievement: true } },
        attempts: { include: { plan: true } },
        savedPlans: { include: { plan: { include: { category: true } } } },
      },
    });
  }

  if (!user || !user.profile) {
    return {
      name: 'Simran Sharma',
      username: 'simran_chd',
      city: 'Chandigarh',
      totalPlansCompleted: 4,
      totalMoneySpent: 900,
      currentStreak: 3,
      longestStreak: 5,
      achievements: ['🥟 MOMO MASTER', '🌙 NIGHT OWL', '💀 CHAOTIC GOOD', '☕ CHAI CONNOISSEUR'],
      savedPlans: [],
    };
  }

  return {
    id: user.id,
    name: user.name,
    username: user.username,
    city: user.profile.city,
    totalPlansCompleted: user.profile.totalPlansCompleted,
    totalMoneySpent: user.profile.totalMoneySpent,
    currentStreak: user.profile.currentStreak,
    longestStreak: user.profile.longestStreak,
    achievements: user.achievements.map((a) => a.achievement.title),
    savedPlans: user.savedPlans.map((sp) => ({
      id: sp.plan.id,
      slug: sp.plan.slug,
      title: sp.plan.title,
      description: sp.plan.description,
      budgetLabel: `₹${sp.plan.budgetMax} MAX`,
      durationLabel: `${Math.round(sp.plan.durationMax / 60)} HOURS`,
      locationCity: sp.plan.city,
    })),
  };
}
