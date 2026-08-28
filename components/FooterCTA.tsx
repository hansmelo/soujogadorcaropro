import React from 'react';
import { ArrowRight, Trophy } from 'lucide-react';

export default function FooterCTA() {
  return (
    <section id="cta" className="relative py-32 px-4 w-full flex flex-col items-center text-center overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-500/[0.08] via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(245,158,11,0.3)] animate-float">
          <Trophy className="w-8 h-8 text-slate-950" />
        </div>

        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight">
          Pronto para o{' '}
          <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
            nível PRO?
          </span>
        </h2>

        <p className="text-base md:text-lg text-slate-400 max-w-lg mb-10 leading-relaxed">
          Reserve seu link exclusivo e comece a receber propostas de marcas da sua cidade ainda hoje.
        </p>

        <a
          href="#"
          className="group flex items-center gap-3 px-8 py-5 text-lg font-extrabold text-slate-950 bg-amber-500 rounded-xl hover:bg-amber-400 transition-all shadow-[0_0_0_1px_rgba(245,158,11,0.3),0_4px_24px_rgba(245,158,11,0.3)] hover:shadow-[0_0_0_1px_rgba(245,158,11,0.5),0_4px_40px_rgba(245,158,11,0.4)] hover:scale-[1.02] mb-4"
        >
          Criar Meu Mídia Kit — Grátis
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>

        <p className="text-xs text-slate-500">
          Sem cartão de crédito · Configuração em 2 minutos · Cancele quando quiser
        </p>
      </div>
    </section>
  );
}
