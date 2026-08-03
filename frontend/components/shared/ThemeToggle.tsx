'use client';

import { useContext } from 'react';
import { Moon, Sun } from 'lucide-react';
import { ThemeContext } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const context = useContext(ThemeContext);
  if (!context) return null;
  const { theme, toggleTheme } = context;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full glass transition-transform hover:scale-105"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-primary-700" aria-hidden="true" />
      ) : (
        <Sun className="h-5 w-5 text-accent-400" aria-hidden="true" />
      )}
    </button>
  );
}