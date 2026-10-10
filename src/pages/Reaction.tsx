import React from 'react';
import { GameLayout } from '@/components/layout/GameLayout';
import { ReactionGameModule } from '@/games/reaction/ReactionGameModule';

export const ReactionPage: React.FC = () => {
  return (
    <GameLayout
      title="REACTION GAME"
      subtitle="Test your raw reflexes! Wait for the traffic lights to turn GREEN and hit the pad as fast as possible."
      emoji="🚦"
      badge="Reflex Challenge"
      accentColor="cyan"
    >
      <ReactionGameModule />
    </GameLayout>
  );
};
