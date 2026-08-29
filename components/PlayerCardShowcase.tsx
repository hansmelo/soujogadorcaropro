import React from 'react';
import { Shield, CheckCircle2, TrendingUp, Users, Eye } from 'lucide-react';

export default function PlayerCardShowcase() {
  return (
    <section className="w-full py-24 px-4 flex flex-col items-center relative overflow-hidden">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-12 md:gap-16">

        {/* Left: Text content */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-sm font-semibold text-[var(--color-brasil-blue)] uppercase tracking-wider mb-3">
            Cartão do Atleta PRO
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-slate-900">
            Seu perfil vira um{' '}
            <span className="text-[var(--color-brasil-green)]">card de elite</span>
          </h2>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8">
            Apresente seus números com a credibilidade de um scout profissional. Marcas locais entendem seu valor em segundos.
          </p>

          <div className="flex flex-col gap-3 text-sm">
            {[
              'Engajamento e alcance atualizados em tempo real',
              'Posição, categoria e cidade do atleta',
              'Valor estimado do passe comercial',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-600 justify-center md:justify-start">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-brasil-green)] shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Card mockup */}
        <div className="relative group shrink-0">
          {/* Outer glow */}
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[var(--color-brasil-green)]/15 via-[var(--color-brasil-yellow)]/10 to-[var(--color-brasil-blue)]/10 blur-2xl opacity-60 group-hover:opacity-100 transition duration-700" />

          {/* Card */}
          <div className="relative w-80 bg-white border border-slate-200 rounded-2xl p-5 shadow-xl overflow-hidden">
            {/* Colored top stripe */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--color-brasil-green)] via-[var(--color-brasil-yellow)] to-[var(--color-brasil-blue)]" />

            {/* Card header */}
            <div className="flex justify-between items-start mb-5 mt-2">
              <div className="flex items-center gap-2.5">
                <div className="flex flex-col items-center bg-[var(--color-brasil-yellow)]/15 border border-[var(--color-brasil-yellow)]/30 px-2.5 py-1 rounded-lg">
                  <span className="text-xl font-black text-[var(--color-brasil-green)] leading-none">94</span>
                  <span className="text-[9px] font-bold text-[var(--color-brasil-green)]/70 uppercase tracking-widest">OVR</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Posição</span>
                  <span className="text-xs font-bold text-slate-700">Meia Atacante</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[var(--color-brasil-green)] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                <CheckCircle2 className="w-3 h-3" /> Verificado
              </div>
            </div>

            {/* Player info */}
            <div className="flex items-center gap-3 mb-5">
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-brasil-green)] to-[var(--color-brasil-blue)] p-0.5">
                  <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center text-2xl">
                    ⚽
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[var(--color-brasil-green)] text-white text-[8px] font-black px-1 py-0.5 rounded uppercase">
                  PRO
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">Lucas Souza</h3>
                <p className="text-[11px] text-slate-400">@lucas_camisa10 · Sub-20</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-1.5 bg-slate-50 border border-slate-100 rounded-xl p-2.5 mb-4">
              <div className="flex flex-col items-center py-1.5">
                <div className="flex items-center gap-1 text-[var(--color-brasil-green)] font-bold text-sm">
                  <Users className="w-3 h-3" /> 45.2K
                </div>
                <span className="text-[9px] text-slate-400 font-medium uppercase mt-0.5">Seguidores</span>
              </div>
              <div className="flex flex-col items-center py-1.5">
                <div className="flex items-center gap-1 text-[var(--color-brasil-blue)] font-bold text-sm">
                  <TrendingUp className="w-3 h-3" /> 8.4%
                </div>
                <span className="text-[9px] text-slate-400 font-medium uppercase mt-0.5">Engajamento</span>
              </div>
              <div className="flex flex-col items-center py-1.5">
                <div className="flex items-center gap-1 text-[var(--color-brasil-blue-light)] font-bold text-sm">
                  <Eye className="w-3 h-3" /> 180K
                </div>
                <span className="text-[9px] text-slate-400 font-medium uppercase mt-0.5">Alcance</span>
              </div>
            </div>

            {/* Value bar */}
            <div className="flex items-center justify-between bg-gradient-to-r from-emerald-50 to-yellow-50 border border-slate-100 rounded-lg px-3 py-2">
              <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[var(--color-brasil-green)]" /> Valor do Passe
              </span>
              <span className="text-xs font-bold text-[var(--color-brasil-green)]">
                R$ 3.200/mês
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
