import React from 'react';
import { Trophy } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-100 py-10 px-6 md:px-12 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[var(--color-gold)] flex items-center justify-center">
            <Trophy className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-bold tracking-tight text-[var(--color-navy)]">
            SOUJOGADORCARO<span className="text-[var(--color-gold)]">.PRO</span>
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-400">
          <a href="#" className="hover:text-[var(--color-navy)] transition-colors">Termos de Uso</a>
          <a href="#" className="hover:text-[var(--color-navy)] transition-colors">Privacidade</a>
          <a href="#" className="hover:text-[var(--color-navy)] transition-colors">Contato</a>
        </div>

        <p className="text-xs text-slate-400">
          &copy; 2025 soujogadorcaro.pro
        </p>
      </div>
    </footer>
  );
}
