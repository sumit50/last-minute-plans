'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plan } from '@/types';
import { X, Copy, Check, Share2, MessageCircle, Music } from 'lucide-react';

interface GroupShareModalProps {
  isOpen: boolean;
  plan: Plan;
  onClose: () => void;
}

export function GroupShareModal({ isOpen, plan, onClose }: GroupShareModalProps) {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen || !plan) return null;

  const getPlanUrl = () => {
    return typeof window !== 'undefined' ? `${window.location.origin}/plans/${plan.slug}` : '';
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getPlanUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    const url = getPlanUrl();
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `LAST MINUTE PLANS | ${plan.title}`,
          text: `Yo! Check out this plan: ${plan.title} (${plan.budgetLabel}). You in?`,
          url,
        });
        return;
      } catch (err) {}
    }
    handleCopyLink();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0A]/95 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-md bg-[var(--surface-card)] border-4 border-[var(--border-high)] shadow-brutal-pink p-6 text-[var(--fg-main)] space-y-6"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#FF2A85] text-white border-2 border-[#0A0A0A] shadow-brutal-sm hover:translate-x-[-1px] transition-transform"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 border-b border-[var(--border-theme)] pb-3">
          <Share2 className="w-5 h-5 text-[#0055FF]" />
          <h2 className="text-xl font-black uppercase tracking-tight">
            SEND TO THE GROUP CHAT
          </h2>
        </div>

        {/* Group Chat Share Ticket Preview */}
        <div className="bg-[var(--surface-secondary)] border-2 border-[var(--border-high)] p-6 shadow-brutal-lime text-center space-y-4 relative">
          <div className="inline-block bg-[#C8FF00] text-[#080808] font-black text-xs px-2.5 py-0.5 font-mono uppercase tracking-widest border border-[#080808]">
            LAST MINUTE PLANS
          </div>

          <div className="py-2 space-y-1">
            <h3 className="text-2xl font-black uppercase tracking-tight text-[var(--fg-main)]">
              {plan.title}
            </h3>
            <p className="font-mono text-xs text-[var(--muted-text)] font-extrabold italic">
              "You in or out? We leave in 30 minutes."
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 font-mono text-xs font-black border-t border-b border-[var(--border-theme)] py-3 bg-[var(--surface-card)]">
            <div>
              <span className="text-[9px] text-[var(--muted-text)] block">BUDGET</span>
              <span className="text-[#0055FF] dark:text-[#C8FF00]">{plan.budgetLabel}</span>
            </div>
            <div>
              <span className="text-[9px] text-[var(--muted-text)] block">TIME</span>
              <span>{plan.durationLabel}</span>
            </div>
            <div>
              <span className="text-[9px] text-[var(--muted-text)] block">LOCATION</span>
              <span className="text-[#FF2A85]">{plan.locationCity}</span>
            </div>
          </div>

          <div className="font-mono text-[11px] font-bold text-[var(--muted-text)] truncate">
            {getPlanUrl()}
          </div>
        </div>

        {/* Action Share Buttons */}
        <div className="space-y-2 font-mono text-xs">
          {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
            <button
              onClick={handleNativeShare}
              className="w-full neo-btn-pink py-3 font-black uppercase flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>SHARE VIA PHONE APP 📱</span>
            </button>
          )}

          <button
            onClick={handleCopyLink}
            className="w-full neo-btn-yellow py-3 font-black uppercase flex items-center justify-center gap-2"
          >
            {copied ? <Check className="w-4 h-4 text-green-800" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'LINK COPIED TO CLIPBOARD!' : 'COPY LINK FOR GROUP CHAT'}</span>
          </button>

          <a
            href={`https://wa.me/?text=${encodeURIComponent(`Yo! Check out this plan: ${plan.title} - ${plan.budgetLabel}. You in? ${getPlanUrl()}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#00FF66] text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-brutal-sm hover:bg-green-400 py-3 font-black uppercase flex items-center justify-center gap-2 text-center"
          >
            <MessageCircle className="w-4 h-4 fill-[#0A0A0A]" />
            <span>SEND TO WHATSAPP GROUP 🚀</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
