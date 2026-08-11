'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plan } from '@/types';
import { X, Dices, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface CoinFlipModalProps {
  isOpen: boolean;
  plans: Plan[];
  onClose: () => void;
}

export function CoinFlipModal({ isOpen, plans, onClose }: CoinFlipModalProps) {
  const [flipping, setFlipping] = useState<boolean>(false);
  const [result, setResult] = useState<'HEADS' | 'TAILS' | null>(null);

  if (!isOpen || plans.length < 2) return null;

  const planA = plans[0]; // Heads
  const planB = plans[1]; // Tails

  const handleFlip = () => {
    setFlipping(true);
    setResult(null);

    setTimeout(() => {
      const outcome = Math.random() > 0.5 ? 'HEADS' : 'TAILS';
      setResult(outcome);
      setFlipping(false);
    }, 1500);
  };

  const winningPlan = result === 'HEADS' ? planA : result === 'TAILS' ? planB : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0A]/95 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-md bg-[var(--surface-card)] border-4 border-[var(--border-high)] shadow-brutal-lime p-6 text-[var(--fg-main)] space-y-6 text-center"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#FF2A85] text-white border-2 border-[#0A0A0A] shadow-brutal-sm hover:translate-x-[-1px] transition-transform"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-[#C8FF00] text-[#080808] font-mono text-xs font-black px-2.5 py-0.5 border border-[#080808]">
            <Dices className="w-4 h-4" />
            <span>FATE DECISION TOOL</span>
          </div>
          <h2 className="text-3xl font-black uppercase">CAN'T DECIDE? FLIP IT.</h2>
        </div>

        {/* 3D Coin Animation Stage */}
        <div className="py-8 flex justify-center items-center">
          <motion.div
            animate={flipping ? { rotateY: [0, 1800], scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="w-28 h-28 bg-[#C8FF00] text-[#080808] border-4 border-[#080808] rounded-full shadow-brutal-lime flex flex-col items-center justify-center font-black text-2xl select-none"
          >
            <span>{result ? (result === 'HEADS' ? 'HEADS 🪙' : 'TAILS 🪙') : '🪙'}</span>
            <span className="font-mono text-[9px] font-bold text-[#080808]">{result ? result : 'COIN'}</span>
          </motion.div>
        </div>

        {winningPlan ? (
          <div className="space-y-4 bg-[var(--surface-secondary)] border-2 border-[#C8FF00] p-6 shadow-brutal-lime">
            <span className="font-mono text-xs font-black text-[#FF2A85] uppercase">FATE HAS SPOKEN</span>
            <h3 className="text-2xl font-black uppercase text-[var(--fg-main)]">{winningPlan.title}</h3>
            <p className="font-mono text-xs text-[var(--muted-text)]">{winningPlan.budgetLabel} • {winningPlan.durationLabel}</p>

            <Link
              href={`/plans/${winningPlan.slug}`}
              className="neo-btn-yellow w-full py-3 font-mono text-xs font-black uppercase block"
            >
              [ ACCEPT FATE → ]
            </Link>
          </div>
        ) : (
          <button
            disabled={flipping}
            onClick={handleFlip}
            className="neo-btn-yellow w-full py-4 text-sm font-mono font-black uppercase shadow-brutal-lime disabled:opacity-50"
          >
            {flipping ? 'FLIPPING COIN IN AIR...' : '[ FLIP THE COIN 🪙 ]'}
          </button>
        )}
      </motion.div>
    </div>
  );
}
