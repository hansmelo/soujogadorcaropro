import React from 'react';
import { Trophy, ChevronRight } from 'lucide-react';

export default function FooterCTA() {
  return (
    <section className="py-28 px-4 w-full flex flex-col items-center text-center relative overflow-hidden bg-slate-950">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl flex flex-col items-center">
        <div className="p-3 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6 text-amber-500">
          <Trophy className="w-8 h-8" />
        </div>

        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight">
          Pronto para assinar seu contrato <span className="text-amber-500">PRO?</span>
        </h2>
        
        <p className="text-base md:text-xl text-slate-400 max-w-xl mb-10 leading-relaxed">
          Garanta a camisa 10 e reserve seu link exclusivo de atleta antes do próximo apito inicial.
        </p>

        <button className="group relative flex items-center justify-center gap-3 px-8 py-5 text-lg md:text-xl font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full hover:from-amber-300 hover:to-amber-400 transition-all shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.7)] hover:scale-105">
          <span>soujogadorcaro.pro/<span className="opacity-75">seunome</span></span>
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
