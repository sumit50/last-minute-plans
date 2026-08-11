'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { MobileNav } from '@/components/navigation/MobileNav';
import { Footer } from '@/components/navigation/Footer';
import { BoredomFlow } from '@/components/generator/BoredomFlow';
import { LMPCursor } from '@/components/ui/LMPCursor';
import { EditorialHeroCanvas } from '@/components/homepage/EditorialHeroCanvas';
import { BoredomMeterSection } from '@/components/homepage/BoredomMeterSection';
import { ScrollVibeSection } from '@/components/homepage/ScrollVibeSection';
import { TonightTrackSection } from '@/components/homepage/TonightTrackSection';
import { SynchronizedSoundtrackSection } from '@/components/homepage/SynchronizedSoundtrackSection';
import { InteractiveMapView } from '@/components/maps/InteractiveMapView';
import { MusicMoodPickerModal } from '@/components/music/MusicMoodPickerModal';
import { ShareCardModal } from '@/components/plans/ShareCardModal';
import { PlanBattleModal } from '@/components/tools/PlanBattleModal';
import { CoinFlipModal } from '@/components/tools/CoinFlipModal';
import { GroupShareModal } from '@/components/tools/GroupShareModal';
import { useTheme } from '@/components/theme/ThemeProvider';
import { Plan, Playlist, EnergyLevel } from '@/types';
import { INITIAL_PLANS } from '@/lib/mock-data';
import { INITIAL_PLAYLISTS } from '@/lib/music/music-provider';
import { Dices, Swords, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { mode } = useTheme();
  const [plans, setPlans] = useState<Plan[]>(INITIAL_PLANS);
  const [playlists, setPlaylists] = useState<Playlist[]>(INITIAL_PLAYLISTS);
  const [isBoredomOpen, setIsBoredomOpen] = useState<boolean>(false);
  const [isMusicModalOpen, setIsMusicModalOpen] = useState<boolean>(false);
  const [isBattleModalOpen, setIsBattleModalOpen] = useState<boolean>(false);
  const [isCoinFlipModalOpen, setIsCoinFlipModalOpen] = useState<boolean>(false);
  const [sharePlan, setSharePlan] = useState<Plan | null>(null);

  useEffect(() => {
    fetch('/api/plans')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.plans?.length > 0) {
          setPlans(data.plans);
        }
      })
      .catch(() => { });
  }, []);

  const handleSelectEnergyFromMeter = (energy: EnergyLevel) => {
    setIsBoredomOpen(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--fg-main)] flex flex-col justify-between selection:bg-[#C8FF00] selection:text-[#080808] transition-colors relative">
      {/* Contextual Desktop Micro-Cursor Follower */}
      <LMPCursor />

      <Navbar onOpenBoredomFlow={() => setIsBoredomOpen(true)} />

      <main className="flex-1">
        {/* 01. EDITORIAL LIVING TYPOGRAPHY HERO CANVAS */}
        <EditorialHeroCanvas
          onOpenBoredomFlow={() => setIsBoredomOpen(true)}
          onOpenMusicModal={() => setIsMusicModalOpen(true)}
        />

        {/* 02. HIGH-CONTRAST EDITORIAL STATEMENT */}
        <section className="bg-[var(--surface-secondary)] border-b border-[var(--border-theme)] py-12 px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-3">
            <span className="font-mono text-xs font-black text-[#FF2A85] uppercase tracking-widest">
              [ THE LMP MANIFESTO ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none text-[var(--fg-main)]">
              YOU HAVE FREE TIME. <br />
              <span className="text-[#0055FF] dark:text-[#C8FF00]">WE HAVE QUESTIONABLE IDEAS.</span>
            </h2>
            <p className="font-mono text-xs sm:text-base text-[var(--muted-text)] font-extrabold max-w-xl mx-auto pt-2">
              No 45-minute group chat debates. Tell us your budget and energy state—we deliver the mission and score the soundtrack.
            </p>
          </div>
        </section>

        {/* 03. INTERACTIVE BOREDOM METER */}
        <BoredomMeterSection onSelectEnergy={handleSelectEnergyFromMeter} />

        {/* 04. SCROLL-DRIVEN MOOD SHOWCASE (SECTION 03) */}
        <ScrollVibeSection onOpenBoredomFlow={() => setIsBoredomOpen(true)} />

        {/* 05. DECISION TOOLS BANNER: BATTLE & COIN FLIP */}
        <section className="bg-[var(--surface-card)] border-y border-[var(--border-theme)] py-12 px-4">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-left">
              <span className="font-mono text-xs font-black text-[#C8FF00] uppercase block">[ SQUAD DECISION TOOLS ]</span>
              <h3 className="text-3xl font-black uppercase">CAN'T AGREE WITH FRIENDS?</h3>
              <p className="font-mono text-xs text-[var(--muted-text)] font-bold">Use head-to-head Plan Battle or flip a tactile 3D coin.</p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setIsBattleModalOpen(true)}
                className="neo-btn-pink px-5 py-3 font-mono text-xs font-black uppercase flex items-center gap-2"
              >
                <Swords className="w-4 h-4" />
                <span>PLAN BATTLE ⚔️</span>
              </button>

              <button
                onClick={() => setIsCoinFlipModalOpen(true)}
                className="neo-btn-yellow px-5 py-3 font-mono text-xs font-black uppercase flex items-center gap-2"
              >
                <Dices className="w-4 h-4" />
                <span>COIN FLIP 🪙</span>
              </button>
            </div>
          </div>
        </section>

        {/* 06. TONIGHT'S HORIZONTAL EDITORIAL TRACK */}
        <TonightTrackSection plans={plans} />

        {/* 07. SYNCHRONIZED SOUNDTRACK EXPERIENCE */}
        <SynchronizedSoundtrackSection
          playlists={playlists}
          onOpenMusicModal={() => setIsMusicModalOpen(true)}
        />

        {/* 08. LIVE MAP DISCOVERY */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <InteractiveMapView plans={plans} />
        </section>

        {/* 09. PLAN ROULETTE FATE MACHINE */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="bg-[var(--surface-card)] text-[var(--fg-main)] border-2 border-[var(--border-high)] p-8 sm:p-12 shadow-brutal-lime relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 transition-colors">
            <div className="space-y-4 max-w-xl z-10 text-left">
              <div className="inline-flex items-center gap-2 bg-[#FF2A85] text-white font-mono text-xs font-black px-3 py-1 border border-[#080808]">
                <Dices className="w-4 h-4" />
                <span>CHAOS GAME</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none text-[var(--fg-main)]">
                PLAN ROULETTE: <br />
                <span className="text-[#0055FF] dark:text-[#C8FF00]">YOU DON'T GET TO CHOOSE.</span>
              </h2>
              <p className="font-mono text-xs text-[var(--muted-text)] font-extrabold leading-relaxed">
                Can't decide? Spin the fate wheel. LMP picks your next plan and playlist soundtrack. No complaining allowed.
              </p>
              <Link
                data-cursor="GO"
                href="/roulette"
                className="neo-btn-yellow inline-flex items-center gap-2 px-8 py-4 text-xs font-mono font-black uppercase text-[#080808]"
              >
                <span>SPIN THE FATE WHEEL 🎰 →</span>
              </Link>
            </div>

            <div className="relative z-10 w-full md:w-auto flex justify-center">
              <div className="w-48 h-48 bg-[#C8FF00] text-[#080808] border-2 border-[#080808] shadow-brutal-pink flex items-center justify-center text-center p-4 rotate-3">
                <div className="font-black text-2xl uppercase leading-tight">
                  ACCEPT YOUR FATE
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenBoredomFlow={() => setIsBoredomOpen(true)} />
      <MobileNav onOpenBoredomFlow={() => setIsBoredomOpen(true)} />

      {/* Modals & Tools */}
      <BoredomFlow
        isOpen={isBoredomOpen}
        onClose={() => setIsBoredomOpen(false)}
        onSharePlan={(p) => setSharePlan(p)}
      />

      <MusicMoodPickerModal
        isOpen={isMusicModalOpen}
        onClose={() => setIsMusicModalOpen(false)}
      />

      <PlanBattleModal
        isOpen={isBattleModalOpen}
        plans={plans}
        onClose={() => setIsBattleModalOpen(false)}
      />

      <CoinFlipModal
        isOpen={isCoinFlipModalOpen}
        plans={plans}
        onClose={() => setIsCoinFlipModalOpen(false)}
      />

      {sharePlan && (
        <GroupShareModal
          isOpen={!!sharePlan}
          plan={sharePlan}
          onClose={() => setSharePlan(null)}
        />
      )}
    </div>
  );
}
