import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full flex flex-col items-center text-center px-4 pt-20 pb-28 md:pt-32 md:pb-36 overflow-hidden bg-gradient-to-b from-white via-emerald-50/40 to-white">
      {/* Subtle accent shapes */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-[var(--color-brasil-yellow)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-64 h-64 bg-[var(--color-brasil-green)]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-96 h-40 bg-[var(--color-brasil-blue)]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Live badge */}
      <div className="relative flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-8">
        <span className="w-2 h-2 rounded-full bg-[var(--color-brasil-green)] animate-live-pulse" />
        <span className="text-xs font-medium text-emerald-700">
          +1.200 atletas já criaram seu Mídia Kit
        </span>
      </div>

      {/* Headline */}
      <h1 className="relative text-4xl sm:text-5xl md:text-7xl font-black tracking-tight max-w-4xl leading-[1.08] mb-6 text-slate-900">
        Seu Mídia Kit de Futebol.{' '}
        <span className="text-[var(--color-brasil-green)]">
          Seu Próximo Patrocínio.
        </span>
      </h1>

      {/* Subheadline */}
      <p className="relative text-base md:text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed">
        Crie uma página profissional com seus dados de engajamento, conecte suas redes e receba propostas de marcas locais — tudo em menos de 2 minutos.
      </p>

      {/* CTA Buttons */}
      <div className="relative flex flex-col sm:flex-row gap-3 items-center justify-center w-full max-w-md sm:max-w-none mb-16">
        <a
          href="#cta"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 font-bold text-white bg-[var(--color-brasil-green)] rounded-xl hover:bg-[var(--color-brasil-green-dark)] transition-all group shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30"
        >
          Criar Meu Mídia Kit — Grátis
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </a>
        <a
          href="#como-funciona"
          className="w-full sm:w-auto px-8 py-4 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all text-slate-600 text-center"
        >
          Como funciona?
        </a>
      </div>

      {/* Social proof strip */}
      <div className="relative flex flex-col sm:flex-row items-center gap-3 text-sm text-slate-400">
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
              <Star key={i} className="w-3.5 h-3.5 fill-[var(--color-brasil-yellow)] text-[var(--color-brasil-yellow)]" />
            ))}
          </div>
          <span className="ml-1 text-slate-500">
            Avaliado por <span className="text-slate-700 font-medium">atletas de 18 estados</span>
          </span>
        </div>
      </div>
    </section>
  );
}
