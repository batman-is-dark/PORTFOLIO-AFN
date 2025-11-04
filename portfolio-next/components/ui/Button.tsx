import React from 'react';

interface ButtonProps {
  as?: 'button' | 'a';
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  as = 'button',
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps & React.ComponentPropsWithoutRef<'button'> & React.ComponentPropsWithoutRef<'a'>) {
  const variantClasses = {
    primary: 'bg-primary text-[#0B1120] hover:bg-teal-400',
    secondary: 'bg-secondary text-white hover:bg-violet-500',
    ghost: 'bg-transparent border border-[color:var(--color-border,#334155)] text-[color:var(--color-text)] hover:bg-[color:var(--color-surface)]',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  const baseClasses = 'rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary inline-flex items-center justify-center font-medium transition-colors';
  const computedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (as === 'a' && href) {
    return (
      <a href={href} className={computedClasses} {...(props as React.ComponentPropsWithoutRef<'a'>)}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={computedClasses} {...(props as React.ComponentPropsWithoutRef<'button'>)}>
      {children}
    </button>
  );
}