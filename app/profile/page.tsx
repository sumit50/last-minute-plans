'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { MobileNav } from '@/components/navigation/MobileNav';
import { Footer } from '@/components/navigation/Footer';
import { BoredomFlow } from '@/components/generator/BoredomFlow';
import { PlanCard } from '@/components/plans/PlanCard';
import { User, Trophy, Flame, Bookmark, Sparkles, MapPin, Zap } from 'lucide-react';

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isBoredomOpen, setIsBoredomOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile');
      const data = await res.json();
      if (data.success) {
        setProfile(data.profile);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--fg-main)] flex flex-col justify-between selection:bg-[#C8FF00] selection:text-[#080808] transition-colors">
      <Navbar onOpenBoredomFlow={() => setIsBoredomOpen(true)} />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-12 space-y-12 w-full">
        {/* Profile Header */}
        <div className="bg-[var(--surface-card)] border-2 border-[var(--border-high)] p-8 sm:p-10 shadow-brutal-lime relative overflow-hidden space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-[#C8FF00] text-[#080808] border-2 border-[#080808] shadow-brutal-sm flex items-center justify-center font-black text-3xl select-none">
                {profile?.name ? profile.name.charAt(0) : 'S'}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--fg-main)]">
                    {profile?.name || 'Simran Sharma'}
                  </h1>
                  <span className="neo-badge bg-[#FF2A85] text-white">PRO</span>
                </div>
                <div className="font-mono text-xs text-[var(--muted-text)] font-extrabold flex items-center gap-2 mt-1">
                  <span>@{profile?.username || 'simran_chd'}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#FF2A85]" />
                    {profile?.city || 'Chandigarh'}, India
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsBoredomOpen(true)}
              className="neo-btn-yellow px-6 py-3 text-xs font-mono font-black uppercase flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-[#080808]" />
              <span>[ GENERATE PLAN → ]</span>
            </button>
          </div>

          {/* Key Metric Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[var(--border-theme)] font-mono text-xs">
            <div className="bg-[var(--surface-secondary)] p-4 border border-[var(--border-theme)] space-y-1">
              <span className="text-[var(--muted-text)] font-bold block uppercase text-[10px]">PLANS DONE</span>
              <span className="text-3xl font-black text-[#C8FF00]">{profile?.totalPlansCompleted || 4}</span>
            </div>

            <div className="bg-[var(--surface-secondary)] p-4 border border-[var(--border-theme)] space-y-1">
              <span className="text-[var(--muted-text)] font-bold block uppercase text-[10px]">MONEY SPENT</span>
              <span className="text-3xl font-black text-[var(--fg-main)]">₹{profile?.totalMoneySpent || 900}</span>
            </div>

            <div className="bg-[var(--surface-secondary)] p-4 border border-[var(--border-theme)] space-y-1">
              <span className="text-[var(--muted-text)] font-bold block uppercase text-[10px]">CURRENT STREAK</span>
              <span className="text-3xl font-black text-[#FF2A85] flex items-center gap-1">
                <Flame className="w-6 h-6 fill-[#FF2A85]" />
                {profile?.currentStreak || 3}
              </span>
            </div>

            <div className="bg-[var(--surface-secondary)] p-4 border border-[var(--border-theme)] space-y-1">
              <span className="text-[var(--muted-text)] font-bold block uppercase text-[10px]">LONGEST STREAK</span>
              <span className="text-3xl font-black text-[#0055FF] dark:text-[#C8FF00]">
                {profile?.longestStreak || 5} DAYS
              </span>
            </div>
          </div>
        </div>

        {/* Behavior-Based Achievements Badges */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-[var(--border-theme)] pb-3">
            <Trophy className="w-6 h-6 text-[#C8FF00]" />
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[var(--fg-main)]">
              UNLOCKED ACHIEVEMENTS ({profile?.achievements?.length || 4})
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            {(profile?.achievements || ['🥟 MOMO MASTER', '🌙 NIGHT OWL', '💀 CHAOTIC GOOD', '☕ CHAI CONNOISSEUR']).map(
              (ach: string, idx: number) => (
                <div
                  key={idx}
                  className="bg-[var(--surface-card)] border-2 border-[var(--border-high)] p-4 shadow-brutal-sm text-center space-y-2"
                >
                  <div className="text-3xl">{ach.split(' ')[0]}</div>
                  <div className="font-black text-sm text-[var(--fg-main)] uppercase">{ach}</div>
                  <span className="inline-block bg-[#C8FF00] text-[#080808] px-2 py-0.5 text-[9px] font-black uppercase border border-[#080808]">
                    UNLOCKED
                  </span>
                </div>
              )
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
