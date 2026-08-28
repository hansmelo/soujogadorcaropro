import React from 'react';
import { ChevronRight, Trophy, Flame, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full flex flex-col items-center text-center px-4 pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-emerald-500/5 to-transparent pointer-events-none blur-3xl" />
      
      <div className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-800 shadow-lg mb-8 backdrop-blur-sm">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-live-pulse shadow-[0_0_8px_#f59e0b]" />
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
          O Mídia Kit oficial do atleta de futebol moderno
        </span>
      </div>

      <h1 className="relative text-5xl sm:text-6xl md:text-7xl font-black tracking-tight max-w-5xl leading-[1.1] mb-6">
        Transforme seus seguidores em{' '}
        <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
          patrocínio real no campo.
        </span>
      </h1>

      <p className="relative text-lg md:text-xl text-slate-400 max-w-3xl mb-10 leading-relaxed">
        Crie seu Mídia Kit profissional em segundos. Conecte suas redes, mostre seu valor de passe no mercado e feche parcerias com marcas locais como um verdadeiro camisa 10.
      </p>

      <div className="relative flex flex-col sm:flex-row gap-4 items-center justify-center mb-16 w-full max-w-md sm:max-w-none">
        <button className="w-full sm:w-auto relative flex items-center justify-center gap-2 px-8 py-4 font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full hover:from-amber-300 hover:to-amber-400 transition-all group shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:scale-[1.02]">
          Criar Meu Mídia Kit Grátis
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="w-full sm:w-auto px-8 py-4 font-bold rounded-full border border-slate-800 bg-slate-900/60 hover:bg-slate-800 hover:border-slate-700 transition-all text-slate-200 backdrop-blur-sm">
          Ver Exemplo do Atleta
        </button>
      </div>

      <div className="relative grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 p-4 md:p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 max-w-4xl w-full backdrop-blur-md">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5 text-amber-500 font-bold text-xl md:text-2xl">
            <Flame className="w-5 h-5 fill-amber-500/20" /> +1.200
          </div>
          <span className="text-xs text-slate-400 font-medium mt-0.5">Atletas no Elenco</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xl md:text-2xl">
            <Trophy className="w-5 h-5" /> R$ 3.5M+
          </div>
          <span className="text-xs text-slate-400 font-medium mt-0.5">Em Patrocínios Gerados</span>
        </div>
        <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center">
          <div className="flex items-center gap-1.5 text-slate-200 font-bold text-xl md:text-2xl">
            <ShieldCheck className="w-5 h-5 text-amber-400" /> 100%
          </div>
          <span className="text-xs text-slate-400 font-medium mt-0.5">Focado em Atletas de Base e Profissionais</span>
        </div>
      </div>
    </section>
  );
}
