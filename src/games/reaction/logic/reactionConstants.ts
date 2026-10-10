import type { ReactionRating } from '../types/reaction.types';

export const MIN_DELAY = 1500; // 1.5 seconds
export const MAX_DELAY = 4000; // 4.0 seconds

export function getReactionRating(timeMs: number): ReactionRating {
  if (timeMs < 200) {
    return {
      label: 'LIGHTNING FAST',
      badgeColor: 'cyan',
      description: 'Incredible! Pro gamer reflexes detected!',
      emoji: '⚡',
    };
  }
  if (timeMs < 250) {
    return {
      label: 'EXCELLENT',
      badgeColor: 'emerald',
      description: 'Outstanding reaction speed! CSCC Champion tier.',
      emoji: '🔥',
    };
  }
  if (timeMs < 300) {
    return {
      label: 'GREAT REFLEXES',
      badgeColor: 'amber',
      description: 'Faster than average! Great job.',
      emoji: '🚀',
    };
  }
  if (timeMs < 400) {
    return {
      label: 'GOOD SPEED',
      badgeColor: 'purple',
      description: 'Solid reaction time. Keep practicing!',
      emoji: '👍',
    };
  }
  return {
    label: 'KEEP PRACTICING',
    badgeColor: 'slate',
    description: 'A bit slow this time! Try again for a faster result.',
    emoji: '🎯',
  };
}

