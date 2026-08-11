'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plan, ReactionType } from '@/types';
import { X, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DidItModalProps {
  isOpen: boolean;
  plan: Plan;
  onClose: () => void;
  onSuccess?: () => void;
}

export function DidItModal({ isOpen, plan, onClose, onSuccess }: DidItModalProps) {
  const [actualCost, setActualCost] = useState<number>(plan.budget);
  const [actualDurationMinutes, setActualDurationMinutes] = useState<number>(plan.durationMinutes);
  const [review, setReview] = useState<string>('');
  const [username, setUsername] = useState<string>('GenZ Explorer');
  const [ratingType, setRatingType] = useState<ReactionType>('WOULD_DO_AGAIN');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#E6FF00', '#0055FF', '#FF2A85', '#00FF66'],
        });
      } catch (err) {}

      await fetch('/api/attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: plan.id,
          username,
          actualCost,
          actualDurationMinutes,
          review: review || 'Started at 8 PM. Ended at midnight. Unforgettable vibe!',
          ratingType,
        }),
      });

      setIsSubmitting(false);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0A]/95 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-lg bg-[#141414] border-4 border-[#F5F1E8] shadow-brutal-yellow p-6 sm:p-8 text-[#F5F1E8]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#FF2A85] text-white border-2 border-[#0A0A0A] shadow-brutal-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="w-6 h-6 text-[#00FF66]" />
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            DID IT ✅ - LOG MISSION
          </h2>
        </div>

        <p className="font-mono text-xs text-gray-400 mb-6">
          Prove to the internet that you actually completed <strong className="text-[#E6FF00] uppercase">{plan.title}</strong>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs font-bold">
          <div>
            <label className="block text-gray-300 uppercase mb-1">Your Handle</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. kabir_vibe"
              className="w-full p-3 border-2 border-[#F5F1E8] bg-[#0A0A0A] text-[#F5F1E8] focus:outline-none focus:ring-2 focus:ring-[#E6FF00] font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-300 uppercase mb-1">Spent (₹)</label>
              <input
                type="number"
                value={actualCost}
                onChange={(e) => setActualCost(Number(e.target.value))}
                className="w-full p-3 border-2 border-[#F5F1E8] bg-[#0A0A0A] text-[#F5F1E8] focus:outline-none focus:ring-2 focus:ring-[#E6FF00] font-bold"
              />
            </div>

            <div>
              <label className="block text-gray-300 uppercase mb-1">Duration (Mins)</label>
              <input
                type="number"
                value={actualDurationMinutes}
                onChange={(e) => setActualDurationMinutes(Number(e.target.value))}
                className="w-full p-3 border-2 border-[#F5F1E8] bg-[#0A0A0A] text-[#F5F1E8] focus:outline-none focus:ring-2 focus:ring-[#E6FF00] font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 uppercase mb-1">Verdict</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { type: 'WOULD_DO_AGAIN', label: '🔥 WOULD DO AGAIN' },
                { type: 'ACTUALLY_FUN', label: '😭 ACTUALLY FUN' },
                { type: 'NEVER_AGAIN', label: '💀 NEVER AGAIN' },
                { type: 'TERRIBLE_IDEA', label: '🤡 TERRIBLE IDEA' },
              ].map((opt) => (
                <button
                  key={opt.type}
                  type="button"
                  onClick={() => setRatingType(opt.type as ReactionType)}
                  className={`p-3 text-left border-2 border-[#F5F1E8] font-extrabold ${
                    ratingType === opt.type
                      ? 'bg-[#E6FF00] text-[#0A0A0A] shadow-brutal-sm'
                      : 'bg-[#0A0A0A] text-gray-300 hover:bg-[#1C1C1C]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-300 uppercase mb-1">Review / Story</label>
            <textarea
              rows={3}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder='e.g. "Started at 8 PM. Ended at 1 AM. Spent ₹470."'
              className="w-full p-3 border-2 border-[#F5F1E8] bg-[#0A0A0A] text-[#F5F1E8] focus:outline-none focus:ring-2 focus:ring-[#E6FF00] font-bold"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full neo-btn-yellow py-3.5 text-sm font-black uppercase flex items-center justify-center gap-2 mt-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isSubmitting ? 'LOGGING...' : 'LOCK IN COMPLETION ✅'}</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
}
