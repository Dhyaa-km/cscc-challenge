import { useState, useRef, useEffect, useCallback } from 'react';
import type {
  MemoryDifficulty,
  MemoryGameStatus,
  MemoryCard,
  MemoryResultData,
} from '../types/memory.types';
import {
  DIFFICULTIES,
  generateMemoryCards,
  calculateMemoryScore,
  formatMemoryTime,
} from '../logic/memoryLogic';

export function useMemoryGame() {
  const [difficulty, setDifficulty] = useState<MemoryDifficulty>('easy');
  const [gameStatus, setGameStatus] = useState<MemoryGameStatus>('setup');
  const [cards, setCards] = useState<MemoryCard[]>([]);

  const [firstSelectedCard, setFirstSelectedCard] = useState<MemoryCard | null>(null);
  const [isResolving, setIsResolving] = useState<boolean>(false);

  const [attempts, setAttempts] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);

  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [result, setResult] = useState<MemoryResultData | null>(null);

  const startTimeRef = useRef<number | null>(null);
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mismatchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear timers safely
  const stopTimers = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    if (mismatchTimeoutRef.current) {
      clearTimeout(mismatchTimeoutRef.current);
      mismatchTimeoutRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTimers();
    };
  }, [stopTimers]);

  // Start game with specified or current difficulty
  const startGame = useCallback(
    (targetDifficulty?: MemoryDifficulty) => {
      stopTimers();

      const selectedDiff = targetDifficulty || difficulty;
      if (targetDifficulty) {
        setDifficulty(targetDifficulty);
      }

      const freshCards = generateMemoryCards(selectedDiff);
      setCards(freshCards);
      setFirstSelectedCard(null);
      setIsResolving(false);
      setAttempts(0);
      setMistakes(0);
      setMatchedPairs(0);
      setElapsedMs(0);
      setResult(null);

      startTimeRef.current = performance.now();
      setGameStatus('playing');

      // Live timer tick every 100ms
      intervalIdRef.current = setInterval(() => {
        if (startTimeRef.current !== null) {
          setElapsedMs(performance.now() - startTimeRef.current);
        }
      }, 100);
    },
    [difficulty, stopTimers]
  );

  // Switch difficulty tier
  const selectDifficulty = useCallback(
    (newDiff: MemoryDifficulty) => {
      stopTimers();
      setDifficulty(newDiff);
      setGameStatus('setup');
      setCards([]);
      setResult(null);
    },
    [stopTimers]
  );

  // Handle Card Click
  const handleCardClick = useCallback(
    (clickedCard: MemoryCard) => {
      // Guard clauses: input locked, card already flipped/matched, or game not active
      if (
        gameStatus !== 'playing' ||
        isResolving ||
        clickedCard.isFlipped ||
        clickedCard.isMatched
      ) {
        return;
      }

      // Flip the clicked card immediately
      setCards((prevCards) =>
        prevCards.map((c) => (c.id === clickedCard.id ? { ...c, isFlipped: true } : c))
      );

      // Case 1: First card selection
      if (!firstSelectedCard) {
        setFirstSelectedCard(clickedCard);
        return;
      }

      // Case 2: Second card selection
      if (firstSelectedCard && clickedCard.id !== firstSelectedCard.id) {
        setAttempts((prev) => prev + 1);
        setIsResolving(true); // LOCK INPUT

        // Check if cards match
        if (firstSelectedCard.pairId === clickedCard.pairId) {
          // MATCH SUCCESS!
          setCards((prevCards) =>
            prevCards.map((c) =>
              c.pairId === clickedCard.pairId ? { ...c, isFlipped: true, isMatched: true } : c
            )
          );

          setFirstSelectedCard(null);
          setIsResolving(false);

          const newMatchedCount = matchedPairs + 1;
          setMatchedPairs(newMatchedCount);

          // Check for Victory (All pairs matched)
          if (newMatchedCount === DIFFICULTIES[difficulty].pairs) {
            stopTimers();
            const finalTimeMs = startTimeRef.current
              ? Math.round(performance.now() - startTimeRef.current)
              : elapsedMs;
            setElapsedMs(finalTimeMs);

            const score = calculateMemoryScore(difficulty, finalTimeMs, attempts + 1, mistakes);

            const resultData: MemoryResultData = {
              difficulty,
              timeMs: finalTimeMs,
              timeFormatted: formatMemoryTime(finalTimeMs),
              attempts: attempts + 1,
              mistakes,
              score,
            };

            setResult(resultData);
            setGameStatus('completed');
          }
        } else {
          // MISMATCH!
          setMistakes((prev) => prev + 1);

          // Keep both visible for 950ms so player clearly recognizes both images!
          mismatchTimeoutRef.current = setTimeout(() => {
            setCards((prevCards) =>
              prevCards.map((c) =>
                c.id === firstSelectedCard.id || c.id === clickedCard.id
                  ? { ...c, isFlipped: false }
                  : c
              )
            );
            setFirstSelectedCard(null);
            setIsResolving(false); // UNLOCK INPUT
          }, 950);
        }
      }
    },
    [
      gameStatus,
      isResolving,
      firstSelectedCard,
      matchedPairs,
      difficulty,
      attempts,
      mistakes,
      elapsedMs,
      stopTimers,
    ]
  );

  return {
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
  };
}
