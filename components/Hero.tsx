import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full flex flex-col items-center text-center px-4 pt-20 pb-28 md:pt-32 md:pb-36 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Ambient background glow */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-[var(--color-gold)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-64 h-64 bg-[var(--color-navy)]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Live badge */}
      <div className="relative flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 mb-8">
        <span className="w-2 h-2 rounded-full bg-[var(--color-gold)] animate-live-pulse" />
        <span className="text-xs font-medium text-amber-900">
          +1.200 atletas já criaram seu Mídia Kit
        </span>
      </div>

      {/* Headline */}
      <h1 className="relative text-4xl sm:text-5xl md:text-7xl font-black tracking-tight max-w-4xl leading-[1.08] mb-6 text-[var(--color-navy)]">
        Seu Mídia Kit de Futebol.{' '}
        <span className="text-[var(--color-gold)]">
          Seu Próximo Patrocínio.
        </span>
      </h1>

      {/* Subheadline */}
      <p className="relative text-base md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
        Crie uma página profissional com seus dados de engajamento, conecte suas redes e receba propostas de marcas locais — tudo em menos de 2 minutos.
      </p>

      {/* CTA Buttons */}
      <div className="relative flex flex-col sm:flex-row gap-3 items-center justify-center w-full max-w-md sm:max-w-none mb-16">
        <a
          href="#cta"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 font-bold text-white bg-[var(--color-gold)] rounded-xl hover:bg-[var(--color-gold-hover)] transition-all group shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30"
        >
          Criar Meu Mídia Kit — Grátis
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </a>
        <a
          href="#como-funciona"
          className="w-full sm:w-auto px-8 py-4 font-semibold rounded-xl border border-[var(--color-navy)] text-[var(--color-navy)] hover:bg-[var(--color-navy)]/5 transition-all text-center"
        >
          Como funciona?
        </a>
      </div>

      {/* Social proof strip */}
      <div className="relative flex flex-col sm:flex-row items-center gap-3 text-sm text-slate-500">
        <div className="flex -space-x-2">
          {['⚽', '🥅', '🏆', '⭐', '🎯'].map((emoji, i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs shadow-sm">
              {emoji}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[var(--color-gold)] text-[var(--color-gold)]" />
            ))}
          </div>
          <span className="ml-1 text-slate-600">
            Avaliado por <span className="text-[var(--color-navy)] font-medium">atletas de 18 estados</span>
          </span>
        </div>
      </div>
    </section>
  );
}
