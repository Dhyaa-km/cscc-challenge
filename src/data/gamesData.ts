export interface GameInfo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  emoji: string;
  path: string;
  accentColor: 'cyan' | 'amber' | 'purple';
  badge: string;
  statsLabel: string;
  theme: {
    bgGlow: string;
    borderHover: string;
    textGlow: string;
    badgeBg: string;
    badgeText: string;
    buttonGradient: string;
  };
}

export const GAMES_DATA: GameInfo[] = [
  {
    id: 'reaction',
    title: 'REACTION',
    subtitle: 'Traffic Light Speed Test',
    description: 'Test your raw reflexes! Wait for the signal to turn green and hit the trigger as fast as humanly possible.',
    iconName: 'Zap',
    emoji: '🚦',
    path: '/reaction',
    accentColor: 'cyan',
    badge: 'Reflex Test',
    statsLabel: 'Precision Timer (ms)',
    theme: {
      bgGlow: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:border-cyan-500/50',
      borderHover: 'border-cyan-500/30 group-hover:border-cyan-400',
      textGlow: 'group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]',
      badgeBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
      badgeText: 'text-cyan-400',
      buttonGradient: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20',
    },
  },
  {
    id: 'puzzle',
    title: 'IMAGE PUZZLE',
    subtitle: 'Visual Reconstruction & Event Quest',
    description: 'Rebuild the scrambled visual piece by piece. Completing it unlocks an interactive physical event challenge at the CSCC booth!',
    iconName: 'Puzzle',
    emoji: '🧩',
    path: '/puzzle',
    accentColor: 'amber',
    badge: 'Visual & Quest',
    statsLabel: 'Completion Time',
    theme: {
      bgGlow: 'hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] hover:border-amber-500/50',
      borderHover: 'border-amber-500/30 group-hover:border-amber-400',
      textGlow: 'group-hover:text-amber-400 group-hover:drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]',
      badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
      badgeText: 'text-amber-400',
      buttonGradient: 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20',
    },
  },
  {
    id: 'memory',
    title: 'MEMORY',
    subtitle: 'Card Matching Challenge',
    description: 'Match all pair tiles before running out of mistake lives. Choose between 3 difficulty levels: Easy, Medium, or Hard.',
    iconName: 'BrainCircuit',
    emoji: '🧠',
    path: '/memory',
    accentColor: 'purple',
    badge: 'Memory Grid',
    statsLabel: '3 Difficulty Tiers',
    theme: {
      bgGlow: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:border-purple-500/50',
      borderHover: 'border-purple-500/30 group-hover:border-purple-400',
      textGlow: 'group-hover:text-purple-400 group-hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]',
      badgeBg: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
      badgeText: 'text-purple-400',
      buttonGradient: 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-slate-950 font-bold shadow-lg shadow-purple-500/20',
    },
  },
];

