'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plan } from '@/types';
import { X, Copy, Check, Share2, MessageCircle, Music } from 'lucide-react';

interface ShareCardModalProps {
  isOpen: boolean;
  plan: Plan;
  onClose: () => void;
}

export function ShareCardModal({ isOpen, plan, onClose }: ShareCardModalProps) {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

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
          text: `Yo! Check out this plan: ${plan.title} (${plan.budgetLabel}). "You don't get to choose." Let's do it:`,
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
        className="relative w-full max-w-md bg-[#141414] border-4 border-[#F5F1E8] shadow-brutal-yellow p-6 text-[#F5F1E8]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#FF2A85] text-white border-2 border-[#0A0A0A] shadow-brutal-sm hover:translate-x-[-1px] transition-transform"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Share2 className="w-5 h-5 text-[#0055FF]" />
          <h2 className="text-xl font-black uppercase tracking-tight">
            SHARE THIS PLAN TO THE GROUP
          </h2>
        </div>

        {/* The Brutalist Ticket Card Preview */}
        <div className="bg-[#0A0A0A] border-4 border-[#F5F1E8] p-6 shadow-brutal-yellow text-center space-y-4 mb-6 relative overflow-hidden">
          <div className="absolute top-2 right-2 bg-[#E6FF00] text-[#0A0A0A] font-mono text-[10px] font-black px-2 py-0.5 border-2 border-[#0A0A0A] rotate-12">
            OFFICIAL MISSION
          </div>

          <div className="inline-block bg-[#F5F1E8] text-[#0A0A0A] font-black text-sm px-3 py-1 font-mono uppercase tracking-widest">
            LAST MINUTE PLANS
          </div>

          <div className="py-2">
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-none text-[#F5F1E8]">
              {plan.title}
            </h3>
            <p className="font-mono text-xs text-gray-400 mt-2 italic">
              "You don't get to choose. We are doing this."
            </p>
          </div>

          {/* Soundtrack Badge on Social Ticket */}
          <div className="bg-[#1C1C1C] border border-[#FF2A85] p-2 text-center font-mono text-[11px] font-black text-[#FF2A85] flex items-center justify-center gap-1.5 shadow-brutal-sm">
            <Music className="w-3.5 h-3.5" />
            <span>🎧 SOUNDTRACK: MOMO HUNT BANGERS</span>
          </div>

          <div className="grid grid-cols-3 gap-2 font-mono text-xs font-black border-t-2 border-b-2 border-[#333333] py-3 my-2 bg-[#1C1C1C]">
            <div>
              <span className="text-[10px] text-gray-400 block">BUDGET</span>
              <span className="text-[#0055FF]">{plan.budgetLabel}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block">TIME</span>
              <span>{plan.durationLabel}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block">LOCATION</span>
              <span className="text-[#FF2A85]">{plan.locationCity}</span>
            </div>
          </div>

          <div className="font-mono text-[11px] font-bold text-gray-400 truncate">
            {getPlanUrl()}
          </div>
        </div>

        {/* Action Share Buttons */}
        <div className="space-y-2.5 font-mono text-xs">
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
            href={`https://wa.me/?text=${encodeURIComponent(`Yo! Check out this plan + soundtrack: ${plan.title} - ${plan.budgetLabel}. Let's do it: ${getPlanUrl()}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#00FF66] text-[#0A0A0A] border-3 border-[#0A0A0A] shadow-brutal-sm hover:bg-green-400 py-3 font-black uppercase flex items-center justify-center gap-2 text-center"
          >
            <MessageCircle className="w-4 h-4 fill-[#0A0A0A]" />
            <span>SEND TO WHATSAPP GROUP 🚀</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
