import React, { useEffect, useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GameCard } from '@/components/ui/GameCard';
import { GAMES_DATA } from '@/data/gamesData';
import { Hero3D } from '@/components/hero/Hero3D';
import { Sparkles, Trophy, Flame } from 'lucide-react';
import gsap from 'gsap';

export const Home: React.FC = () => {
  const heroTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroTextRef.current) {
      gsap.fromTo(
        heroTextRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 bg-cyber-grid relative overflow-x-hidden">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col justify-between">
        
        {/* Hero Section */}
        <section className="text-center mb-8 sm:mb-12">
          <Hero3D />

          <div ref={heroTextRef} className="max-w-3xl mx-auto mt-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-mono font-medium text-cyan-400 mb-6 shadow-inner">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>CSCC Welcome Day Interactive Arcade</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-white mb-4">
              CSCC <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">CHALLENGE</span>
            </h1>

            <p className="text-lg sm:text-2xl font-mono font-extrabold uppercase tracking-wide text-cyan-400 mb-4">
              CHOOSE YOUR CHALLENGE
            </p>

            <p className="text-sm sm:text-base text-slate-400 font-sans max-w-2xl mx-auto leading-relaxed">
              Welcome to the CSCC booth! Select any of our 3 interactive arcade challenges below. Test your reflexes, reconstruct visual puzzles, or challenge your memory grid!
            </p>
          </div>
        </section>

        {/* 3 Game Selection Cards Grid */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {GAMES_DATA.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </div>
        </section>

        {/* Event Quick Info Banner */}
        <section className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 backdrop-blur-md mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Trophy className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-white">
                  Physical Event Quests & Real-World Challenges
                </h4>
                <p className="text-xs text-slate-400 font-sans mt-1">
                  Complete challenges to unlock real-world event missions at the CSCC booth!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-slate-400 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Instant Gameplay • Free to Play</span>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

