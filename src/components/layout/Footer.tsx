import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950 py-8 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div>
          <p className="font-display font-bold text-sm text-slate-300">
            CDEC CHALLENGE
          </p>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Built for CDEC Welcome Day Event 26/27 • Interactive Arcade Experience
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
            No Account Needed
          </span>
       
        </div>
      </div>
    </footer>
  );
};

