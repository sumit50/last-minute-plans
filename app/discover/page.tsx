'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { MobileNav } from '@/components/navigation/MobileNav';
import { Footer } from '@/components/navigation/Footer';
import { BoredomFlow } from '@/components/generator/BoredomFlow';
import { PlanCard } from '@/components/plans/PlanCard';
import { PlaylistCard } from '@/components/music/PlaylistCard';
import { ShareCardModal } from '@/components/plans/ShareCardModal';
import { useTheme } from '@/components/theme/ThemeProvider';
import { Plan, Playlist } from '@/types';
import { INITIAL_PLAYLISTS } from '@/lib/music/music-provider';
import { Search, Compass, Disc3, Sparkles } from 'lucide-react';

export default function DiscoverPage() {
  const { mode } = useTheme();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>(INITIAL_PLAYLISTS);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'PLANS' | 'SOUNDTRACKS'>('PLANS');
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isBoredomOpen, setIsBoredomOpen] = useState<boolean>(false);
  const [sharePlan, setSharePlan] = useState<Plan | null>(null);

  useEffect(() => {
    fetchPlans();
  }, [selectedFilter]);

  const fetchPlans = async () => {
    setLoading(true);
    setError(null);

    try {
      let url = '/api/plans?limit=24';
      if (selectedFilter !== 'ALL') {
        url += `&category=${selectedFilter}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        setPlans(data.plans);
      } else {
        setError(data.error || 'WE LOST THE PLOT. TRY AGAIN.');
      }
    } catch (e) {
      setError('WE LOST THE PLOT. TRY AGAIN.');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'ALL', label: '⚡ ALL VIBES' },
    { id: 'FOOD', label: '🥟 FOOD & DRINK' },
    { id: 'DATE', label: '❤️ DATE NIGHT' },
    { id: 'SOLO', label: '👤 SOLO MISSIONS' },
    { id: 'OUTDOORS', label: '🍃 OUTDOORS' },
    { id: 'CHAOS', label: '💀 CHAOS' },
    { id: 'FRIENDS', label: '💥 SQUAD' },
  ];

  const filteredPlans = plans.filter((plan) => {
    if (searchQuery.trim() === '') return true;
    const q = searchQuery.toLowerCase();
    return (
      plan.title.toLowerCase().includes(q) ||
      plan.description.toLowerCase().includes(q) ||
      plan.locationCity.toLowerCase().includes(q) ||
      plan.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--fg-main)] flex flex-col justify-between selection:bg-[#C8FF00] selection:text-[#080808] transition-colors">
      <Navbar onOpenBoredomFlow={() => setIsBoredomOpen(true)} />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 space-y-8 w-full">
        {/* Editorial Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#0055FF] text-white font-mono text-xs font-black px-3 py-1 border border-[#080808] shadow-brutal-lime uppercase">
            <Compass className="w-4 h-4" />
            <span>DISCOVERY ARCHIVE</span>
          </div>

          <h1 className="text-5xl sm:text-8xl font-black uppercase tracking-tighter leading-none text-[var(--fg-main)]">
            {mode === 'offline' ? 'THINGS TO DO IRL' : 'WHAT ARE PEOPLE DOING?'}
          </h1>

          <p className="font-mono text-xs sm:text-base font-extrabold text-[var(--muted-text)] max-w-2xl">
            {mode === 'offline'
              ? 'Physical plans, field notes, and outdoor missions for today.'
              : 'Browse real spontaneous plans, activity soundtracks, and local urban missions.'}
          </p>
        </div>

        {/* View Switcher: Plans vs Soundtracks */}
        <div className="flex items-center gap-3 border-b-2 border-[var(--border-theme)] pb-4 font-mono text-xs font-black">
          <button
            onClick={() => setActiveTab('PLANS')}
            className={`px-4 py-2 border transition-all flex items-center gap-2 ${
              activeTab === 'PLANS'
                ? 'bg-[#C8FF00] text-[#080808] border-[#080808] shadow-brutal-sm font-extrabold'
                : 'bg-[var(--surface-secondary)] text-[var(--fg-main)] border-[var(--border-theme)]'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>ACTIVITY PLANS ({filteredPlans.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('SOUNDTRACKS')}
            className={`px-4 py-2 border transition-all flex items-center gap-2 ${
              activeTab === 'SOUNDTRACKS'
                ? 'bg-[#FF2A85] text-white border-[#080808] shadow-brutal-sm font-extrabold'
                : 'bg-[var(--surface-secondary)] text-[var(--fg-main)] border-[var(--border-theme)]'
            }`}
          >
            <Disc3 className="w-4 h-4" />
            <span>ACTIVITY SOUNDTRACKS 🎧 ({playlists.length})</span>
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        {activeTab === 'PLANS' && (
          <div className="space-y-4">
            <div className="relative max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search plans, spots, or tags (e.g. momos, sunset)..."
                className="w-full pl-11 pr-4 py-3 font-mono text-xs font-bold border-2 border-[var(--border-high)] bg-[var(--surface-card)] text-[var(--fg-main)] shadow-brutal-sm focus:outline-none focus:ring-2 focus:ring-[#C8FF00]"
              />
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[var(--muted-text)]" />
            </div>

            <div className="flex flex-wrap gap-2 font-mono text-xs font-bold">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFilter(cat.id)}
                  className={`px-3.5 py-1.5 border transition-all ${
                    selectedFilter === cat.id
                      ? 'bg-[#C8FF00] text-[#080808] border-[#080808] font-black shadow-brutal-sm'
                      : 'bg-[var(--surface-secondary)] text-[var(--fg-main)] border-[var(--border-theme)] hover:border-[#C8FF00]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PLANS GRID VIEW */}
        {activeTab === 'PLANS' && (
          <div>
            {loading ? (
              <div className="py-16 text-center space-y-4 font-mono">
                <Sparkles className="w-8 h-8 text-[#C8FF00] animate-spin mx-auto" />
                <p className="text-xs font-extrabold text-[var(--muted-text)]">QUERYING REAL PRISMA DATABASE...</p>
              </div>
            ) : error ? (
              <div className="py-16 text-center space-y-4 bg-[var(--surface-card)] border-2 border-[var(--border-high)] p-8 shadow-brutal-lime max-w-xl mx-auto">
                <h3 className="text-2xl font-black uppercase text-[#FF2A85]">{error}</h3>
                <button
                  onClick={fetchPlans}
                  className="neo-btn-yellow px-6 py-3 text-xs font-mono font-black uppercase"
                >
                  TRY AGAIN
                </button>
              </div>
            ) : filteredPlans.length === 0 ? (
              <div className="py-16 text-center space-y-4 border-2 border-dashed border-[var(--border-theme)] p-12">
                <h3 className="text-3xl font-black uppercase tracking-tight text-[var(--fg-main)]">
                  NOTHING HERE.
                </h3>
                <p className="font-mono text-xs text-[var(--muted-text)]">
                  MAKE SOMETHING HAPPEN.
                </p>
                <button
                  onClick={() => setIsBoredomOpen(true)}
                  className="neo-btn-yellow px-6 py-3 text-xs font-mono font-black uppercase"
                >
                  [ GENERATE NEW PLAN → ]
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredPlans.map((plan, idx) => (
                  <PlanCard key={plan.id} plan={plan} index={idx} onShare={(p) => setSharePlan(p)} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* SOUNDTRACKS GRID VIEW */}
        {activeTab === 'SOUNDTRACKS' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        )}
      </main>

      <Footer onOpenBoredomFlow={() => setIsBoredomOpen(true)} />
      <MobileNav onOpenBoredomFlow={() => setIsBoredomOpen(true)} />

      <BoredomFlow
        isOpen={isBoredomOpen}
        onClose={() => setIsBoredomOpen(false)}
        onSharePlan={(p) => setSharePlan(p)}
      />

      {sharePlan && (
        <ShareCardModal
          isOpen={!!sharePlan}
          plan={sharePlan}
          onClose={() => setSharePlan(null)}
        />
      )}
    </div>
  );
}
