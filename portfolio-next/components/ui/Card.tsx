import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export default function Card({ className = '', children }: CardProps) {
  return (
    <div className={`rounded-lg border border-[color:var(--color-border,#334155)] bg-[color:var(--color-surface)] shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );
}