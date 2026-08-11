'use client';

import React from 'react';

export function CityActivityTicker() {
  const signals = [
    { label: 'FOOD', count: 14, color: 'text-[#C8FF00]' },
    { label: 'DATE', count: 8, color: 'text-[#FF2A85]' },
    { label: 'SQUAD', count: 19, color: 'text-[#0055FF] dark:text-[#C8FF00]' },
    { label: 'CHAOS', count: 22, color: 'text-[#7C5CFF]' },
  ];

  return (
    <div className="inline-flex items-center gap-3 font-mono text-[10px] font-black uppercase tracking-wider bg-[var(--surface-secondary)] border border-[var(--border-theme)] px-3 py-1 text-[var(--fg-main)]">
      <span className="text-[var(--muted-text)]">CHD SIGNALS:</span>
      {signals.map((sig, idx) => (
        <span key={idx} className="flex items-center gap-1">
          <span className={`animate-pulse ${sig.color}`}>●</span>
          <span>{sig.label} / {sig.count}</span>
        </span>
      ))}
    </div>
  );
}
