'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/navigation/Navbar';
import { MobileNav } from '@/components/navigation/MobileNav';
import { Footer } from '@/components/navigation/Footer';
import { ReactionBar } from '@/components/plans/ReactionBar';
import { DidItModal } from '@/components/plans/DidItModal';
import { ShareCardModal } from '@/components/plans/ShareCardModal';
import { BoredomFlow } from '@/components/generator/BoredomFlow';
import { PlaylistCard } from '@/components/music/PlaylistCard';
import { Plan, Playlist } from '@/types';
import { INITIAL_PLANS } from '@/lib/mock-data';
import { musicProvider } from '@/lib/music/music-provider';
import { Clock, Users, CheckCircle2, Share2, Shuffle, ArrowLeft, AlertTriangle, Flame, Headphones, Music, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function PlanDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [plan, setPlan] = useState<Plan | null>(null);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDidItOpen, setIsDidItOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [isBoredomOpen, setIsBoredomOpen] = useState<boolean>(false);

  const fetchPlanData = async () => {
    try {
      const res = await fetch(`/api/plans/${slug}`);
      const data = await res.json();
      if (data.success && data.plan) {
        setPlan(data.plan);
      } else {
        const fallback = INITIAL_PLANS.find((p) => p.slug === slug || p.id === slug);
        setPlan(fallback || INITIAL_PLANS[0]);
      }
    } catch {
      const fallback = INITIAL_PLANS.find((p) => p.slug === slug || p.id === slug);
      setPlan(fallback || INITIAL_PLANS[0]);
    }

    const pl = await musicProvider.getPlaylistForPlan(slug);
    setPlaylist(pl);
    setLoading(false);
  };

  useEffect(() => {
    fetchPlanData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-base)] text-[var(--fg-main)] flex flex-col justify-between">
        <Navbar />
        <div className="max-w-4xl mx-auto py-24 px-4 text-center font-mono text-xs font-black">
          <div className="w-12 h-12 bg-[#E6FF00] border-3 border-[#0A0A0A] animate-spin mx-auto mb-4 shadow-brutal-pink" />
          <p className="uppercase text-[#E6FF00]">ASKING THE GROUP CHAT FOR PLAN DETAILS...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!plan) return null;

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--fg-main)] flex flex-col justify-between selection:bg-[#E6FF00] selection:text-[#0A0A0A] transition-colors">
      <Navbar onOpenBoredomFlow={() => setIsBoredomOpen(true)} />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 space-y-10 w-full">
        {/* Back Link */}
        <div>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1 font-mono text-xs font-black underline text-[var(--muted-text)] hover:text-[#E6FF00]"
          >
            <ArrowLeft className="w-4 h-4" /> BACK TO DISCOVERY
          </button>
        </div>

        {/* Plan Mission Header Card */}
        <div className="bg-[var(--surface-card)] border-4 border-[var(--border-high)] p-6 sm:p-10 shadow-brutal-yellow space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2 font-mono text-xs font-black">
              <span className="px-3 py-1 border border-[#0A0A0A] bg-[#E6FF00] text-[#0A0A0A] shadow-brutal-sm">
                {plan.category.replace('_', ' ')}
              </span>
              <span className="bg-[#0055FF] text-white px-3 py-1 border border-[#0A0A0A] shadow-brutal-sm">
                {plan.budgetLabel}
              </span>
              <span className="bg-[#FF2A85] text-white px-3 py-1 border border-[#0A0A0A] shadow-brutal-sm">
                {plan.durationLabel}
              </span>
            </div>

            <div className="bg-[var(--surface-secondary)] text-[var(--fg-main)] border border-[var(--border-theme)] px-3 py-1 font-mono text-xs font-extrabold">
              📍 {plan.locationCity} {plan.locationArea ? `(${plan.locationArea})` : ''}
            </div>
          </div>

          <div>
            <h1 className="text-4xl sm:text-7xl font-black uppercase tracking-tighter leading-none text-[var(--fg-main)]">
              {plan.title}
            </h1>
            <p className="font-mono text-sm sm:text-base text-[var(--muted-text)] pt-4 leading-relaxed">
              {plan.description}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs font-black bg-[var(--surface-secondary)] border-2 border-[var(--border-theme)] p-4">
            <div className="space-y-0.5">
              <span className="text-[10px] text-[var(--muted-text)] block uppercase">RECOMMENDED GROUP</span>
              <span className="text-[var(--fg-main)] flex items-center gap-1">
                <Users className="w-4 h-4 text-[#0055FF]" />
                {plan.groupSizeLabel}
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] text-[var(--muted-text)] block uppercase">EST. DURATION</span>
              <span className="text-[var(--fg-main)] flex items-center gap-1">
                <Clock className="w-4 h-4 text-[#FF2A85]" />
                {plan.durationLabel}
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] text-[var(--muted-text)] block uppercase">TOTAL TRIED</span>
              <span className="text-[#FF2A85] dark:text-[#E6FF00] flex items-center gap-1">
                <Flame className="w-4 h-4 fill-current" />
                {plan.tryCount} HUMANS
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] text-[var(--muted-text)] block uppercase">CREATED BY</span>
              <span className="text-[#00FF66] dark:text-[#00FF66] font-black">
                {plan.creatorName}
              </span>
            </div>
          </div>

          {/* Core Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <button
              onClick={() => setIsDidItOpen(true)}
              className="neo-btn-yellow py-4 px-4 text-sm font-black uppercase flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-[#0A0A0A]" />
              <span>MARK AS DID IT ✅</span>
            </button>

            <button
              onClick={() => setIsShareOpen(true)}
              className="bg-[var(--surface-secondary)] text-[var(--fg-main)] border-3 border-[var(--border-theme)] shadow-brutal-sm hover:border-[#E6FF00] py-4 px-4 text-xs font-mono font-black uppercase flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4 text-[#0055FF]" />
              <span>SHARE TO GROUP</span>
            </button>

            <Link
              href={`/plans/${plan.slug}/remix`}
              className="bg-[#FF2A85] text-white border-3 border-[#0A0A0A] shadow-brutal-yellow hover:bg-pink-700 py-4 px-4 text-xs font-mono font-black uppercase flex items-center justify-center gap-2 text-center"
            >
              <Shuffle className="w-4 h-4 text-[#E6FF00]" />
              <span>REMIX THIS PLAN</span>
            </Link>
          </div>
        </div>

        {/* DEDICATED SOUNDTRACK SECTION: WHAT ARE WE LISTENING TO? 🎧 */}
        {playlist && (
          <div className="bg-[var(--surface-card)] border-4 border-[#FF2A85] p-6 sm:p-8 shadow-brutal-pink space-y-6">
            <div className="flex items-center justify-between border-b-2 border-[var(--border-theme)] pb-3">
              <div className="flex items-center gap-2">
                <Headphones className="w-6 h-6 text-[#FF2A85]" />
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[var(--fg-main)]">
                  WHAT ARE WE LISTENING TO? 🎧
                </h2>
              </div>
              <span className="font-mono text-xs font-bold text-[var(--muted-text)] hidden sm:inline">RECOMMENDED SOUNDTRACK</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-4 relative w-full h-48 border-2 border-[var(--border-high)] shadow-brutal-sm overflow-hidden bg-[#0A0A0A]">
                <img src={playlist.coverImage} alt={playlist.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-[#E6FF00] text-[#0A0A0A] font-mono text-[10px] font-black px-2 py-0.5 border border-[#0A0A0A]">
                  🎧 {playlist.mood}
                </div>
              </div>

              <div className="sm:col-span-8 space-y-4 text-left">
                <div>
                  <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[var(--fg-main)]">
                    {playlist.title}
                  </h3>
                  <p className="font-mono text-xs text-[var(--muted-text)] mt-2 leading-relaxed">
                    {playlist.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 font-mono text-xs font-extrabold">
                  {playlist.genres.map((g, idx) => (
                    <span key={idx} className="bg-[var(--surface-secondary)] text-[var(--fg-main)] border border-[var(--border-theme)] px-2 py-0.5">
                      🔥 {g}
                    </span>
                  ))}
                  <span className="bg-[var(--surface-secondary)] text-[var(--muted-text)] border border-[var(--border-theme)] px-2 py-0.5">
                    {playlist.durationLabel}
                  </span>
                </div>

                <a
                  href={playlist.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn-pink inline-flex items-center gap-2 px-6 py-3 font-mono text-xs font-black uppercase"
                >
                  <Music className="w-4 h-4" />
                  <span>[ ▶ OPEN PLAYLIST IN SPOTIFY ]</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* MISSION RULES & CONSTRAINTS */}
        {plan.rules && plan.rules.length > 0 && (
          <div className="bg-[var(--surface-card)] border-3 border-[#FF2A85] p-6 shadow-brutal-pink space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-[#FF2A85]">
              <AlertTriangle className="w-5 h-5" />
              <span>MISSION RULES (DO NOT IGNORE)</span>
            </div>
            <ul className="space-y-2 font-mono text-xs font-bold text-[var(--fg-main)]">
              {plan.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-[var(--surface-secondary)] p-3 border border-[var(--border-theme)]">
                  <span className="bg-[#FF2A85] text-white text-[10px] font-black px-1.5 py-0.5">#{idx + 1}</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* THE MISSION STEPS / ROUNDS */}
        <div className="bg-[var(--surface-card)] border-4 border-[var(--border-high)] p-6 sm:p-10 shadow-brutal space-y-8">
          <div className="border-b-2 border-[var(--border-theme)] pb-4">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[var(--fg-main)]">
              THE MISSION TIMELINE
            </h2>
            <p className="font-mono text-xs text-[var(--muted-text)]">Follow the steps in order for maximum chaos.</p>
          </div>

          <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-1 before:bg-[#E6FF00]">
            {plan.steps.map((step) => (
              <div key={step.id} className="relative pl-10 space-y-1">
                <div className="absolute left-1.5 top-1 w-6 h-6 bg-[#E6FF00] text-[#0A0A0A] border-2 border-[#0A0A0A] rounded-full font-mono text-xs font-black flex items-center justify-center shadow-brutal-sm">
                  {step.stepNumber}
                </div>

                <div className="bg-[var(--surface-secondary)] border-2 border-[var(--border-theme)] p-4 shadow-brutal-sm space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-black text-lg uppercase tracking-tight text-[#0055FF] dark:text-[#E6FF00]">{step.title}</h3>
                    {step.durationMinutes && (
                      <span className="bg-[#0055FF] text-white font-mono text-[10px] font-extrabold px-2 py-0.5">
                        ⏱️ {step.durationMinutes} MINS
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-xs text-[var(--fg-main)] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* REACTION BAR */}
        <ReactionBar planId={plan.id} initialReactions={plan.reactions} />

        {/* COMPLETED ATTEMPTS / COMMUNITY LOG */}
        <div className="bg-[var(--surface-card)] border-4 border-[var(--border-high)] p-6 sm:p-10 shadow-brutal space-y-6">
          <div className="flex items-center justify-between border-b-2 border-[var(--border-theme)] pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[var(--fg-main)]">
                HUMANS WHO DID IT ({plan.attempts?.length || 0})
              </h2>
              <p className="font-mono text-xs text-[var(--muted-text)]">Authentic reviews from people who actually finished this</p>
            </div>
            <button
              onClick={() => setIsDidItOpen(true)}
              className="neo-btn-yellow px-3.5 py-2 font-mono text-xs font-black uppercase"
            >
              + LOG YOURS
            </button>
          </div>

          <div className="space-y-4">
            {plan.attempts && plan.attempts.length > 0 ? (
              plan.attempts.map((att) => (
                <div key={att.id} className="bg-[var(--surface-secondary)] border-2 border-[var(--border-theme)] p-4 shadow-brutal-sm space-y-2 font-mono text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-[#0055FF] dark:text-[#E6FF00]">👤 {att.username}</span>
                    <span className="text-[var(--muted-text)] font-bold">{att.completedAt}</span>
                  </div>
                  <div className="flex items-center gap-3 font-bold text-[var(--fg-main)]">
                    <span className="bg-[var(--bg-base)] px-2 py-0.5 border border-[var(--border-theme)]">
                      SPENT: ₹{att.actualCost}
                    </span>
                    <span className="bg-[#0055FF] text-white px-2 py-0.5 border border-[#0A0A0A]">
                      TIME: {att.actualDurationMinutes} MINS
                    </span>
                  </div>
                  <p className="text-[var(--fg-main)] italic bg-[var(--surface-card)] p-3 border border-[var(--border-theme)]">
                    "{att.review}"
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 font-mono text-xs text-[var(--muted-text)] border-2 border-dashed border-[var(--border-theme)]">
                NO ONE HAS LOGGED A COMPLETION YET. BE THE FIRST!
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer onOpenBoredomFlow={() => setIsBoredomOpen(true)} />
      <MobileNav onOpenBoredomFlow={() => setIsBoredomOpen(true)} />

      {/* Modals */}
      <DidItModal
        isOpen={isDidItOpen}
        plan={plan}
        onClose={() => setIsDidItOpen(false)}
        onSuccess={fetchPlanData}
      />

      <ShareCardModal
        isOpen={isShareOpen}
        plan={plan}
        onClose={() => setIsShareOpen(false)}
      />

      <BoredomFlow
        isOpen={isBoredomOpen}
        onClose={() => setIsBoredomOpen(false)}
      />
    </div>
  );
}
