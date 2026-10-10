import type { PuzzleTile } from '../types/puzzle.types';

export const GRID_SIZE = 4;
export const TOTAL_TILES = GRID_SIZE * GRID_SIZE; // 16 tiles

/**
 * Creates initial ordered set of tiles (solved state).
 */
export function createInitialTiles(): PuzzleTile[] {
  const tiles: PuzzleTile[] = [];
  for (let i = 0; i < TOTAL_TILES; i++) {
    tiles.push({
      id: i,
      correctIndex: i,
      currentIndex: i,
    });
  }
  return tiles;
}

/**
 * Checks if all tiles are in their correct target positions.
 */
export function isSolved(tiles: PuzzleTile[]): boolean {
  return tiles.every((tile) => tile.currentIndex === tile.correctIndex);
}

/**
 * Shuffles tiles using Fisher-Yates algorithm.
 * Guarantees the resulting board is NOT already solved.
 */
export function shuffleTiles(tiles: PuzzleTile[]): PuzzleTile[] {
  let shuffled = [...tiles];
  let isAlreadySolved = true;

  while (isAlreadySolved) {
    // Fisher-Yates Shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }

    // Re-assign currentIndex based on new array order
    shuffled = shuffled.map((tile, index) => ({
      ...tile,
      currentIndex: index,
    }));

    if (!isSolved(shuffled)) {
      isAlreadySolved = false;
    }
  }

  return shuffled;
}

/**
 * Swaps two tiles in the board array and returns a fresh copy.
 */
export function swapTiles(tiles: PuzzleTile[], indexA: number, indexB: number): PuzzleTile[] {
  if (indexA === indexB || indexA < 0 || indexB < 0 || indexA >= tiles.length || indexB >= tiles.length) {
    return tiles;
  }

  const newTiles = [...tiles];
  const tileA = newTiles[indexA];
  const tileB = newTiles[indexB];

  newTiles[indexA] = { ...tileB, currentIndex: indexA };
  newTiles[indexB] = { ...tileA, currentIndex: indexB };

  return newTiles;
}

/**
 * Calculates a fair, deterministic score between 100 and 1000.
 */
export function calculatePuzzleScore(timeMs: number, moves: number): number {
  const timeSec = timeMs / 1000;
  const timePenalty = Math.round(timeSec * 5); // 5 points per second
  const movePenalty = moves * 12;             // 12 points per swap move

  const rawScore = 1000 - timePenalty - movePenalty;
  return Math.max(100, Math.min(1000, rawScore));
}

/**
 * Formats time in milliseconds to MM:SS format.
 */
export function formatPuzzleTime(timeMs: number): string {
  const totalSeconds = Math.floor(timeMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const pad = (num: number) => num.toString().padStart(2, '0');
  return `${pad(minutes)}:${pad(seconds)}`;
}

