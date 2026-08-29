import React from 'react';
import { Trophy } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center py-4 px-6 md:px-12 border-b border-slate-100 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
      <a href="#" className="flex items-center gap-2.5 group">
        <div className="w-8 h-8 rounded-lg bg-[var(--color-brasil-green)] flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
          <Trophy className="w-4 h-4 text-white" />
        </div>
        <span className="font-extrabold text-lg tracking-tight text-slate-800">
          SOUJOGADORCARO<span className="text-[var(--color-brasil-green)]">.PRO</span>
        </span>
      </a>

      <nav className="flex items-center gap-6">
        <a href="#como-funciona" className="hidden md:block text-sm text-slate-500 hover:text-slate-800 transition-colors">
          Como Funciona
        </a>
        <a href="#calculadora" className="hidden md:block text-sm text-slate-500 hover:text-slate-800 transition-colors">
          Calculadora
        </a>
        <a href="#recursos" className="hidden md:block text-sm text-slate-500 hover:text-slate-800 transition-colors">
          Recursos
        </a>
        <a
          href="#cta"
          className="px-5 py-2 text-sm font-semibold rounded-lg bg-[var(--color-brasil-green)] text-white hover:bg-[var(--color-brasil-green-dark)] transition-colors shadow-sm"
        >
          Começar Grátis
        </a>
      </nav>
    </header>
  );
}
