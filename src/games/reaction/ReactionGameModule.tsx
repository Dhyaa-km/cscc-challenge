import React from 'react';
import { useReactionGame } from './hooks/useReactionGame';
import { TrafficLight } from './components/TrafficLight';
import { ReactionTriggerArea } from './components/ReactionTriggerArea';
import { ReactionResult } from './components/ReactionResult';
import { ReactionBest } from './components/ReactionBest';

export const ReactionGameModule: React.FC = () => {
  const { gameState, result, bestScore, isNewRecord, startGame, handleTrigger } = useReactionGame();

  if (gameState === 'result' && result) {
    return (
      <ReactionResult
        result={result}
        bestScore={bestScore}
        isNewRecord={isNewRecord}
        onPlayAgain={startGame}
      />
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">

      <div className=" w-full flex justify-center mb-6">
        <ReactionBest bestScore={bestScore} />
      </div>

      <TrafficLight gameState={gameState} />
      
      <ReactionTriggerArea
        gameState={gameState}
        onTrigger={handleTrigger}
        onStart={startGame}
      />
      
    </div>
  );
};

