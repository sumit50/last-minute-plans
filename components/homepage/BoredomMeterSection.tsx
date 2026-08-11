'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Zap, Compass, ArrowRight } from 'lucide-react';
import { EnergyLevel } from '@/types';

interface BoredomMeterSectionProps {
  onSelectEnergy: (energy: EnergyLevel) => void;
}

interface MeterLevel {
  id: number;
  label: string;
  energyCode: EnergyLevel;
  emoji: string;
  tagline: string;
  examplePlan: string;
  budgetLabel: string;
  accentBg: string;
  accentText: string;
}

export function BoredomMeterSection({ onSelectEnergy }: BoredomMeterSectionProps) {
  const [activeLevel, setActiveLevel] = useState<number>(2); // Default level 3 (NEED TO LEAVE)

  const levels: MeterLevel[] = [
    {
      id: 0,
      label: 'COUCH',
      energyCode: 'BASICALLY_DEAD',
      emoji: '🛋️',
      tagline: 'Barely awake. Need something zero effort within 10 minutes.',
      examplePlan: 'Solo Bookstore & Cold Brew',
      budgetLabel: '₹100 MAX',
      accentBg: 'bg-[var(--surface-secondary)]',
      accentText: 'text-[var(--fg-main)]',
    },
    {
      id: 1,
      label: 'MILDLY BORED',
      energyCode: 'NORMAL_HUMAN',
      emoji: '🚶',
      tagline: 'Willing to leave the room. Mild curiosity.',
      examplePlan: 'Sunset + Chai at Sukhna Lake',
      budgetLabel: '₹150 MAX',
      accentBg: 'bg-[#0055FF]',
      accentText: 'text-white',
    },
    {
      id: 2,
      label: 'NEED TO LEAVE',
      energyCode: 'LETS_GO',
      emoji: '🔥',
      tagline: 'The walls are closing in. We need to be outside right now.',
      examplePlan: 'Momo Hunt & Street Crawl',
      budgetLabel: '₹300 MAX',
      accentBg: 'bg-[#C8FF00]',
      accentText: 'text-[#080808]',
    },
    {
      id: 3,
      label: "LET'S GO",
      energyCode: 'LETS_GO',
      emoji: '⚡',
      tagline: 'Squad is assembled. Ready for a multi-stop mission.',
      examplePlan: '3 Cafes in 2 Hours',
      budgetLabel: '₹500 MAX',
      accentBg: 'bg-[#FF2A85]',
      accentText: 'text-white',
    },
    {
      id: 4,
      label: 'ABSOLUTE CHAOS',
      energyCode: 'BAD_DECISIONS',
      emoji: '💀',
      tagline: 'No itinerary. Coin flips. Whatever happens, happens.',
      examplePlan: 'Random Bus Route Adventure',
      budgetLabel: 'NO LIMIT',
      accentBg: 'bg-[#7C5CFF]',
      accentText: 'text-white',
    },
  ];

  const current = levels[activeLevel];

  return (
    <section className="bg-[var(--surface-card)] border-y border-[var(--border-theme)] py-16 px-4 transition-colors">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#C8FF00] text-[#080808] font-mono text-xs font-black px-3 py-1 border border-[#080808]">
            <Compass className="w-4 h-4" />
            <span>INTERACTIVE BOREDOM METER</span>
          </div>

          <h2 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter text-[var(--fg-main)]">
            HOW BORED ARE YOU?
          </h2>

          <p className="font-mono text-xs sm:text-base text-[var(--muted-text)] font-extrabold max-w-xl mx-auto">
            Drag or tap the meter to tune your current energy state.
          </p>
        </div>

        {/* Meter Drag / Click Bar */}
        <div className="space-y-4">
          <div className="grid grid-cols-5 gap-2 font-mono text-[10px] sm:text-xs font-black">
            {levels.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setActiveLevel(lvl.id)}
                className={`py-3 sm:py-4 border-2 transition-all text-center flex flex-col items-center justify-center gap-1 ${
                  activeLevel === lvl.id
                    ? `${lvl.accentBg} ${lvl.accentText} border-[#080808] shadow-brutal-lime font-extrabold scale-105 z-10`
                    : 'bg-[var(--surface-secondary)] text-[var(--fg-main)] border-[var(--border-theme)] hover:border-[#C8FF00]'
                }`}
              >
                <span className="text-base sm:text-2xl">{lvl.emoji}</span>
                <span className="truncate max-w-full px-1">{lvl.label}</span>
              </button>
            ))}
          </div>

          {/* Dynamic Meter Stage Card */}
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--bg-base)] border-2 border-[var(--border-high)] p-6 sm:p-8 shadow-brutal-lime flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="space-y-3 text-left max-w-xl">
              <div className="flex items-center gap-2 font-mono text-xs font-black">
                <span className={`px-2 py-0.5 border border-[#080808] ${current.accentBg} ${current.accentText}`}>
                  STAGE 0{current.id + 1} • {current.label}
                </span>
                <span className="neo-badge bg-[var(--surface-secondary)] text-[var(--fg-main)]">
                  {current.budgetLabel}
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black uppercase text-[var(--fg-main)] tracking-tight">
                {current.tagline}
              </h3>

              <div className="font-mono text-xs text-[var(--muted-text)] font-extrabold flex items-center gap-2">
                <span>EXAMPLE MISSION:</span>
                <span className="text-[var(--fg-main)] underline">{current.examplePlan}</span>
              </div>
            </div>

            <button
              onClick={() => onSelectEnergy(current.energyCode)}
              className="neo-btn-yellow w-full md:w-auto px-6 py-4 text-xs font-mono font-black uppercase flex items-center justify-center gap-2 shadow-brutal-lime flex-shrink-0"
            >
              <Zap className="w-4 h-4 fill-[#080808]" />
              <span>[ GENERATE PLAN FOR THIS ENERGY → ]</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
