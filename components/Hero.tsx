import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full flex flex-col items-center text-center px-4 pt-20 pb-28 md:pt-32 md:pb-36 overflow-hidden">
      {/* Ambient glow — stadium floodlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Live badge */}
      <div className="relative flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-live-pulse" />
        <span className="text-xs font-medium text-slate-300">
          +1.200 atletas já criaram seu Mídia Kit
        </span>
      </div>

      {/* Headline */}
      <h1 className="relative text-4xl sm:text-5xl md:text-7xl font-black tracking-tight max-w-4xl leading-[1.08] mb-6">
        Seu Mídia Kit de Futebol.{' '}
        <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
          Seu Próximo Patrocínio.
        </span>
      </h1>

      {/* Subheadline */}
      <p className="relative text-base md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
        Crie uma página profissional com seus dados de engajamento, conecte suas redes e receba propostas de marcas locais — tudo em menos de 2 minutos.
      </p>

      {/* CTA Buttons */}
      <div className="relative flex flex-col sm:flex-row gap-3 items-center justify-center w-full max-w-md sm:max-w-none mb-16">
        <a
          href="#cta"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 font-bold text-slate-950 bg-amber-500 rounded-xl hover:bg-amber-400 transition-all group shadow-[0_0_0_1px_rgba(245,158,11,0.3),0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_0_1px_rgba(245,158,11,0.5),0_4px_30px_rgba(245,158,11,0.35)]"
        >
          Criar Meu Mídia Kit — Grátis
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </a>
        <a
          href="#como-funciona"
          className="w-full sm:w-auto px-8 py-4 font-semibold rounded-xl border border-white/10 hover:bg-white/5 transition-all text-slate-300 text-center"
        >
          Como funciona?
        </a>
      </div>

      {/* Social proof strip */}
      <div className="relative flex flex-col sm:flex-row items-center gap-3 text-sm text-slate-500">
        <div className="flex -space-x-2">
          {['⚽', '🥅', '🏆', '⭐', '🎯'].map((emoji, i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-xs">
              {emoji}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="ml-1 text-slate-400">
            Avaliado por <span className="text-slate-200 font-medium">atletas de 18 estados</span>
          </span>
        </div>
      </div>
    </section>
  );
}
