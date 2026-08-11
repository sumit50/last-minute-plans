'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Zap, Clock, Users, Flame, Music, ExternalLink, ArrowRight, Disc3 } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/components/theme/ThemeProvider';
import { Stamp } from '@/components/ui/Stamp';

interface ScrollVibeSectionProps {
  onOpenBoredomFlow: () => void;
}

interface MoodStateData {
  index: string;
  moodWord: string;
  headline: string;
  subline: string;
  planTitle: string;
  planSlug: string;
  ticketNumber: string;
  budgetLabel: string;
  durationLabel: string;
  groupLabel: string;
  locationCity: string;
  coverImage: string;
  ratingPercentage: number;
  secondaryPlans: { title: string; meta: string }[];
  soundtrackTitle: string;
  soundtrackMeta: string;
  soundtrackUrl: string;
  soundtrackCover: string;
  ctaLabel: string;
  accentBg: string;
  accentText: string;
}

export function ScrollVibeSection({ onOpenBoredomFlow }: ScrollVibeSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { mode } = useTheme();
  const [activeState, setActiveState] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.25) {
      setActiveState(0);
    } else if (latest < 0.50) {
      setActiveState(1);
    } else if (latest < 0.75) {
      setActiveState(2);
    } else {
      setActiveState(3);
    }
  });

  const moodStates: MoodStateData[] = [
    {
      index: '01 / 04',
      moodWord: 'CHILL',
      headline: 'SLOW DOWN.',
      subline: 'Nothing to prove. Warm tea, quiet lake trails, and zero deadlines.',
      planTitle: 'Sunset + Chai at Sukhna Lake',
      planSlug: 'sunset-chai-sukhna',
      ticketNumber: '#014',
      budgetLabel: '₹150 MAX',
      durationLabel: '1.5 HOURS',
      groupLabel: '1-4 PEOPLE',
      locationCity: 'Chandigarh',
      coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      ratingPercentage: 96,
      secondaryPlans: [
        { title: 'Solo Bookstore & Espresso', meta: '₹200 • 2 HOURS • 1 PERSON' },
        { title: 'No-Phone Park Walk', meta: '₹0 • 1 HOUR • 1-2 PEOPLE' },
      ],
      soundtrackTitle: 'SUNSET & CHAI VIBES 🌅',
      soundtrackMeta: '18 SONGS • 65 MIN',
      soundtrackUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4WYpdU2TsFV',
      soundtrackCover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80',
      ctaLabel: '[ EXPLORE CHILL MISSIONS → ]',
      accentBg: 'bg-[var(--surface-secondary)]',
      accentText: 'text-[var(--fg-main)]',
    },
    {
      index: '02 / 04',
      moodWord: 'HYPE',
      headline: 'MOVE FAST.',
      subline: 'High-voltage street food raids and squad competition on a shoestring budget.',
      planTitle: 'Momo Hunt & Street Food Crawl',
      planSlug: 'momo-hunt',
      ticketNumber: '#023',
      budgetLabel: '₹300 MAX',
      durationLabel: '2 HOURS',
      groupLabel: '2-5 PEOPLE',
      locationCity: 'Sector 15',
      coverImage: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=800&q=80',
      ratingPercentage: 94,
      secondaryPlans: [
        { title: '3 Cafes in 2 Hours', meta: '₹500 • 2 HOURS • 2-4 PEOPLE' },
        { title: 'Badminton & Cold Coffee', meta: '₹150 • 1.5 HOURS • 2-4 PEOPLE' },
      ],
      soundtrackTitle: 'MOMO HUNT BANGERS 🎧',
      soundtrackMeta: '16 SONGS • 54 MIN',
      soundtrackUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXdLTEweZ4qN8',
      soundtrackCover: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&q=80',
      ctaLabel: '[ EXPLORE HYPE MISSIONS → ]',
      accentBg: 'bg-[#C8FF00]',
      accentText: 'text-[#080808]',
    },
    {
      index: '03 / 04',
      moodWord: 'NIGHT',
      headline: 'CITY LIGHTS.',
      subline: 'Headphones on. 1 AM cheese Maggi and quiet midnight avenues.',
      planTitle: 'Midnight Maggi Mission',
      planSlug: 'midnight-maggi-mission',
      ticketNumber: '#038',
      budgetLabel: '₹250 MAX',
      durationLabel: '1.5 HOURS',
      groupLabel: '2-5 PEOPLE',
      locationCity: 'PU Gate',
      coverImage: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=800&q=80',
      ratingPercentage: 98,
      secondaryPlans: [
        { title: 'Late Night Chai Drive', meta: '₹100 • 1 HOUR • 2-4 PEOPLE' },
        { title: '2 AM Rooftop Talk', meta: '₹0 • 2 HOURS • 1-3 PEOPLE' },
      ],
      soundtrackTitle: 'LATE NIGHT DRIVE 🌌',
      soundtrackMeta: '14 SONGS • 48 MIN',
      soundtrackUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXdLEN7aqioXM',
      soundtrackCover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80',
      ctaLabel: '[ EXPLORE NIGHT MISSIONS → ]',
      accentBg: 'bg-[#FF2A85]',
      accentText: 'text-white',
    },
    {
      index: '04 / 04',
      moodWord: 'CHAOS',
      headline: 'FUCK IT. GO.',
      subline: 'No itinerary survives contact. Coin flips, random bus routes, and chaotic decisions.',
      planTitle: 'Random Bus Route Adventure',
      planSlug: 'random-bus-adventure',
      ticketNumber: '#049',
      budgetLabel: '₹100 MAX',
      durationLabel: '2 HOURS',
      groupLabel: '1-3 PEOPLE',
      locationCity: 'ISBT 17',
      coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
      ratingPercentage: 99,
      secondaryPlans: [
        { title: 'Sector 17 Photo Scavenger Hunt', meta: '₹50 • 2.5 HOURS • 2-6 PEOPLE' },
        { title: 'Coin Flip City Crawl', meta: '₹300 • 3 HOURS • 2-5 PEOPLE' },
      ],
      soundtrackTitle: 'NO DESTINATION 🎧',
      soundtrackMeta: '21 SONGS • 78 MIN',
      soundtrackUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXdLEN7aqioXM',
      soundtrackCover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80',
      ctaLabel: '[ ACCEPT CHAOS MODE → ]',
      accentBg: 'bg-[#7C5CFF]',
      accentText: 'text-white',
    },
  ];

  const currentMood = moodStates[activeState];

  // Accessibility Reduced Motion Fallback Component
  if (shouldReduceMotion) {
    return (
      <section className="bg-[var(--bg-base)] text-[var(--fg-main)] py-16 px-4 border-y border-[var(--border-theme)] space-y-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border-theme)] pb-3">
            <h2 className="text-3xl font-black uppercase">03 / MOOD DISCOVERY</h2>
            <div className="flex gap-2">
              {moodStates.map((m, idx) => (
                <button
                  key={m.moodWord}
                  onClick={() => setActiveState(idx)}
                  className={`px-3 py-1 font-mono text-xs font-black border ${
                    activeState === idx
                      ? 'bg-[#C8FF00] text-[#080808] border-[#080808]'
                      : 'bg-[var(--surface-secondary)] text-[var(--fg-main)] border-[var(--border-theme)]'
                  }`}
                >
                  {m.moodWord}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[var(--surface-card)] border-2 border-[var(--border-high)] p-8 shadow-brutal-lime space-y-4">
            <h3 className="text-5xl font-black uppercase">{currentMood.moodWord}: {currentMood.headline}</h3>
            <p className="font-mono text-sm text-[var(--muted-text)] font-extrabold">{currentMood.subline}</p>
            <div className="pt-4">
              <Link
                href={`/plans/${currentMood.planSlug}`}
                className="neo-btn-yellow inline-flex items-center gap-2 px-6 py-3 font-mono font-black uppercase text-xs"
              >
                <span>{currentMood.ctaLabel}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[250vh] sm:h-[300vh] bg-[var(--bg-base)] text-[var(--fg-main)] transition-colors">
      {/* Sticky Inner Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between p-4 sm:p-8 overflow-hidden bg-noise border-y border-[var(--border-theme)]">
        {/* Header Bar */}
        <div className="flex items-center justify-between font-mono text-xs font-black z-20 border-b border-[var(--border-theme)] pb-3">
          <div className="flex items-center gap-2">
            <span className="neo-badge bg-[var(--surface-secondary)] text-[var(--fg-main)]">
              03 / MOOD DISCOVERY
            </span>
            <span className="text-[var(--muted-text)] hidden sm:inline">• KEEP SCROLLING ↓</span>
          </div>

          {/* Minimalist Progress Indicator */}
          <div className="flex items-center gap-2">
            <span className="bg-[#C8FF00] text-[#080808] px-2 py-0.5 border border-[#080808]">
              {currentMood.index}
            </span>
            <div className="flex items-center gap-1.5 ml-2">
              {moodStates.map((m, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full border border-[#080808] transition-all duration-300 ${
                    i === activeState
                      ? 'bg-[#C8FF00] scale-125 shadow-brutal-sm'
                      : i < activeState
                      ? 'bg-[var(--fg-main)] opacity-60'
                      : 'bg-transparent border-[var(--border-high)]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Dynamic Showcase */}
        <div className="relative flex-1 flex flex-col lg:flex-row items-center justify-between gap-8 py-4 max-w-7xl mx-auto w-full z-10">
          {/* Left Column: Masked Vertical Roll Mood Typography */}
          <div className="w-full lg:w-1/2 space-y-4 text-left">
            <div className="font-mono text-xs font-extrabold tracking-widest text-[#FF2A85] uppercase">
              MOOD STATE: {currentMood.index}
            </div>

            {/* Signature Masked Roll */}
            <div className="relative h-24 sm:h-36 overflow-hidden leading-none select-none">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentMood.moodWord}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-none text-[var(--fg-main)] absolute inset-0"
                >
                  {currentMood.moodWord}
                </motion.h2>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentMood.headline}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-2"
              >
                <h3 className="text-2xl sm:text-4xl font-black uppercase text-[var(--fg-main)] tracking-tight">
                  {currentMood.headline}
                </h3>
                <p className="font-mono text-xs sm:text-base text-[var(--muted-text)] font-extrabold max-w-md leading-relaxed">
                  {currentMood.subline}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Printed Ticket Card & Mixtape Badge */}
          <div className="w-full lg:w-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMood.planSlug}
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -15 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[var(--surface-card)] border-2 border-[var(--border-high)] p-6 sm:p-8 shadow-brutal-lime space-y-5 text-left relative"
              >
                {/* Top Ticket Header */}
                <div className="flex items-center justify-between border-b border-dashed border-[var(--border-theme)] pb-3 font-mono text-xs font-black">
                  <span className="text-[var(--muted-text)]">TICKET PLAN {currentMood.ticketNumber}</span>
                  {mode === 'offline' ? (
                    <Stamp text="DO THIS IRL" variant="red" rotation={1} />
                  ) : (
                    <span className="bg-[#C8FF00] text-[#080808] px-2 py-0.5 border border-[#080808]">
                      OFFICIAL MISSION
                    </span>
                  )}
                </div>

                {/* Meta Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="neo-badge bg-[#C8FF00] text-[#080808]">{currentMood.budgetLabel}</span>
                  <span className="neo-badge bg-[#0055FF] text-white">{currentMood.durationLabel}</span>
                  <span className="neo-badge bg-[#FF2A85] text-white">{currentMood.groupLabel}</span>
                  <span className="neo-badge bg-[var(--surface-secondary)] text-[var(--fg-main)]">📍 {currentMood.locationCity}</span>
                </div>

                {/* Plan Cover Image */}
                <div className="relative w-full h-40 sm:h-48 border border-[var(--border-theme)] overflow-hidden bg-[#080808]">
                  <img
                    src={currentMood.coverImage}
                    alt={currentMood.planTitle}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute top-2 right-2 bg-[#FF2A85] text-white border border-[#080808] px-2 py-0.5 font-mono text-[10px] font-black shadow-brutal-sm flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-white" />
                    <span>{currentMood.ratingPercentage}% WOULD DO AGAIN</span>
                  </div>
                </div>

                {/* Title & Secondary Lineups */}
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[var(--fg-main)] leading-none">
                    {currentMood.planTitle}
                  </h3>

                  {/* Secondary lineup suggestions */}
                  <div className="pt-2 border-t border-[var(--border-theme)] space-y-1 font-mono text-[11px]">
                    <span className="text-[var(--muted-text)] font-extrabold uppercase block text-[9px]">ALSO IN THIS VIBE:</span>
                    {currentMood.secondaryPlans.map((sec, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[var(--fg-main)] font-bold">
                        <span>• {sec.title}</span>
                        <span className="text-[var(--muted-text)] text-[10px]">{sec.meta}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Paired Soundtrack Card with Equalizer Animation */}
                <div className="bg-[var(--surface-card)] border-2 border-[#FF2A85] p-3 shadow-brutal-pink flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#080808] border border-[var(--border-high)] overflow-hidden flex-shrink-0 relative">
                      <img src={currentMood.soundtrackCover} alt={currentMood.soundtrackTitle} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 font-mono text-[9px] text-[#FF2A85] font-black uppercase">
                        <Disc3 className="w-3 h-3 animate-spin text-[#FF2A85]" />
                        <span>PAIRED SOUNDTRACK</span>
                      </div>
                      <h4 className="font-black text-xs text-[var(--fg-main)] line-clamp-1">{currentMood.soundtrackTitle}</h4>
                      <span className="font-mono text-[10px] text-[var(--muted-text)]">{currentMood.soundtrackMeta}</span>
                    </div>
                  </div>

                  <a
                    href={currentMood.soundtrackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-btn-pink px-2.5 py-1 font-mono text-[10px] font-black uppercase flex items-center gap-1 flex-shrink-0"
                  >
                    <Music className="w-3 h-3" />
                    <span>PLAY</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Section Sticky CTA */}
        <div className="border-t border-[var(--border-theme)] pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 z-20">
          <div className="font-mono text-xs font-extrabold text-[var(--fg-main)] flex items-center gap-2">
            <span>SO... WHAT ARE WE DOING?</span>
          </div>

          <Link
            href={`/plans/${currentMood.planSlug}`}
            className="neo-btn-yellow px-6 py-2.5 text-xs font-mono font-black uppercase flex items-center gap-2 shadow-brutal-lime transition-all active:translate-y-0.5"
          >
            <Zap className="w-3.5 h-3.5 fill-[#080808]" />
            <span>{currentMood.ctaLabel}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
