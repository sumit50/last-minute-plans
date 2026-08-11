'use client';

import React from 'react';

interface StampProps {
  text: string;
  variant?: 'red' | 'olive' | 'black';
  rotation?: number;
}

export function Stamp({ text, variant = 'red', rotation = -2 }: StampProps) {
  let colorStyles = 'border-[#D83A32] text-[#D83A32]';
  if (variant === 'olive') colorStyles = 'border-[#4E5A42] text-[#4E5A42]';
  if (variant === 'black') colorStyles = 'border-[#111111] text-[#111111]';

  return (
    <span
      className={`inline-block font-mono text-[10px] sm:text-xs font-black uppercase tracking-widest px-2.5 py-0.5 border-2 rounded-sm select-none opacity-90 shadow-sm transition-transform ${colorStyles}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {text}
    </span>
  );
}
