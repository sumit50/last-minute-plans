'use client';

import React from 'react';
import { Playlist } from '@/types';
import { ExternalLink, Music, Disc3 } from 'lucide-react';

interface PlaylistCardProps {
  playlist: Playlist;
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  return (
    <div className="neo-card group relative flex flex-col justify-between p-5 bg-[var(--surface-card)] border border-[var(--border-theme)] hover:border-[var(--border-high)] shadow-brutal hover:shadow-brutal-pink transition-all h-full text-[var(--fg-main)]">
      <div>
        {/* Provider & Mood Badge */}
        <div className="flex items-center justify-between gap-2 mb-3 font-mono text-[10px] font-black">
          <span className="bg-[#FF2A85] text-white px-2 py-0.5 border border-[#080808] uppercase tracking-wider flex items-center gap-1">
            <Disc3 className="w-3 h-3 animate-spin" />
            {playlist.provider.replace('_', ' ')}
          </span>
          <span className="bg-[#C8FF00] text-[#080808] px-2 py-0.5 border border-[#080808] font-extrabold uppercase">
            🎧 {playlist.mood}
          </span>
        </div>

        {/* Album Artwork */}
        <div className="relative w-full h-44 mb-4 border border-[var(--border-theme)] overflow-hidden bg-[#080808] shadow-brutal-sm">
          <img
            src={playlist.coverImage}
            alt={playlist.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
          />
          {/* Waveform decorative overlay badge */}
          <div className="absolute bottom-2 left-2 bg-[#080808]/90 text-[#C8FF00] border border-[var(--border-theme)] px-2 py-0.5 font-mono text-[10px] font-black flex items-center gap-1.5 backdrop-blur-sm">
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-full bg-[#C8FF00] animate-pulse" />
              <span className="w-0.5 h-2/3 bg-[#C8FF00] animate-pulse" style={{ animationDelay: '0.2s' }} />
              <span className="w-0.5 h-full bg-[#C8FF00] animate-pulse" style={{ animationDelay: '0.4s' }} />
              <span className="w-0.5 h-1/2 bg-[#C8FF00] animate-pulse" style={{ animationDelay: '0.1s' }} />
            </div>
            <span>{playlist.durationLabel}</span>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-black uppercase tracking-tight text-[var(--fg-main)] leading-tight mb-2 group-hover:text-[#C8FF00] transition-colors">
          {playlist.title}
        </h3>
        <p className="font-mono text-xs text-[var(--muted-text)] line-clamp-2 leading-relaxed mb-4">
          {playlist.description}
        </p>

        {/* Genre Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {playlist.genres.map((genre, idx) => (
            <span
              key={idx}
              className="bg-[var(--surface-secondary)] text-[var(--fg-main)] border border-[var(--border-theme)] px-1.5 py-0.5 font-mono text-[10px] font-bold"
            >
              🔥 {genre}
            </span>
          ))}
        </div>
      </div>

      {/* External Launch CTA */}
      <a
        href={playlist.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="neo-btn-pink w-full py-2.5 px-3 text-xs font-mono font-black uppercase flex items-center justify-center gap-2 text-center shadow-brutal-sm hover:translate-x-[-1px] transition-transform"
      >
        <Music className="w-3.5 h-3.5" />
        <span>[ ▶ OPEN PLAYLIST ]</span>
        <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
      </a>
    </div>
  );
}
