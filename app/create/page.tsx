'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navigation/Navbar';
import { MobileNav } from '@/components/navigation/MobileNav';
import { Footer } from '@/components/navigation/Footer';
import { BoredomFlow } from '@/components/generator/BoredomFlow';
import { CategoryType, GroupSize } from '@/types';
import { Trash2, Sparkles } from 'lucide-react';

export default function CreatePlanPage() {
  const router = useRouter();
  const [isBoredomOpen, setIsBoredomOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [budget, setBudget] = useState<number>(300);
  const [durationMinutes, setDurationMinutes] = useState<number>(90);
  const [category, setCategory] = useState<CategoryType>('WITH_FRIENDS');
  const [groupSizeType, setGroupSizeType] = useState<GroupSize>('2_PEOPLE');
  const [locationCity, setLocationCity] = useState<string>('Chandigarh');
  const [locationArea, setLocationArea] = useState<string>('Sector 15');

  const [rules, setRules] = useState<string[]>([
    'Maximum budget is non-negotiable.',
    'No checking work emails!',
  ]);

  const [steps, setSteps] = useState<{ title: string; description: string; durationMinutes: number }[]>([
    { title: 'ROUND 01: Meet at Spot', description: 'Gather squad and set 30-minute timer.', durationMinutes: 30 },
    { title: 'ROUND 02: Execute Main Mission', description: 'Hunt for food or complete challenge.', durationMinutes: 45 },
  ]);

  const handleAddRule = () => {
    setRules([...rules, '']);
  };

  const handleRemoveRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const handleAddStep = () => {
    setSteps([
      ...steps,
      {
        title: `ROUND 0${steps.length + 1}: Next Phase`,
        description: 'Detail what to do in this round.',
        durationMinutes: 30,
      },
    ]);
  };

  const handleRemoveStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please fill out the plan title and description!');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          budget: Number(budget),
          durationMinutes: Number(durationMinutes),
          category,
          groupSizeType,
          locationCity,
          locationArea,
          rules: rules.filter((r) => r.trim() !== ''),
          steps,
        }),
      });

      const data = await res.json();
      setIsSubmitting(false);

      if (data.success && data.plan) {
        router.push(`/plans/${data.plan.slug}`);
      } else {
        router.push('/discover');
      }
    } catch (err) {
      setIsSubmitting(false);
      router.push('/discover');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F1E8] flex flex-col justify-between selection:bg-[#E6FF00] selection:text-[#0A0A0A]">
      <Navbar onOpenBoredomFlow={() => setIsBoredomOpen(true)} />

      <main className="flex-1 max-w-3xl mx-auto px-4 py-10 space-y-8 w-full">
        <div className="border-b-2 border-[#333333] pb-4 space-y-2">
          <div className="inline-block bg-[#E6FF00] text-[#0A0A0A] font-mono text-xs font-black px-2.5 py-0.5 border border-[#0A0A0A]">
            CREATE COMMUNITY PLAN
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight">
            MAKE A PLAN
          </h1>
          <p className="font-mono text-xs text-gray-400">
            Got a wild idea that actually works? Submit it so other bored humans can try it.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#141414] border-4 border-[#F5F1E8] p-6 sm:p-10 shadow-brutal-yellow space-y-6 font-mono text-xs font-bold">
          {/* Plan Title */}
          <div>
            <label className="block text-[#E6FF00] uppercase mb-1 font-extrabold text-sm">
              PLAN TITLE *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. ₹300 and a questionable amount of confidence"
              className="w-full p-3.5 border-2 border-[#F5F1E8] bg-[#0A0A0A] text-[#F5F1E8] text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#E6FF00]"
            />
          </div>

          {/* Plan Description */}
          <div>
            <label className="block text-[#E6FF00] uppercase mb-1 font-extrabold text-sm">
              DESCRIPTION / VIBE *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Three friends. Two food spots. One winner. Loser buys chai."
              className="w-full p-3.5 border-2 border-[#F5F1E8] bg-[#0A0A0A] text-[#F5F1E8] text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#E6FF00]"
            />
          </div>

          {/* Budget, Duration & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-300 uppercase mb-1">Max Budget (₹)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full p-3 border-2 border-[#333333] bg-[#0A0A0A] text-[#F5F1E8] font-bold"
              />
            </div>

            <div>
              <label className="block text-gray-300 uppercase mb-1">Duration (Mins)</label>
              <input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full p-3 border-2 border-[#333333] bg-[#0A0A0A] text-[#F5F1E8] font-bold"
              />
            </div>

            <div>
              <label className="block text-gray-300 uppercase mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full p-3 border-2 border-[#333333] bg-[#0A0A0A] text-[#F5F1E8] font-bold"
              >
                <option value="WITH_FRIENDS">WITH FRIENDS</option>
                <option value="DATE">DATE</option>
                <option value="SOLO">SOLO</option>
                <option value="AT_HOME">AT HOME</option>
                <option value="CHAOS">CHAOS</option>
              </select>
            </div>
          </div>

          {/* City & Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 uppercase mb-1">City</label>
              <input
                type="text"
                value={locationCity}
                onChange={(e) => setLocationCity(e.target.value)}
                className="w-full p-3 border-2 border-[#333333] bg-[#0A0A0A] text-[#F5F1E8] font-bold"
              />
            </div>

            <div>
              <label className="block text-gray-300 uppercase mb-1">Area / Sector</label>
              <input
                type="text"
                value={locationArea}
                onChange={(e) => setLocationArea(e.target.value)}
                placeholder="e.g. Sector 17 / Sector 35"
                className="w-full p-3 border-2 border-[#333333] bg-[#0A0A0A] text-[#F5F1E8] font-bold"
              />
            </div>
          </div>

          {/* Rules */}
          <div className="border-t-2 border-dashed border-[#333333] pt-4 space-y-3">
            <div className="flex justify-between items-center">
              <label className="block text-gray-300 uppercase font-extrabold text-sm">MISSION RULES</label>
              <button
                type="button"
                onClick={handleAddRule}
                className="bg-[#E6FF00] text-[#0A0A0A] border border-[#0A0A0A] px-2.5 py-1 text-[11px] font-black uppercase"
              >
                + ADD RULE
              </button>
            </div>

            {rules.map((rule, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={rule}
                  onChange={(e) => {
                    const updated = [...rules];
                    updated[idx] = e.target.value;
                    setRules(updated);
                  }}
                  placeholder={`Rule #${idx + 1}`}
                  className="flex-1 p-3 border-2 border-[#333333] bg-[#0A0A0A] text-[#F5F1E8] font-bold"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveRule(idx)}
                  className="p-3 bg-[#FF2A85] text-white border-2 border-[#0A0A0A]"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div className="border-t-2 border-dashed border-[#333333] pt-4 space-y-3">
            <div className="flex justify-between items-center">
              <label className="block text-gray-300 uppercase font-extrabold text-sm">MISSION STEPS</label>
              <button
                type="button"
                onClick={handleAddStep}
                className="bg-[#0055FF] text-white border border-[#0A0A0A] px-2.5 py-1 text-[11px] font-black uppercase"
              >
                + ADD STEP
              </button>
            </div>

            {steps.map((step, idx) => (
              <div key={idx} className="bg-[#0A0A0A] border-2 border-[#333333] p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="bg-[#E6FF00] text-[#0A0A0A] text-[10px] font-black px-2 py-0.5">
                    STEP #{idx + 1}
                  </span>
                  {steps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveStep(idx)}
                      className="text-[#FF2A85] font-bold underline text-[11px]"
                    >
                      REMOVE
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => {
                    const updated = [...steps];
                    updated[idx].title = e.target.value;
                    setSteps(updated);
                  }}
                  placeholder="Step title"
                  className="w-full p-2.5 border-2 border-[#333333] bg-[#141414] text-[#F5F1E8] font-bold"
                />

                <textarea
                  rows={2}
                  value={step.description}
                  onChange={(e) => {
                    const updated = [...steps];
                    updated[idx].description = e.target.value;
                    setSteps(updated);
                  }}
                  placeholder="Step description"
                  className="w-full p-2.5 border-2 border-[#333333] bg-[#141414] text-[#F5F1E8] font-bold"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full neo-btn-yellow py-4 text-base font-black uppercase flex items-center justify-center gap-2 mt-6 shadow-brutal-pink"
          >
            <Sparkles className="w-5 h-5" />
            <span>{isSubmitting ? 'PUBLISHING PLAN...' : 'PUBLISH THIS PLAN 🚀'}</span>
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
