'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = window.localStorage.getItem('theme') as Theme | null;
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const t = getInitialTheme();
    setTheme(t);
    document.documentElement.dataset.theme = t;
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem('theme', next); } catch {}
    document.documentElement.dataset.theme = next;
  };

  const pressed = theme === 'dark';

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      title="Toggle theme"
      aria-pressed={pressed}
      onClick={toggle}
      style={{
        padding: '0.375rem 0.625rem',
        borderRadius: 'var(--radius-2)',
        border: '1px solid var(--color-border)',
        background: 'transparent',
        color: 'inherit',
        lineHeight: '1'
      }}
    >
      {theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  );
}