import { Plan } from '@/types';

export function generateWhatsAppShareUrl(plan: Plan, baseUrl: string = 'https://lastminuteplans.vercel.app'): string {
  const planUrl = `${baseUrl}/plans/${plan.slug}`;
  const text = `Yo! Check out this plan: ${plan.title} (${plan.budgetLabel} • ${plan.durationLabel}). You in? ${planUrl}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function generateGroupInviteText(plan: Plan, baseUrl: string = 'https://lastminuteplans.vercel.app'): string {
  const planUrl = `${baseUrl}/plans/${plan.slug}`;
  return `LAST MINUTE PLANS 🚀\n\nPlan: ${plan.title}\nBudget: ${plan.budgetLabel}\nTime: ${plan.durationLabel}\nLocation: ${plan.locationCity}\n\nWho's in? Join here: ${planUrl}`;
}
