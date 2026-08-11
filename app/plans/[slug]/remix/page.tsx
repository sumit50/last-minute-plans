'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/navigation/Navbar';
import { MobileNav } from '@/components/navigation/MobileNav';
import { Footer } from '@/components/navigation/Footer';
import { BoredomFlow } from '@/components/generator/BoredomFlow';
import { Plan } from '@/types';
import { INITIAL_PLANS } from '@/lib/mock-data';
import { Shuffle, ArrowLeft, Sparkles } from 'lucide-react';

export default function RemixPlanPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [originalPlan, setOriginalPlan] = useState<Plan | null>(null);
  const [remixTitle, setRemixTitle] = useState<string>('');
  const [remixBudget, setRemixBudget] = useState<number>(200);
  const [remixDescription, setRemixDescription] = useState<string>('');
  const [isBoredomOpen, setIsBoredomOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const plan = INITIAL_PLANS.find((p) => p.slug === slug || p.id === slug) || INITIAL_PLANS[0];
    setOriginalPlan(plan);
    setRemixTitle(`[REMIX] ${plan.title}`);
    setRemixBudget(Math.max(100, plan.budget - 100));
    setRemixDescription(`Remix of "${plan.title}" modified for lower budget / different vibe.`);
  }, [slug]);

  if (!originalPlan) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: remixTitle,
          description: remixDescription,
          budget: remixBudget,
          durationMinutes: originalPlan.durationMinutes,
          category: originalPlan.category,
          groupSizeType: originalPlan.groupSizeType,
          locationCity: originalPlan.locationCity,
          locationArea: originalPlan.locationArea,
          rules: originalPlan.rules,
          steps: originalPlan.steps,
        }),
      });

      const data = await res.json();
      setIsSubmitting(false);

      if (data.success && data.plan) {
        router.push(`/plans/${data.plan.slug}`);
      } else {
        router.push('/discover');
      }
    } catch (e) {
      setIsSubmitting(false);
      router.push('/discover');
    }
  };

  return (
    <div className="min-h-screen bg-brand-offwhite text-brand-dark flex flex-col justify-between">
      <Navbar onOpenBoredomFlow={() => setIsBoredomOpen(true)} />

      <main className="flex-1 max-w-3xl mx-auto px-4 py-8 space-y-6 w-full">
        <div>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1 font-mono text-xs font-black underline text-gray-700"
          >
            <ArrowLeft className="w-4 h-4" /> CANCEL REMIX
          </button>
        </div>

        <div className="border-b-3 border-brand-dark pb-4 space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-brand-dark text-brand-yellow font-mono text-xs font-black px-2.5 py-0.5 border border-brand-dark shadow-brutal-sm uppercase">
            <Shuffle className="w-3.5 h-3.5" />
            <span>REMIXING ORIGINAL PLAN</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            REMIX: {originalPlan.title}
          </h1>
          <p className="font-mono text-xs text-gray-600">
            Create a tweaked version (e.g. ₹200 version, solo version, rainy day version).
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border-4 border-brand-dark p-6 sm:p-8 shadow-brutal-xl space-y-6 font-mono text-xs font-bold">
          <div>
            <label className="block text-gray-800 uppercase mb-1 font-extrabold text-sm">REMIX TITLE</label>
            <input
              type="text"
              required
              value={remixTitle}
              onChange={(e) => setRemixTitle(e.target.value)}
              className="w-full p-3 border-3 border-brand-dark bg-brand-offwhite text-sm font-bold"
            />
          </div>

          <div>
            <label className="block text-gray-800 uppercase mb-1 font-extrabold text-sm">MODIFIED BUDGET (₹)</label>
            <input
              type="number"
              value={remixBudget}
              onChange={(e) => setRemixBudget(Number(e.target.value))}
              className="w-full p-3 border-2 border-brand-dark bg-white font-bold"
            />
          </div>

          <div>
            <label className="block text-gray-800 uppercase mb-1 font-extrabold text-sm">REMIX DESCRIPTION / NOTES</label>
            <textarea
              rows={3}
              value={remixDescription}
              onChange={(e) => setRemixDescription(e.target.value)}
              className="w-full p-3 border-3 border-brand-dark bg-brand-offwhite text-sm font-bold"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full neo-btn-yellow py-4 text-base font-black uppercase flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>{isSubmitting ? 'PUBLISHING REMIX...' : 'PUBLISH REMIXED PLAN 🚀'}</span>
          </button>
        </form>
      </main>

      <Footer onOpenBoredomFlow={() => setIsBoredomOpen(true)} />
      <MobileNav onOpenBoredomFlow={() => setIsBoredomOpen(true)} />

      <BoredomFlow
        isOpen={isBoredomOpen}
        onClose={() => setIsBoredomOpen(false)}
      />
    </div>
  );
}
