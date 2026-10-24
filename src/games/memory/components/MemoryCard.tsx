import React from 'react';
import type { MemoryCard as MemoryCardType } from '../types/memory.types';
import { Lock } from 'lucide-react';

interface MemoryCardProps {
  card: MemoryCardType;
  onClick: () => void;
  isDisabled: boolean;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ card, onClick, isDisabled }) => {
  const isRevealed = card.isFlipped || card.isMatched;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled || card.isMatched}
      aria-label={
        card.isMatched
          ? `Matched pair ${card.pairName}`
          : card.isFlipped
          ? `Revealed ${card.pairName}`
          : `Hidden card`
      }
      className="relative w-full aspect-square cursor-pointer select-none rounded-2xl group focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-950"
      style={{ perspective: '1000px' }}
    >
      <div
        className="w-full h-full rounded-2xl transition-transform duration-500 relative"
        style={{
          transformStyle: 'preserve-3d',
          transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* CARD BACK (Face Down - 0 deg) */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-slate-800 flex flex-col items-center justify-center p-2 shadow-inner group-hover:border-purple-500/60"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-display font-black text-xs sm:text-sm">
            CS
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase mt-1">
            CDEC
          </span>
        </div>

        {/* CARD FRONT (Face Up - 180 deg) */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl border-2 flex flex-col items-center justify-between p-2 bg-slate-950 transition-all ${
            card.isMatched
              ? 'border-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.6)] ring-2 ring-emerald-400/50'
              : 'border-purple-500/80 shadow-[0_0_20px_rgba(168,85,247,0.5)]'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Main AVIF Photograph Asset */}
          <div className="w-full flex-1 rounded-xl overflow-hidden bg-slate-900 border border-slate-800/80 flex items-center justify-center p-1">
            <img
              src={card.imageSrc}
              alt={card.pairName}
              className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Pair Title Label Below Image */}
          <div className="w-full text-center mt-1 flex items-center justify-center gap-1">
            <span className="text-[9px] sm:text-[10px] font-mono font-black tracking-wider uppercase text-slate-200 line-clamp-1">
              {card.pairName}
            </span>
          </div>

          {card.isMatched && (
            <div className="absolute top-1.5 right-1.5 p-1 rounded-full bg-emerald-500/40 border border-emerald-400 text-emerald-200 shadow-md">
              <Lock className="w-3 h-3" />
            </div>
          )}
        </div>
      </div>
    </button>
  );
};
