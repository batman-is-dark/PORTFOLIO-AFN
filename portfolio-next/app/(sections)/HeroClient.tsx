'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useRef } from 'react';
import { FlightPathSVG } from '../../components/flight-path/FlightPathSVG';
import { Waypoint } from '../../components/flight-path/Waypoint';

export function HeroClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Waypoint activations based on scroll progress
  const waypoint1Active = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const waypoint2Active = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const waypoint3Active = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  
  const smoothProgress = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Flight Path SVG */}
      <div className="absolute inset-0 z-0">
        <FlightPathSVG scrollProgress={smoothProgress.get()} />
      </div>

      {/* Waypoints */}
      <div className="absolute inset-0 z-[5]">
        <Waypoint 
          icon="plane" 
          label="Pilot" 
          position={{ x: 15, y: 75 }} 
          isActive={waypoint1Active.get() > 0.5}
          delay={0.2}
        />
        <Waypoint 
          icon="target" 
          label="ATC" 
          position={{ x: 40, y: 55 }} 
          isActive={waypoint2Active.get() > 0.5}
          delay={0.4}
        />
        <Waypoint 
          icon="brain" 
          label="Data Science" 
          position={{ x: 70, y: 35 }} 
          isActive={waypoint3Active.get() > 0.5}
          delay={0.6}
        />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#00F0FF]/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#FFB800]/20 rounded-full blur-[100px]"
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-20 text-center px-6 max-w-6xl mx-auto"
      >
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-3 px-6 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <motion.span 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-[#FFB800]"
          />
          <span className="text-[var(--color-muted)] font-sans text-xs tracking-[0.3em] uppercase">
            Aspirant @ MBZUAI • 2026
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-[10rem] font-display font-bold tracking-tight text-primary leading-[0.9] mb-8"
        >
          <span className="block">
            <motion.span 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="inline-block"
            >
              AFNAN
            </motion.span>
          </span>
          <span className="block">
            <motion.span 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="inline-block bg-gradient-to-r from-[#00F0FF] via-blue-500 to-[#FFB800] bg-clip-text text-transparent"
            >
              K.A RAFI
            </motion.span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xl md:text-2xl lg:text-3xl text-secondary max-w-3xl mx-auto font-sans font-light leading-relaxed mb-12"
        >
          Engineering <span className="text-[#00F0FF] font-medium">Autonomous Systems</span> and{' '}
          <span className="text-[#FFB800] font-medium">Human-AI Interaction</span> with mathematical precision.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <motion.button
            onClick={scrollToProjects}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,184,0,0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 py-5 bg-[#FFB800] text-black font-sans font-bold uppercase tracking-[0.15em] overflow-hidden rounded-full"
          >
            <span className="relative z-10">Explore Works</span>
            <motion.div 
              className="absolute inset-0 bg-[#00F0FF]"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          
          <motion.a
            href="/resume.docx"
            download="Afnan_CV.docx"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-5 bg-transparent border-2 border-[#00F0FF]/30 hover:border-[#00F0FF] text-[#00F0FF] font-sans font-bold uppercase tracking-[0.15em] transition-all duration-300 flex items-center gap-3 rounded-full group"
          >
            <span>Resume</span>
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↓
            </motion.span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50"
      >
        <motion.button
          onClick={scrollToProjects}
          className="group flex flex-col items-center gap-4 cursor-pointer"
          aria-label="Scroll to explore works"
        >
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#FFB800]/10 rounded-full blur-xl group-hover:bg-[#FFB800]/20 transition-colors" />
            <div className="relative w-12 h-12 rounded-full border-2 border-[#00F0FF]/30 flex items-center justify-center group-hover:border-[#FFB800] transition-colors">
              <ArrowDown className="w-5 h-5 text-[#00F0FF] group-hover:text-[#FFB800] transition-colors" />
            </div>
          </motion.div>
          <span className="text-xs font-sans uppercase tracking-[0.3em] text-[var(--color-muted)] group-hover:text-[#00F0FF] transition-colors">
            Scroll to Explore
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}
