import React from 'react';
import { ArrowRight, Trophy } from 'lucide-react';

export default function FooterCTA() {
  return (
    <section id="cta" className="relative py-32 px-4 w-full flex flex-col items-center text-center overflow-hidden bg-gradient-to-br from-[var(--color-brasil-green)] via-emerald-600 to-emerald-700">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-[var(--color-brasil-yellow)]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-[var(--color-brasil-blue)]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-brasil-green)] via-[var(--color-brasil-yellow)] to-[var(--color-brasil-blue)]" />

      <div className="relative z-10 max-w-2xl flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-8 animate-float border border-white/20">
          <Trophy className="w-8 h-8 text-[var(--color-brasil-yellow)]" />
        </div>

        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight text-white">
          Pronto para o{' '}
          <span className="text-[var(--color-brasil-yellow)]">
            nível PRO?
          </span>
        </h2>

        <p className="text-base md:text-lg text-white/80 max-w-lg mb-10 leading-relaxed">
          Reserve seu link exclusivo e comece a receber propostas de marcas da sua cidade ainda hoje.
        </p>

        <a
          href="#"
          className="group flex items-center gap-3 px-8 py-5 text-lg font-extrabold text-[var(--color-brasil-green)] bg-white rounded-xl hover:bg-[var(--color-brasil-yellow)] hover:text-slate-900 transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] mb-4"
        >
          Criar Meu Mídia Kit — Grátis
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>

        <p className="text-xs text-white/60">
          Sem cartão de crédito · Configuração em 2 minutos · Cancele quando quiser
        </p>
      </div>
    </section>
  );
}
