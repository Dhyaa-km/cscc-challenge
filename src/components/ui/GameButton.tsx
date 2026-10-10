import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface GameButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  variant?: 'cyan' | 'amber' | 'purple' | 'emerald' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const GameButton: React.FC<GameButtonProps> = ({
  to,
  variant = 'cyan',
  size = 'md',
  children,
  className,
  icon,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs font-bold tracking-wider',
    md: 'px-6 py-3 text-sm font-extrabold tracking-wider',
    lg: 'px-8 py-4 text-base font-black tracking-widest',
  };

  const variantClasses = {
    cyan: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] border border-cyan-400/50',
    amber: 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.7)] border border-amber-400/50',
    purple: 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-slate-950 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] border border-purple-400/50',
    emerald: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.7)] border border-emerald-400/50',
    ghost: 'bg-slate-900/60 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 backdrop-blur-sm',
    outline: 'bg-transparent text-slate-200 border border-slate-700 hover:border-slate-400 hover:bg-slate-900/50',
  };

  const baseClasses = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-300 uppercase cursor-pointer select-none active:scale-95 disabled:opacity-50 disabled:pointer-events-none font-display',
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {icon && <span className="transition-transform group-hover:scale-110">{icon}</span>}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {icon && <span className="transition-transform group-hover:scale-110">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

