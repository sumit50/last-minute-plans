'use client';

import React from 'react';
import { Plan } from '@/types';
import { LMPPoster } from '@/components/ui/LMPPoster';
import { Flame, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface TonightTrackSectionProps {
  plans: Plan[];
}

export function TonightTrackSection({ plans }: TonightTrackSectionProps) {
  const displayPlans = plans.slice(0, 5);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[var(--border-theme)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="w-7 h-7 text-[#FF2A85] fill-[#FF2A85]" />
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--fg-main)]">
              WHAT ARE PEOPLE DOING TONIGHT?
            </h2>
          </div>
          <p className="font-mono text-xs text-[var(--muted-text)] font-extrabold">
            Horizontal editorial track • High-vibe local missions in Chandigarh
          </p>
        </div>

        <Link
          href="/discover"
          className="font-mono text-xs font-black text-[#0055FF] dark:text-[#C8FF00] flex items-center gap-1 hover:underline"
        >
          <span>VIEW DISCOVERY ARCHIVE ({plans.length})</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Editorial Horizontal Track Container */}
      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin snap-x snap-mandatory">
        {displayPlans.map((plan, idx) => (
          <div
            key={plan.id}
            className="flex-shrink-0 w-[300px] sm:w-[380px] snap-start"
          >
            <LMPPoster plan={plan} index={idx} featured={idx === 0} />
          </div>
        ))}
      </div>
    </section>
  );
}
