import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
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

  useEffect(() => {
    if (!showPreview) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowPreview(false);
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [showPreview]);

  const previewModal = showPreview
    ? createPortal(
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md"
          role="presentation"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-md flex-col rounded-3xl border border-slate-800 bg-slate-900 p-5 text-center shadow-2xl sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="puzzle-preview-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              aria-label="Close target image preview"
              className="absolute right-3 top-3 z-10 rounded-full bg-slate-800 p-2 text-slate-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 sm:right-4 sm:top-4"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 id="puzzle-preview-title" className="mb-4 pr-10 font-display text-lg font-bold text-white">
              TARGET IMAGE PREVIEW
            </h3>

            <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl border-2 border-amber-500/40 shadow-lg">
              <img
                src={imageSrc}
                alt="Target CSCC Puzzle"
                className="block h-auto max-h-[calc(100dvh-13rem)] max-w-full object-contain"
              />
            </div>

            <div className="mt-5 shrink-0">
              <GameButton onClick={() => setShowPreview(false)} variant="amber" size="md">
                BACK TO PUZZLE
              </GameButton>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
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

      </div>

      {previewModal}
    </>
  );
};

