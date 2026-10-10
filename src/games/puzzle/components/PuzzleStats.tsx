import React, { useState } from 'react';
import { formatPuzzleTime } from '../logic/puzzleLogic';
import { Clock, Footprints, Eye, X } from 'lucide-react';
import { GameButton } from '@/components/ui/GameButton';

interface PuzzleStatsProps {
  moves: number;
  elapsedMs: number;
  imageSrc: string;
}

export const PuzzleStats: React.FC<PuzzleStatsProps> = ({ moves, elapsedMs, imageSrc }) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="w-full max-w-lg mx-auto flex items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl mb-6 backdrop-blur-md">
      {/* Moves Counter */}
      <div className="flex items-center gap-2 font-mono">
        <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
          <Footprints className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            MOVES
          </span>
          <span className="font-display font-black text-lg text-white">{moves}</span>
        </div>
      </div>

      {/* Timer Counter */}
      <div className="flex items-center gap-2 font-mono">
        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
          <Clock className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            TIME
          </span>
          <span className="font-display font-black text-lg text-cyan-400">
            {formatPuzzleTime(elapsedMs)}
          </span>
        </div>
      </div>

      {/* Preview Full Image Modal Trigger */}
      <GameButton
        onClick={() => setShowPreview(true)}
        variant="ghost"
        size="sm"
        icon={<Eye className="w-4 h-4 text-amber-400" />}
      >
        PREVIEW
      </GameButton>

      {/* Target Image Modal Overlay */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full text-center shadow-2xl">
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display font-bold text-lg text-white mb-4">
              TARGET IMAGE PREVIEW
            </h3>

            <div className="rounded-2xl overflow-hidden border-2 border-amber-500/40 mb-6 shadow-lg">
              <img src={imageSrc} alt="Target CSCC Puzzle" className="w-full h-auto aspect-square object-cover" />
            </div>

            <GameButton onClick={() => setShowPreview(false)} variant="amber" size="md">
              BACK TO PUZZLE
            </GameButton>
          </div>
        </div>
      )}
    </div>
  );
};

