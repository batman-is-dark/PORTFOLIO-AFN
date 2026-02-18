'use client';

import { motion } from 'framer-motion';
import { Plane, Target, Brain } from 'lucide-react';

interface WaypointProps {
  icon: 'plane' | 'target' | 'brain';
  label: string;
  position: { x: number; y: number };
  isActive: boolean;
  delay: number;
}

const iconMap = {
  plane: Plane,
  target: Target,
  brain: Brain,
};

export function Waypoint({ icon, label, position, isActive, delay }: WaypointProps) {
  const Icon = iconMap[icon];
  
  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isActive ? 1 : 0.3, 
        scale: isActive ? 1 : 0.8 
      }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Waypoint ring */}
      <div className={`relative p-4 rounded-full border-2 transition-all duration-500 ${
        isActive 
          ? 'border-[#FFB800] bg-[#FFB800]/10 shadow-[0_0_30px_rgba(255,184,0,0.4)]' 
          : 'border-[#00F0FF]/30 bg-[#00F0FF]/5'
      }`}>
        <Icon 
          className={`w-6 h-6 transition-colors duration-300 ${
            isActive ? 'text-[#FFB800]' : 'text-[#00F0FF]/50'
          }`}
          strokeWidth={1.5}
        />
        
        {/* Pulse effect when active */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#FFB800]"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </div>
      
      {/* Label */}
      <span className={`mt-2 text-xs uppercase tracking-widest transition-colors duration-300 ${
        isActive ? 'text-[#FFB800]' : 'text-[var(--color-muted)]'
      }`}>
        {label}
      </span>
    </motion.div>
  );
}
