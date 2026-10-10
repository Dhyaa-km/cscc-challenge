import React from 'react';
import type { MemoryDifficulty } from '../types/memory.types';
import { DIFFICULTIES, formatMemoryTime } from '../logic/memoryLogic';
import { Badge } from '@/components/ui/Badge';
import { Clock, Eye, AlertCircle, CheckCircle2 } from 'lucide-react';

interface MemoryStatsProps {
  difficulty: MemoryDifficulty;
  attempts: number;
  mistakes: number;
  matchedPairs: number;
  elapsedMs: number;
  onChangeDifficulty: () => void;
}

export const MemoryStats: React.FC<MemoryStatsProps> = ({
  difficulty,
  attempts,
  mistakes,
  matchedPairs,
  elapsedMs,
  onChangeDifficulty,
}) => {
  const config = DIFFICULTIES[difficulty];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl mb-6 backdrop-blur-md">
      {/* Difficulty & Reset */}
      <div className="flex items-center gap-2">
        <Badge variant={config.badgeColor}>{config.name}</Badge>
        <button
          type="button"
          onClick={onChangeDifficulty}
          className="text-xs font-mono text-slate-400 hover:text-cyan-400 underline cursor-pointer"
        >
          Change
        </button>
      </div>

      {/* Timer */}
      <div className="flex items-center gap-1.5 font-mono text-xs text-cyan-400 font-bold bg-cyan-500/10 px-3 py-1.5 rounded-xl border border-cyan-500/30">
        <Clock className="w-4 h-4" />
        <span>{formatMemoryTime(elapsedMs)}</span>
      </div>

      {/* Attempts */}
      <div className="flex items-center gap-1.5 font-mono text-xs text-slate-300 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
        <Eye className="w-4 h-4 text-purple-400" />
        <span>Attempts: <strong className="text-white">{attempts}</strong></span>
      </div>

      {/* Mistakes */}
      <div className="flex items-center gap-1.5 font-mono text-xs text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30">
        <AlertCircle className="w-4 h-4 text-amber-400" />
        <span>Mistakes: <strong className="text-white">{mistakes}</strong></span>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-1.5 font-mono text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
        <CheckCircle2 className="w-4 h-4" />
        <span>{matchedPairs} / {config.pairs} Pairs</span>
      </div>
    </div>
  );
};

