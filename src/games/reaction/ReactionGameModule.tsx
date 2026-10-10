import React from 'react';
import { useReactionGame } from './hooks/useReactionGame';
import { TrafficLight } from './components/TrafficLight';
import { ReactionTriggerArea } from './components/ReactionTriggerArea';
import { ReactionResult } from './components/ReactionResult';

export const ReactionGameModule: React.FC = () => {
  const { gameState, result, startGame, handleTrigger } = useReactionGame();

  if (gameState === 'result' && result) {
    return <ReactionResult result={result} onPlayAgain={startGame} />;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <TrafficLight gameState={gameState} />
      
      <ReactionTriggerArea
        gameState={gameState}
        onTrigger={handleTrigger}
        onStart={startGame}
      />
    </div>
  );
};

