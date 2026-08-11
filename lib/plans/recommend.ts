import { Plan, Playlist, EnergyLevel } from '@/types';
import { INITIAL_PLANS } from '@/lib/mock-data';
import { musicProvider } from '@/lib/music/music-provider';

export type EnergyType = 'LOW' | 'MEDIUM' | 'HIGH' | 'CHAOTIC';

export interface NormalizedPreferences {
  location: {
    city: string;
    lat?: number;
    lng?: number;
  };
  people: number;
  budget: number;
  energy: EnergyType;
  durationMinutes: number;
  timeOfDay?: 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT';
}

export interface RecommendationResult {
  plan: Plan;
  score: number;
  reasons: string[];
  soundtrack?: Playlist | null;
  alternatives: Plan[];
  filtersRelaxed?: boolean;
  relaxedReasons?: string[];
}

export function mapEnergyLevel(level: string): EnergyType {
  switch (level) {
    case 'BASICALLY_DEAD':
    case 'LOW':
      return 'LOW';
    case 'NORMAL_HUMAN':
    case 'MEDIUM':
      return 'MEDIUM';
    case 'LETS_GO':
    case 'HIGH':
      return 'HIGH';
    case 'BAD_DECISIONS':
    case 'CHAOTIC':
      return 'CHAOTIC';
    default:
      return 'HIGH';
  }
}

export function mapGroupSizeToCount(groupSize: string): number {
  switch (groupSize) {
    case 'JUST_ME': return 1;
    case '2_PEOPLE': return 2;
    case '3_5_PEOPLE': return 4;
    case 'BIG_GROUP': return 8;
    default: return 2;
  }
}

/** Pure 100-point scoring algorithm */
export function scorePlan(plan: Plan, prefs: NormalizedPreferences): number {
  let score = 0;

  // 1. Budget Fit (0 - 25 points)
  if (plan.budget <= prefs.budget) {
    score += 25;
  } else if (plan.budget <= prefs.budget + 150) {
    score += 15;
  } else if (plan.budget <= prefs.budget + 300) {
    score += 10;
  } else {
    score += 0;
  }

  // 2. Group Size Fit (0 - 20 points)
  if (prefs.people >= plan.groupSizeMin && prefs.people <= plan.groupSizeMax) {
    score += 20;
  } else if (Math.abs(prefs.people - plan.groupSizeMin) <= 1 || Math.abs(prefs.people - plan.groupSizeMax) <= 1) {
    score += 12;
  } else {
    score += 5;
  }

  // 3. Duration Fit (0 - 15 points)
  const durationDiff = Math.abs(plan.durationMinutes - prefs.durationMinutes);
  if (durationDiff <= 20) {
    score += 15;
  } else if (durationDiff <= 45) {
    score += 10;
  } else {
    score += 5;
  }

  // 4. Energy Fit (0 - 15 points)
  const planEnergy = mapEnergyLevel(plan.energyLevel);
  if (planEnergy === prefs.energy) {
    score += 15;
  } else {
    const energies: EnergyType[] = ['LOW', 'MEDIUM', 'HIGH', 'CHAOTIC'];
    const idx1 = energies.indexOf(planEnergy);
    const idx2 = energies.indexOf(prefs.energy);
    if (Math.abs(idx1 - idx2) === 1) {
      score += 8;
    } else {
      score += 0;
    }
  }

  // 5. Location Fit (0 - 20 points)
  const prefCity = prefs.location.city.toLowerCase();
  const planCity = plan.locationCity.toLowerCase();
  if (planCity === prefCity) {
    score += 20;
  } else if (planCity.includes('chandigarh') || planCity.includes('mohali')) {
    score += 15;
  } else {
    score += 5;
  }

  // 6. Community Signal (0 - 5 points)
  const ratingScore = Math.min(5, Math.round((plan.ratingPercentage / 100) * 5));
  score += ratingScore;

  return Math.min(100, Math.max(0, score));
}

/** Converts math into human copy */
export function generateHumanReasons(plan: Plan, prefs: NormalizedPreferences): string[] {
  const reasons: string[] = [];

  if (plan.budget <= prefs.budget) {
    reasons.push(`✓ Fits your ₹${prefs.budget} budget (${plan.budgetLabel})`);
  } else {
    reasons.push(`✓ Close to your budget (${plan.budgetLabel})`);
  }

  if (prefs.people >= plan.groupSizeMin && prefs.people <= plan.groupSizeMax) {
    reasons.push(`✓ Designed for your squad (${plan.groupSizeLabel})`);
  } else {
    reasons.push(`✓ Accommodates ${prefs.people} human(s)`);
  }

  const planEnergy = mapEnergyLevel(plan.energyLevel);
  if (planEnergy === prefs.energy) {
    reasons.push(`✓ Matches your ${prefs.energy} energy level`);
  } else {
    reasons.push(`✓ Good fit for your energy level`);
  }

  reasons.push(`✓ Takes about ${plan.durationMinutes} minutes`);
  reasons.push(`✓ Located in ${plan.locationCity}`);

  if (plan.ratingPercentage >= 85) {
    reasons.push(`✓ Community favorite (${plan.ratingPercentage}% positive)`);
  }

  return reasons;
}

/** Core Recommendation Service */
export async function getBestPlan(
  prefs: NormalizedPreferences,
  excludedIds: string[] = []
): Promise<RecommendationResult> {
  const allPlans = INITIAL_PLANS;

  // 1. Hard Filtering
  let validPlans = allPlans.filter((p) => {
    // Exclude previously shown
    if (excludedIds.includes(p.id)) return false;
    // Hard budget filter
    if (p.budget > prefs.budget + 300) return false;
    // Hard group size max filter (unless big group)
    if (prefs.people > p.groupSizeMax && p.groupSizeMax < 8) return false;
    // Hard duration max filter
    if (p.durationMinutes > prefs.durationMinutes + 60) return false;

    return true;
  });

  let filtersRelaxed = false;
  const relaxedReasons: string[] = [];

  // Fallback Relaxation Strategy if zero plans match
  if (validPlans.length === 0) {
    filtersRelaxed = true;
    relaxedReasons.push("We couldn't find an exact match, so we bent the rules a little:");

    validPlans = allPlans.filter((p) => !excludedIds.includes(p.id));
    if (validPlans.length === 0) {
      validPlans = allPlans; // Reset excluded if all exhausted
    }
  }

  // 2. Score & Rank Plans
  const scored = validPlans.map((plan) => ({
    plan,
    score: scorePlan(plan, prefs),
    reasons: generateHumanReasons(plan, prefs),
  }));

  scored.sort((a, b) => b.score - a.score);

  const topMatch = scored[0];
  const alternatives = scored.slice(1, 4).map((s) => s.plan);

  // 3. Match Soundtrack
  const soundtrack = await musicProvider.getPlaylistForPlan(topMatch.plan.slug);

  return {
    plan: topMatch.plan,
    score: topMatch.score,
    reasons: topMatch.reasons,
    soundtrack,
    alternatives,
    filtersRelaxed,
    relaxedReasons,
  };
}
