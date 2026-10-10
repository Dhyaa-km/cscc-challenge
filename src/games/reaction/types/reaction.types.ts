export type ReactionGameState = 'idle' | 'waiting' | 'ready' | 'result' | 'false-start';

export interface ReactionRating {
  label: string;
  badgeColor: 'cyan' | 'emerald' | 'amber' | 'purple' | 'slate';
  description: string;
  emoji: string;
}

export interface ReactionResultData {
  timeMs: number;
  rating: ReactionRating;
  timestamp: number;
}

