import React, { useRef, useEffect } from 'react';
import type { MemoryCard as MemoryCardType, MemoryDifficulty } from '../types/memory.types';
import { MemoryCard } from './MemoryCard';
import gsap from 'gsap';

interface MemoryBoardProps {
  cards: MemoryCardType[];
  difficulty: MemoryDifficulty;
  onCardClick: (card: MemoryCardType) => void;
  isDisabled: boolean;
}

export const MemoryBoard: React.FC<MemoryBoardProps> = ({
  cards,
  difficulty,
  onCardClick,
  isDisabled,
}) => {
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boardRef.current) {
      gsap.fromTo(
        boardRef.current.children,
        { scale: 0.8, opacity: 0, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, stagger: 0.02, ease: 'power2.out' }
      );
    }
  }, [difficulty]);

  // Determine grid CSS columns based on difficulty
  const gridColsClass = {
    easy: 'grid-cols-4 max-w-md',
    medium: 'grid-cols-4 sm:grid-cols-6 max-w-xl',
    hard: 'grid-cols-6 max-w-2xl',
  }[difficulty];

  return (
    <div className="w-full mx-auto px-2">
      <div
        ref={boardRef}
        className={`grid ${gridColsClass} gap-2 sm:gap-3 p-3 sm:p-4 bg-slate-950/90 border-2 border-slate-800 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] mx-auto`}
      >
        {cards.map((card) => (
          <MemoryCard
            key={card.id}
            card={card}
            onClick={() => onCardClick(card)}
            isDisabled={isDisabled}
          />
        ))}
      </div>
    </div>
  );
};

