'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { MobileNav } from '@/components/navigation/MobileNav';
import { Footer } from '@/components/navigation/Footer';
import { BoredomFlow } from '@/components/generator/BoredomFlow';
import { useTheme } from '@/components/theme/ThemeProvider';
import { Stamp } from '@/components/ui/Stamp';
import { Plan } from '@/types';
import { INITIAL_PLANS } from '@/lib/mock-data';
import { Dices, RefreshCw, CheckCircle, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

export default function PlanRoulettePage() {
  const { mode } = useTheme();
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [isBoredomOpen, setIsBoredomOpen] = useState<boolean>(false);

  const tokens = [
    { id: '100', label: '₹100 MAX', type: 'budget', val: 100 },
    { id: '300', label: '₹300 MAX', type: 'budget', val: 300 },
    { id: '500', label: '₹500 MAX', type: 'budget', val: 500 },
    { id: 'FOOD', label: '🥟 FOOD', type: 'tag', val: 'food' },
    { id: 'DATE', label: '❤️ DATE', type: 'category', val: 'DATE' },
    { id: 'CHAOS', label: '💀 CHAOS', type: 'category', val: 'CHAOS' },
    { id: 'OUTDOORS', label: '🍃 OUTDOORS', type: 'tag', val: 'outdoors' },
  ];

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedPlan(null);

    setTimeout(() => {
      let pool = INITIAL_PLANS;
      if (selectedToken) {
        const tokenObj = tokens.find(t => t.id === selectedToken);
        if (tokenObj) {
          if (tokenObj.type === 'budget') {
            pool = pool.filter(p => p.budget <= (tokenObj.val as number));
          } else if (tokenObj.type === 'category') {
            pool = pool.filter(p => p.category === tokenObj.val);
          } else if (tokenObj.type === 'tag') {
            pool = pool.filter(p => p.tags.some(t => t.toLowerCase().includes((tokenObj.val as string))));
          }
        }
      }

      if (pool.length === 0) pool = INITIAL_PLANS;

      const picked = pool[Math.floor(Math.random() * pool.length)];
      setSelectedPlan(picked);
      setIsSpinning(false);

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#C8FF00', '#0055FF', '#FF2A85'],
        });
      } catch (e) {}
    }, 2400);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--fg-main)] flex flex-col justify-between selection:bg-[#C8FF00] selection:text-[#080808] transition-colors">
      <Navbar onOpenBoredomFlow={() => setIsBoredomOpen(true)} />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 space-y-12 w-full text-center">
        {/* Header Title */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FF2A85] text-white font-mono text-xs font-black px-3 py-1 border border-[#080808] shadow-brutal-lime uppercase">
            <ShieldAlert className="w-4 h-4" />
            <span>{mode === 'offline' ? 'PRINTED ROULETTE #00172' : 'CHAOS GAME MODE'}</span>
          </div>

          <h1 className="text-5xl sm:text-8xl font-black uppercase tracking-tighter leading-none text-[var(--fg-main)]">
            PLAN ROULETTE
          </h1>

          <p className="font-mono text-xs sm:text-base font-extrabold text-[var(--muted-text)] max-w-xl mx-auto">
            {mode === 'offline' ? 'DRAW A RANDOM PRINTED MISSION. NO COMPLAINING.' : "YOU DON'T GET TO CHOOSE. Click a filter token (optional) and spin the wheel."}
          </p>
        </div>

        {/* Interactive Game Filter Tokens */}
        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs font-black">
          <span className="text-[var(--muted-text)] font-bold mr-1">FILTER TOKEN:</span>
          <button
            onClick={() => setSelectedToken(null)}
            className={`px-3 py-1.5 border transition-all ${
              selectedToken === null
                ? 'bg-[#C8FF00] text-[#080808] border-[#080808] font-extrabold shadow-brutal-sm'
                : 'bg-[var(--surface-secondary)] text-[var(--fg-main)] border-[var(--border-theme)]'
            }`}
          >
            🎲 ANY VIBE
          </button>
          {tokens.map((token) => (
            <button
              key={token.id}
              onClick={() => setSelectedToken(selectedToken === token.id ? null : token.id)}
              className={`px-3 py-1.5 border transition-all ${
                selectedToken === token.id
                  ? 'bg-[#C8FF00] text-[#080808] border-[#080808] font-extrabold shadow-brutal-sm scale-105'
                  : 'bg-[var(--surface-secondary)] text-[var(--fg-main)] border-[var(--border-theme)] hover:border-[#C8FF00]'
              }`}
            >
              {token.label}
            </button>
          ))}
        </div>

        {/* The Spinning Wheel Interactive Stage */}
        <div className="relative bg-[var(--surface-card)] border-2 border-[var(--border-high)] p-8 sm:p-12 shadow-brutal-lime space-y-8 overflow-hidden transition-colors">
          {/* Background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#88888810_1px,transparent_1px),linear-gradient(to_bottom,#88888810_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="relative z-10 space-y-6">
            {!selectedPlan ? (
              <div className="space-y-8">
                <div className="relative w-52 h-52 sm:w-72 sm:h-72 mx-auto flex items-center justify-center">
                  <motion.div
                    animate={isSpinning ? { rotate: 1440 } : { rotate: 0 }}
                    transition={{ duration: 2.4, ease: [0.15, 0.85, 0.35, 1.2] }}
                    className="w-full h-full rounded-full bg-[#C8FF00] border-4 border-[#080808] shadow-brutal-pink flex items-center justify-center p-4 relative"
                  >
                    <div className="font-black text-2xl sm:text-4xl text-[#080808] tracking-tighter uppercase select-none">
                      {isSpinning ? 'SPINNING...' : mode === 'offline' ? 'DRAW PLAN' : 'SPIN IT'}
                    </div>
                  </motion.div>
                  <Dices className="absolute w-14 h-14 text-[#080808] pointer-events-none" />
                </div>

                <div>
                  <button
                    onClick={handleSpin}
                    disabled={isSpinning}
                    className="neo-btn-yellow px-10 py-5 text-lg sm:text-xl font-black uppercase inline-flex items-center gap-3 shadow-brutal-lime active:translate-y-1 transition-all"
                  >
                    <Dices className="w-6 h-6 text-[#080808]" />
                    <span>{isSpinning ? 'DRAWING PLAN...' : mode === 'offline' ? '[ DRAW PLAN 🎫 ]' : '[ SPIN THE WHEEL 🎰 ]'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-6 text-left"
              >
                <div className="bg-[#C8FF00] text-[#080808] border-2 border-[#080808] p-3.5 shadow-brutal-sm flex items-center justify-between font-mono text-xs font-black uppercase">
                  <span>🎯 YOUR FATE HAS BEEN SEALED</span>
                  <span>100% SPONTANEOUS</span>
                </div>

                <div className="bg-[var(--surface-card)] border-2 border-[var(--border-high)] p-6 sm:p-8 shadow-brutal-lime space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="neo-badge bg-[#C8FF00] text-[#080808]">{selectedPlan.budgetLabel}</span>
                    <span className="neo-badge bg-[#0055FF] text-white">{selectedPlan.durationLabel}</span>
                    <span className="neo-badge bg-[#FF2A85] text-white">📍 {selectedPlan.locationCity}</span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--fg-main)]">
                    {selectedPlan.title}
                  </h2>

                  <p className="font-mono text-sm text-[var(--muted-text)] leading-relaxed">
                    {selectedPlan.description}
                  </p>

                  <div className="bg-[var(--surface-secondary)] p-4 border border-[var(--border-theme)] space-y-2">
                    <h4 className="font-mono text-xs font-black uppercase text-[var(--muted-text)]">RULES:</h4>
                    <ul className="font-mono text-xs font-bold space-y-1 text-[var(--fg-main)]">
                      {selectedPlan.rules.slice(0, 3).map((r, i) => (
                        <li key={i}>• {r}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Accept vs Spin Again buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <Link
                    href={`/plans/${selectedPlan.slug}`}
                    className="neo-btn-yellow p-4 text-center text-sm sm:text-base font-black uppercase flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>[ ACCEPT MY FATE → ]</span>
                  </Link>

                  <button
                    onClick={handleSpin}
                    className="bg-[var(--surface-secondary)] text-[var(--fg-main)] border-2 border-[var(--border-theme)] shadow-brutal-sm hover:border-[#C8FF00] p-4 text-sm sm:text-base font-mono font-black uppercase flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5 text-[#0055FF] dark:text-[#C8FF00]" />
                    <span>[ NOPE, SPIN AGAIN ]</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer onOpenBoredomFlow={() => setIsBoredomOpen(true)} />
      <MobileNav onOpenBoredomFlow={() => setIsBoredomOpen(true)} />

      <BoredomFlow
        isOpen={isBoredomOpen}
        onClose={() => setIsBoredomOpen(false)}
      />
    </div>
  );
}
