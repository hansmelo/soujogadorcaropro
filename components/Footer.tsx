import React from 'react';
import { Logo } from './Header';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 py-10 px-4 md:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Logo size="sm" />

        <nav className="flex items-center gap-6 text-sm text-slate-500">
          <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          <a href="#" className="hover:text-white transition-colors">Contato</a>
        </nav>

        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} soujogadorcaro.pro
        </p>
      </div>
    </footer>
  );
}
