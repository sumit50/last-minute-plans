'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Home, Compass, Dices, Plus, User } from 'lucide-react';

interface MobileNavProps {
  onOpenBoredomFlow?: () => void;
}

export function MobileNav({ onOpenBoredomFlow }: MobileNavProps) {
  const pathname = usePathname();

  const items = [
    { label: 'HOME', href: '/', icon: Home },
    { label: 'DISCOVER', href: '/discover', icon: Compass },
    { label: 'ROULETTE', href: '/roulette', icon: Dices },
    { label: 'PROFILE', href: '/profile', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-base)]/95 backdrop-blur-lg border-t-2 border-[var(--border-theme)] px-3 py-2 flex items-center justify-between font-mono text-[10px] font-black transition-colors">
      <Link
        href="/"
        className={`flex flex-col items-center py-1 px-2 ${
          pathname === '/' ? 'text-[#E6FF00]' : 'text-gray-400'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>HOME</span>
      </Link>

      <Link
        href="/discover"
        className={`flex flex-col items-center py-1 px-2 ${
          pathname === '/discover' ? 'text-[#E6FF00]' : 'text-gray-400'
        }`}
      >
        <Compass className="w-5 h-5" />
        <span>DISCOVER</span>
      </Link>

      {/* Dominant Central '+' SURPRISE ME Button */}
      <button
        onClick={onOpenBoredomFlow}
        className="w-12 h-12 rounded-full bg-[#E6FF00] text-[#0A0A0A] border-3 border-[#0A0A0A] shadow-brutal-pink flex items-center justify-center -mt-6 active:scale-95 transition-transform"
        title="Surprise Me"
      >
        <Plus className="w-7 h-7 stroke-[3]" />
      </button>

      <Link
        href="/roulette"
        className={`flex flex-col items-center py-1 px-2 ${
          pathname === '/roulette' ? 'text-[#E6FF00]' : 'text-gray-400'
        }`}
      >
        <Dices className="w-5 h-5" />
        <span>ROULETTE</span>
      </Link>

      <div className="flex flex-col items-center justify-center">
        <ThemeToggle />
      </div>
    </div>
  );
}
