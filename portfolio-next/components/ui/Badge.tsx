import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline';
  className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variantClasses = {
    default: 'bg-accent/20 text-accent border border-accent/30',
    outline: 'bg-transparent text-accent border border-accent/50',
  };

  const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium';
  const computedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return <span className={computedClasses}>{children}</span>;
}