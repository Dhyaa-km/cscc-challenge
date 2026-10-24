import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Home, Zap, Puzzle, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';
import logo from '@/assets/cdecJPG.jpg';

export const Header: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { label: 'Reaction', path: '/reaction', icon: <Zap className="w-4 h-4 text-cyan-400" /> },
    { label: 'Puzzle', path: '/puzzle', icon: <Puzzle className="w-4 h-4 text-amber-400" /> },
    { label: 'Memory', path: '/memory', icon: <BrainCircuit className="w-4 h-4 text-purple-400" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-[1px] shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
              <img src={logo} alt="CSCC Logo" className="w-8 h-8 object-contain" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-black tracking-wider text-lg sm:text-xl text-white group-hover:text-cyan-400 transition-colors">
                CDEC <span className="text-blue-400">CHALLENGE</span>
              </span>
            </div>
           
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold font-mono tracking-wide transition-all duration-200',
                  isActive
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Event Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium shadow-[0_0_12px_rgba(6,182,212,0.2)]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span> Welcome Day </span>
          </div>
        </div>
      </div>

      {/* Mobile nav subbar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800/60 bg-slate-950/95 py-2 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center gap-1 text-[11px] font-mono py-1 px-3 rounded-lg transition-colors',
                isActive ? 'text-cyan-400 font-bold bg-cyan-500/10' : 'text-slate-400 hover:text-slate-200'
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
};
