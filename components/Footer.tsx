import React from 'react';
import { Trophy } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.06] py-10 px-6 md:px-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-amber-500 flex items-center justify-center">
            <Trophy className="w-3 h-3 text-slate-950" />
          </div>
          <span className="text-sm font-bold tracking-tight text-slate-400">
            SOUJOGADORCARO<span className="text-amber-500">.PRO</span>
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-600">
          <a href="#" className="hover:text-slate-400 transition-colors">Termos de Uso</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Privacidade</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Contato</a>
        </div>

        <p className="text-xs text-slate-700">
          &copy; 2025 soujogadorcaro.pro
        </p>
      </div>
    </footer>
  );
}
