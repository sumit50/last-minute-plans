import { prisma } from '@/lib/db';
import { Plan, CategoryType, GroupSize, EnergyLevel, PlanStep } from '@/types';

export interface PlanFilters {
  category?: string;
  budgetMax?: number;
  durationMax?: number;
  energyLevel?: string;
  city?: string;
  search?: string;
  tag?: string;
  page?: number;
  limit?: number;
}

function mapCategoryToType(slug: string): CategoryType {
  switch (slug) {
    case 'FOOD': return 'WITH_FRIENDS';
    case 'DATE': return 'DATE';
    case 'SOLO': return 'SOLO';
    case 'OUTDOORS': return 'WITH_FRIENDS';
    case 'CHAOS': return 'CHAOS';
    case 'FRIENDS': return 'WITH_FRIENDS';
    default: return 'WITH_FRIENDS';
  }
}

function mapEnergyToType(level: string): EnergyLevel {
  switch (level) {
    case 'LOW': return 'BASICALLY_DEAD';
    case 'MEDIUM': return 'NORMAL_HUMAN';
    case 'HIGH': return 'LETS_GO';
    case 'CHAOTIC': return 'BAD_DECISIONS';
    default: return 'LETS_GO';
  }
}

function mapGroupSizeToType(min: number, max: number): GroupSize {
  if (min === 1 && max === 1) return 'JUST_ME';
  if (min === 2 && max === 2) return '2_PEOPLE';
  if (max <= 5) return '3_5_PEOPLE';
  return 'BIG_GROUP';
}

function formatDbPlan(p: any): Plan {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description,
    category: mapCategoryToType(p.category.slug),
    budget: p.budgetMax,
    budgetLabel: `₹${p.budgetMax} MAX`,
    durationMinutes: p.durationMax,
    durationLabel: `${Math.round(p.durationMax / 60)} HOURS`,
    groupSizeMin: p.groupSizeMin,
    groupSizeMax: p.groupSizeMax,
    groupSizeLabel: `${p.groupSizeMin}-${p.groupSizeMax} PEOPLE`,
    groupSizeType: mapGroupSizeToType(p.groupSizeMin, p.groupSizeMax),
    energyLevel: mapEnergyToType(p.energyLevel),
    locationCity: p.city,
    coverImage: p.coverImage || 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=800&q=80',
    tags: p.tags.map((t: any) => t.tag.name),
    creatorName: p.creator?.name || 'LMP Curator',
    creatorAvatar: p.creator?.avatar || undefined,
    ratingPercentage: Math.min(99, 85 + (p.completionCount % 15)),
    tryCount: p.completionCount,
    rules: [
      `Stay within ₹${p.budgetMax} total budget.`,
      `Finish in approximately ${p.durationMax} minutes.`,
      `Take photos along the way.`,
    ],
    steps: p.steps.map((s: any, idx: number) => ({
      id: s.id,
      stepNumber: s.order || idx + 1,
      title: s.title,
      description: s.description,
      durationMinutes: s.durationMinutes,
    })),
    createdAt: p.createdAt.toISOString(),
  };
}

export async function getDbPlans(filters: PlanFilters = {}) {
  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (filters.city) {
    where.city = { contains: filters.city };
  }
  if (filters.budgetMax !== undefined) {
    where.budgetMax = { lte: filters.budgetMax };
  }
  if (filters.durationMax !== undefined) {
    where.durationMax = { lte: filters.durationMax };
  }
  if (filters.energyLevel) {
    where.energyLevel = filters.energyLevel;
  }
  if (filters.category) {
    where.category = { slug: filters.category };
  }
  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search } },
      { description: { contains: filters.search } },
    ];
  }
  if (filters.tag) {
    where.tags = {
      some: {
        tag: {
          slug: filters.tag.toLowerCase(),
        },
      },
    };
  }

  const [dbPlans, total] = await Promise.all([
    prisma.plan.findMany({
      where,
      skip,
      take: limit,
      include: {
        category: true,
        tags: { include: { tag: true } },
        steps: { orderBy: { order: 'asc' } },
        playlists: { include: { playlist: true } },
        creator: true,
      },
      orderBy: { completionCount: 'desc' },
    }),
    prisma.plan.count({ where }),
  ]);

  const plans: Plan[] = dbPlans.map(formatDbPlan);

  return {
    plans,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getDbPlanBySlug(slug: string): Promise<Plan | null> {
  const p = await prisma.plan.findUnique({
    where: { slug },
    include: {
      category: true,
      tags: { include: { tag: true } },
      steps: { orderBy: { order: 'asc' } },
      playlists: { include: { playlist: true } },
      creator: true,
    },
  });

  if (!p) return null;

  return formatDbPlan(p);
}
