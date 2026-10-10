import React, { useEffect, useRef } from 'react';
import type { ReactionResultData } from '../types/reaction.types';
import { Badge } from '@/components/ui/Badge';
import { GameButton } from '@/components/ui/GameButton';
import { RefreshCw, Trophy } from 'lucide-react';
import gsap from 'gsap';

interface ReactionResultProps {
  result: ReactionResultData;
  onPlayAgain: () => void;
}

export const ReactionResult: React.FC<ReactionResultProps> = ({ result, onPlayAgain }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && timeRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.4)' }
      );

      gsap.fromTo(
        timeRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, delay: 0.1, ease: 'elastic.out(1, 0.5)' }
      );
    }
  }, [result]);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-xl bg-slate-900/90 border border-slate-800 rounded-3xl p-8 text-center backdrop-blur-xl glow-cyan"
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-amber-400" />
        <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-slate-400">
          TEST COMPLETED
        </span>
      </div>

      <div className="mb-4">
        <Badge variant={result.rating.badgeColor} className="text-sm py-1.5 px-4">
          <span className="mr-1.5">{result.rating.emoji}</span>
          {result.rating.label}
        </Badge>
      </div>

      <p className="text-xs text-slate-400 font-mono mb-6 uppercase tracking-wider">
        YOUR REACTION TIME
      </p>

      {/* Main Score Display */}
      <div ref={timeRef} className="my-6">
        <div className="inline-flex items-baseline gap-2 font-display font-black text-6xl sm:text-7xl lg:text-8xl bg-gradient-to-r from-cyan-400 via-emerald-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.7)]">
          <span>{result.timeMs}</span>
          <span className="text-2xl sm:text-3xl text-cyan-400 font-mono font-bold uppercase">ms</span>
        </div>
      </div>

      {/* Description / Feedback */}
      <p className="text-sm text-slate-300 font-sans max-w-md mx-auto mb-8 leading-relaxed">
        {result.rating.description}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <GameButton
          onClick={onPlayAgain}
          variant="cyan"
          size="lg"
          icon={<RefreshCw className="w-5 h-5" />}
        >
          PLAY AGAIN
        </GameButton>
      </div>
    </div>
  );
};

