'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { projects } from '../../content/projects';

/**
 * Airplane Sprite SVG (rotation handled by parent)
 */
const Airplane = () => {
  return (
    <div className="absolute z-50 pointer-events-none" style={{ opacity: 1 }}>
      <div className="relative" style={{ opacity: 1 }}>
        {/* Strong glow background */}
        <div className="absolute inset-0 w-40 h-40 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 rounded-full blur-3xl" style={{ opacity: 1 }} />
        <div className="absolute inset-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full blur-2xl" style={{ opacity: 1 }} />
        <svg
          width="160"
          height="160"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="relative"
          style={{ opacity: 1, filter: 'brightness(5) drop-shadow(0 0 30px #ffffff) drop-shadow(0 0 60px #fbbf24)' }}
        >
          <path
            d="M21 16.5L13 11V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V11L2 16.5V19L10 16.5V21L8 22.5V24L11.5 23L15 24V22.5L13 21V16.5L21 19V16.5Z"
            fill="#ffffff"
            stroke="#fbbf24"
            strokeWidth="2"
            style={{ opacity: 1 }}
          />
        </svg>
      </div>
    </div>
  );
};

// Simple cloud that drifts across the scene (parallax)
function Cloud({ progress, left = '0%', scale = 1 }: { progress: MotionValue<number> | any, left?: string, scale?: number }) {
  const x = useTransform(progress, [0, 1], ['-20%', '120%']);
  const y = useTransform(progress, [0, 1], ['0%', '0%']);

  return (
    <motion.div style={{ x, y }} className="absolute" aria-hidden>
      <svg width={120 * scale} height={60 * scale} viewBox="0 0 120 60" className="text-white/85 opacity-70 drop-shadow-[0_6px_20px_rgba(0,0,0,0.45)]" style={{ left }}>
        <g fill="currentColor">
          <ellipse cx="30" cy="30" rx="28" ry="18" />
          <ellipse cx="60" cy="24" rx="24" ry="16" />
          <ellipse cx="90" cy="30" rx="22" ry="14" />
        </g>
      </svg>
    </motion.div>
  );
}

function Bird({ progress, offset = 0 }: { progress: MotionValue<number> | any, offset?: number }) {
  const x = useTransform(progress, [0, 1], ['0%', '100%']);
  const y = useTransform(progress, [0, 1], ['0%', '0%']);

  return (
    <motion.div style={{ x, y }} className="absolute" aria-hidden>
      <svg width="28" height="16" viewBox="0 0 28 16" className="text-white/90 opacity-90" style={{ marginLeft: `${offset}%` }}>
        <path d="M2 10 C8 2, 14 2, 20 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
}

export default function FlightPath() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.0005 });

  // Refs to SVG and path to compute exact plane coordinates
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const totalLengthRef = useRef<number>(0);

  // Motion values for plane position in pixels and rotation
  const planeX = useMotionValue(500);
  const planeY = useMotionValue(0);
  const planeRotate = useMotionValue(0);

  // Smooth springs for nicer motion
  const planeXSpring = useSpring(planeX, { stiffness: 180, damping: 28 });
  const planeYSpring = useSpring(planeY, { stiffness: 180, damping: 28 });
  const planeRotateSpring = useSpring(planeRotate, { stiffness: 140, damping: 30 });

  const VIEWBOX_W = 1000;
  const VIEWBOX_H = 2400;

  useEffect(() => {
    const p = pathRef.current;
    const s = svgRef.current;
    if (!p || !s) return;
    
    totalLengthRef.current = p.getTotalLength();

    const unsubscribe = smoothProgress.on('change', (v: number) => {
      const total = totalLengthRef.current || 1;
      const clamped = Math.max(0, Math.min(1, v));
      const point = p.getPointAtLength(clamped * total);
      const nextPoint = p.getPointAtLength(Math.min((clamped + 0.002) * total, total));

      // Map viewBox coords to pixel coords
      const bbox = s.getBoundingClientRect();
      const scaleX = bbox.width / VIEWBOX_W;
      const scaleY = bbox.height / VIEWBOX_H;

      planeX.set(point.x * scaleX);
      planeY.set(point.y * scaleY);

      const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
      planeRotate.set(angle + 90);
    });

    return () => unsubscribe();
  }, [smoothProgress, planeX, planeY, planeRotate]);

  // Calculate positions along the path
  // We'll use a CSS-based path for the airplane to follow
  // For simplicity and visibility, we'll map Y to scroll and X to a sine wave
  const airplaneY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const airplaneX = useTransform(smoothProgress, 
    [0, 0.2, 0.4, 0.6, 0.8, 1], 
    ["50%", "80%", "20%", "80%", "20%", "50%"]
  );

  return (
    <div ref={containerRef} className="relative w-full py-20 min-h-[300vh] bg-gradient-to-b from-slate-900 via-gray-950 to-[#041b23]">
      {/* The Flight Path SVG Line */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <svg ref={svgRef} className="w-full h-full opacity-40" preserveAspectRatio="none" viewBox="0 0 1000 2400">
           <defs>
             <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
               <stop offset="10%" stopColor="#22d3ee" stopOpacity="1" />
               <stop offset="90%" stopColor="#22d3ee" stopOpacity="1" />
               <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.3" />
             </linearGradient>
           </defs>
           {/* Flight path through card waypoints - always visible for performance */}
           <path
             d="M 750,50 C 780,150 760,250 740,350 C 720,450 500,550 300,650 C 100,750 150,850 200,950 C 250,1050 500,1150 700,1250 C 750,1300 770,1400 740,1500 C 710,1600 400,1700 250,1800 C 100,1900 120,2000 200,2100 C 350,2250 600,2300 700,2350"
             stroke="url(#pathGradient)"
             strokeWidth="6"
             strokeDasharray="20 12"
             fill="none"
             ref={pathRef}
             style={{ 
               filter: 'drop-shadow(0 8px 24px rgba(34,211,238,0.4))',
               strokeLinecap: 'round'
             }}
           />
        </svg>
      </div>

      {/* Sun (top-right) */}
      <div className="absolute right-8 top-8 z-0 pointer-events-none">
        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 opacity-40 blur-3xl" />
      </div>

      {/* Decorative clouds and balloon (parallax) */}
      <Cloud progress={smoothProgress} left="5%" scale={1.2} />
      <Cloud progress={smoothProgress} left="25%" scale={0.9} />
      <Cloud progress={smoothProgress} left="60%" scale={1.1} />
      <Cloud progress={smoothProgress} left="80%" scale={0.7} />

      <motion.div className="absolute z-30" style={{ left: '10%', top: '18%' }} aria-hidden>
        <motion.div style={{ y: useTransform(smoothProgress, [0, 0.5, 1], ['0%', '-6%', '0%']) }}>
          <div className="w-10 h-14 bg-amber-400/80 rounded-xl flex items-center justify-center shadow-[0_8px_30px_rgba(250,204,21,0.12)]">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
      </motion.div>

      {/* The Flying Airplane - follows SVG path exactly */}
      <div className="absolute inset-0 pointer-events-none z-50" style={{ isolation: 'isolate' }}>
        <motion.div 
          style={{ 
            x: planeXSpring, 
            y: planeYSpring,
            rotate: planeRotateSpring
          }} 
          className="absolute top-0 left-0 will-change-transform"
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            {/* Contrail */}
            <motion.div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-16 w-80 h-4 bg-gradient-to-b from-amber-300/70 via-amber-400/40 to-transparent rounded-full blur-xl" 
              style={{ 
                scaleY: useTransform(smoothProgress, [0, 1], [0.5, 2.5]),
                opacity: useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]),
                willChange: 'transform, opacity'
              }} 
            />
            <Airplane />
          </div>
        </motion.div>
      </div>

      {/* Project Waypoints */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 flex flex-col items-center">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div 
              key={project.slug}
              className={`w-full flex mb-[40vh] ${isEven ? 'justify-end' : 'justify-start'}`}
            >
              <ProjectCard project={project} index={index} />
            </div>
          );
        })}
      </div>

      {/* Destination Marker */}
      <div className="flex flex-col items-center justify-center py-20 opacity-50">
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-cyan-500 flex items-center justify-center animate-spin-slow">
             <div className="w-2 h-2 bg-cyan-500 rounded-full" />
          </div>
          <span className="mt-4 font-mono text-xs text-cyan-500 uppercase tracking-widest">Destination Reached</span>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale, y }}
      className="group relative w-full md:w-[45%] bg-white/[0.03] backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/[0.05] transition-all duration-500 hover:border-cyan-500/50"
    >
      {/* Project Index Badge */}
      <div className="absolute -top-4 -left-4 w-10 h-10 bg-cyan-500 text-gray-950 flex items-center justify-center font-bold rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.5)] z-20">
        0{index + 1}
      </div>

      {/* Waypoint Marker */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center flex-col z-30">
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-300 shadow-[0_0_12px_rgba(34,211,238,0.45)] animate-pulse" />
        <div className="w-px h-6 bg-white/10 mt-1" />
      </div>

      {/* Background thumbnail behind the card (dim + blurred) */}
      {project.three?.fallbackImage && (
        <div className="absolute inset-0 rounded-2xl -z-10 overflow-hidden pointer-events-none">
          <img
            src={project.three.fallbackImage}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover opacity-30 blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        </div>
      )}

      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-cyan-500 font-mono text-sm mb-4 uppercase tracking-wider">
          {project.role}
        </p>

        {/* Inline thumbnail removed — using background image behind the card instead */}

        <p className="text-gray-400 mb-6 leading-relaxed">
          {project.problem}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.stack.map((tech: string) => (
            <span 
              key={tech}
              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 font-mono"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-6">
          {project.links?.map((link: any) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-cyan-400 transition-colors flex items-center gap-2 group/link"
            >
              <span className="text-sm font-medium">{link.label}</span>
              <svg 
                className="w-4 h-4 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[60px] rounded-full -z-10 group-hover:bg-cyan-500/20 transition-all duration-500" />
    </motion.div>
  );
}
