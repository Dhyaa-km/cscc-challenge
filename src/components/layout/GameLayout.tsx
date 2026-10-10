import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GameButton } from '@/components/ui/GameButton';
import { ArrowLeft } from 'lucide-react';

interface GameLayoutProps {
  title: string;
  subtitle?: string;
  emoji: string;
  badge?: string;
  accentColor?: 'cyan' | 'amber' | 'purple';
  children: React.ReactNode;
}

export const GameLayout: React.FC<GameLayoutProps> = ({
  title,
  subtitle,
  emoji,
  badge,
  accentColor = 'cyan',
  children,
}) => {
  const accentGlow = {
    cyan: 'text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]',
    amber: 'text-amber-400 drop-shadow-[0_0_20px_rgba(245,158,11,0.6)]',
    purple: 'text-purple-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]',
  }[accentColor];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 bg-cyber-grid relative overflow-x-hidden">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
        {/* Top bar with Back button */}
        <div className="flex items-center justify-between mb-8">
          <GameButton to="/" variant="ghost" size="sm" icon={<ArrowLeft className="w-4 h-4" />}>
            BACK TO GAMES
          </GameButton>

          {badge && (
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider border border-slate-700 bg-slate-900 text-slate-300">
              {badge}
            </span>
          )}
        </div>

        {/* Page Title & Subtitle */}
        <div className="text-center mb-8">
          <div className="inline-block mb-3 text-5xl select-none animate-bounce">
            {emoji}
          </div>
          <h1 className={`text-4xl sm:text-5xl font-black font-display tracking-tight text-white mb-2 ${accentGlow}`}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm sm:text-base font-mono text-slate-400 max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

