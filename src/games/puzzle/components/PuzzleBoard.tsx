import React, { useRef, useEffect } from 'react';
import type { PuzzleTile as PuzzleTileType } from '../types/puzzle.types';
import { PuzzleTile } from './PuzzleTile';
import gsap from 'gsap';

interface PuzzleBoardProps {
  tiles: PuzzleTileType[];
  selectedIndex: number | null;
  isDisabled: boolean;
  onTileClick: (index: number) => void;
  imageSrc: string;
}

export const PuzzleBoard: React.FC<PuzzleBoardProps> = ({
  tiles,
  selectedIndex,
  isDisabled,
  onTileClick,
  imageSrc,
}) => {
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boardRef.current) {
      gsap.fromTo(
        boardRef.current.children,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.03, ease: 'power2.out' }
      );
    }
  }, [tiles]);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* 4x4 Grid Housing */}
      <div
        ref={boardRef}
        className="grid grid-cols-4 gap-2 sm:gap-3 p-3 sm:p-4 bg-slate-950/90 border-2 border-slate-800 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)]"
      >
        {tiles.map((tile, index) => (
          <PuzzleTile
            key={tile.id}
            tile={tile}
            isSelected={selectedIndex === index}
            isDisabled={isDisabled}
            onClick={() => onTileClick(index)}
            imageSrc={imageSrc}
          />
        ))}
      </div>
    </div>
  );
};

