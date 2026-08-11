'use client';

import React, { useState } from 'react';
import { ReactionType } from '@/types';
import { motion } from 'framer-motion';

interface ReactionBarProps {
  planId: string;
  initialReactions?: Record<ReactionType, number>;
  onReact?: (type: ReactionType) => void;
}

export function ReactionBar({ planId, initialReactions, onReact }: ReactionBarProps) {
  const [counts, setCounts] = useState<Record<ReactionType, number>>({
    WOULD_DO_AGAIN: initialReactions?.WOULD_DO_AGAIN || 88,
    NEVER_AGAIN: initialReactions?.NEVER_AGAIN || 3,
    ACTUALLY_FUN: initialReactions?.ACTUALLY_FUN || 42,
    TERRIBLE_IDEA: initialReactions?.TERRIBLE_IDEA || 1,
    SAVED: initialReactions?.SAVED || 110,
    NEED_TO_TRY: initialReactions?.NEED_TO_TRY || 65,
  });

  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);

  const reactions: { type: ReactionType; emoji: string; label: string; bgClass: string }[] = [
    { type: 'WOULD_DO_AGAIN', emoji: '🔥', label: 'WOULD DO AGAIN', bgClass: 'hover:border-[#E6FF00] hover:text-[#E6FF00]' },
    { type: 'NEVER_AGAIN', emoji: '💀', label: 'NEVER AGAIN', bgClass: 'hover:border-[#FF2A85] hover:text-[#FF2A85]' },
    { type: 'ACTUALLY_FUN', emoji: '😭', label: 'ACTUALLY FUN', bgClass: 'hover:border-[#0055FF] hover:text-[#0055FF]' },
    { type: 'TERRIBLE_IDEA', emoji: '🤡', label: 'TERRIBLE IDEA', bgClass: 'hover:border-purple-500 hover:text-purple-400' },
    { type: 'SAVED', emoji: '❤️', label: 'SAVED', bgClass: 'hover:border-pink-500 hover:text-pink-400' },
    { type: 'NEED_TO_TRY', emoji: '👀', label: 'NEED TO TRY', bgClass: 'hover:border-[#00FF66] hover:text-[#00FF66]' },
  ];

  const handleClick = async (type: ReactionType) => {
    if (userReaction === type) return;

    setUserReaction(type);
    setCounts((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));

    if (onReact) onReact(type);

    try {
      await fetch('/api/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, reactionType: type }),
      });
    } catch (e) {
      console.warn('Reaction posted locally');
    }
  };

  return (
    <div className="w-full bg-[#141414] border-3 border-[#F5F1E8] p-5 shadow-brutal space-y-4">
      <div className="flex items-center justify-between font-mono text-xs font-black border-b border-[#333333] pb-2 text-[#F5F1E8]">
        <span>VIBE CHECK & COMMUNITY REACTIONS</span>
        <span className="text-gray-400">NO BORING STAR RATINGS</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {reactions.map((r) => {
          const isSelected = userReaction === r.type;
          return (
            <motion.button
              key={r.type}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(r.type)}
              className={`p-3 border-2 text-left font-mono text-xs font-black transition-all ${
                isSelected
                  ? 'bg-[#E6FF00] text-[#0A0A0A] border-[#0A0A0A] shadow-brutal-sm'
                  : `bg-[#1C1C1C] text-[#F5F1E8] border-[#333333] ${r.bgClass}`
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xl">{r.emoji}</span>
                <span className="bg-[#0A0A0A] text-white px-1.5 py-0.5 text-[10px] border border-[#333]">
                  {counts[r.type]}
                </span>
              </div>
              <div className="text-[10px] tracking-tight leading-tight line-clamp-1">
                {r.label}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
