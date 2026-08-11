'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';
import { Moon, Sun, Laptop } from 'lucide-react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="flex items-center gap-1.5 bg-[#1C1C1C] dark:bg-[#1C1C1C] text-[#F5F1E8] border-2 border-[#0A0A0A] dark:border-[#333333] px-2.5 py-1 shadow-brutal-sm font-mono text-xs font-black uppercase hover:border-[#E6FF00] transition-colors"
      title={`Theme: ${mode.toUpperCase()} (Click to toggle)`}
    >
      {mode === 'night' && (
        <>
          <Moon className="w-3.5 h-3.5 text-[#E6FF00] fill-[#E6FF00]" />
          <span>NIGHT 🌙</span>
        </>
      )}

      {mode === 'day' && (
        <>
          <Sun className="w-3.5 h-3.5 text-[#FF6B00] fill-[#FF6B00]" />
          <span className="text-white">DAY ☀️</span>
        </>
      )}

      {mode === 'system' && (
        <>
          <Laptop className="w-3.5 h-3.5 text-[#0055FF]" />
          <span>AUTO ⚙️</span>
        </>
      )}
    </motion.button>
  );
}
