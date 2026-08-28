import React from 'react';
import { Trophy } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center py-4 px-6 md:px-12 border-b border-white/5 bg-slate-950/60 backdrop-blur-xl sticky top-0 z-50">
      <a href="#" className="flex items-center gap-2.5 group">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.3)] group-hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-shadow">
          <Trophy className="w-4 h-4 text-slate-950" />
        </div>
        <span className="font-extrabold text-lg tracking-tight">
          SOUJOGADORCARO<span className="text-amber-500">.PRO</span>
        </span>
      </a>

      <nav className="flex items-center gap-6">
        <a href="#como-funciona" className="hidden md:block text-sm text-slate-400 hover:text-slate-200 transition-colors">
          Como Funciona
        </a>
        <a href="#calculadora" className="hidden md:block text-sm text-slate-400 hover:text-slate-200 transition-colors">
          Calculadora
        </a>
        <a href="#recursos" className="hidden md:block text-sm text-slate-400 hover:text-slate-200 transition-colors">
          Recursos
        </a>
        <a
          href="#cta"
          className="px-5 py-2 text-sm font-semibold rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors"
        >
          Começar Grátis
        </a>
      </nav>
    </header>
  );
}
