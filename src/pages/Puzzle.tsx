import React from 'react';
import { GameLayout } from '@/components/layout/GameLayout';
import { PuzzleGameModule } from '@/games/puzzle/PuzzleGameModule';

export const PuzzlePage: React.FC = () => {
  return (
    <GameLayout
      title="IMAGE PUZZLE"
      subtitle="Reconstruct the scrambled image by tapping tile pairs. Solved puzzles unlock real-world CSCC event quests!"
      emoji="🧩"
      badge="Puzzle & Quest Challenge"
      accentColor="amber"
    >
      <PuzzleGameModule />
    </GameLayout>
  );
};
