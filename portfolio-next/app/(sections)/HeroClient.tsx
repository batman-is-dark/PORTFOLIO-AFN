/**
 * HeroClient - Client-side interactive elements for the Hero section
 */
'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import MagneticButton from '../../components/ui/MagneticButton';

export function HeroClient() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 overflow-hidden bg-bg">
      {/* Premium Minimalist Background Glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] opacity-70 animate-pulse" style={{ animationDuration: '4s' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-10 relative z-10 w-full max-w-5xl mx-auto"
      >
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-secondary font-sans text-xs tracking-widest uppercase font-medium">
                Aspirant @ MBZUAI • 2026
              </span>
            </div>
          </motion.div>

          <h1 className="text-6xl sm:text-8xl md:text-[9rem] lg:text-[11rem] font-display font-bold tracking-tight leading-[0.85] text-primary">
            AFNAN
            <br />
            <span className="text-white/80">K.A RAFI</span>
            <span className="text-accent">.</span>
          </h1>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-lg sm:text-xl md:text-2xl text-secondary max-w-2xl mx-auto font-sans font-light leading-relaxed px-4"
        >
          Engineering <span className="text-primary font-medium">Autonomous Systems</span> and <span className="text-primary font-medium">Human-AI Interaction</span> with mathematical precision.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 mt-12"
        >
          <MagneticButton>
            <button
              onClick={scrollToProjects}
              className="w-full sm:w-auto px-10 py-4 bg-primary text-bg hover:bg-white rounded-full font-sans font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] hover:scale-105"
            >
              Explore Works
            </button>
          </MagneticButton>
          
          <MagneticButton>
            <a
              href="/Afnan_CV.pdf"
              download="Afnan_CV.pdf"
              className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-white/20 hover:border-white text-primary rounded-full font-sans font-bold text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 hover:bg-white/5 hover:scale-105"
            >
              Resume
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={scrollToProjects}
        role="button"
        tabIndex={0}
        aria-label="Scroll to explore works"
      >
        <div className="flex flex-col items-center gap-4 group">
          <span className="text-[10px] font-sans uppercase tracking-widest text-secondary group-hover:text-primary transition-colors">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden group-hover:bg-white/40 transition-colors">
            <div className="absolute top-0 left-0 w-full h-[50%] bg-accent animate-[scrollLine_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}