import React from 'react';
import { useMemoryGame } from './hooks/useMemoryGame';
import { MemoryDifficulty } from './components/MemoryDifficulty';
import { MemoryStats } from './components/MemoryStats';
import { MemoryBoard } from './components/MemoryBoard';
import { MemoryResult } from './components/MemoryResult';

export const MemoryGameModule: React.FC = () => {
  const {
    difficulty,
    gameStatus,
    cards,
    attempts,
    mistakes,
    matchedPairs,
    elapsedMs,
    result,
    selectDifficulty,
    startGame,
    handleCardClick,
  } = useMemoryGame();

  if (gameStatus === 'setup') {
    return (
      <MemoryDifficulty
        selectedDifficulty={difficulty}
        onSelectDifficulty={selectDifficulty}
        onStartGame={() => startGame(difficulty)}
      />
    );
  }

  if (gameStatus === 'completed' && result) {
    return (
      <MemoryResult
        result={result}
        onPlayAgain={() => startGame(difficulty)}
        onChangeDifficulty={() => selectDifficulty(difficulty)}
      />
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <MemoryStats
        difficulty={difficulty}
        attempts={attempts}
        mistakes={mistakes}
        matchedPairs={matchedPairs}
        elapsedMs={elapsedMs}
        onChangeDifficulty={() => selectDifficulty(difficulty)}
      />

      <MemoryBoard
        cards={cards}
        difficulty={difficulty}
        onCardClick={handleCardClick}
        isDisabled={gameStatus !== 'playing'}
      />
    </div>
  );
};

