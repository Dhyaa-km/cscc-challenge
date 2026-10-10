export type MemoryDifficulty = 'easy' | 'medium' | 'hard';

export type MemoryGameStatus = 'setup' | 'playing' | 'completed';

export interface MemoryPair {
  id: string;
  name: string;
  imageSrc: string;
}

export interface MemoryCard {
  id: string;
  pairId: string;
  pairName: string;
  imageSrc: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface DifficultyConfig {
  id: MemoryDifficulty;
  name: string;
  rows: number;
  cols: number;
  totalCards: number;
  pairs: number;
  badgeColor: 'emerald' | 'amber' | 'purple';
  description: string;
}

export interface MemoryResultData {
  difficulty: MemoryDifficulty;
  timeMs: number;
  timeFormatted: string;
  attempts: number;
  mistakes: number;
  score: number;
}
