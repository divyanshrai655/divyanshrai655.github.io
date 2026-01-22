'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // On mount, sync theme from localStorage or system preference.
    // Wrapped in try/catch so restrictive browser settings don't break rendering.
    try {
      const stored = localStorage.getItem('theme') as Theme | null;
      const systemPrefersDark =
        typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

      const initialTheme = stored || (systemPrefersDark ? 'dark' : 'light');
      setTheme(initialTheme);
      setMounted(true);
    } catch {
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    try {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      // Only save to localStorage after initial mount to avoid overwriting stored preference
      if (mounted) {
        try {
          localStorage.setItem('theme', theme);
        } catch {
          // ignore
        }
      }
    } catch {
      // ignore
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
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

