'use client';

import { useEffect, useState } from 'react';

type ViewerMode = 'reel' | 'three';

function getInitialMode(): ViewerMode {
  if (typeof window === 'undefined') return 'reel';
  try {
    const stored = window.localStorage.getItem('viewerMode') as ViewerMode | null;
    if (stored === 'reel' || stored === 'three') return stored;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'reel';
    }
    return 'reel';
  } catch {
    return 'reel';
  }
}

export default function ModeToggle() {
  const [mode, setMode] = useState<ViewerMode | null>(null);

  useEffect(() => {
    const m = getInitialMode();
    setMode(m);
    document.documentElement.dataset.viewer = m;
  }, []);

  const select = (m: ViewerMode) => {
    setMode(m);
    try { localStorage.setItem('viewerMode', m); } catch {}
    document.documentElement.dataset.viewer = m;
  };

  const baseBtn = {
    padding: '0.375rem 0.625rem',
    border: '1px solid var(--color-border)',
    lineHeight: '1',
    background: 'transparent',
    color: 'inherit'
  } as const;

  return (
    <div role="group" aria-label="Project viewer mode" style={{ display: 'inline-flex', borderRadius: 'var(--radius-2)', overflow: 'hidden' }}>
      <button
        type="button"
        aria-pressed={mode === 'reel'}
        onClick={() => select('reel')}
        style={{
          ...baseBtn,
          borderRight: 'none',
          background: mode === 'reel' ? 'var(--color-accent)' : 'transparent',
          color: mode === 'reel' ? 'var(--color-accent-contrast)' : 'inherit',
          borderTopLeftRadius: 'var(--radius-2)',
          borderBottomLeftRadius: 'var(--radius-2)'
        }}
      >
        Reel
      </button>
      <button
        type="button"
        aria-pressed={mode === 'three'}
        onClick={() => select('three')}
        style={{
          ...baseBtn,
          background: mode === 'three' ? 'var(--color-accent)' : 'transparent',
          color: mode === 'three' ? 'var(--color-accent-contrast)' : 'inherit',
          borderTopRightRadius: 'var(--radius-2)',
          borderBottomRightRadius: 'var(--radius-2)'
        }}
      >
        3D
      </button>
    </div>
  );
}