import React from 'react';
import { clsx, type ClassValue } from "clsx";

function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Simple variant definition without cva
const variants = {
  default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
  secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
  destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
  outline: "text-foreground",
  glow: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)] hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300"
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof variants;
}

export default function Badge({ children, className, variant = "default", ...props }: BadgeProps) {
  const variantClass = variants[variant] || variants.default;
  const baseClass = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  
  return (
    <div className={cn(baseClass, variantClass, className)} {...props}>
      {children}
    </div>
  );
}