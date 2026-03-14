'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { impactRoles } from '../../content/impact';
import { motion } from 'framer-motion';

const ImpactWorld = dynamic(() => import('../../components/three/ImpactWorld'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-bg flex items-center justify-center">
      <div className="text-accent font-sans animate-pulse text-sm tracking-widest uppercase">Initializing Neural Nexus...</div>
    </div>
  ),
});

export function ImpactSection() {
  const [activeId, setActiveId] = useState<string | null>(impactRoles[0].id);

  return (
    <section id="impact" className="relative bg-bg">
      <div className="flex flex-col xl:flex-row relative">
        
        {/* Left Side: 3D Visualizer (Sticky) */}
        <div className="w-full xl:w-1/2 h-[50vh] xl:h-screen sticky top-0 xl:top-0 bg-surface/30 z-0 flex flex-col justify-center overflow-hidden border-b xl:border-b-0 xl:border-r border-white/5 shadow-2xl">
          <div className="absolute top-8 left-8 xl:top-12 xl:left-12 z-20 pointer-events-none">
            <span className="text-accent font-sans text-xs tracking-[0.3em] uppercase block mb-2">
              Spheres of Influence
            </span>
            <h2 className="text-3xl xl:text-5xl font-display font-bold text-primary tracking-tighter">
              Nexus of Impact
            </h2>
          </div>

          <div className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing">
            <ImpactWorld activeId={activeId} setActiveId={setActiveId} />
          </div>

          {/* Interactive Hint */}
          <div className="absolute bottom-8 left-8 xl:bottom-12 xl:left-12 z-20 pointer-events-none flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-6 h-6 xl:w-8 xl:h-8 rounded border border-white/20 flex flex-col items-center justify-center text-white/50 xl:text-sm text-xs">
                <span className="leading-none mt-1">↕</span>
              </div>
            </div>
            <span className="text-white/40 font-mono text-[10px] xl:text-xs tracking-widest uppercase">
              Scroll to explore <span className="hidden xl:inline">or drag nexus</span>
            </span>
          </div>
        </div>

        {/* Right Side: Scrollable Content */}
        <div className="w-full xl:w-1/2 relative z-10 p-6 xl:p-20 py-12 xl:py-32 bg-bg">
          <div className="max-w-2xl mx-auto space-y-24 xl:space-y-48">
            {/* Intro text */}
            <div className="mb-10 xl:mb-20">
              <p className="text-lg xl:text-2xl text-secondary font-sans leading-relaxed">
                Explore the various roles and technical positions where I've driven meaningful change, 
                led teams to success, and engineered innovative solutions.
              </p>
            </div>

            {impactRoles.map((role) => (
              <motion.div 
                key={role.id}
                onViewportEnter={() => setActiveId(role.id)}
                viewport={{ margin: "-50% 0px -50% 0px" }}
                className={`transition-all duration-700 ${activeId === role.id ? 'opacity-100 scale-100' : 'opacity-30 scale-[0.98] hover:opacity-70'}`}
              >
                <div 
                  className="border-l-2 pl-6 xl:pl-10 relative py-4 cursor-pointer transition-colors duration-500 outline-none"
                  style={{ borderColor: activeId === role.id ? role.color : 'rgba(255,255,255,0.05)' }}
                  onClick={() => setActiveId(role.id)}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveId(role.id)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={activeId === role.id}
                >
                  {/* Active indicator dot */}
                  <div 
                    className={`absolute w-3 h-3 xl:w-4 xl:h-4 rounded-full -left-[7.5px] xl:-left-[9.5px] top-6 transition-all duration-500 ${activeId === role.id ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} 
                    style={{ backgroundColor: role.color, boxShadow: `0 0 15px ${role.color}` }} 
                  />

                  <span className="text-[10px] uppercase font-mono tracking-widest px-3 py-1.5 bg-white/5 rounded-full border border-white/10 text-secondary mb-6 inline-block font-semibold">
                    {role.category}
                  </span>
                  
                  <h3 className="text-3xl xl:text-5xl font-display font-bold text-primary mb-3">
                    {role.title}
                  </h3>
                  
                  <p className="text-sm xl:text-base font-sans font-semibold mb-6 flex items-center gap-2 text-secondary">
                    {role.agency}
                  </p>

                  <p className="text-base xl:text-xl text-primary/80 font-sans leading-relaxed mb-10">
                    {role.description}
                  </p>

                  <div className="space-y-4 bg-surface/30 p-6 xl:p-8 rounded-2xl border border-white/5">
                    <h4 className="text-[10px] xl:text-xs uppercase tracking-widest text-accent font-bold mb-4">Key Contributions</h4>
                    {role.impactPoints.map((point, idx) => (
                      <div key={idx} className="flex gap-4 items-start">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: role.color === '#FFFFFF' ? '#A1A1AA' : role.color }} />
                        <p className="text-sm xl:text-base text-secondary/90 leading-relaxed font-sans">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
            
            <div className="h-[20vh] xl:h-[40vh]" /> {/* Spacer at bottom so last item can center */}
          </div>
        </div>
      </div>
    </section>
  );
}
