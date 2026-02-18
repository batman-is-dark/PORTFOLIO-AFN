'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { impactRoles } from '../../content/impact';
import { motion, AnimatePresence } from 'framer-motion';
import InstructionOverlay from '../../components/ui/InstructionOverlay';

const ImpactWorld = dynamic(() => import('../../components/three/ImpactWorld'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-bg flex items-center justify-center">
      <div className="text-accent font-sans animate-pulse">Initializing Neural Nexus...</div>
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
  
  // Keyboard and Scroll navigation
  useEffect(() => {
    let lastScrollTime = 0;
    const scrollThreshold = 1000; // ms

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

    const handleWheel = (e: WheelEvent) => {
        // Only if we're in this section (this is a simplified check)
        const now = Date.now();
        if (now - lastScrollTime < scrollThreshold) return;

        if (Math.abs(e.deltaY) > 50) {
            if (e.deltaY > 0) goToNext();
            else goToPrevious();
            lastScrollTime = now;
        }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    // window.addEventListener('wheel', handleWheel, { passive: false }); // Optional: could be annoying if user wants to scroll past
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        // window.removeEventListener('wheel', handleWheel);
    };
  }, [activeId, goToNext, goToPrevious]);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-bg" aria-labelledby="impact-heading">
      <div className="absolute top-12 left-12 z-10 pointer-events-none">
        <h2 id="impact-heading" className="text-5xl md:text-7xl font-display font-bold text-primary mb-2">
          Nexus of Impact
        </h2>
        <p className="text-accent font-sans text-sm tracking-[0.2em] uppercase text-primary/60">
          Spheres of Influence & Leadership
        </p>
      </div>

      {/* 3D World Layer */}
      <div className="absolute inset-0 z-0">
        <ImpactWorld activeId={activeId} setActiveId={setActiveId} />
      </div>

      {/* Nexus HUD Selector */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex items-center gap-6">
        {impactRoles.map((role, i) => (
          <button
            key={role.id}
            onClick={() => setActiveId(role.id === activeId ? null : role.id)}
            className="group relative flex flex-col items-center"
          >
            <div 
              className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${
                activeId === role.id 
                ? 'scale-150 bg-primary border-primary shadow-[0_0_15px_rgba(255,255,255,0.8)]' 
                : 'bg-white/10 border-white/20 hover:border-white/50'
              }`}
            />
            <span className={`absolute top-6 text-[8px] font-mono tracking-tighter uppercase transition-all duration-300 ${
              activeId === role.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-40'
            } text-white whitespace-nowrap`}>
              {role.title.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Interface Hints */}
      <div className="absolute bottom-12 left-12 z-10 hidden lg:block">
        <InstructionOverlay type="drag" text="Explore the Nexus" />
      </div>

      <div className="absolute top-12 right-12 z-10 hidden md:flex items-center gap-4 text-primary/40 font-mono text-xs">
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded border border-white/20 flex items-center justify-center">←</span>
            <span className="w-4 h-4 rounded border border-white/20 flex items-center justify-center">→</span>
            NAVIGATE
          </span>
          <span>|</span>
          <span className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded border border-white/20">ESC</span>
            CLOSE
          </span>
      </div>

      {/* Prominent Arrow Key Instruction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-1/2 left-12 z-10 hidden lg:flex flex-col items-start gap-4 pointer-events-none"
      >
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-[#FF3300]/10 to-transparent border border-[#FF3300]/30 backdrop-blur-sm">
          <div className="flex gap-1.5">
            <div className="w-8 h-8 rounded border-2 border-[#FF3300] flex items-center justify-center text-[#FF3300] text-sm font-bold">↑</div>
            <div className="w-8 h-8 rounded border-2 border-[#FF3300]/40 flex items-center justify-center text-[#FF3300]/40 text-sm font-bold">↓</div>
          </div>
          <div className="flex gap-1.5">
            <div className="w-8 h-8 rounded border-2 border-[#FF3300] flex items-center justify-center text-[#FF3300] text-sm font-bold">←</div>
            <div className="w-8 h-8 rounded border-2 border-[#FF3300] flex items-center justify-center text-[#FF3300] text-sm font-bold">→</div>
          </div>
          <span className="text-[#FF3300] font-mono text-xs font-bold tracking-widest uppercase ml-2">Navigate Stations</span>
        </div>
        
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[#FF3300]/60 text-[10px] font-mono tracking-widest uppercase"
        >
          ↓ Explore the Nexus ↓
        </motion.div>
      </motion.div>

      {/* Detail Overlay (Evidence Deck) */}
      <AnimatePresence>
        {activeRole && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 h-full w-full md:w-[450px] z-20 bg-surface/90 backdrop-blur-xl border-l border-white/5 p-8 flex flex-col pt-24 md:pt-12 overflow-hidden"
            style={{
              borderLeft: `3px solid ${activeRole.color}`,
              boxShadow: `0 0 40px ${activeRole.color}15, inset 0 0 60px ${activeRole.color}05`,
              background: `linear-gradient(135deg, rgba(15,15,15,0.95) 0%, ${activeRole.color}08 100%)`
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
