import React, { useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import type { GameInfo } from '@/data/gamesData';
import { Badge } from '@/components/ui/Badge';
import { GameButton } from '@/components/ui/GameButton';
import gsap from 'gsap';

interface GameCardProps {
  game: GameInfo;
  index: number;
}

export const GameCard: React.FC<GameCardProps> = ({ game, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          delay: 0.2 + index * 0.15,
          ease: 'power3.out',
        }
      );
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`group relative flex flex-col justify-between rounded-3xl p-8 bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 ${game.theme.bgGlow}`}
    >
      {/* Subtle background glow pill */}
      <div className="absolute top-0 right-0 -z-10 w-44 h-44 rounded-full blur-3xl opacity-10 group-hover:opacity-25 transition-opacity duration-500 bg-current pointer-events-none" />

      {/* Top Header Row */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-inner group-hover:border-slate-700 transition-colors">
            <span className="text-3xl select-none" role="img" aria-label={game.title}>
              {game.emoji}
            </span>
          </div>
          <Badge variant={game.accentColor}>{game.badge}</Badge>
        </div>

        {/* Title and Subtitle */}
        <h3 className={`text-2xl lg:text-3xl font-black font-display tracking-tight text-white mb-2 transition-colors ${game.theme.textGlow}`}>
          {game.title}
        </h3>
        <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-4">
          {game.subtitle}
        </p>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed mb-8 font-sans">
          {game.description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="pt-6 border-t border-slate-800/60 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Ready to Play</span>
        </div>

        <GameButton
          to={game.path}
          variant={game.accentColor}
          size="md"
          icon={<Play className="w-4 h-4 fill-slate-950" />}
        >
          PLAY
        </GameButton>
      </div>
    </div>
  );
};

