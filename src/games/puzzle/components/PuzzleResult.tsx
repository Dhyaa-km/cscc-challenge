import React, { useEffect, useRef } from 'react';
import type { PuzzleResultData } from '../types/puzzle.types';
import { Badge } from '@/components/ui/Badge';
import { GameButton } from '@/components/ui/GameButton';
import { Trophy, RefreshCw, Clock, Footprints, Award, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';

interface PuzzleResultProps {
  result: PuzzleResultData;
  onPlayAgain: () => void;
  onViewChallenge: () => void;
}

export const PuzzleResult: React.FC<PuzzleResultProps> = ({
  result,
  onPlayAgain,
  onViewChallenge,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Launch celebratory confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.4)' }
      );
    }
  }, [result]);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-xl bg-slate-900/90 border border-slate-800 rounded-3xl p-8 text-center backdrop-blur-xl glow-amber"
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-amber-400" />
        <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-slate-400">
          PUZZLE COMPLETED!
        </span>
      </div>

      <div className="mb-6">
        <Badge variant="amber" className="text-sm py-1 px-4">
          🏆 CDEC Puzzle Master
        </Badge>
      </div>

      {/* Main Score & Stats Grid */}
      <div className="grid grid-cols-3 gap-3 p-4 bg-slate-950/80 rounded-2xl border border-slate-800 mb-6">
        <div className="flex flex-col items-center">
          <Clock className="w-4 h-4 text-cyan-400 mb-1" />
          <span className="text-[10px] font-mono text-slate-400 uppercase">TIME</span>
          <span className="font-display font-bold text-lg text-white">{result.timeFormatted}</span>
        </div>

        <div className="flex flex-col items-center border-x border-slate-800">
          <Footprints className="w-4 h-4 text-amber-400 mb-1" />
          <span className="text-[10px] font-mono text-slate-400 uppercase">MOVES</span>
          <span className="font-display font-bold text-lg text-white">{result.moves}</span>
        </div>

        <div className="flex flex-col items-center">
          <Award className="w-4 h-4 text-purple-400 mb-1" />
          <span className="text-[10px] font-mono text-slate-400 uppercase">SCORE</span>
          <span className="font-display font-bold text-lg text-amber-400">{result.score}</span>
        </div>
      </div>

      {/* Quest Preview Banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-left mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold text-amber-400">EVENT QUEST UNLOCKED</span>
          </div>
          <button
            type="button"
            onClick={onViewChallenge}
            className="text-xs font-mono text-cyan-400 underline hover:text-cyan-300 cursor-pointer"
          >
            View Quest
          </button>
        </div>
        <p className="text-xs text-slate-300 font-sans line-clamp-2">
          "{result.eventChallenge.title}: {result.eventChallenge.description}"
        </p>
      </div>

      {/* Play Again Button */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <GameButton
          onClick={onPlayAgain}
          variant="amber"
          size="lg"
          icon={<RefreshCw className="w-5 h-5" />}
        >
          PLAY AGAIN
        </GameButton>
      </div>
    </div>
  );
};

