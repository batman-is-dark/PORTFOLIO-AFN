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
        <div className="absolute inset-0 w-40 h-40 -translate-x-1/2 -translate-y-1/2 bg-[#FF3300] rounded-full blur-3xl" style={{ opacity: 0.4 }} />
        <div className="absolute inset-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full blur-2xl" style={{ opacity: 0.6 }} />
        <svg
          width="160"
          height="160"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="relative"
          style={{ opacity: 1, filter: 'brightness(2) drop-shadow(0 0 20px #FF3300)' }}
        >
          <path
            d="M21 16.5L13 11V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V11L2 16.5V19L10 16.5V21L8 22.5V24L11.5 23L15 24V22.5L13 21V16.5L21 19V16.5Z"
            fill="#ffffff"
            stroke="#FF3300"
            strokeWidth="1"
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

  // Get category color based on tech stack
  const getCategoryInfo = (project: any) => {
    const stack = project.stack?.join(' ').toLowerCase() || '';
    if (stack.includes('tensorflow') || stack.includes('python') || project.slug.includes('disease')) {
      return { color: '#FF6B35', category: 'AI/ML', icon: '🧠' };
    }
    if (stack.includes('react') || stack.includes('next')) {
      return { color: '#61DAFB', category: 'Web Dev', icon: '⚛️' };
    }
    if (stack.includes('three') || stack.includes('webgl')) {
      return { color: '#22d3ee', category: '3D/WebGL', icon: '🎮' };
    }
    return { color: '#34D399', category: 'General', icon: '🚀' };
  };

  const categoryInfo = getCategoryInfo(project);
  
  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale, y }}
      className="group relative w-full md:w-[45%] bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl hover:bg-white/[0.04] transition-all duration-700 hover:border-cyan-500/30 overflow-visible mb-8 p-8"
    >
      {/* Enhanced Project Index Badge - Fixed positioning */}
      <div 
        className="absolute -top-3 -left-3 w-14 h-14 rounded-2xl text-gray-950 flex items-center justify-center font-bold text-lg shadow-2xl z-30 border-2 border-white/20"
        style={{ 
          background: `linear-gradient(135deg, ${categoryInfo.color}, ${categoryInfo.color}dd)`,
          boxShadow: `0 8px 25px ${categoryInfo.color}40, 0 0 0 1px ${categoryInfo.color}20`
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Category Badge */}
      <div className="absolute -top-2 right-4 z-20">
        <div 
          className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-white/20"
          style={{ 
            background: `${categoryInfo.color}15`,
            color: categoryInfo.color,
            borderColor: `${categoryInfo.color}30`
          }}
        >
          <span>{categoryInfo.icon}</span>
          {categoryInfo.category}
        </div>
      </div>

      {/* Animated Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 rounded-t-3xl overflow-hidden">
        <motion.div 
          className="h-full rounded-t-3xl"
          style={{ 
            background: `linear-gradient(90deg, ${categoryInfo.color}, ${categoryInfo.color}80)`,
            width: useTransform(scrollYProgress, [0, 0.5], ['0%', '100%'])
          }}
        />
      </div>

      {/* Enhanced Waypoint Marker */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center flex-col z-20">
        <motion.div 
          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ 
            background: `linear-gradient(135deg, ${categoryInfo.color}, ${categoryInfo.color}80)`,
            boxShadow: `0 0 20px ${categoryInfo.color}50`
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {categoryInfo.icon}
        </motion.div>
        <div className="w-px h-8 bg-gradient-to-b from-cyan-400/50 to-transparent mt-2" />
      </div>

      {/* Reading Time Indicator */}
      <div className="absolute top-4 right-4 text-xs text-white/40 font-mono flex items-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
        2 min read
      </div>

      <div className="relative z-10 mt-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300 leading-tight">
            {project.title}
          </h3>
          {project.featured && (
            <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-yellow-400 text-xs font-bold">FEATURED</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <p className="font-mono text-sm mb-0 uppercase tracking-wider text-cyan-500">
            {project.role}
          </p>
          <span className="text-white/30 text-sm font-mono">{project.timeframe}</span>
        </div>

        <p className="text-gray-300 mb-6 leading-relaxed text-sm line-clamp-3 group-hover:text-gray-200 transition-colors">
          {project.problem}
        </p>

        {/* Enhanced Tech Stack with better visual hierarchy */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech: string, idx: number) => (
              <motion.span 
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-xs text-gray-300 font-mono transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Enhanced Links Section */}
        <div className="flex items-center gap-4">
          {project.links?.map((link: any) => (
            <motion.a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 group/link relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-medium">{link.label}</span>
              <svg 
                className="w-4 h-4 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {link.label.toLowerCase().includes('live') && (
                <span className="ml-2 px-2 py-0.5 text-[10px] font-bold bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30 animate-pulse">LIVE</span>
              )}
              
              {/* Hover effect underline */}
              <motion.div 
                className="absolute bottom-0 left-0 h-0.5 bg-cyan-400 rounded-full"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Background Image */}
      {project.images?.hero && (
        <div className="absolute inset-0 rounded-3xl -z-10 overflow-hidden pointer-events-none">
          <img
            src={project.images.hero}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover opacity-20 blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
        </div>
      )}

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none rounded-3xl">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, ${categoryInfo.color}20 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, ${categoryInfo.color}10 0%, transparent 50%)`,
        }} />
      </div>

      {/* Interactive hover glow */}
      <motion.div 
        className="absolute inset-0 rounded-3xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${categoryInfo.color}05, transparent 40%)`,
        }}
      />
    </motion.div>
  );
}
