export interface EventChallenge {
  id: string;
  title: string;
  description: string;
  tag: string;
  emoji: string;
}

export const EVENT_CHALLENGES: EventChallenge[] = [
  {
    id: 'new-friend',
    title: 'Networking Mission',
    description: 'Introduce yourself to a student you haven\'t met yet at the welcome day.',
    tag: 'Community',
    emoji: '🤝',
  },
  {
    id: 'Club-quiz',
    title: 'Club Lore Quiz',
    description: 'Ask any CDEC club member what the letters "CDEC" stand for.',
    tag: 'Club Lore',
    emoji: '🧠',
  },
  {
    id: 'project-ask',
    title: 'Inside Scoop',
    description: 'Ask a CDEC member about their favorite project and why.',
    tag: 'Discovery',
    emoji: '🚀',
  },
  {
    id: 'booth-photo',
    title: 'Booth Memory',
    description: 'Take a quick photo or selfie at the CDEC Welcome Day!',
    tag: 'Photo Quest',
    emoji: '📸',
  },
];

export function getRandomEventChallenge(): EventChallenge {
  const randomIndex = Math.floor(Math.random() * EVENT_CHALLENGES.length);
  return EVENT_CHALLENGES[randomIndex];
}

