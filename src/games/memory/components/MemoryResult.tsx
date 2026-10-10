import React, { useEffect, useRef } from 'react';
import type { MemoryResultData } from '../types/memory.types';
import { DIFFICULTIES } from '../logic/memoryLogic';
import { Badge } from '@/components/ui/Badge';
import { GameButton } from '@/components/ui/GameButton';
import { Trophy, RefreshCw, Clock, Eye, AlertCircle, Award, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';

interface MemoryResultProps {
  result: MemoryResultData;
  onPlayAgain: () => void;
  onChangeDifficulty: () => void;
}

export const MemoryResult: React.FC<MemoryResultProps> = ({
  result,
  onPlayAgain,
  onChangeDifficulty,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const config = DIFFICULTIES[result.difficulty];

  useEffect(() => {
    // Confetti burst
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
      className="w-full max-w-xl bg-slate-900/90 border border-slate-800 rounded-3xl p-8 text-center backdrop-blur-xl glow-purple"
    >
      <div className="flex items-center justify-center gap-2 mb-3">
        <Trophy className="w-6 h-6 text-purple-400" />
        <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-slate-400">
          MEMORY BOARD CLEARED!
        </span>
      </div>

      <div className="mb-6 flex items-center justify-center gap-2">
        <Badge variant={config.badgeColor} className="text-sm py-1 px-4">
          🧠 {config.name} GRID MASTER
        </Badge>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-950/80 rounded-2xl border border-slate-800 mb-8">
        <div className="flex flex-col items-center">
          <Clock className="w-4 h-4 text-cyan-400 mb-1" />
          <span className="text-[10px] font-mono text-slate-400 uppercase">TIME</span>
          <span className="font-display font-bold text-base text-white">{result.timeFormatted}</span>
        </div>

        <div className="flex flex-col items-center">
          <Eye className="w-4 h-4 text-purple-400 mb-1" />
          <span className="text-[10px] font-mono text-slate-400 uppercase">ATTEMPTS</span>
          <span className="font-display font-bold text-base text-white">{result.attempts}</span>
        </div>

        <div className="flex flex-col items-center">
          <AlertCircle className="w-4 h-4 text-amber-400 mb-1" />
          <span className="text-[10px] font-mono text-slate-400 uppercase">MISTAKES</span>
          <span className="font-display font-bold text-base text-white">{result.mistakes}</span>
        </div>

        <div className="flex flex-col items-center">
          <Award className="w-4 h-4 text-emerald-400 mb-1" />
          <span className="text-[10px] font-mono text-slate-400 uppercase">SCORE</span>
          <span className="font-display font-bold text-base text-purple-400">{result.score}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <GameButton
          onClick={onPlayAgain}
          variant="purple"
          size="lg"
          icon={<RefreshCw className="w-5 h-5" />}
        >
          PLAY AGAIN
        </GameButton>

        <GameButton
          onClick={onChangeDifficulty}
          variant="ghost"
          size="lg"
          icon={<Layers className="w-5 h-5 text-purple-400" />}
        >
          CHANGE DIFFICULTY
        </GameButton>
      </div>
    </div>
  );
};

