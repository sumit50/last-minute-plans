import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { EnergyLevel, GroupSize, ReactionType } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  if (amount === 0) return '₹0 (FREE)';
  return `₹${amount}`;
}

export function getEnergyBadge(energy: EnergyLevel) {
  switch (energy) {
    case 'BASICALLY_DEAD':
      return { label: "🛋️ BASICALLY DEAD", color: "bg-gray-800 text-gray-200" };
    case 'NORMAL_HUMAN':
      return { label: "🚶 NORMAL HUMAN", color: "bg-blue-950 text-blue-300 border-blue-600" };
    case 'LETS_GO':
      return { label: "🔥 LET'S GO", color: "bg-[#E6FF00] text-[#0A0A0A] border-black" };
    case 'BAD_DECISIONS':
      return { label: "💀 BAD DECISIONS", color: "bg-[#FF2A85] text-white border-black" };
  }
}

export function getGroupBadge(group: GroupSize) {
  switch (group) {
    case 'JUST_ME':
      return '👤 JUST ME';
    case '2_PEOPLE':
      return '👥 2 PEOPLE';
    case '3_5_PEOPLE':
      return '💥 3-5 PEOPLE';
    case 'BIG_GROUP':
      return '🚀 THE WHOLE GANG';
    case 'ITS_COMPLICATED':
      return '💀 IT\'S COMPLICATED';
  }
}

export function getReactionLabel(type: ReactionType): { emoji: string; text: string } {
  switch (type) {
    case 'WOULD_DO_AGAIN':
      return { emoji: '🔥', text: 'WOULD DO AGAIN' };
    case 'NEVER_AGAIN':
      return { emoji: '💀', text: 'NEVER AGAIN' };
    case 'ACTUALLY_FUN':
      return { emoji: '😭', text: 'ACTUALLY FUN' };
    case 'TERRIBLE_IDEA':
      return { emoji: '🤡', text: 'TERRIBLE IDEA' };
    case 'SAVED':
      return { emoji: '❤️', text: 'SAVED' };
    case 'NEED_TO_TRY':
      return { emoji: '👀', text: 'NEED TO TRY' };
  }
}

export function getCategoryBadgeColor(category: string): string {
  switch (category) {
    case 'WITH_FRIENDS':
      return 'bg-[#E6FF00] text-[#0A0A0A]';
    case 'DATE':
      return 'bg-[#FF2A85] text-white';
    case 'SOLO':
      return 'bg-[#0055FF] text-white';
    case 'AT_HOME':
      return 'bg-purple-600 text-white';
    case 'CHAOS':
      return 'bg-[#FF6B00] text-white';
    default:
      return 'bg-[#E6FF00] text-[#0A0A0A]';
  }
}

/* Saved Plans Local Storage Helpers */
export function getSavedPlanIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('lmp_saved_plans');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function isPlanSaved(planId: string): boolean {
  return getSavedPlanIds().includes(planId);
}

export function toggleSavePlan(planId: string): boolean {
  if (typeof window === 'undefined') return false;
  const current = getSavedPlanIds();
  let updated: string[];
  let isSavedNow = false;
  if (current.includes(planId)) {
    updated = current.filter(id => id !== planId);
    isSavedNow = false;
  } else {
    updated = [...current, planId];
    isSavedNow = true;
  }
  localStorage.setItem('lmp_saved_plans', JSON.stringify(updated));
  return isSavedNow;
}
