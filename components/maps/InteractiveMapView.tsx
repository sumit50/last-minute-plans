'use client';

import React, { useState } from 'react';
import { Plan } from '@/types';
import { CHANDIGARH_SPOTS } from '@/lib/maps/location-service';
import { MapPin, Navigation, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface InteractiveMapViewProps {
  plans: Plan[];
  onSelectPlan?: (plan: Plan) => void;
}

export function InteractiveMapView({ plans, onSelectPlan }: InteractiveMapViewProps) {
  const [selectedSpotIndex, setSelectedSpotIndex] = useState<number>(0);
  const selectedSpot = CHANDIGARH_SPOTS[selectedSpotIndex];

  const matchingPlans = plans.filter(p => 
    p.locationArea?.toLowerCase().includes(selectedSpot.name.toLowerCase().split(' ')[0]) ||
    p.locationCity.toLowerCase() === selectedSpot.city.toLowerCase()
  );

  return (
    <div className="w-full bg-[#141414] border-3 border-[#F5F1E8] shadow-brutal-yellow p-4 rounded-none text-[#F5F1E8]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b-2 border-[#333333] pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#FF2A85] animate-bounce" />
            <h3 className="font-black text-xl tracking-tight uppercase">LIVE CITY PLAN MAP</h3>
          </div>
          <p className="text-xs font-mono text-gray-400">INTERACTIVE ZONES: CHANDIGARH & MOHALI HOTSPOTS</p>
        </div>
        <div className="flex items-center gap-1 bg-[#E6FF00] text-[#0A0A0A] border-2 border-[#0A0A0A] px-3 py-1 font-mono text-xs font-bold">
          <Navigation className="w-3.5 h-3.5" />
          <span>{CHANDIGARH_SPOTS.length} ACTIVE ZONES</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Map Canvas Grid */}
        <div className="lg:col-span-7 relative bg-[#0A0A0A] border-3 border-[#333333] p-6 min-h-[360px] flex flex-col justify-between overflow-hidden shadow-brutal-sm">
          {/* Grid lines background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="relative z-10 flex justify-between items-center bg-[#1C1C1C] border border-[#333333] p-2 shadow-brutal-sm">
            <span className="font-mono text-xs font-extrabold uppercase text-[#E6FF00]">📍 CLICK PINS TO EXPLORE ZONE</span>
            <span className="font-mono text-xs font-bold text-[#0055FF]">STATUS: LIVE</span>
          </div>

          {/* Interactive Spot Pins */}
          <div className="relative z-10 my-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CHANDIGARH_SPOTS.map((spot, idx) => {
              const isSelected = idx === selectedSpotIndex;
              return (
                <button
                  key={spot.name}
                  onClick={() => setSelectedSpotIndex(idx)}
                  className={`p-2 font-mono text-left text-xs border-2 border-[#0A0A0A] transition-all ${
                    isSelected
                      ? 'bg-[#E6FF00] text-[#0A0A0A] shadow-brutal-pink font-black scale-105'
                      : 'bg-[#1C1C1C] text-gray-300 hover:bg-[#252525] shadow-brutal-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-extrabold px-1 bg-[#0A0A0A] text-[#F5F1E8]">#{idx + 1}</span>
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#FF2A85] fill-[#FF2A85]' : 'text-gray-500'}`} />
                  </div>
                  <div className="line-clamp-1 font-bold">{spot.name}</div>
                  <div className="text-[10px] opacity-70">{spot.city}</div>
                </button>
              );
            })}
          </div>

          {/* Active Spot Banner */}
          <div className="relative z-10 bg-[#0A0A0A] text-white border-2 border-[#E6FF00] p-3 shadow-brutal-yellow flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#E6FF00] font-bold uppercase">SELECTED ZONE</span>
              <h4 className="font-black text-lg text-[#F5F1E8]">{selectedSpot.name}</h4>
            </div>
            <Sparkles className="w-5 h-5 text-[#E6FF00]" />
          </div>
        </div>

        {/* Matching Plans Sidebar */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="bg-[#E6FF00] text-[#0A0A0A] border-3 border-[#0A0A0A] p-3 mb-3 shadow-brutal-sm flex items-center justify-between">
              <h4 className="font-black text-sm uppercase">PLANS NEARBY ({matchingPlans.length})</h4>
              <span className="font-mono text-xs font-bold">{selectedSpot.city}</span>
            </div>

            <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
              {matchingPlans.length > 0 ? (
                matchingPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="p-3 bg-[#1C1C1C] border-2 border-[#333333] shadow-brutal-sm hover:border-[#E6FF00] transition-all"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-mono text-xs font-black text-[#0055FF]">{plan.budgetLabel}</span>
                      <span className="font-mono text-[10px] bg-[#0A0A0A] text-white px-1.5 py-0.5 font-bold">
                        {plan.durationLabel}
                      </span>
                    </div>
                    <h5 className="font-black text-base line-clamp-1 mb-1 text-[#F5F1E8]">{plan.title}</h5>
                    <p className="text-xs text-gray-400 line-clamp-2 mb-2 font-mono">{plan.description}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-[#333333]">
                      <span className="font-mono text-[11px] font-bold text-gray-300">👥 {plan.groupSizeLabel}</span>
                      <Link
                        href={`/plans/${plan.slug}`}
                        className="inline-flex items-center gap-1 font-mono text-xs font-black text-[#E6FF00] hover:underline"
                      >
                        VIEW PLAN <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center border-2 border-dashed border-[#333333] bg-[#0A0A0A]">
                  <p className="font-black text-sm mb-1 text-[#F5F1E8]">NO PLANS IN THIS EXACT ZONE YET</p>
                  <p className="text-xs text-gray-400 font-mono mb-3">Be the person who creates one!</p>
                  <Link
                    href="/create"
                    className="inline-block px-3 py-1.5 bg-[#E6FF00] text-[#0A0A0A] border-2 border-[#0A0A0A] font-mono text-xs font-bold shadow-brutal-sm"
                  >
                    + CREATE A PLAN HERE
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
