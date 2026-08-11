'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, Heart, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenBoredomFlow?: () => void;
}

export function Footer({ onOpenBoredomFlow }: FooterProps) {
  return (
    <footer className="bg-brand-dark text-white border-t-3 border-brand-dark mt-16 pb-20 md:pb-12">
      {/* Top Banner CTA */}
      <div className="bg-brand-yellow text-brand-dark border-b-3 border-brand-dark px-4 py-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase">
            STILL BORED? FIX THAT.
          </h2>
          <p className="font-mono text-xs sm:text-sm font-extrabold max-w-xl mx-auto">
            Zero planning fatigue. Pure spontaneous decisions. Send the plan to the group chat.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenBoredomFlow}
              className="neo-btn-black px-6 py-3 text-sm sm:text-base font-black inline-flex items-center gap-2"
            >
              <Zap className="w-5 h-5 text-brand-yellow fill-brand-yellow" />
              <span>GENERATE A PLAN NOW</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-6 space-y-3">
          <div className="inline-block bg-brand-yellow text-brand-dark font-black text-2xl px-3 py-1 border-2 border-white shadow-brutal-sm">
            LAST MINUTE PLANS
          </div>
          <p className="font-mono text-xs text-gray-300 max-w-md">
            Built for people who don't make plans. Spontaneous local missions, cheap food hunts, date challenges, and chaotic adventures.
          </p>
          <div className="flex items-center gap-2 pt-2 font-mono text-[11px] text-gray-400">
            <span>CHANDIGARH / MOHALI EDITION</span>
            <span>•</span>
            <span>GEN-Z APPROVED ⚡</span>
          </div>
        </div>

        <div className="md:col-span-3 space-y-2 font-mono text-xs">
          <h4 className="font-black text-brand-yellow uppercase text-sm mb-3">NAVIGATION</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/discover" className="hover:text-brand-yellow flex items-center gap-1">
                Explore All Plans <ArrowUpRight className="w-3 h-3" />
              </Link>
            </li>
            <li>
              <Link href="/roulette" className="hover:text-brand-yellow flex items-center gap-1">
                Plan Roulette 🎰 <ArrowUpRight className="w-3 h-3" />
              </Link>
            </li>
            <li>
              <Link href="/create" className="hover:text-brand-yellow flex items-center gap-1">
                Create a Plan <ArrowUpRight className="w-3 h-3" />
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-brand-yellow flex items-center gap-1">
                My Saved & Completed <ArrowUpRight className="w-3 h-3" />
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-2 font-mono text-xs">
          <h4 className="font-black text-brand-yellow uppercase text-sm mb-3">VIBES</h4>
          <div className="flex flex-wrap gap-1.5">
            <span className="bg-gray-800 text-brand-yellow px-2 py-1 border border-gray-700 text-[10px]">₹300 MAX</span>
            <span className="bg-gray-800 text-brand-green px-2 py-1 border border-gray-700 text-[10px]">NO PLANNING</span>
            <span className="bg-gray-800 text-brand-red px-2 py-1 border border-gray-700 text-[10px]">TOUCH GRASS</span>
            <span className="bg-gray-800 text-blue-300 px-2 py-1 border border-gray-700 text-[10px]">CHAOS APPROVED</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-gray-500 font-mono text-[11px] gap-2">
        <div>© 2026 LAST MINUTE PLANS (LMP). ALL RIGHTS RESERVED.</div>
        <div className="flex items-center gap-1">
          MADE WITH <Heart className="w-3.5 h-3.5 text-brand-red fill-brand-red" /> FOR BORED HUMANS
        </div>
      </div>
    </footer>
  );
}
