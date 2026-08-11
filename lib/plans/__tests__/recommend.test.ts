import { scorePlan, getBestPlan, NormalizedPreferences, mapEnergyLevel } from '../recommend';
import { INITIAL_PLANS } from '../../mock-data';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`❌ TEST FAILED: ${message}`);
  }
  console.log(`  ✓ ${message}`);
}

async function runRecommendationTests() {
  console.log('🧪 RUNNING RECOMMENDATION ENGINE UNIT TESTS...\n');

  // Test 1: Energy mapping
  assert(mapEnergyLevel('BASICALLY_DEAD') === 'LOW', 'Maps BASICALLY_DEAD to LOW');
  assert(mapEnergyLevel('LETS_GO') === 'HIGH', 'Maps LETS_GO to HIGH');

  // Test 2: Scoring function
  const samplePlan = INITIAL_PLANS[0];
  const perfectPrefs: NormalizedPreferences = {
    location: { city: 'Chandigarh' },
    people: samplePlan.groupSizeMin,
    budget: samplePlan.budget,
    energy: mapEnergyLevel(samplePlan.energyLevel),
    durationMinutes: samplePlan.durationMinutes,
  };

  const perfectScore = scorePlan(samplePlan, perfectPrefs);
  assert(perfectScore >= 85, `Perfect match score should be >= 85 (got ${perfectScore})`);

  // Test 3: Budget penalty
  const poorBudgetPrefs: NormalizedPreferences = {
    ...perfectPrefs,
    budget: 0, // Plan budget is higher
  };
  const poorScore = scorePlan(samplePlan, poorBudgetPrefs);
  assert(poorScore < perfectScore, 'Lower budget yields lower score');

  // Test 4: Get best plan result
  const result = await getBestPlan(perfectPrefs);
  assert(result.plan !== null, 'Returns a valid top plan');
  assert(result.reasons.length >= 3, 'Generates human-friendly reasons');
  assert(result.score > 0, 'Computes a positive score');

  // Test 5: Exclude previous result ("Give me another")
  const firstPlanId = result.plan.id;
  const result2 = await getBestPlan(perfectPrefs, [firstPlanId]);
  assert(result2.plan.id !== firstPlanId, 'Excludes previously shown plan ID on "Give me another"');

  // Test 6: Fallback relaxation strategy
  const impossiblePrefs: NormalizedPreferences = {
    location: { city: 'NonExistentCity' },
    people: 99,
    budget: 0,
    energy: 'LOW',
    durationMinutes: 5,
  };
  const fallbackResult = await getBestPlan(impossiblePrefs);
  assert(fallbackResult.plan !== null, 'Returns fallback plan when filters are impossible');
  assert(fallbackResult.filtersRelaxed === true, 'Sets filtersRelaxed flag to true');

  console.log('\n🎉 ALL 6 RECOMMENDATION ENGINE TESTS PASSED!');
}

runRecommendationTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
