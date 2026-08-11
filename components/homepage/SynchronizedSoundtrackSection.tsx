'use client';

import React, { useState } from 'react';
import { Playlist } from '@/types';
import { Disc3, Music, ExternalLink, Headphones, ArrowRight } from 'lucide-react';

interface SynchronizedSoundtrackSectionProps {
  playlists: Playlist[];
  onOpenMusicModal: () => void;
}

export function SynchronizedSoundtrackSection({ playlists, onOpenMusicModal }: SynchronizedSoundtrackSectionProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const current = playlists[activeIdx] || playlists[0];

  if (!current) return null;

  return (
    <section className="bg-[var(--surface-card)] border-y border-[var(--border-theme)] py-16 px-4 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[var(--border-theme)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Headphones className="w-7 h-7 text-[#FF2A85]" />
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--fg-main)]">
                WHAT ARE WE LISTENING TO? 🎧
              </h2>
            </div>
            <p className="font-mono text-xs text-[var(--muted-text)] font-extrabold">
              Activity soundtracks synchronized with every local plan
            </p>
          </div>

          <button
            onClick={onOpenMusicModal}
            className="neo-btn-pink px-4 py-2 font-mono text-xs font-black uppercase flex items-center gap-1"
          >
            <span>BROWSE ALL SOUNDTRACKS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Large Editorial Album Showcase */}
        <div className="bg-[var(--bg-base)] border-2 border-[var(--border-high)] p-6 sm:p-10 shadow-brutal-pink grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Large Vinyl Artwork */}
          <div className="lg:col-span-5 relative w-full h-72 sm:h-96 border-2 border-[var(--border-high)] overflow-hidden bg-[#080808] shadow-brutal-lime">
            <img
              src={current.coverImage}
              alt={current.title}
              className="w-full h-full object-cover opacity-90"
            />
            {/* Equalizer Overlay */}
            <div className="absolute bottom-4 left-4 bg-[#080808]/90 text-[#C8FF00] border border-[#080808] px-3 py-1 font-mono text-xs font-black flex items-center gap-2 backdrop-blur-md">
              <div className="flex items-end gap-1 h-4">
                <span className="w-1 h-full bg-[#C8FF00] animate-pulse" />
                <span className="w-1 h-2/3 bg-[#C8FF00] animate-pulse" style={{ animationDelay: '0.2s' }} />
                <span className="w-1 h-full bg-[#C8FF00] animate-pulse" style={{ animationDelay: '0.4s' }} />
                <span className="w-1 h-1/2 bg-[#C8FF00] animate-pulse" style={{ animationDelay: '0.1s' }} />
              </div>
              <span>{current.durationLabel}</span>
            </div>
          </div>

          {/* Right Column: Editorial Track Details */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex items-center gap-2 font-mono text-xs font-black">
              <span className="bg-[#FF2A85] text-white px-2.5 py-0.5 border border-[#080808] uppercase flex items-center gap-1">
                <Disc3 className="w-3.5 h-3.5 animate-spin" />
                {current.provider.replace('_', ' ')}
              </span>
              <span className="bg-[#C8FF00] text-[#080808] px-2.5 py-0.5 border border-[#080808]">
                🎧 {current.mood}
              </span>
            </div>

            <h3 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[var(--fg-main)] leading-none">
              {current.title}
            </h3>

            <p className="font-mono text-xs sm:text-base text-[var(--muted-text)] font-extrabold leading-relaxed">
              {current.description}
            </p>

            <div className="flex flex-wrap gap-2 font-mono text-xs font-bold">
              {current.genres.map((g, i) => (
                <span key={i} className="bg-[var(--surface-secondary)] text-[var(--fg-main)] border border-[var(--border-theme)] px-2.5 py-1">
                  🔥 {g}
                </span>
              ))}
            </div>

            {/* Launch CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={current.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn-pink w-full sm:w-auto px-8 py-4 text-xs font-mono font-black uppercase flex items-center justify-center gap-2 shadow-brutal-sm"
              >
                <Music className="w-4 h-4" />
                <span>[ ▶ OPEN PLAYLIST ON SPOTIFY ]</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {/* Playlist Switcher Chips */}
              <div className="flex items-center gap-2 font-mono text-xs font-black overflow-x-auto w-full sm:w-auto">
                {playlists.slice(0, 4).map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`px-3 py-2 border transition-all ${
                      activeIdx === idx
                        ? 'bg-[#C8FF00] text-[#080808] border-[#080808] font-black'
                        : 'bg-[var(--surface-secondary)] text-[var(--fg-main)] border-[var(--border-theme)]'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
