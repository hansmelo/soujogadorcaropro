import React from 'react';
import { ArrowRight, Star, PlayCircle } from 'lucide-react';
import PlayerCard from './PlayerCard';
import { SAMPLE_PLAYER } from '@/lib/samplePlayers';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Stadium floodlights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute top-40 -left-40 w-[500px] h-[500px] rounded-full bg-pitch/10 blur-[120px]" />
        <div className="absolute inset-0 bg-pitch-grid" />
        {/* Center circle of the pitch */}
        <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] opacity-[0.06]" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="60" fill="none" stroke="white" strokeWidth="0.6" />
          <circle cx="100" cy="100" r="1.6" fill="white" />
          <line x1="0" y1="100" x2="200" y2="100" stroke="white" strokeWidth="0.6" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 md:px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid lg:grid-cols-[1.15fr_1fr] gap-16 lg:gap-8 items-center">
        {/* Copy */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="animate-slide-up flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-pitch animate-ping opacity-60" />
              <span className="relative w-2 h-2 rounded-full bg-pitch" />
            </span>
            <span className="text-xs font-medium text-slate-300">
              +1.200 atletas já criaram seu Passe Digital
            </span>
          </div>

          <h1 className="animate-slide-up [animation-delay:80ms] font-display font-black uppercase text-[56px] sm:text-7xl md:text-8xl leading-[0.88] tracking-tight text-white mb-6">
            Seu Passe Digital.
            <br />
            <span className="text-gold-gradient">Seu Próximo Patrocínio.</span>
          </h1>

          <p className="animate-slide-up [animation-delay:160ms] text-base md:text-lg text-slate-400 max-w-xl mb-10 leading-relaxed">
            Crie uma página profissional com seus dados de engajamento, conecte suas redes e receba propostas de marcas locais — tudo em menos de 2 minutos.
          </p>

          <div className="animate-slide-up [animation-delay:240ms] flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-12">
            <a
              href="#calculadora"
              className="group flex items-center justify-center gap-2 px-7 py-4 font-bold text-gold-ink bg-gradient-to-b from-gold-light to-gold rounded-xl shadow-[0_10px_40px_-10px_rgba(242,193,78,0.7)] hover:shadow-[0_14px_50px_-8px_rgba(242,193,78,0.85)] hover:-translate-y-0.5 transition-all"
            >
              Criar Meu Passe — Grátis
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#como-funciona"
              className="flex items-center justify-center gap-2 px-7 py-4 font-semibold rounded-xl border border-white/15 text-white hover:bg-white/5 hover:border-white/25 transition-all"
            >
              <PlayCircle className="w-4 h-4 text-gold" />
              Como funciona?
            </a>
          </div>

          <div className="animate-slide-up [animation-delay:320ms] flex flex-col sm:flex-row items-center gap-3 text-sm text-slate-400">
            <div className="flex -space-x-2">
              {['⚽', '🥅', '🏆', '⭐', '🎯'].map((emoji, i) => (
                <div key={i} className="w-9 h-9 rounded-full bg-surface-2 border-2 border-ink flex items-center justify-center text-sm">
                  {emoji}
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center sm:items-start gap-0.5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                ))}
              </div>
              <span>
                Avaliado por <span className="text-white font-medium">atletas de 18 estados</span>
              </span>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="relative flex justify-center animate-fade-in [animation-delay:200ms]">
          <div className="absolute inset-0 m-auto w-72 h-72 rounded-full bg-gold/25 blur-[90px]" />
          <div className="relative scale-[0.88] sm:scale-100">
            <div className="relative animate-float [--tilt:-4deg]">
              <PlayerCard data={SAMPLE_PLAYER} />
              {/* Floating chips */}
              <div className="hidden sm:flex absolute -left-24 top-10 items-center gap-2 px-3 py-2 rounded-xl bg-surface/90 border border-white/10 backdrop-blur shadow-xl rotate-[4deg]">
                <span className="w-7 h-7 rounded-lg bg-pitch/15 flex items-center justify-center text-pitch text-xs font-black">↑</span>
                <div className="leading-tight">
                  <p className="text-[10px] text-slate-400">Engajamento</p>
                  <p className="text-sm font-bold text-white">+8.4%</p>
                </div>
              </div>
              <div className="hidden sm:flex absolute -right-12 -bottom-6 items-center gap-2 px-3 py-2 rounded-xl bg-surface/90 border border-white/10 backdrop-blur shadow-xl rotate-[4deg]">
                <span className="text-lg" aria-hidden="true">🤝</span>
                <div className="leading-tight">
                  <p className="text-[10px] text-slate-400">Nova proposta</p>
                  <p className="text-sm font-bold text-white">Academia local</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
