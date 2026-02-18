'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

interface FlightPathSVGProps {
  scrollProgress: number;
}

export function FlightPathSVG({ scrollProgress }: FlightPathSVGProps) {
  const pathRef = useRef<SVGPathElement>(null);
  
  // Path draws from bottom-left to center-right
  const pathD = "M 50 400 Q 150 350 200 300 T 350 200 T 500 150";
  
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 600 500"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Background path (dim) */}
      <path
        d={pathD}
        fill="none"
        stroke="rgba(0,240,255,0.1)"
        strokeWidth="2"
        strokeDasharray="5,5"
      />
      
      {/* Animated path (bright) */}
      <motion.path
        ref={pathRef}
        d={pathD}
        fill="none"
        stroke="url(#pathGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: scrollProgress }}
        transition={{ duration: 0.1, ease: "linear" }}
      />
      
      {/* Gradient definition */}
      <defs>
        <linearGradient id="pathGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="50%" stopColor="#0088FF" />
          <stop offset="100%" stopColor="#FFB800" />
        </linearGradient>
      </defs>
    </svg>
  );
}
