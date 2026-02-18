'use client';

import { Radar, GitBranch, LayoutGrid } from 'lucide-react';

type ViewMode = 'radar' | 'path' | 'hangar';

interface ViewToggleProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const views = [
  { id: 'radar' as ViewMode, label: 'Radar', icon: Radar },
  { id: 'path' as ViewMode, label: 'Flight Path', icon: GitBranch },
  { id: 'hangar' as ViewMode, label: 'Hangar', icon: LayoutGrid },
];

export function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 p-1.5 bg-[var(--color-surface)] rounded-full border border-white/10">
      {views.map((view) => {
        const Icon = view.icon;
        const isActive = currentView === view.id;
        
        return (
          <button
            key={view.id}
            onClick={() => onViewChange(view.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
              isActive
                ? 'bg-[#FFB800] text-black font-semibold shadow-[0_0_20px_rgba(255,184,0,0.3)]'
                : 'text-[var(--color-muted)] hover:text-white hover:bg-white/5'
            }`}
            aria-pressed={isActive}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm">{view.label}</span>
          </button>
        );
      })}
    </div>
  );
}
