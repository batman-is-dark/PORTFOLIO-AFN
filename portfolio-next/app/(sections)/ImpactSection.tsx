'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { impactRoles } from '../../content/impact';
import { motion, AnimatePresence } from 'framer-motion';

const ImpactCanvas = dynamic(() => import('../../components/three/ImpactCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-bg flex items-center justify-center">
      <div className="text-accent font-sans animate-pulse">Loading Experience...</div>
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
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-bg" aria-labelledby="impact-heading">
      <div className="absolute top-12 left-12 z-10 pointer-events-none">
        <h2 id="impact-heading" className="text-5xl md:text-7xl font-display font-bold text-primary mb-2">
          Beyond the Screen
        </h2>
        <p className="text-accent font-sans text-sm tracking-[0.2em] uppercase">
          Leadership & Real-World Impact
        </p>
      </div>

      {/* 3D Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <ImpactCanvas activeId={activeId} setActiveId={setActiveId} />
      </div>

      {/* Interface Hints */}
      <div className="absolute bottom-12 left-12 z-10 pointer-events-none hidden md:block">
        <div className="flex items-center gap-4 text-primary/40 font-sans text-xs tracking-widest">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            DRAG TO EXPLORE • USE ARROW KEYS
          </div>
          <span>|</span>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px]">ESC</kbd>
            CLOSE
          </div>
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
            className="absolute top-0 right-0 h-full w-full md:w-[450px] z-20 bg-surface/90 backdrop-blur-xl border-l border-white/5 p-8 flex flex-col pt-24 md:pt-12 shadow-2xl overflow-hidden"
            style={{
              borderLeft: `2px solid ${activeRole.color}`,
            }}
          >
            <button 
              onClick={() => setActiveId(null)}
              className="absolute top-8 right-8 text-primary/50 hover:text-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="mb-8">
              <span className="text-accent font-sans text-xs tracking-[0.3em] uppercase mb-2 block">
                {activeRole.category}
              </span>
              <h3 className="text-4xl font-display font-bold text-primary leading-tight">
                {activeRole.title}
              </h3>
              <p className="text-secondary font-sans mt-2 italic">
                {activeRole.agency}
              </p>
            </div>

            <div className="space-y-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-widest text-accent font-bold">Overview</h4>
                <p className="text-primary/90 text-lg leading-relaxed font-sans">{activeRole.description}</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-widest text-accent font-bold">Key Contributions</h4>
                <div className="grid gap-4">
                  {activeRole.impactPoints.map((point, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: activeRole.color }} />
                      <p className="text-sm text-secondary leading-relaxed">{point}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="pt-8 mt-auto border-t border-white/5 flex items-center justify-between">
              <div className="flex gap-4">
                <button
                  onClick={goToPrevious}
                  className="p-2 rounded-full border border-white/10 text-primary/70 hover:text-primary hover:bg-white/5 transition-all"
                  aria-label="Previous"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                
                <button
                  onClick={goToNext}
                  className="p-2 rounded-full border border-white/10 text-primary/70 hover:text-primary hover:bg-white/5 transition-all"
                  aria-label="Next"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
              
              <div className="text-[10px] font-sans tracking-widest text-secondary uppercase">
                {activeIndex + 1} / {impactRoles.length}
              </div>
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
