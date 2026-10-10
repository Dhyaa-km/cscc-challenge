import React, { useEffect, useRef } from 'react';
import type { EventChallenge } from '@/data/eventChallenges';
import { Badge } from '@/components/ui/Badge';
import { GameButton } from '@/components/ui/GameButton';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';

interface EventChallengeModalProps {
  challenge: EventChallenge;
  onClose: () => void;
}

export const EventChallengeModal: React.FC<EventChallengeModalProps> = ({ challenge, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.5)' }
      );
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="relative bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-500/60 rounded-3xl p-8 max-w-md w-full text-center shadow-[0_0_50px_rgba(245,158,11,0.4)] glow-amber"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-500/40 text-amber-400 mb-6 text-4xl shadow-inner">
          {challenge.emoji}
        </div>

        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <Badge variant="amber">{challenge.tag}</Badge>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black font-display text-white mb-3 tracking-tight">
          PUZZLE CHALLENGE
        </h3>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 mb-6 shadow-inner">
          <h4 className="font-display font-bold text-base text-amber-400 mb-2">
            {challenge.title}
          </h4>
          <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed font-medium">
            "{challenge.description}"
          </p>
        </div>

        <p className="text-xs font-mono text-slate-400 mb-6">
          Complete this fun mission right now at the CSCC Welcome Day booth!
        </p>

        <GameButton onClick={onClose} variant="amber" size="lg" icon={<CheckCircle2 className="w-5 h-5" />}>
          GOT IT!
        </GameButton>
      </div>
    </div>
  );
};

