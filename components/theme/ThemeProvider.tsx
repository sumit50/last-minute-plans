'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'day' | 'night' | 'after-hours' | 'offline' | 'system';
export type ActiveTheme = 'light' | 'dark' | 'after-hours' | 'offline';

interface ThemeContextType {
  mode: ThemeMode;
  activeTheme: ActiveTheme;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('night');
  const [activeTheme, setActiveTheme] = useState<ActiveTheme>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('lmp_theme_mode') as ThemeMode | null;
    if (saved && (saved === 'day' || saved === 'night' || saved === 'after-hours' || saved === 'offline' || saved === 'system')) {
      setModeState(saved);
    } else {
      setModeState('night');
    }
  }, []);

  useEffect(() => {
    let computed: ActiveTheme = 'dark';

    if (mode === 'day') {
      computed = 'light';
    } else if (mode === 'night') {
      computed = 'dark';
    } else if (mode === 'after-hours') {
      computed = 'after-hours';
    } else if (mode === 'offline') {
      computed = 'offline';
    } else if (mode === 'system') {
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      computed = isSystemDark ? 'dark' : 'light';
    }

    setActiveTheme(computed);
    document.documentElement.setAttribute('data-theme', computed);
    if (computed === 'dark' || computed === 'after-hours') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('lmp_theme_mode', mode);
  }, [mode]);

  useEffect(() => {
    if (mode !== 'system') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const computed: ActiveTheme = e.matches ? 'dark' : 'light';
      setActiveTheme(computed);
      document.documentElement.setAttribute('data-theme', computed);
      if (computed === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mode]);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
  };

  const toggleTheme = () => {
    if (mode === 'night') setModeState('day');
    else if (mode === 'day') setModeState('after-hours');
    else if (mode === 'after-hours') setModeState('offline');
    else if (mode === 'offline') setModeState('system');
    else setModeState('night');
  };

  return (
    <ThemeContext.Provider value={{ mode, activeTheme, setMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
