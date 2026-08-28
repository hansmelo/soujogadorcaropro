import React from 'react';
import { Shield, Sparkles, CheckCircle2, TrendingUp, Users, Eye } from 'lucide-react';

export default function PlayerCardShowcase() {
  return (
    <section className="w-full py-16 px-4 flex flex-col items-center relative overflow-hidden">
      <div className="max-w-6xl w-full border-t border-slate-800/80 pt-16 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" /> Cartão do Atleta PRO
        </div>
        
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center max-w-2xl mb-4">
          Seu <span className="text-amber-500">Mídia Kit em formato de Card de Elite</span>
        </h2>
        <p className="text-slate-400 text-center max-w-xl mb-12 text-base md:text-lg">
          O padrão internacional de apresentação para marcas da sua cidade avaliarem o seu passe comercial.
        </p>

        <div className="relative group">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500/40 via-emerald-500/30 to-amber-500/40 blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />

          <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-500/50 rounded-3xl p-6 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20 pointer-events-none" />

            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl">
                  <span className="text-2xl font-black text-amber-400 leading-none">94</span>
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest mt-0.5">OVR PRO</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Posição</span>
                  <span className="text-sm font-extrabold text-slate-100 flex items-center gap-1">
                    Meia Atacante / C. 10
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verificado
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-400 p-0.5 shadow-lg">
                  <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center text-3xl font-black text-slate-200">
                    ⚽
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-md uppercase">
                  PRO
                </div>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-50 flex items-center gap-1.5">
                  Lucas "Goleador"
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  @lucas_camisa10
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[11px] bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded-md font-medium">
                    Atleta de Base / Sub-20
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-slate-950/80 border border-slate-800 rounded-2xl p-3 mb-6">
              <div className="flex flex-col items-center p-2 rounded-xl bg-slate-900/50">
                <div className="flex items-center gap-1 text-amber-400 font-extrabold text-base">
                  <Users className="w-3.5 h-3.5" /> 45.2K
                </div>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Seguidores</span>
              </div>
              
              <div className="flex flex-col items-center p-2 rounded-xl bg-slate-900/50">
                <div className="flex items-center gap-1 text-emerald-400 font-extrabold text-base">
                  <TrendingUp className="w-3.5 h-3.5" /> 8.4%
                </div>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Engajamento</span>
              </div>

              <div className="flex flex-col items-center p-2 rounded-xl bg-slate-900/50">
                <div className="flex items-center gap-1 text-cyan-400 font-extrabold text-base">
                  <Eye className="w-3.5 h-3.5" /> 180K
                </div>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Alcance/Mês</span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-gradient-to-r from-amber-500/10 to-emerald-500/10 border border-slate-800 rounded-xl px-4 py-2.5">
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-amber-400" /> Valor do Passe Estimado:
              </span>
              <span className="text-sm font-extrabold text-emerald-400">
                R$ 3.200 /mês
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
