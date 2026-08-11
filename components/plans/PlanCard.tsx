'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plan } from '@/types';
import { isPlanSaved, toggleSavePlan } from '@/lib/utils';
import { useTheme } from '@/components/theme/ThemeProvider';
import { Stamp } from '@/components/ui/Stamp';
import { ArrowRight, Flame, Users, Clock, Bookmark } from 'lucide-react';

interface PlanCardProps {
  plan: Plan;
  onShare?: (plan: Plan) => void;
  index?: number;
}

export function PlanCard({ plan, onShare, index = 0 }: PlanCardProps) {
  const { mode } = useTheme();
  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    setSaved(isPlanSaved(plan.id));
  }, [plan.id]);

  const handleToggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = toggleSavePlan(plan.id);
    setSaved(newState);
  };

  const planNumber = String(index + 14).padStart(3, '0');

  return (
    <div className={`neo-card group relative flex flex-col justify-between p-5 bg-[var(--surface-card)] border border-[var(--border-theme)] shadow-brutal hover:shadow-brutal-lime transition-all h-full text-[var(--fg-main)] ${
      mode === 'offline' ? 'border-2 border-[#1A1A1A]' : ''
    }`}>
      <div>
        {/* Offline Ticket Serial & Stamp */}
        {mode === 'offline' && (
          <div className="flex items-center justify-between mb-2 font-mono text-[10px] font-black border-b border-dashed border-[#1A1A1A] pb-2">
            <span className="text-[var(--muted-text)]">TICKET PLAN #{planNumber}</span>
            <Stamp text="DO THIS IRL" rotation={1} />
          </div>
        )}

        {/* Top Meta Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] font-bold">
            <span className="px-2 py-0.5 border border-[#080808] bg-[#C8FF00] text-[#080808] font-extrabold shadow-brutal-sm">
              {plan.category.replace('_', ' ')}
            </span>
            <span className="bg-[#0055FF] text-white px-2 py-0.5 border border-[#080808] font-extrabold shadow-brutal-sm">
              {plan.budgetLabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSave}
              className={`p-1 border border-[var(--border-theme)] transition-colors ${
                saved ? 'bg-[#FF2A85] text-white border-[#080808]' : 'bg-[var(--surface-secondary)] text-[var(--muted-text)] hover:text-[var(--fg-main)]'
              }`}
              title={saved ? 'Unsave Plan' : 'Save Plan'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-white' : ''}`} />
            </button>

            <span className="bg-[var(--surface-secondary)] text-[var(--fg-main)] border border-[var(--border-theme)] px-2 py-0.5 font-mono text-[10px] font-extrabold tracking-wider">
              📍 {plan.locationCity}
            </span>
          </div>
        </div>

        {/* Cover Image / Visual Accent */}
        {plan.coverImage && (
          <div className="relative w-full h-40 mb-4 border border-[var(--border-theme)] overflow-hidden bg-[#080808]">
            <img
              src={plan.coverImage}
              alt={plan.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute top-2 right-2 bg-[#FF2A85] text-white border border-[#080808] px-2 py-0.5 font-mono text-[10px] font-black shadow-brutal-sm flex items-center gap-1">
              <Flame className="w-3 h-3 fill-white" />
              <span>{plan.ratingPercentage}% WOULD DO</span>
            </div>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-black uppercase tracking-tight text-[var(--fg-main)] leading-tight mb-2 group-hover:text-[#C8FF00] transition-colors">
          {plan.title}
        </h3>

        {/* Description */}
        <p className="font-mono text-xs text-[var(--muted-text)] line-clamp-2 leading-relaxed mb-4">
          {plan.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {plan.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="bg-[var(--surface-secondary)] text-[var(--fg-main)] border border-[var(--border-theme)] px-1.5 py-0.5 font-mono text-[10px] font-bold"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Info & Action */}
      <div className="pt-3 border-t border-[var(--border-theme)] flex items-center justify-between font-mono text-xs font-bold">
        <div className="flex items-center gap-3 text-[var(--muted-text)]">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#FF2A85]" />
            {plan.durationLabel}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-[#0055FF]" />
            {plan.groupSizeLabel}
          </span>
        </div>

        <Link
          href={`/plans/${plan.slug}`}
          className="neo-btn-yellow px-3 py-1.5 text-xs font-black flex items-center gap-1"
        >
          <span>{mode === 'offline' ? 'GO →' : 'VIEW'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
