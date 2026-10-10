import React from 'react';
import { Trophy } from 'lucide-react';

interface ReactionBestProps {
  bestScore: number | null;
  isNewRecord?: boolean;
}

export const ReactionBest: React.FC<ReactionBestProps> = ({ bestScore, isNewRecord = false }) => (
  <section
    aria-live="polite"
    className={`w-full max-w-md rounded-2xl border p-4 text-center backdrop-blur-xl ${
      isNewRecord
        ? 'border-emerald-400/70 bg-emerald-950/30 shadow-[0_0_28px_rgba(52,211,153,0.2)]'
        : 'border-cyan-500/30 bg-slate-900/70'
    }`}
  >
    <div className="flex items-center justify-center gap-2 text-xs font-mono font-extrabold tracking-widest text-cyan-300">
      <Trophy className="h-4 w-4 text-amber-400" />
      ALL-TIME BEST
    </div>

    <p className="mt-2 font-display text-3xl font-black text-white">
      {bestScore === null ? 'No record yet' : <>{bestScore} <span className="font-mono text-base text-cyan-300">ms</span></>}
    </p>

    {isNewRecord && (
      <p className="mt-1 text-xs font-mono font-bold tracking-wider text-emerald-300">NEW RECORD!</p>
    )}
  </section>
);
