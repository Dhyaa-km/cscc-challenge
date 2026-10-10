import React from 'react';
import type { PuzzleTile as PuzzleTileType } from '../types/puzzle.types';

interface PuzzleTileProps {
  tile: PuzzleTileType;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
  imageSrc: string;
}

export const PuzzleTile: React.FC<PuzzleTileProps> = ({
  tile,
  isSelected,
  isDisabled,
  onClick,
  imageSrc,
}) => {
  // Compute background offset percentages for 4x4 grid
  const col = tile.correctIndex % 4;
  const row = Math.floor(tile.correctIndex / 4);

  // Background position formula for 4x4 grid (0%, 33.333%, 66.666%, 100%)
  const bgPosX = `${(col / 3) * 100}%`;
  const bgPosY = `${(row / 3) * 100}%`;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-label={`Puzzle piece ${tile.id + 1}, currently at slot ${tile.currentIndex + 1}`}
      className={`relative w-full aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-200 border-2 select-none group ${
        isSelected
          ? 'border-cyan-400 scale-105 shadow-[0_0_25px_rgba(6,182,212,0.8)] z-20 ring-4 ring-cyan-400/40'
          : 'border-slate-800/80 hover:border-slate-500 hover:scale-[1.02] z-10'
      } ${isDisabled ? 'cursor-default pointer-events-none' : ''}`}
    >
      {/* Background sliced section of original image */}
      <div
        className="w-full h-full bg-no-repeat transition-transform duration-300"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: '400% 400%',
          backgroundPosition: `${bgPosX} ${bgPosY}`,
        }}
      />

      {/* Selected Indicator Overlay */}
      {isSelected && (
        <div className="absolute inset-0 bg-cyan-500/20 backdrop-blur-[1px] flex items-center justify-center border-2 border-cyan-400 animate-pulse">
          <span className="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-mono font-black text-xs uppercase shadow-md">
            SELECTED
          </span>
        </div>
      )}

      {/* Subtle corner position guide badge for easy gameplay */}
      <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-slate-950/80 text-[10px] font-mono text-slate-400 opacity-60 group-hover:opacity-100 transition-opacity border border-slate-800">
        #{tile.id + 1}
      </div>
    </button>
  );
};

