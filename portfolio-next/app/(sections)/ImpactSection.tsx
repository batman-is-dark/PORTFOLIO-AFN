'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { impactRoles } from '../../content/impact';
import { motion, AnimatePresence } from 'framer-motion';

const ImpactCanvas = dynamic(() => import('../../components/three/ImpactCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#0B1120] flex items-center justify-center">
      <div className="text-cyan-500 font-mono animate-pulse">TRAJECTORY_CALCULATION_INIT...</div>
    </div>
  ),
});

export function ImpactSection() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeRole = impactRoles.find(r => r.id === activeId);
  const activeIndex = impactRoles.findIndex(r => r.id === activeId);
  
  const goToNext = useCallback(() => {
    const nextIndex = activeIndex < impactRoles.length - 1 ? activeIndex + 1 : 0;
    setActiveId(impactRoles[nextIndex].id);
  }, [activeIndex]);
  
  const goToPrevious = useCallback(() => {
    const prevIndex = activeIndex > 0 ? activeIndex - 1 : impactRoles.length - 1;
    setActiveId(impactRoles[prevIndex].id);
  }, [activeIndex]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'Escape' && activeId) {
        setActiveId(null);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeId, goToNext, goToPrevious]);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#0B1120]" aria-labelledby="impact-heading">
      <div className="absolute top-12 left-12 z-10 pointer-events-none">
        <h2 id="impact-heading" className="text-4xl md:text-6xl font-display font-bold text-white mb-2">
          Beyond the Screen
        </h2>
        <p className="text-cyan-500/80 font-mono text-sm tracking-widest uppercase">
          FLIGHT PATH // REAL-WORLD IMPACT
        </p>
      </div>

      {/* 3D Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <ImpactCanvas activeId={activeId} setActiveId={setActiveId} />
      </div>

      {/* Interface Hints */}
      <div className="absolute bottom-12 left-12 z-10 pointer-events-none hidden md:block">
        <div className="flex items-center gap-4 text-white/40 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            DRAG TO ROTATE • ← → KEYS TO NAVIGATE
          </div>
          <span>|</span>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px]">ESC</kbd>
            TO CLOSE
          </div>
          <span>|</span>
          <div>FLIGHT_LOG_ACTIVE</div>
        </div>
      </div>

      {/* Detail Overlay (Evidence Deck) */}
      <AnimatePresence>
        {activeRole && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 h-full w-full md:w-[450px] z-20 bg-black/40 backdrop-blur-2xl border-l border-white/10 p-8 flex flex-col pt-24 md:pt-12 shadow-2xl overflow-hidden"
            style={{
              background: `
                radial-gradient(circle at top right, ${activeRole.color}15 0%, transparent 50%),
                radial-gradient(circle at bottom left, ${activeRole.color}10 0%, transparent 60%),
                rgba(0, 0, 0, 0.4)
              `,
              borderLeft: `1px solid ${activeRole.color}40`,
              boxShadow: `
                inset 0 0 60px ${activeRole.color}10,
                0 0 80px ${activeRole.color}15,
                0 20px 60px rgba(0, 0, 0, 0.5)
              `
            }}
          >
            {/* Color bleed accent on the left edge */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-1 opacity-60"
              style={{
                background: `linear-gradient(to bottom, 
                  transparent 0%, 
                  ${activeRole.color} 20%, 
                  ${activeRole.color} 80%, 
                  transparent 100%)`
              }}
            />
            
            {/* Animated glow orb */}
            <motion.div
              className="absolute top-1/3 -left-20 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: activeRole.color }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <button 
              onClick={() => setActiveId(null)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="mb-8">
              <span 
                className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-tighter uppercase mb-2" 
                style={{ 
                  backgroundColor: `${activeRole.color}20`, 
                  color: activeRole.color, 
                  border: `1px solid ${activeRole.color}40`,
                  boxShadow: `0 0 20px ${activeRole.color}30, inset 0 0 10px ${activeRole.color}10`
                }}
              >
                {activeRole.category}
              </span>
              <h3 className="text-3xl font-display font-bold text-white mb-1">{activeRole.title}</h3>
              <p className="text-cyan-400 font-mono text-sm">{activeRole.agency}</p>
            </div>

            <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Role Overview</h4>
                <p className="text-gray-300 leading-relaxed font-light">{activeRole.description}</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Key Contributions</h4>
                <div className="grid gap-3">
                  {activeRole.impactPoints.map((point, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-3 p-3 rounded-lg bg-white/5 border border-white/5"
                    >
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: activeRole.color }} />
                      <p className="text-sm text-gray-300">{point}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <div className="pt-4 flex items-center justify-between gap-4">
              <button
                onClick={goToPrevious}
                disabled={activeIndex === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <span className="text-xs font-mono">PREV</span>
              </button>
              
              <div className="text-xs font-mono text-white/40">
                {activeIndex + 1} / {impactRoles.length}
              </div>
              
              <button
                onClick={goToNext}
                disabled={activeIndex === impactRoles.length - 1}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <span className="text-xs font-mono">NEXT</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
            
            {/* Removed Encrypted Evidence & Full Credentials Button */}
            
            <div className="pt-6 border-t border-white/10 text-white/30 text-[10px] font-mono tracking-widest uppercase text-center">
              Waypoint Verified
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </section>
  );
}
