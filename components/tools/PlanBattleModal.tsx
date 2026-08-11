'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plan } from '@/types';
import { X, Swords, Trophy, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface PlanBattleModalProps {
  isOpen: boolean;
  plans: Plan[];
  onClose: () => void;
}

export function PlanBattleModal({ isOpen, plans, onClose }: PlanBattleModalProps) {
  const [winner, setWinner] = useState<Plan | null>(null);

  if (!isOpen || plans.length < 2) return null;

  const planA = plans[0];
  const planB = plans[1];

  const handlePick = (selected: Plan) => {
    setWinner(selected);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0A]/95 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-3xl bg-[var(--surface-card)] border-4 border-[var(--border-high)] shadow-brutal-yellow p-6 sm:p-8 text-[var(--fg-main)] space-y-6"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#FF2A85] text-white border-2 border-[#0A0A0A] shadow-brutal-sm hover:translate-x-[-1px] transition-transform"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 border-b border-[var(--border-theme)] pb-4">
          <Swords className="w-6 h-6 text-[#FF2A85]" />
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight">PLAN BATTLE: PICK ONE</h2>
            <p className="font-mono text-xs text-[var(--muted-text)] font-extrabold">Can't agree with the squad? Settle it right here.</p>
          </div>
        </div>

        {winner ? (
          <div className="text-center space-y-6 py-6 bg-[var(--surface-secondary)] border-2 border-[#C8FF00] p-8 shadow-brutal-lime">
            <div className="w-16 h-16 bg-[#C8FF00] text-[#080808] border-2 border-[#080808] shadow-brutal-sm mx-auto flex items-center justify-center">
              <Trophy className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#FF2A85] font-black uppercase">THE SQUAD HAS SPOKEN</span>
              <h3 className="text-4xl font-black uppercase text-[var(--fg-main)]">{winner.title} WINS!</h3>
              <p className="font-mono text-xs text-[var(--muted-text)] font-bold">{winner.budgetLabel} • {winner.durationLabel} • {winner.locationCity}</p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <Link
                href={`/plans/${winner.slug}`}
                className="neo-btn-yellow px-6 py-3 font-mono text-xs font-black uppercase"
              >
                [ GO TO WINNING MISSION → ]
              </Link>
              <button
                onClick={() => setWinner(null)}
                className="neo-btn-pink px-4 py-3 font-mono text-xs font-black uppercase"
              >
                BATTLE AGAIN
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {/* VS Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF2A85] text-white border-2 border-[#080808] px-3 py-1 font-mono text-xs font-black z-10 shadow-brutal-sm hidden md:block">
              VS
            </div>

            {/* Plan A */}
            <div className="bg-[var(--surface-secondary)] border-2 border-[var(--border-theme)] p-6 space-y-4 text-left flex flex-col justify-between">
              <div className="space-y-2">
                <span className="neo-badge bg-[#0055FF] text-white">PLAN A</span>
                <h3 className="text-2xl font-black uppercase">{planA.title}</h3>
                <p className="font-mono text-xs text-[var(--muted-text)] line-clamp-2">{planA.description}</p>
                <div className="font-mono text-xs font-black text-[#C8FF00]">{planA.budgetLabel} • {planA.durationLabel}</div>
              </div>
              <button
                onClick={() => handlePick(planA)}
                className="neo-btn-yellow w-full py-3 font-mono text-xs font-black uppercase"
              >
                [ CHOOSE PLAN A ]
              </button>
            </div>

            {/* Plan B */}
            <div className="bg-[var(--surface-secondary)] border-2 border-[var(--border-theme)] p-6 space-y-4 text-left flex flex-col justify-between">
              <div className="space-y-2">
                <span className="neo-badge bg-[#FF2A85] text-white">PLAN B</span>
                <h3 className="text-2xl font-black uppercase">{planB.title}</h3>
                <p className="font-mono text-xs text-[var(--muted-text)] line-clamp-2">{planB.description}</p>
                <div className="font-mono text-xs font-black text-[#C8FF00]">{planB.budgetLabel} • {planB.durationLabel}</div>
              </div>
              <button
                onClick={() => handlePick(planB)}
                className="neo-btn-pink w-full py-3 font-mono text-xs font-black uppercase"
              >
                [ CHOOSE PLAN B ]
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
