import type { EventChallenge } from '@/data/eventChallenges';

export type PuzzleGameState = 'idle' | 'playing' | 'completed';

export interface PuzzleTile {
  id: number;
  correctIndex: number;
  currentIndex: number;
}

export interface PuzzleResultData {
  timeMs: number;
  timeFormatted: string;
  moves: number;
  score: number;
  eventChallenge: EventChallenge;
}

