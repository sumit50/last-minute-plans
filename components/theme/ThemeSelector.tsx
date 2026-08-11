'use client';

import React, { useState } from 'react';
import { useTheme, ThemeMode } from './ThemeProvider';
import { Sun, Moon, Sparkles, Smartphone, Laptop, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeSelector() {
  const { mode, setMode } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const options: { id: ThemeMode; label: string; icon: any; bgPreview: string; borderPreview: string }[] = [
    { id: 'day', label: '☀️ DAY', icon: Sun, bgPreview: 'bg-[#F4F2EC]', borderPreview: 'border-[#111111]' },
    { id: 'night', label: '🌙 NIGHT', icon: Moon, bgPreview: 'bg-[#090909]', borderPreview: 'border-[#C8FF00]' },
    { id: 'after-hours', label: '🪩 AFTER HOURS', icon: Sparkles, bgPreview: 'bg-[#080808]', borderPreview: 'border-[#7C5CFF]' },
    { id: 'offline', label: '📵 OFFLINE', icon: Smartphone, bgPreview: 'bg-[#F1EEE6]', borderPreview: 'border-[#D83A32]' },
    { id: 'system', label: '⚙️ AUTO', icon: Laptop, bgPreview: 'bg-gray-800', borderPreview: 'border-gray-500' },
  ];

  const currentOption = options.find((o) => o.id === mode) || options[1];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 bg-[var(--surface-secondary)] text-[var(--fg-main)] border border-[var(--border-theme)] px-2.5 py-1 font-mono text-xs font-black uppercase hover:border-[var(--border-high)] transition-colors shadow-brutal-sm"
      >
        <span className="w-2.5 h-2.5 rounded-full border border-current bg-[#C8FF00]" />
        <span>{currentOption.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute right-0 top-full mt-2 w-52 bg-[var(--surface-card)] border-2 border-[var(--border-high)] p-1.5 shadow-brutal-lime z-50 font-mono text-xs space-y-1"
          >
            {options.map((opt) => {
              const isSelected = mode === opt.id;
              const IconComp = opt.icon;
              return (
                <button
                  key={opt.id}
                  onClick={() => { setMode(opt.id); setIsOpen(false); }}
                  className={`w-full flex items-center justify-between p-2 border transition-all ${
                    isSelected
                      ? 'bg-[#C8FF00] text-[#080808] border-[#080808] font-black'
                      : 'bg-transparent text-[var(--fg-main)] border-transparent hover:bg-[var(--surface-secondary)]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <IconComp className="w-3.5 h-3.5" />
                    <span>{opt.label}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
