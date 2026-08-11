'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MusicMood, Playlist } from '@/types';
import { INITIAL_PLAYLISTS } from '@/lib/music/music-provider';
import { PlaylistCard } from '@/components/music/PlaylistCard';
import { X, Music, Headphones } from 'lucide-react';

interface MusicMoodPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MusicMoodPickerModal({ isOpen, onClose }: MusicMoodPickerModalProps) {
  const [selectedMood, setSelectedMood] = useState<MusicMood | 'ALL'>('ALL');

  if (!isOpen) return null;

  const moods: { id: MusicMood | 'ALL'; label: string }[] = [
    { id: 'ALL', label: '🎧 ALL VIBES' },
    { id: 'SUNSET', label: '🌅 SUNSET' },
    { id: 'LATE_NIGHT', label: '🌙 2AM / LATE NIGHT' },
    { id: 'HYPE', label: '🔥 HYPE' },
    { id: 'ROMANTIC', label: '❤️ ROMANTIC' },
    { id: 'ROAD_TRIP', label: '🏍️ ROAD TRIP' },
    { id: 'FOCUS', label: '🧠 LOCK IN' },
    { id: 'PARTY', label: '🪩 PARTY' },
    { id: 'SAD', label: '😭 SAD' },
  ];

  const filteredPlaylists = selectedMood === 'ALL'
    ? INITIAL_PLAYLISTS
    : INITIAL_PLAYLISTS.filter((p) => p.mood === selectedMood);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0A]/95 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-4xl bg-[#141414] border-4 border-[#F5F1E8] shadow-brutal-yellow p-6 sm:p-10 my-8 text-[#F5F1E8]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 bg-[#FF2A85] text-white border-2 border-[#0A0A0A] shadow-brutal-sm hover:translate-x-[-1px] transition-transform"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6 mb-8">
          <div className="flex items-center gap-2">
            <Headphones className="w-7 h-7 text-[#E6FF00]" />
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              WHAT'S THE VIBE? 🎧
            </h2>
          </div>
          <p className="font-mono text-xs text-gray-400">
            Pick a mood to discover curated activity soundtracks for your next adventure.
          </p>

          {/* Mood Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-black pt-2">
            {moods.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMood(m.id)}
                className={`px-3 py-1.5 border-2 border-[#333333] transition-all ${
                  selectedMood === m.id
                    ? 'bg-[#E6FF00] text-[#0A0A0A] border-[#0A0A0A] shadow-brutal-sm font-extrabold scale-105'
                    : 'bg-[#0A0A0A] text-gray-300 hover:border-[#E6FF00]'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Playlists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[480px] overflow-y-auto pr-2">
          {filteredPlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
