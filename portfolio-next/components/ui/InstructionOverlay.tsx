'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2, ChevronDown, Hand } from 'lucide-react';
import { useState, useEffect } from 'react';

type InstructionType = 'scroll' | 'drag' | 'click' | 'keyboard';

interface InstructionOverlayProps {
  type: InstructionType;
  text: string;
  className?: string;
  fadeAfter?: number; // ms to fade out, 0 for persistent
}

export default function InstructionOverlay({ type, text, className = "", fadeAfter = 0 }: InstructionOverlayProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (fadeAfter > 0) {
      const timer = setTimeout(() => setVisible(false), fadeAfter);
      return () => clearTimeout(timer);
    }
  }, [fadeAfter]);

  if (!visible) return null;

  const Icon = type === 'scroll' ? ChevronDown : type === 'drag' ? Hand : MousePointer2;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className={`pointer-events-none select-none z-40 bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.5)] ${className}`}
      >
        <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent">
            <Icon size={12} className={type === 'scroll' ? 'animate-bounce' : 'animate-pulse'} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/90">{text}</span>
      </motion.div>
    </AnimatePresence>
  );
}
