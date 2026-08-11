'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plan, GroupSize, EnergyLevel, Playlist } from '@/types';
import { getBestPlan, mapEnergyLevel, mapGroupSizeToCount, RecommendationResult } from '@/lib/plans/recommend';
import { locationService } from '@/lib/maps/location-service';
import { X, MapPin, Zap, ArrowRight, RefreshCw, Share2, Music, ExternalLink, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface BoredomFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onSharePlan?: (plan: Plan) => void;
}

export function BoredomFlow({ isOpen, onClose, onSharePlan }: BoredomFlowProps) {
  const [step, setStep] = useState<number>(1);
  const [location, setLocation] = useState<string>('Chandigarh, India');
  const [groupSize, setGroupSize] = useState<GroupSize>('2_PEOPLE');
  const [budget, setBudget] = useState<number>(300);
  const [energyLevel, setEnergyLevel] = useState<EnergyLevel>('LETS_GO');
  const [duration, setDuration] = useState<number>(120);
  const [musicChoice, setMusicChoice] = useState<'PICK_FOR_ME' | 'ILL_CHOOSE' | 'NO_MUSIC'>('PICK_FOR_ME');

  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [loaderTextIndex, setLoaderTextIndex] = useState<number>(0);
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);
  const [excludedIds, setExcludedIds] = useState<string[]>([]);
  const [nopeFeedbackCopy, setNopeFeedbackCopy] = useState<string>('NAH. AGAIN.');
  const [sessionCount, setSessionCount] = useState<number>(1);

  const loaderMessages = [
    "asking the group chat...",
    "checking the damage...",
    "consulting the universe...",
    "finding something worth leaving the house for...",
    "matching activity soundtrack 🎧..."
  ];

  const nopeCopyOptions = [
    "FAIR. TRY THIS ONE.",
    "NOT FEELING IT? OKAY NEXT.",
    "WE CAN DO BETTER.",
    "FAIR ENOUGH. HOW ABOUT THIS?",
    "SWAPPING THE PLOT..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCalculating) {
      interval = setInterval(() => {
        setLoaderTextIndex((prev) => (prev + 1) % loaderMessages.length);
      }, 350);
    }
    return () => clearInterval(interval);
  }, [isCalculating]);

  if (!isOpen) return null;

  const handleLocateMe = async () => {
    try {
      const loc = await locationService.getCurrentLocation();
      setLocation(`${loc.name}, ${loc.city}`);
    } catch (e) {
      setLocation('Chandigarh, India');
    }
  };

  const getBudgetCopy = (b: number) => {
    if (b === 0) return "Broke human. We got you.";
    if (b <= 100) return "WE'RE GETTING CREATIVE.";
    if (b <= 300) return "OKAY. WE HAVE OPTIONS.";
    if (b <= 500) return "YOU'RE SPOILING YOURSELF.";
    return "NO FURTHER QUESTIONS.";
  };

  const handleCalculatePlan = async (idsToExclude: string[] = excludedIds) => {
    setIsCalculating(true);
    setStep(7); // Calculating state

    setTimeout(async () => {
      const prefs = {
        location: { city: location.split(',')[0].trim() || 'Chandigarh' },
        people: mapGroupSizeToCount(groupSize),
        budget,
        energy: mapEnergyLevel(energyLevel),
        durationMinutes: duration,
      };

      const result = await getBestPlan(prefs, idsToExclude);
      setRecommendation(result);
      if (result.plan) {
        setExcludedIds((prev) => [...prev, result.plan.id]);
        setSessionCount((prev) => prev + 1);
      }

      setIsCalculating(false);
      setStep(8); // Result state
    }, 1200);
  };

  const handleGiveMeAnother = () => {
    const randomCopy = nopeCopyOptions[Math.floor(Math.random() * nopeCopyOptions.length)];
    setNopeFeedbackCopy(randomCopy);
    handleCalculatePlan(excludedIds);
  };

  const resetFlow = () => {
    setStep(1);
    setRecommendation(null);
    setExcludedIds([]);
    setIsCalculating(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080808]/95 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        className="relative w-full max-w-3xl bg-[var(--surface-card)] border-2 border-[var(--border-high)] shadow-brutal-lime p-6 sm:p-10 my-8 text-[var(--fg-main)] transition-colors"
      >
        {/* Close Button */}
        <button
          onClick={() => { resetFlow(); onClose(); }}
          className="absolute top-4 right-4 p-2.5 bg-[#FF2A85] text-white border-2 border-[#080808] shadow-brutal-sm hover:translate-x-[-1px] transition-transform"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Header */}
        {step <= 6 && (
          <div className="mb-8">
            <div className="flex items-center justify-between font-mono text-xs font-black mb-3">
              <span className="bg-[#C8FF00] text-[#080808] px-2.5 py-0.5 border border-[#080808]">
                0{step} / 06
              </span>
              <span className="text-[var(--muted-text)]">PLANS EXPLORED: {sessionCount.toString().padStart(2, '0')}</span>
            </div>
            <div className="w-full h-2 bg-[var(--surface-secondary)] border border-[var(--border-theme)] overflow-hidden">
              <div
                className="h-full bg-[#C8FF00] transition-all duration-300"
                style={{ width: `${(step / 6) * 100}%` }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 1: LOCATION */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              <div>
                <span className="font-mono text-xs font-black text-[#FF2A85] tracking-widest block uppercase mb-1">
                  01 / WHERE ARE YOU?
                </span>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--fg-main)]">
                  YOUR LOCATION
                </h2>
                <p className="font-mono text-xs text-[var(--muted-text)] mt-1">
                  Tell us your location or pick a city hotspot.
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Sector 17, Chandigarh"
                    className="w-full p-4 font-mono text-sm font-bold border-2 border-[var(--border-high)] shadow-brutal-sm bg-[var(--bg-base)] text-[var(--fg-main)] focus:outline-none focus:ring-2 focus:ring-[#C8FF00]"
                  />
                  <button
                    onClick={handleLocateMe}
                    type="button"
                    className="absolute right-3 top-3 px-3 py-1.5 bg-[#0055FF] text-white border border-[#080808] font-mono text-xs font-black flex items-center gap-1 shadow-brutal-sm hover:bg-blue-700"
                  >
                    <MapPin className="w-3.5 h-3.5" /> LOCATE ME
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="font-mono text-xs font-bold text-[var(--muted-text)] self-center">Hotspots:</span>
                  {['Chandigarh', 'Mohali', 'Sector 17', 'Sector 35', 'Panjab University'].map((spot) => (
                    <button
                      key={spot}
                      onClick={() => setLocation(`${spot}, India`)}
                      className={`px-3 py-1 border font-mono text-xs font-bold shadow-brutal-sm ${
                        location.includes(spot)
                          ? 'bg-[#C8FF00] text-[#080808] border-[#080808] font-black'
                          : 'bg-[var(--surface-secondary)] text-[var(--fg-main)] border-[var(--border-theme)] hover:border-[var(--border-high)]'
                      }`}
                    >
                      {spot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="neo-btn-yellow px-8 py-3 text-sm font-black flex items-center gap-2"
                >
                  <span>NEXT QUESTION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: WHO'S COMING */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              <div>
                <span className="font-mono text-xs font-black text-[#C8FF00] tracking-widest block uppercase mb-1">
                  02 / WHO'S COMING?
                </span>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--fg-main)]">
                  SQUAD SIZE
                </h2>
                <p className="font-mono text-xs text-[var(--muted-text)] mt-1">
                  Pick your crew.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-sm font-extrabold">
                {[
                  { id: 'JUST_ME', label: '👤 JUST ME', desc: 'Solo mission mode' },
                  { id: '2_PEOPLE', label: '👥 2 PEOPLE', desc: 'Duo / Date / Bestie' },
                  { id: '3_5_PEOPLE', label: '💥 3-5 PEOPLE', desc: 'Standard squad' },
                  { id: 'BIG_GROUP', label: '🚀 THE WHOLE GANG', desc: 'Full gang assembly' },
                ].map((opt) => (
                  <motion.button
                    key={opt.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => { setGroupSize(opt.id as GroupSize); setStep(3); }}
                    className={`p-5 text-left border-2 transition-all ${
                      groupSize === opt.id
                        ? 'bg-[#C8FF00] text-[#080808] border-[#080808] shadow-brutal-sm font-black'
                        : 'bg-[var(--surface-secondary)] text-[var(--fg-main)] border-[var(--border-theme)] hover:border-[var(--border-high)]'
                    }`}
                  >
                    <div className="font-black text-lg">{opt.label}</div>
                    <div className="text-xs opacity-80 font-normal mt-1">{opt.desc}</div>
                  </motion.button>
                ))}
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 font-mono text-xs font-bold underline text-[var(--muted-text)] hover:text-[#C8FF00]"
                >
                  ← BACK
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: INTERACTIVE BUDGET SCALE WITH REACTIVE COPY */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              <div>
                <span className="font-mono text-xs font-black text-[#0055FF] tracking-widest block uppercase mb-1">
                  03 / WHAT'S THE DAMAGE?
                </span>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--fg-main)]">
                  BUDGET SCALE
                </h2>
                <p className="font-mono text-xs text-[#FF2A85] font-black mt-1">
                  "{getBudgetCopy(budget)}"
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-sm font-black">
                {[
                  { amount: 0, label: '₹0 (FREE)', desc: 'Broke human' },
                  { amount: 100, label: '₹100 MAX', desc: 'Chai + Samosa' },
                  { amount: 300, label: '₹300 MAX', desc: 'Street food crawl' },
                  { amount: 500, label: '₹500 MAX', desc: 'Solid date budget' },
                  { amount: 1000, label: '₹1000+', desc: 'Big spender' },
                  { amount: 9999, label: '💸 NO LIMIT', desc: 'Money is no issue' },
                ].map((opt) => (
                  <motion.button
                    key={opt.label}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => { setBudget(opt.amount); setStep(4); }}
                    className={`p-4 text-left border-2 transition-all ${
                      budget === opt.amount
                        ? 'bg-[#C8FF00] text-[#080808] border-[#080808] shadow-brutal-sm font-black'
                        : 'bg-[var(--surface-secondary)] text-[var(--fg-main)] border-[var(--border-theme)] hover:border-[var(--border-high)]'
                    }`}
                  >
                    <div className="text-lg font-black">{opt.label}</div>
                    <div className="text-[11px] opacity-80 font-normal mt-0.5">{opt.desc}</div>
                  </motion.button>
                ))}
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 font-mono text-xs font-bold underline text-[var(--muted-text)] hover:text-[#C8FF00]"
                >
                  ← BACK
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: ENERGY LEVEL */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              <div>
                <span className="font-mono text-xs font-black text-[#FF2A85] tracking-widest block uppercase mb-1">
                  04 / HOW MUCH ENERGY?
                </span>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--fg-main)]">
                  ENERGY LEVEL
                </h2>
                <p className="font-mono text-xs text-[var(--muted-text)] mt-1">
                  Be honest about your stamina right now.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-sm font-extrabold">
                {[
                  { id: 'BASICALLY_DEAD', label: '🛋️ BASICALLY DEAD', desc: 'Chill, sit down, minimal movement' },
                  { id: 'NORMAL_HUMAN', label: '🚶 NORMAL HUMAN', desc: 'Gentle walk & food' },
                  { id: 'LETS_GO', label: '🔥 LET\'S GO', desc: 'Ready for action' },
                  { id: 'BAD_DECISIONS', label: '💀 MAKING BAD DECISIONS', desc: 'Pure chaotic energy' },
                ].map((opt) => (
                  <motion.button
                    key={opt.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => { setEnergyLevel(opt.id as EnergyLevel); setStep(5); }}
                    className={`p-5 text-left border-2 transition-all ${
                      energyLevel === opt.id
                        ? 'bg-[#C8FF00] text-[#080808] border-[#080808] shadow-brutal-sm font-black'
                        : 'bg-[var(--surface-secondary)] text-[var(--fg-main)] border-[var(--border-theme)] hover:border-[var(--border-high)]'
                    }`}
                  >
                    <div className="font-black text-lg">{opt.label}</div>
                    <div className="text-xs opacity-80 font-normal mt-1">{opt.desc}</div>
                  </motion.button>
                ))}
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="px-4 py-2 font-mono text-xs font-bold underline text-[var(--muted-text)] hover:text-[#C8FF00]"
                >
                  ← BACK
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: TIME */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              <div>
                <span className="font-mono text-xs font-black text-[#C8FF00] tracking-widest block uppercase mb-1">
                  05 / HOW MUCH TIME?
                </span>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--fg-main)]">
                  TIME AVAILABLE
                </h2>
                <p className="font-mono text-xs text-[var(--muted-text)] mt-1">
                  How long until you need to be back home?
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-sm font-black">
                {[
                  { mins: 30, label: '⚡ 30 MIN', desc: 'Quick fix' },
                  { mins: 60, label: '⏱️ 1 HOUR', desc: 'Short mission' },
                  { mins: 120, label: '⌛ 2 HOURS', desc: 'Standard adventure' },
                  { mins: 240, label: '🌅 HALF DAY', desc: 'Extended outing' },
                  { mins: 999, label: '🌌 WHO KNOWS', desc: 'Until sunrise' },
                ].map((opt) => (
                  <motion.button
                    key={opt.label}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => { setDuration(opt.mins); setStep(6); }}
                    className={`p-4 text-left border-2 transition-all ${
                      duration === opt.mins
                        ? 'bg-[#C8FF00] text-[#080808] border-[#080808] shadow-brutal-sm font-black'
                        : 'bg-[var(--surface-secondary)] text-[var(--fg-main)] border-[var(--border-theme)] hover:border-[var(--border-high)]'
                    }`}
                  >
                    <div className="text-lg font-black">{opt.label}</div>
                    <div className="text-[11px] opacity-80 font-normal mt-0.5">{opt.desc}</div>
                  </motion.button>
                ))}
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  onClick={() => setStep(4)}
                  className="px-4 py-2 font-mono text-xs font-bold underline text-[var(--muted-text)] hover:text-[#C8FF00]"
                >
                  ← BACK
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 6: WHAT ARE WE LISTENING TO? */}
          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              <div>
                <span className="font-mono text-xs font-black text-[#FF2A85] tracking-widest block uppercase mb-1">
                  06 / SOUNDTRACK OPTION
                </span>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--fg-main)]">
                  WHAT ARE WE LISTENING TO? 🎧
                </h2>
                <p className="font-mono text-xs text-[var(--muted-text)] mt-1">
                  Pick a soundtrack vibe for your plan.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-sm font-extrabold">
                {[
                  { id: 'PICK_FOR_ME', label: '🎧 PICK FOR ME', desc: 'Auto-match soundtrack to plan vibe' },
                  { id: 'ILL_CHOOSE', label: '🎵 I\'LL CHOOSE', desc: 'Browse curated activity soundtracks' },
                  { id: 'NO_MUSIC', label: '🔇 NO MUSIC', desc: 'Some people just want to exist' },
                ].map((opt) => (
                  <motion.button
                    key={opt.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => { setMusicChoice(opt.id as any); handleCalculatePlan(); }}
                    className={`p-5 text-left border-2 transition-all ${
                      musicChoice === opt.id
                        ? 'bg-[#C8FF00] text-[#080808] border-[#080808] shadow-brutal-sm font-black'
                        : 'bg-[var(--surface-secondary)] text-[var(--fg-main)] border-[var(--border-theme)] hover:border-[var(--border-high)]'
                    }`}
                  >
                    <div className="font-black text-base">{opt.label}</div>
                    <div className="text-xs opacity-80 font-normal mt-1">{opt.desc}</div>
                  </motion.button>
                ))}
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  onClick={() => setStep(5)}
                  className="px-4 py-2 font-mono text-xs font-bold underline text-[var(--muted-text)] hover:text-[#C8FF00]"
                >
                  ← BACK
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 7: ROTATING CALCULATING ANIMATION */}
          {step === 7 && isCalculating && (
            <motion.div
              key="step7"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-16 text-center space-y-8"
            >
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 bg-[#C8FF00] border-2 border-[#080808] animate-spin shadow-brutal-sm" />
                <Zap className="w-8 h-8 text-[#080808] relative z-10 animate-bounce" />
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#C8FF00]">
                  {loaderMessages[loaderTextIndex]}
                </h3>
                <p className="font-mono text-xs text-[var(--muted-text)] animate-pulse">
                  scoring plans for budget ₹{budget} • location {location}...
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 8: REVEAL RECOMMENDATION RESULT WITH NOPE SLIDE INTERACTION */}
          {step === 8 && recommendation && recommendation.plan && (
            <motion.div
              key="step8"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 text-left"
            >
              <div className="bg-[#C8FF00] text-[#080808] border-2 border-[#080808] p-3.5 shadow-brutal-sm flex items-center justify-between font-mono text-xs font-black uppercase">
                <span>🎯 YOU'RE DOING THIS.</span>
                <span>MATCH SCORE: {recommendation.score}/100</span>
              </div>

              {/* Filter Relaxation Warning Banner */}
              {recommendation.filtersRelaxed && (
                <div className="bg-[#FF2A85] text-white border-2 border-[#080808] p-3 shadow-brutal-sm font-mono text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>WE COULDN'T FIND AN EXACT MATCH, SO WE BENT THE RULES A LITTLE.</span>
                </div>
              )}

              <div className="bg-[var(--surface-card)] border-3 border-[var(--border-high)] p-6 sm:p-8 shadow-brutal-lime space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="neo-badge bg-[#C8FF00] text-[#080808]">{recommendation.plan.budgetLabel}</span>
                  <span className="neo-badge bg-[#0055FF] text-white">{recommendation.plan.durationLabel}</span>
                  <span className="neo-badge bg-[#FF2A85] text-white">{recommendation.plan.groupSizeLabel}</span>
                  <span className="neo-badge bg-[var(--surface-secondary)] text-[var(--fg-main)]">📍 {recommendation.plan.locationCity}</span>
                </div>

                <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase text-[var(--fg-main)] leading-none">
                  {recommendation.plan.title}
                </h2>

                <p className="font-mono text-sm text-[var(--muted-text)] leading-relaxed">
                  {recommendation.plan.description}
                </p>

                {/* Human-Friendly Recommendation Reasons */}
                <div className="bg-[var(--surface-secondary)] border border-[var(--border-theme)] p-4 space-y-2">
                  <h4 className="font-mono text-xs font-black uppercase text-[#C8FF00]">WHY THIS PLAN:</h4>
                  <ul className="space-y-1 font-mono text-xs text-[var(--fg-main)] font-extrabold">
                    {recommendation.reasons.map((reason, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Soundtrack Card in Unboxing Reveal */}
                {recommendation.soundtrack && musicChoice !== 'NO_MUSIC' && (
                  <div className="bg-[var(--surface-card)] border-2 border-[#FF2A85] p-4 shadow-brutal-pink flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#080808] border border-[var(--border-high)] overflow-hidden flex-shrink-0">
                        <img src={recommendation.soundtrack.coverImage} alt={recommendation.soundtrack.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="font-mono text-[10px] text-[#FF2A85] font-black uppercase block">🎧 YOUR SOUNDTRACK</span>
                        <h4 className="font-black text-sm text-[var(--fg-main)] line-clamp-1">{recommendation.soundtrack.title}</h4>
                        <span className="font-mono text-[11px] text-[var(--muted-text)]">{recommendation.soundtrack.durationLabel}</span>
                      </div>
                    </div>
                    <a
                      href={recommendation.soundtrack.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-btn-pink px-3 py-1.5 font-mono text-xs font-black uppercase flex items-center gap-1 flex-shrink-0"
                    >
                      <Music className="w-3.5 h-3.5" />
                      <span>LISTEN</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* Result Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <Link
                  href={`/plans/${recommendation.plan.slug}`}
                  onClick={onClose}
                  className="neo-btn-yellow p-4 text-center text-sm font-black uppercase flex items-center justify-center gap-2 text-base"
                >
                  <span>LET'S GO →</span>
                </Link>

                <button
                  onClick={handleGiveMeAnother}
                  className="bg-[var(--surface-secondary)] text-[var(--fg-main)] border-2 border-[var(--border-theme)] hover:border-[#C8FF00] shadow-brutal-sm p-4 text-xs font-mono font-black uppercase flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4 text-[#0055FF] dark:text-[#C8FF00]" />
                  <span>{nopeFeedbackCopy}</span>
                </button>

                <button
                  onClick={() => onSharePlan && onSharePlan(recommendation.plan)}
                  className="bg-[#0055FF] text-white border-2 border-[#080808] shadow-brutal-sm hover:bg-blue-700 p-4 text-xs font-mono font-black uppercase flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>SHARE THIS</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
