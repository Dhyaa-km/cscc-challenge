import { useState, useRef, useEffect, useCallback } from 'react';
import type { ReactionGameState, ReactionResultData } from '../types/reaction.types';
import { MIN_DELAY, MAX_DELAY, getReactionRating } from '../logic/reactionConstants';

const BEST_SCORE_STORAGE_KEY = 'cscc-challenge-reaction-best';

function loadBestScore(): number | null {
  try {
    if (typeof window === 'undefined') return null;
    const storedScore = window.localStorage.getItem(BEST_SCORE_STORAGE_KEY);
    if (storedScore === null) return null;

    const parsedScore = Number(storedScore);
    return Number.isFinite(parsedScore) && parsedScore > 0 && Number.isInteger(parsedScore)
      ? parsedScore
      : null;
  } catch {
    return null;
  }
}

export function useReactionGame() {
  const [gameState, setGameState] = useState<ReactionGameState>('idle');
  const [result, setResult] = useState<ReactionResultData | null>(null);
  const [bestScore, setBestScore] = useState<number | null>(loadBestScore);
  const bestScoreRef = useRef<number | null>(bestScore);
  const [isNewRecord, setIsNewRecord] = useState(false);

  const greenTimestampRef = useRef<number | null>(null);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasClickedRef = useRef<boolean>(false);

  // Clean up any pending timer safely
  const clearPendingTimer = useCallback(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearPendingTimer();
    };
  }, [clearPendingTimer]);

  // Start a new game attempt
  const startGame = useCallback(() => {
    clearPendingTimer();
    hasClickedRef.current = false;
    greenTimestampRef.current = null;
    setResult(null);
    setIsNewRecord(false);

    // Set state to waiting (RED lights on)
    setGameState('waiting');

    // Generate random delay between MIN_DELAY and MAX_DELAY
    const randomDelay = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY;

    timeoutIdRef.current = setTimeout(() => {
      // Transition to ready (GREEN lights on)
      greenTimestampRef.current = performance.now();
      setGameState('ready');
    }, randomDelay);
  }, [clearPendingTimer]);

  // Handle user click / trigger action
  const handleTrigger = useCallback(() => {
    // If game hasn't started yet, clicking starts it
    if (gameState === 'idle') {
      startGame();
      return;
    }

    // If player clicks while waiting (RED lights), false start!
    if (gameState === 'waiting') {
      clearPendingTimer();
      setGameState('false-start');
      return;
    }

    // If player clicks when ready (GREEN lights), record timing!
    if (gameState === 'ready' && !hasClickedRef.current && greenTimestampRef.current !== null) {
      hasClickedRef.current = true;
      const clickTime = performance.now();
      const measuredMs = Math.max(1, Math.round(clickTime - greenTimestampRef.current));
      
      const rating = getReactionRating(measuredMs);
      const resultData: ReactionResultData = {
        timeMs: measuredMs,
        rating,
        timestamp: Date.now(),
      };

      const newRecord = bestScoreRef.current === null || measuredMs < bestScoreRef.current;
      if (newRecord) {
        bestScoreRef.current = measuredMs;
        setBestScore(measuredMs);
        try {
          window.localStorage.setItem(BEST_SCORE_STORAGE_KEY, String(measuredMs));
        } catch {
          // The current-session score remains available if browser storage is unavailable.
        }
      }

      setIsNewRecord(newRecord);
      setResult(resultData);
      setGameState('result');
    }
  }, [gameState, startGame, clearPendingTimer]);

  // Reset to idle state
  const resetGame = useCallback(() => {
    clearPendingTimer();
    hasClickedRef.current = false;
    greenTimestampRef.current = null;
    setResult(null);
    setIsNewRecord(false);
    setGameState('idle');
  }, [clearPendingTimer]);

  return {
    gameState,
    result,
    bestScore,
    isNewRecord,
    startGame,
    handleTrigger,
    resetGame,
  };
}

