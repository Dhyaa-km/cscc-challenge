import type {
  MemoryDifficulty,
  DifficultyConfig,
  MemoryPair,
  MemoryCard,
} from '../types/memory.types';

import backPackImg from '../assets/backPack.avif';
import birdImg from '../assets/bird.avif';
import butterflyImg from '../assets/butterfly.avif';
import cameraImg from '../assets/camera.avif';
import carrotImg from '../assets/carrot.avif';
import catImg from '../assets/cat.avif';
import dogImg from '../assets/dog.avif';
import foxImg from '../assets/fox.avif';
import gameControllerImg from '../assets/gameController.avif';
import guitarImg from '../assets/guitar.avif';
import headphonesImg from '../assets/headphones.avif';
import lemonImg from '../assets/lemon.avif';
import mushroomImg from '../assets/mushroom.avif';
import pandaImg from '../assets/panda.avif';
import strawberryImg from '../assets/strawberry.avif';
import sunFlowerImg from '../assets/sunFlower.avif';
import watchImg from '../assets/watch.avif';
import watermelonImg from '../assets/watermelon.avif';

export const DIFFICULTIES: Record<MemoryDifficulty, DifficultyConfig> = {
  easy: {
    id: 'easy',
    name: 'EASY',
    rows: 4,
    cols: 4,
    totalCards: 16,
    pairs: 8,
    badgeColor: 'emerald',
    description: '4 × 4 Grid • 8 Pairs • 8 Unique Images',
  },
  medium: {
    id: 'medium',
    name: 'MEDIUM',
    rows: 4,
    cols: 6,
    totalCards: 24,
    pairs: 12,
    badgeColor: 'amber',
    description: '4 × 6 Grid • 12 Pairs • 12 Unique Images',
  },
  hard: {
    id: 'hard',
    name: 'HARD',
    rows: 6,
    cols: 6,
    totalCards: 36,
    pairs: 18,
    badgeColor: 'purple',
    description: '6 × 6 Grid • 18 Pairs • 18 Unique Images',
  },
};

/**
 * 18 Unique Pairs mapping to the 18 local AVIF image assets.
 */
export const MEMORY_PAIRS_POOL: MemoryPair[] = [
  { id: 'dog', name: 'DOG', imageSrc: dogImg },
  { id: 'cat', name: 'CAT', imageSrc: catImg },
  { id: 'bird', name: 'BIRD', imageSrc: birdImg },
  { id: 'panda', name: 'PANDA', imageSrc: pandaImg },
  { id: 'fox', name: 'FOX', imageSrc: foxImg },
  { id: 'butterfly', name: 'BUTTERFLY', imageSrc: butterflyImg },
  { id: 'carrot', name: 'CARROT', imageSrc: carrotImg },
  { id: 'strawberry', name: 'STRAWBERRY', imageSrc: strawberryImg },
  { id: 'lemon', name: 'LEMON', imageSrc: lemonImg },
  { id: 'watermelon', name: 'WATERMELON', imageSrc: watermelonImg },
  { id: 'mushroom', name: 'MUSHROOM', imageSrc: mushroomImg },
  { id: 'sunFlower', name: 'SUNFLOWER', imageSrc: sunFlowerImg },
  { id: 'backpack', name: 'BACKPACK', imageSrc: backPackImg },
  { id: 'camera', name: 'CAMERA', imageSrc: cameraImg },
  { id: 'gameController', name: 'GAMEPAD', imageSrc: gameControllerImg },
  { id: 'guitar', name: 'GUITAR', imageSrc: guitarImg },
  { id: 'headphones', name: 'HEADPHONES', imageSrc: headphonesImg },
  { id: 'watch', name: 'WATCH', imageSrc: watchImg },
];

/**
 * Generates and shuffles cards for the requested difficulty.
 * Guaranteed: Exactly 2 cards per unique AVIF image.
 */
export function generateMemoryCards(difficulty: MemoryDifficulty): MemoryCard[] {
  const config = DIFFICULTIES[difficulty];
  const selectedPairs = MEMORY_PAIRS_POOL.slice(0, config.pairs);

  const cardList: MemoryCard[] = [];

  selectedPairs.forEach((pair) => {
    // Card A
    cardList.push({
      id: `card-${pair.id}-a`,
      pairId: pair.id,
      pairName: pair.name,
      imageSrc: pair.imageSrc,
      isFlipped: false,
      isMatched: false,
    });
    // Card B
    cardList.push({
      id: `card-${pair.id}-b`,
      pairId: pair.id,
      pairName: pair.name,
      imageSrc: pair.imageSrc,
      isFlipped: false,
      isMatched: false,
    });
  });

  // Fisher-Yates Shuffle
  for (let i = cardList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = cardList[i];
    cardList[i] = cardList[j];
    cardList[j] = temp;
  }

  return cardList;
}

/**
 * Calculates score between 100 and max score for difficulty.
 */
export function calculateMemoryScore(
  difficulty: MemoryDifficulty,
  timeMs: number,
  attempts: number,
  mistakes: number
): number {
  const difficultyMultiplier = {
    easy: 600,
    medium: 800,
    hard: 1000,
  }[difficulty];

  const timeSec = timeMs / 1000;
  const timePenalty = Math.round(timeSec * 4);
  const mistakePenalty = mistakes * 15;
  const attemptPenalty = Math.max(0, attempts - DIFFICULTIES[difficulty].pairs) * 5;

  const rawScore = difficultyMultiplier - timePenalty - mistakePenalty - attemptPenalty;
  return Math.max(100, Math.min(difficultyMultiplier, rawScore));
}

/**
 * Formats time in milliseconds to MM:SS format.
 */
export function formatMemoryTime(timeMs: number): string {
  const totalSeconds = Math.floor(timeMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const pad = (num: number) => num.toString().padStart(2, '0');
  return `${pad(minutes)}:${pad(seconds)}`;
}
