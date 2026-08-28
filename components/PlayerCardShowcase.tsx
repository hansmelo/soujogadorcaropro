import React from 'react';
import { Shield, CheckCircle2, TrendingUp, Users, Eye } from 'lucide-react';

export default function PlayerCardShowcase() {
  return (
    <section className="w-full py-24 px-4 flex flex-col items-center relative overflow-hidden">
      {/* Subtle divider */}
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-12 md:gap-16">

        {/* Left: Text content */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">
            Cartão do Atleta PRO
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Seu perfil vira um{' '}
            <span className="text-amber-500">card de elite</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8">
            Apresente seus números com a credibilidade de um scout profissional. Marcas locais entendem seu valor em segundos.
          </p>

          <div className="flex flex-col gap-3 text-sm">
            {[
              'Engajamento e alcance atualizados em tempo real',
              'Posição, categoria e cidade do atleta',
              'Valor estimado do passe comercial',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-300 justify-center md:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Card mockup */}
        <div className="relative group shrink-0">
          {/* Outer glow */}
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-amber-500/20 via-emerald-500/10 to-amber-500/20 blur-2xl opacity-60 group-hover:opacity-100 transition duration-700" />

          {/* Card */}
          <div className="relative w-80 bg-slate-900 border border-white/[0.08] rounded-2xl p-5 shadow-2xl overflow-hidden">
            {/* Grid watermark */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-10 pointer-events-none" />

            {/* Card header */}
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-2.5">
                <div className="flex flex-col items-center bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-lg">
                  <span className="text-xl font-black text-amber-400 leading-none">94</span>
                  <span className="text-[9px] font-bold text-amber-400/70 uppercase tracking-widest">OVR</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">Posição</span>
                  <span className="text-xs font-bold text-slate-200">Meia Atacante</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[10px] font-bold">
                <CheckCircle2 className="w-3 h-3" /> Verificado
              </div>
            </div>

            {/* Player info */}
            <div className="flex items-center gap-3 mb-5">
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-400 p-0.5">
                  <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center text-2xl">
                    ⚽
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 text-[8px] font-black px-1 py-0.5 rounded uppercase">
                  PRO
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-50">Lucas Souza</h3>
                <p className="text-[11px] text-slate-500">@lucas_camisa10 · Sub-20</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-1.5 bg-slate-950/60 border border-white/[0.06] rounded-xl p-2.5 mb-4">
              <div className="flex flex-col items-center py-1.5">
                <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                  <Users className="w-3 h-3" /> 45.2K
                </div>
                <span className="text-[9px] text-slate-500 font-medium uppercase mt-0.5">Seguidores</span>
              </div>
              <div className="flex flex-col items-center py-1.5">
                <div className="flex items-center gap-1 text-emerald-400 font-bold text-sm">
                  <TrendingUp className="w-3 h-3" /> 8.4%
                </div>
                <span className="text-[9px] text-slate-500 font-medium uppercase mt-0.5">Engajamento</span>
              </div>
              <div className="flex flex-col items-center py-1.5">
                <div className="flex items-center gap-1 text-cyan-400 font-bold text-sm">
                  <Eye className="w-3 h-3" /> 180K
                </div>
                <span className="text-[9px] text-slate-500 font-medium uppercase mt-0.5">Alcance</span>
              </div>
            </div>

            {/* Value bar */}
            <div className="flex items-center justify-between bg-gradient-to-r from-amber-500/10 to-emerald-500/10 border border-white/[0.06] rounded-lg px-3 py-2">
              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-amber-400" /> Valor do Passe
              </span>
              <span className="text-xs font-bold text-emerald-400">
                R$ 3.200/mês
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
