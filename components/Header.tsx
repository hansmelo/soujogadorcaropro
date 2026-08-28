import React from 'react';
import { Trophy, Zap } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center py-5 px-6 md:px-12 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.4)]">
          <Trophy className="w-5 h-5 text-slate-950" />
        </div>
        <div className="font-extrabold text-xl md:text-2xl tracking-tight">
          SOUJOGADORCARO<span className="text-amber-500">.PRO</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
          <Zap className="w-3.5 h-3.5" /> Mídia Kit de Futebol
        </span>
        <button className="px-5 py-2 text-sm font-semibold rounded-full bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800 transition-all text-slate-200 shadow-sm">
          Entrar em Campo
        </button>
      </div>
    </header>
  );
}
