'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Zap, Headphones, Dices, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/components/theme/ThemeProvider';
import { Stamp } from '@/components/ui/Stamp';
import { CityActivityTicker } from '@/components/ui/CityActivityTicker';

interface EditorialHeroCanvasProps {
  onOpenBoredomFlow: () => void;
  onOpenMusicModal: () => void;
}

export function EditorialHeroCanvas({ onOpenBoredomFlow, onOpenMusicModal }: EditorialHeroCanvasProps) {
  const { mode } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const [timeString, setTimeString] = useState<string>('11:47 PM');
  const [timeGreeting, setTimeGreeting] = useState<string>('WHAT ARE WE DOING?');
  const [friendsTagText, setFriendsTagText] = useState<string>('FRIENDS OPTIONAL');
  const [clickCount, setClickCount] = useState<number>(0);
  const [showSecretEgg, setShowSecretEgg] = useState<boolean>(false);

  // Motion springs for cursor tilt & magnetic drift
  const mouseX = useSpring(0, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 20 });

  const textRotateX = useTransform(mouseY, [-300, 300], [4, -4]);
  const textRotateY = useTransform(mouseX, [-500, 500], [-6, 6]);
  const bgShiftX = useTransform(mouseX, [-500, 500], [-15, 15]);
  const bgShiftY = useTransform(mouseY, [-300, 300], [-10, 10]);

  useEffect(() => {
    const updateTimeAndGreeting = () => {
      const now = new Date();
      const hours = now.getHours();

      setTimeString(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );

      if (hours >= 5 && hours < 12) {
        setTimeGreeting("GOOD MORNING. YOU'RE EARLY.");
      } else if (hours >= 12 && hours < 17) {
        setTimeGreeting('YOU HAVE TIME.');
      } else if (hours >= 17 && hours < 22) {
        setTimeGreeting('WHAT ARE WE DOING?');
      } else {
        setTimeGreeting('STILL AWAKE?');
      }
    };

    updateTimeAndGreeting();
    const interval = setInterval(updateTimeAndGreeting, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleTimestampClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    if (nextCount >= 5) {
      setShowSecretEgg(true);
      setTimeout(() => setShowSecretEgg(false), 4000);
      setClickCount(0);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-[var(--bg-base)] border-b border-[var(--border-theme)] pt-16 pb-24 px-4 transition-colors min-h-[85vh] flex flex-col justify-between"
    >
      {/* Background Interactive Vector Grid */}
      <motion.div
        style={{ x: bgShiftX, y: bgShiftY }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#88888812_1px,transparent_1px),linear-gradient(to_bottom,#88888812_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none"
      />

      {/* Secret Matrix Toast Notification */}
      {showSecretEgg && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-[#C8FF00] text-[#080808] border-2 border-[#080808] shadow-brutal-pink px-4 py-2 font-mono text-xs font-black z-50 animate-bounce">
          ⚡ SECRET UNLOCKED: YOU FOUND THE 2026 MATRIX EASTER EGG! ⚡
        </div>
      )}

      {/* Real-time Header & Coordinates Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs font-black z-20 border-b border-[var(--border-theme)] pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={handleTimestampClick}
            className="neo-badge bg-[var(--surface-secondary)] text-[var(--fg-main)] hover:border-[#C8FF00] transition-colors"
            title="Click 5x for Easter Egg"
          >
            CHANDIGARH • {timeString} • {timeGreeting}
          </button>
          <span className="text-[var(--muted-text)] hidden md:inline">• 30.7333° N, 76.7794° E</span>
        </div>

        {/* City Activity Signals Ticker */}
        <div className="flex items-center gap-3">
          <CityActivityTicker />

          {mode === 'offline' ? (
            <Stamp text="NO SCREEN REQUIRED" variant="red" rotation={-1} />
          ) : (
            <span className="bg-[#C8FF00] text-[#080808] px-2 py-0.5 border border-[#080808] uppercase tracking-wider hidden sm:inline">
              2026 EDITION
            </span>
          )}
        </div>
      </div>

      {/* Main Living Typography Canvas */}
      <div className="max-w-6xl mx-auto relative z-10 text-center py-12 my-auto">
        <motion.div
          style={{ rotateX: textRotateX, rotateY: textRotateY }}
          className="space-y-4 perspective-1000"
        >
          {/* Micro Tag Badges with Hover Morph */}
          {mode === 'offline' ? (
            <div className="flex items-center justify-center gap-3 mb-2">
              <Stamp text="OFFLINE PLAN #001" variant="black" rotation={-1} />
              <Stamp text="DO THIS IRL" variant="red" rotation={2} />
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs font-bold mb-4">
              <span className="neo-badge">₹300 MAX</span>
              <span className="neo-badge">2 HOURS</span>
              <span
                onMouseEnter={() => setFriendsTagText('ACTUALLY OPTIONAL.')}
                onMouseLeave={() => setFriendsTagText('FRIENDS OPTIONAL')}
                className="neo-badge bg-[#FF2A85] text-white border-[#080808] cursor-pointer transition-all"
              >
                {friendsTagText}
              </span>
              <span className="neo-badge">NO PLANNING</span>
            </div>
          )}

          {/* Living Typography Title */}
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.88] text-[var(--fg-main)] select-none">
            I'M BORED. <br />
            <span className="bg-[#C8FF00] text-[#080808] px-6 py-1 border-2 border-[#080808] shadow-brutal-lime inline-block rotate-[-1.5deg] mt-3">
              LET'S GO.
            </span>
          </h1>

          <p className="font-mono text-xs sm:text-base font-extrabold text-[var(--muted-text)] max-w-2xl mx-auto pt-6 leading-relaxed">
            {mode === 'offline'
              ? '"Your phone can wait. Go outside and make a memory."'
              : 'Spontaneous urban activity discovery for people who have free time, some money, and zero interest in planning.'}
          </p>
        </motion.div>
      </div>

      {/* Hero Tactile Magnetic Actions Bar */}
      <div className="max-w-4xl mx-auto w-full z-20 pt-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            data-cursor="GO"
            onClick={onOpenBoredomFlow}
            className="neo-btn-yellow w-full sm:w-auto px-8 py-5 text-base sm:text-lg font-black uppercase flex items-center justify-center gap-3 shadow-brutal-lime active:translate-y-1 transition-all"
          >
            <Zap className="w-6 h-6 fill-[#080808]" />
            <span>[ {mode === 'offline' ? 'GET ME OUTSIDE →' : 'SURPRISE ME →'} ]</span>
          </button>

          <button
            data-cursor="LISTEN"
            onClick={onOpenMusicModal}
            className="neo-btn-pink w-full sm:w-auto px-8 py-5 text-base sm:text-lg font-black uppercase flex items-center justify-center gap-3 shadow-brutal-sm active:translate-y-1 transition-all"
          >
            <Headphones className="w-6 h-6" />
            <span>[ WHAT SHOULD I LISTEN TO? 🎧 ]</span>
          </button>

          <Link
            data-cursor="EXPLORE"
            href="/roulette"
            className="neo-btn-black w-full sm:w-auto px-6 py-5 text-base sm:text-lg font-black uppercase flex items-center justify-center gap-2 shadow-brutal-lime"
          >
            <Dices className="w-5 h-5 text-[#FF2A85]" />
            <span>[ ROULETTE 🎰 ]</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
