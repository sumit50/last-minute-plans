import { prisma } from '../index';
import { getDbPlans, getDbPlanBySlug } from '@/lib/plans/service';
import { recordPlanAttempt } from '@/lib/attempts/service';
import { togglePlanReaction } from '@/lib/reactions/service';
import { evaluateAchievements } from '@/lib/achievements/service';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`❌ TEST FAILED: ${message}`);
  }
  console.log(`  ✓ ${message}`);
}

async function runBackendTests() {
  console.log('🧪 RUNNING BACKEND & DATABASE AUTOMATED TESTS...\n');

  // Test 1: Fetch seeded plans from SQLite database
  const plansResult = await getDbPlans({ limit: 10 });
  assert(plansResult.plans.length >= 5, `Fetched ${plansResult.plans.length} plans from Prisma DB`);

  const firstPlan = plansResult.plans[0];
  assert(firstPlan.title !== undefined, `Plan has title: ${firstPlan.title}`);

  // Test 2: Fetch single plan by slug
  const planBySlug = await getDbPlanBySlug(firstPlan.slug);
  assert(planBySlug !== null && planBySlug.slug === firstPlan.slug, 'Fetched plan details by unique slug');

  // Test 3: Demo user setup check
  const demoUser = await prisma.user.findFirst({ include: { profile: true } });
  assert(demoUser !== null && demoUser.profile !== null, 'Seeded demo user & profile exists in DB');

  // Test 4: Validation Rule - Negative budget rejected
  try {
    await recordPlanAttempt({
      userId: demoUser!.id,
      planId: firstPlan.id,
      actualCost: -100, // Invalid!
      actualDuration: 60,
      rating: 5,
    });
    assert(false, 'Should have thrown error for negative budget');
  } catch (err: any) {
    assert(err.message.includes('Budget cannot be negative'), 'Negative budget correctly rejected by validation');
  }

  // Test 5: Plan Attempt creation & Streak increment
  const initialStreak = demoUser!.profile!.currentStreak;
  const attemptResult = await recordPlanAttempt({
    userId: demoUser!.id,
    planId: firstPlan.id,
    actualCost: 200,
    actualDuration: 60,
    rating: 5,
    review: 'Automated test plan attempt completion!',
  });

  assert(attemptResult.attempt.id !== undefined, 'Created PlanAttempt record');

  const updatedProfile = await prisma.userProfile.findUnique({ where: { userId: demoUser!.id } });
  assert(updatedProfile!.currentStreak === initialStreak + 1, 'Current streak incremented on completion');

  // Test 6: Reaction toggle & Duplicate prevention
  const reactResult1 = await togglePlanReaction(demoUser!.id, firstPlan.id, 'WOULD_DO_AGAIN');
  assert(reactResult1.reacted === true, 'Reaction created');

  const reactResult2 = await togglePlanReaction(demoUser!.id, firstPlan.id, 'WOULD_DO_AGAIN');
  assert(reactResult2.reacted === false, 'Toggling existing reaction removes duplicate');

  // Test 7: Achievement evaluation
  const unlocked = await evaluateAchievements(demoUser!.id);
  assert(Array.isArray(unlocked), 'Achievements evaluated successfully');

  console.log('\n🎉 ALL 7 BACKEND & DATABASE TESTS PASSED!');
}

runBackendTests()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
