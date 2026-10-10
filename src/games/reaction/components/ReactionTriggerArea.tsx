import React, { useEffect } from 'react';
import type { ReactionGameState } from '../types/reaction.types';
import { GameButton } from '@/components/ui/GameButton';
import { Zap, AlertTriangle, RefreshCw, Play } from 'lucide-react';

interface ReactionTriggerAreaProps {
  gameState: ReactionGameState;
  onTrigger: () => void;
  onStart: () => void;
}

export const ReactionTriggerArea: React.FC<ReactionTriggerAreaProps> = ({
  gameState,
  onTrigger,
  onStart,
}) => {
  // Allow Keyboard Spacebar / Enter to trigger reaction as an arcade control!
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        if (gameState === 'idle') {
          onStart();
        } else if (gameState === 'waiting' || gameState === 'ready') {
          onTrigger();
        } else if (gameState === 'false-start') {
          onStart();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, onStart, onTrigger]);

  if (gameState === 'idle') {
    return (
      <div className="flex flex-col items-center gap-4 mt-8">
        <p className="text-sm font-mono text-slate-400">
          Click the button below or press <kbd className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-cyan-400 font-bold">SPACE</kbd> to begin.
        </p>

        <GameButton
          onClick={onStart}
          variant="cyan"
          size="lg"
          icon={<Play className="w-5 h-5 fill-slate-950" />}
        >
          START TEST
        </GameButton>
      </div>
    );
  }

  if (gameState === 'false-start') {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-red-950/80 border-2 border-red-500/80 rounded-3xl text-center backdrop-blur-xl max-w-md mx-auto mt-8 shadow-[0_0_40px_rgba(239,68,68,0.4)]">
        <div className="p-4 rounded-2xl bg-red-500/20 text-red-400 mb-4 animate-bounce">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <h3 className="text-3xl font-black font-display text-white mb-2 tracking-tight">
          TOO EARLY!
        </h3>

        <p className="text-sm text-red-200 font-sans mb-6 max-w-xs leading-relaxed">
          You clicked while the lights were still RED. Wait for all lights to turn GREEN!
        </p>

        <GameButton
          onClick={onStart}
          variant="cyan"
          size="md"
          icon={<RefreshCw className="w-4 h-4" />}
        >
          TRY AGAIN
        </GameButton>
      </div>
    );
  }

  const isReady = gameState === 'ready';

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      {/* Interactive Arcade Click Pad */}
      <button
        type="button"
        onClick={onTrigger}
        className={`w-full py-12 px-6 rounded-3xl border-2 transition-all duration-150 flex flex-col items-center justify-center gap-3 select-none cursor-pointer active:scale-98 ${
          isReady
            ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-[0_0_60px_rgba(52,211,153,0.8)] animate-pulse'
            : 'bg-red-950/60 border-red-500/50 text-red-300 hover:bg-red-900/60 shadow-[0_0_30px_rgba(239,68,68,0.3)]'
        }`}
      >
        <Zap className={`w-12 h-12 ${isReady ? 'fill-slate-950 animate-bounce' : 'animate-pulse'}`} />

        <span className="font-display font-black text-2xl sm:text-4xl tracking-wider uppercase">
          {isReady ? '⚡ CLICK NOW! ⚡' : '🔴 WAIT FOR GREEN...'}
        </span>

        <span className="text-xs font-mono font-bold tracking-widest opacity-80 uppercase">
          {isReady ? 'Click anywhere on this pad!' : 'Clicking now triggers a false start!'}
        </span>
      </button>
    </div>
  );
};

