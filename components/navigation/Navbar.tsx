'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeSelector } from '@/components/theme/ThemeSelector';
import { Zap, MapPin } from 'lucide-react';

interface NavbarProps {
  onOpenBoredomFlow?: () => void;
}

export function Navbar({ onOpenBoredomFlow }: NavbarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: 'DISCOVER', href: '/discover' },
    { label: 'ROULETTE 🎰', href: '/roulette' },
    { label: 'CREATE', href: '/create' },
    { label: 'MY VIBES 🎧', href: '/profile' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--bg-base)]/90 backdrop-blur-md border-b border-[var(--border-theme)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Editorial Logo */}
        <Link href="/" className="group flex flex-col justify-center">
          <div className="font-black text-xl tracking-tighter leading-none text-[var(--fg-main)] group-hover:text-[#C8FF00] transition-colors">
            LAST MINUTE PLANS
          </div>
          <div className="font-mono text-[9px] text-[#0055FF] dark:text-[#C8FF00] tracking-widest uppercase font-extrabold mt-0.5">
            CHANDIGARH / MOHALI
          </div>
        </Link>

        {/* Center Nav Items */}
        <nav className="hidden md:flex items-center gap-1 font-mono text-xs font-black">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 border transition-all ${isActive
                    ? 'bg-[#C8FF00] text-[#080808] border-[#080808] shadow-brutal-sm font-extrabold'
                    : 'text-[var(--fg-main)] border-transparent hover:border-[var(--border-theme)] hover:bg-[var(--surface-secondary)]'
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions & Theme Selector */}
        <div className="flex items-center gap-2">
          {/* Geolocation Tag */}
          <div className="hidden lg:flex items-center gap-1 text-[10px] font-mono font-extrabold bg-[var(--surface-secondary)] text-[var(--fg-main)] border border-[var(--border-theme)] px-2.5 py-1">
            <MapPin className="w-3 h-3 text-[#FF2A85]" />
            <span>CHD • 30.7333° N</span>
          </div>

          {/* Theme Selector Preview */}
          <ThemeSelector />

          {/* Surprise Me CTA */}
          <button
            onClick={onOpenBoredomFlow}
            className="neo-btn-yellow px-3.5 py-1.5 text-xs uppercase flex items-center gap-1.5 font-black"
          >
            <Zap className="w-3.5 h-3.5 fill-[#080808]" />
            <span>SURPRISE ME →</span>
          </button>
        </div>
      </div>
    </header>
  );
}
