import React, { useState } from 'react';
import { usePuzzleGame } from './hooks/usePuzzleGame';
import { PuzzleStats } from './components/PuzzleStats';
import { PuzzleBoard } from './components/PuzzleBoard';
import { PuzzleResult } from './components/PuzzleResult';
import { EventChallengeModal } from './components/EventChallengeModal';
import { GameButton } from '@/components/ui/GameButton';
import { Play } from 'lucide-react';
import puzzleImage from './assets/cdec.png';

export const PuzzleGameModule: React.FC = () => {
  const {
    gameState,
    tiles,
    selectedIndex,
    moves,
    elapsedMs,
    result,
    startPuzzle,
    handleTileClick,
  } = usePuzzleGame();

  const [showChallengeModal, setShowChallengeModal] = useState<boolean>(false);

  const imageSrc = puzzleImage;

  // Open modal on completion
  React.useEffect(() => {
    if (gameState === 'completed' && result) {
      setShowChallengeModal(true);
    }
  }, [gameState, result]);

  if (gameState === 'idle') {
    return (
      <div className="w-full max-w-xl bg-slate-900/80 border border-slate-800 rounded-3xl p-8 text-center backdrop-blur-xl glow-amber">
        <div className="w-48 h-48 mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-xl">
          <img src={imageSrc} alt="CSCC Target Artwork" className="w-full h-full object-cover" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black font-display text-white mb-2">
          REBUILD THE IMAGE
        </h2>

        <p className="text-sm text-slate-300 font-sans max-w-md mx-auto mb-8 leading-relaxed">
          Tap two tiles to swap their positions. Reconstruct the CDEC visual puzzle to unlock your physical welcome day event challenge!
        </p>

        <GameButton
          onClick={startPuzzle}
          variant="amber"
          size="lg"
          icon={<Play className="w-5 h-5 fill-slate-950" />}
        >
          START PUZZLE
        </GameButton>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {gameState === 'completed' && result ? (
        <PuzzleResult
          result={result}
          onPlayAgain={startPuzzle}
          onViewChallenge={() => setShowChallengeModal(true)}
        />
      ) : (
        <>
          <PuzzleStats moves={moves} elapsedMs={elapsedMs} imageSrc={imageSrc} />

          <PuzzleBoard
            tiles={tiles}
            selectedIndex={selectedIndex}
            isDisabled={gameState !== 'playing'}
            onTileClick={handleTileClick}
            imageSrc={imageSrc}
          />
        </>
      )}

      {/* Event Quest Challenge Modal */}
      {showChallengeModal && result && (
        <EventChallengeModal
          challenge={result.eventChallenge}
          onClose={() => setShowChallengeModal(false)}
        />
      )}
    </div>
  );
};

