import React, { useEffect, useRef } from 'react';
import type { ReactionGameState } from '../types/reaction.types';
import gsap from 'gsap';

interface TrafficLightProps {
  gameState: ReactionGameState;
}

export const TrafficLight: React.FC<TrafficLightProps> = ({ gameState }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const greenLightRef = useRef<HTMLDivElement>(null);
  const redLightsRef = useRef<HTMLDivElement>(null);

  // GSAP animation triggers for state changes
  useEffect(() => {
    if (gameState === 'ready' && greenLightRef.current) {
      // Flash green impact animation
      gsap.fromTo(
        greenLightRef.current,
        { scale: 0.85, filter: 'brightness(1.5)' },
        { scale: 1.05, filter: 'brightness(1)', duration: 0.25, ease: 'back.out(2)' }
      );
    } else if (gameState === 'false-start' && containerRef.current) {
      // Shake animation on false start
      gsap.fromTo(
        containerRef.current,
        { x: -10 },
        { x: 10, duration: 0.08, repeat: 5, yoyo: true, ease: 'sine.inOut' }
      );
    }
  }, [gameState]);

  const isRed = gameState === 'waiting';
  const isGreen = gameState === 'ready';
  const isFalseStart = gameState === 'false-start';

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center p-6 sm:p-8 bg-slate-950/90 border-2 border-slate-800 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] max-w-sm mx-auto"
    >
      {/* Housing Header Glow / Brand */}
      <div className="flex items-center justify-between w-full mb-6 pb-4 border-b border-slate-800/80">
        <span className="text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase">
          CSCC SPEED SIGNAL v1.0
        </span>
        <div className={`w-2.5 h-2.5 rounded-full ${isGreen ? 'bg-emerald-400 animate-ping' : isRed ? 'bg-red-500 animate-pulse' : 'bg-slate-700'}`} />
      </div>

      {/* Traffic Lights Display */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-inner w-full">
        {/* Light 1 (Red / Green) */}
        <div className="flex flex-col items-center gap-2">
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full transition-all duration-200 border-4 flex items-center justify-center ${
              isRed || isFalseStart
                ? 'bg-red-500 border-red-300 shadow-[0_0_35px_rgba(239,68,68,0.9)] animate-pulse'
                : isGreen
                ? 'bg-emerald-400 border-emerald-200 shadow-[0_0_35px_rgba(52,211,153,0.9)]'
                : 'bg-slate-950 border-slate-800 opacity-40'
            }`}
          >
            <div className={`w-6 h-6 rounded-full ${isRed || isFalseStart ? 'bg-red-200' : isGreen ? 'bg-emerald-100' : 'bg-slate-800'}`} />
          </div>
          <span className="text-[10px] font-mono text-slate-500">LIGHT 1</span>
        </div>

        {/* Light 2 (Red / Green) */}
        <div className="flex flex-col items-center gap-2" ref={redLightsRef}>
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full transition-all duration-200 border-4 flex items-center justify-center ${
              isRed || isFalseStart
                ? 'bg-red-500 border-red-300 shadow-[0_0_35px_rgba(239,68,68,0.9)] animate-pulse'
                : isGreen
                ? 'bg-emerald-400 border-emerald-200 shadow-[0_0_35px_rgba(52,211,153,0.9)]'
                : 'bg-slate-950 border-slate-800 opacity-40'
            }`}
          >
            <div className={`w-6 h-6 rounded-full ${isRed || isFalseStart ? 'bg-red-200' : isGreen ? 'bg-emerald-100' : 'bg-slate-800'}`} />
          </div>
          <span className="text-[10px] font-mono text-slate-500">LIGHT 2</span>
        </div>

        {/* Light 3 (Red / Green) */}
        <div className="flex flex-col items-center gap-2" ref={greenLightRef}>
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full transition-all duration-200 border-4 flex items-center justify-center ${
              isRed || isFalseStart
                ? 'bg-red-500 border-red-300 shadow-[0_0_35px_rgba(239,68,68,0.9)] animate-pulse'
                : isGreen
                ? 'bg-emerald-400 border-emerald-200 shadow-[0_0_35px_rgba(52,211,153,0.9)]'
                : 'bg-slate-950 border-slate-800 opacity-40'
            }`}
          >
            <div className={`w-6 h-6 rounded-full ${isRed || isFalseStart ? 'bg-red-200' : isGreen ? 'bg-emerald-100' : 'bg-slate-800'}`} />
          </div>
          <span className="text-[10px] font-mono text-slate-500">LIGHT 3</span>
        </div>
      </div>

      {/* Accessible Text Status Banner for Colorblind / Clear UX */}
      <div className="mt-5 w-full text-center">
        <span
          className={`inline-block px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase border transition-colors ${
            isGreen
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
              : isRed
              ? 'bg-red-500/20 text-red-300 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
              : isFalseStart
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
              : 'bg-slate-900 text-slate-400 border-slate-800'
          }`}
        >
          {isGreen ? '🟢 GREEN — CLICK NOW!' : isRed ? '🔴 RED — WAIT FOR GREEN...' : isFalseStart ? '⚠️ FALSE START' : '⚪ READY TO START'}
        </span>
      </div>
    </div>
  );
};

