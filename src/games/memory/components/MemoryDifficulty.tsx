import React from 'react';
import type { MemoryDifficulty as MemoryDifficultyType } from '../types/memory.types';
import { DIFFICULTIES } from '../logic/memoryLogic';
import { Badge } from '@/components/ui/Badge';
import { GameButton } from '@/components/ui/GameButton';
import { Play, Sparkles } from 'lucide-react';

interface MemoryDifficultyProps {
  selectedDifficulty: MemoryDifficultyType;
  onSelectDifficulty: (diff: MemoryDifficultyType) => void;
  onStartGame: () => void;
}

export const MemoryDifficulty: React.FC<MemoryDifficultyProps> = ({
  selectedDifficulty,
  onSelectDifficulty,
  onStartGame,
}) => {
  return (
    <div className="w-full max-w-2xl bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center backdrop-blur-xl glow-purple">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono mb-4">
        <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
        <span>Select Difficulty Tier</span>
      </div>

      <h2 className="text-2xl sm:text-4xl font-black font-display text-white mb-3 tracking-tight">
        CHOOSE YOUR GRID
      </h2>

      <p className="text-sm text-slate-300 font-sans max-w-md mx-auto mb-8 leading-relaxed">
        Select a difficulty tier to test your memory skills. Match all card pairs as fast as possible with minimal mistakes!
      </p>

      {/* Difficulty Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {(Object.keys(DIFFICULTIES) as MemoryDifficultyType[]).map((diffKey) => {
          const config = DIFFICULTIES[diffKey];
          const isSelected = selectedDifficulty === diffKey;

          return (
            <button
              type="button"
              key={diffKey}
              onClick={() => onSelectDifficulty(diffKey)}
              className={`flex flex-col items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-center select-none ${
                isSelected
                  ? 'bg-purple-950/60 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.5)] scale-105'
                  : 'bg-slate-950/80 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <Badge variant={config.badgeColor} className="mb-3">
                {config.name}
              </Badge>

              <div className="font-display font-black text-2xl text-white mb-1">
                {config.rows} × {config.cols}
              </div>

              <span className="text-xs font-mono text-purple-300 font-bold mb-3">
                {config.pairs} Pairs ({config.totalCards} Cards)
              </span>

              <span className="text-[11px] text-slate-400 font-sans">
                {config.description}
              </span>
            </button>
          );
        })}
      </div>

      {/* Start Button */}
      <GameButton
        onClick={onStartGame}
        variant="purple"
        size="lg"
        icon={<Play className="w-5 h-5 fill-slate-950" />}
      >
        START {selectedDifficulty.toUpperCase()} GAME
      </GameButton>
    </div>
  );
};

