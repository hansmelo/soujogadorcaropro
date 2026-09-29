import React from 'react';
import { Trophy, ArrowRight } from 'lucide-react';

const links = [
  { href: '#como-funciona', label: 'Como Funciona' },
  { href: '#calculadora', label: 'Calculadora' },
  { href: '#recursos', label: 'Recursos' },
];

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const box = size === 'sm' ? 'w-7 h-7 rounded-lg' : 'w-8 h-8 sm:w-9 sm:h-9 rounded-xl';
  const icon = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const text = size === 'sm' ? 'text-lg' : 'text-[17px] sm:text-xl';
  return (
    <span className="flex items-center gap-2 sm:gap-2.5">
      <span className={`${box} bg-gradient-to-br from-gold-light via-gold to-gold-deep flex items-center justify-center shadow-[0_0_24px_-4px_rgba(242,193,78,0.6)]`}>
        <Trophy className={`${icon} text-gold-ink`} />
      </span>
      <span className={`font-display font-black ${text} tracking-tight text-white`}>
        SOUJOGADORCARO<span className="text-gold">.PRO</span>
      </span>
    </span>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-ink/70 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3.5 px-4 md:px-6">
        <a href="#" aria-label="Sou Jogador Caro PRO — início" className="transition-opacity hover:opacity-90">
          <Logo />
        </a>

        <nav className="flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden md:block px-3.5 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#calculadora"
            className="group ml-2 flex items-center gap-1.5 px-3 sm:px-4 py-2 text-[13px] sm:text-sm font-bold whitespace-nowrap rounded-lg bg-gold text-gold-ink hover:bg-gold-light transition-colors"
          >
            Começar Grátis
            <ArrowRight className="hidden sm:block w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </nav>
      </div>
    </header>
  );
}
