'use client';

import React from 'react';
import Link from 'next/link';
import { Plan } from '@/types';
import { useTheme } from '@/components/theme/ThemeProvider';
import { Stamp } from '@/components/ui/Stamp';
import { Flame, Clock, Users, ArrowRight } from 'lucide-react';

interface LMPPosterProps {
  plan: Plan;
  index?: number;
  featured?: boolean;
}

export function LMPPoster({ plan, index = 0, featured = false }: LMPPosterProps) {
  const { mode } = useTheme();
  const posterNumber = String(index + 1).padStart(3, '0');

  return (
    <div
      data-cursor="VIEW"
      className={`neo-card group relative flex flex-col justify-between p-6 bg-[var(--surface-card)] border-2 border-[var(--border-high)] shadow-brutal hover:shadow-brutal-lime transition-all h-full text-[var(--fg-main)] ${
        featured ? 'lg:col-span-2 bg-gradient-to-br from-[var(--surface-card)] to-[var(--surface-secondary)]' : ''
      }`}
    >
      {/* Poster Top Serial & Stamp */}
      <div className="flex items-center justify-between font-mono text-[10px] font-black border-b border-dashed border-[var(--border-theme)] pb-3 mb-4">
        <span className="text-[var(--muted-text)] uppercase tracking-widest">
          POSTER #{posterNumber} • CHD
        </span>
        {mode === 'offline' ? (
          <Stamp text="DO THIS IRL" variant="red" rotation={-1} />
        ) : (
          <span className="bg-[#C8FF00] text-[#080808] px-2 py-0.5 border border-[#080808] font-black uppercase">
            {plan.category.replace('_', ' ')}
          </span>
        )}
      </div>

      {/* Main Image Artwork with Geometric Crop */}
      {plan.coverImage && (
        <div className="relative w-full h-52 sm:h-64 border border-[var(--border-theme)] overflow-hidden bg-[#080808] mb-5 group-hover:border-[#C8FF00] transition-colors">
          <img
            src={plan.coverImage}
            alt={plan.title}
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2 right-2 bg-[#FF2A85] text-white border border-[#080808] px-2 py-0.5 font-mono text-[10px] font-black shadow-brutal-sm flex items-center gap-1">
            <Flame className="w-3 h-3 fill-white" />
            <span>{plan.ratingPercentage}% WOULD DO</span>
          </div>
          <div className="absolute bottom-2 left-2 bg-[#080808]/90 text-[#C8FF00] border border-[#080808] px-2 py-0.5 font-mono text-[10px] font-black">
            {plan.locationCity}
          </div>
        </div>
      )}

      {/* Poster Title */}
      <div className="space-y-2 mb-4">
        <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--fg-main)] leading-none group-hover:text-[#C8FF00] transition-colors">
          {plan.title}
        </h3>
        <p className="font-mono text-xs text-[var(--muted-text)] line-clamp-2 leading-relaxed font-extrabold">
          {plan.description}
        </p>
      </div>

      {/* Metadata Pill Bar */}
      <div className="pt-4 border-t border-[var(--border-theme)] flex items-center justify-between font-mono text-xs font-black">
        <div className="flex items-center gap-3 text-[var(--muted-text)]">
          <span className="text-[#0055FF] dark:text-[#C8FF00]">{plan.budgetLabel}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#FF2A85]" />
            {plan.durationLabel}
          </span>
        </div>

        <Link
          href={`/plans/${plan.slug}`}
          className="neo-btn-yellow px-4 py-2 text-xs font-black flex items-center gap-1 uppercase"
        >
          <span>[ EXPLORE → ]</span>
        </Link>
      </div>
    </div>
  );
}
