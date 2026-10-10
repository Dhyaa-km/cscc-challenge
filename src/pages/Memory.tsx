import React from 'react';
import { GameLayout } from '@/components/layout/GameLayout';
import { MemoryGameModule } from '@/games/memory/MemoryGameModule';

export const MemoryPage: React.FC = () => {
  return (
    <GameLayout
      title="MEMORY GAME"
      subtitle="Select a difficulty level, flip cards to find matching pairs, and clear the grid with minimum mistakes!"
      emoji="🧠"
      badge="Memory Grid Challenge"
      accentColor="purple"
    >
      <MemoryGameModule />
    </GameLayout>
  );
};
