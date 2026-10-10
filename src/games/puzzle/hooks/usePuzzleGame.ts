import { useState, useRef, useEffect, useCallback } from 'react';
import type { PuzzleGameState, PuzzleTile, PuzzleResultData } from '../types/puzzle.types';
import {
  createInitialTiles,
  shuffleTiles,
  swapTiles,
  isSolved,
  calculatePuzzleScore,
  formatPuzzleTime,
} from '../logic/puzzleLogic';
import { getRandomEventChallenge } from '@/data/eventChallenges';

export function usePuzzleGame() {
  const [gameState, setGameState] = useState<PuzzleGameState>('idle');
  const [tiles, setTiles] = useState<PuzzleTile[]>(createInitialTiles);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [moves, setMoves] = useState<number>(0);
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [result, setResult] = useState<PuzzleResultData | null>(null);

  const startTimeRef = useRef<number | null>(null);
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Stop timer safely
  const stopTimer = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, [stopTimer]);

  // Start a new puzzle attempt
  const startPuzzle = useCallback(() => {
    stopTimer();
    const shuffled = shuffleTiles(createInitialTiles());
    setTiles(shuffled);
    setSelectedIndex(null);
    setMoves(0);
    setElapsedMs(0);
    setResult(null);

    startTimeRef.current = performance.now();
    setGameState('playing');

    // Update displayed time counter every 100ms
    intervalIdRef.current = setInterval(() => {
      if (startTimeRef.current !== null) {
        setElapsedMs(performance.now() - startTimeRef.current);
      }
    }, 100);
  }, [stopTimer]);

  // Handle clicking a tile to select or swap
  const handleTileClick = useCallback(
    (clickedIndex: number) => {
      // Auto-start on first tile click if idle
      if (gameState === 'idle') {
        startPuzzle();
        return;
      }

      if (gameState !== 'playing') return;

      // Case 1: First tile selection
      if (selectedIndex === null) {
        setSelectedIndex(clickedIndex);
        return;
      }

      // Case 2: Clicked the same tile again -> Deselect
      if (selectedIndex === clickedIndex) {
        setSelectedIndex(null);
        return;
      }

      // Case 3: Clicked a second tile -> Perform Swap
      const updatedTiles = swapTiles(tiles, selectedIndex, clickedIndex);
      setTiles(updatedTiles);
      setMoves((prev) => prev + 1);
      setSelectedIndex(null);

      // Check for victory/completion
      if (isSolved(updatedTiles)) {
        stopTimer();
        const finalTimeMs = startTimeRef.current ? Math.round(performance.now() - startTimeRef.current) : elapsedMs;
        setElapsedMs(finalTimeMs);

        const score = calculatePuzzleScore(finalTimeMs, moves + 1);
        const challenge = getRandomEventChallenge();

        const resultData: PuzzleResultData = {
          timeMs: finalTimeMs,
          timeFormatted: formatPuzzleTime(finalTimeMs),
          moves: moves + 1,
          score,
          eventChallenge: challenge,
        };

        setResult(resultData);
        setGameState('completed');
      }
    },
    [gameState, selectedIndex, tiles, moves, elapsedMs, startPuzzle, stopTimer]
  );

  return {
    gameState,
    tiles,
    selectedIndex,
    moves,
    elapsedMs,
    result,
    startPuzzle,
    handleTileClick,
  };
}

