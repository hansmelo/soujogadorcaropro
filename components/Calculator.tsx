"use client";

import React, { useState } from 'react';
import { Zap, AlertCircle, TrendingUp } from 'lucide-react';

export default function Calculator() {
  const [followers, setFollowers] = useState('');
  const [result, setResult] = useState<{ min: number; max: number; tier: string; emoji: string } | null>(null);
  const [error, setError] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);

  const calculate = async (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(followers.replace(/\D/g, ''), 10);

    if (isNaN(num) || num <= 0) {
      setError('Digite um número válido de seguidores.');
      setResult(null);
      return;
    }

    if (num < 1000) {
      setError('Você precisa de pelo menos 1.000 seguidores para destravar seu Passe Comercial.');
      setResult(null);
      return;
    }

    setError('');
    setIsCalculating(true);
    setResult(null);

    // Brief delay for perceived calculation effect
    await new Promise(resolve => setTimeout(resolve, 600));

    let tier = 'Atleta Promessa';
    let emoji = '⚡';

    if (num >= 50000) {
      tier = 'Camisa 10 da Seleção';
      emoji = '🏆';
    } else if (num >= 10000) {
      tier = 'Craque da Rodada';
      emoji = '⭐';
    }

    setResult({ min: num * 0.05, max: num * 0.12, tier, emoji });
    setIsCalculating(false);
  };

  const fmt = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <section id="calculadora" className="w-full py-24 px-4 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent pointer-events-none" />

      <div className="relative max-w-2xl mx-auto flex flex-col items-center">
        <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">
          Calculadora de Passe
        </p>

        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-center">
          Quanto vale sua <span className="text-emerald-400">imagem?</span>
        </h2>

        <p className="text-slate-400 text-center max-w-lg mb-10">
          Descubra o potencial de patrocínio da sua audiência no mercado esportivo local.
        </p>

        <form onSubmit={calculate} className="w-full max-w-md mb-6 flex gap-2">
          <input
            type="number"
            placeholder="Seus seguidores no Instagram"
            className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-slate-50 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] transition-all"
            value={followers}
            onChange={(e) => setFollowers(e.target.value)}
          />
          <button
            type="submit"
            disabled={isCalculating}
            className="px-6 py-3.5 font-bold rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-wait shrink-0"
          >
            <Zap className="w-4 h-4" />
            {isCalculating ? '...' : 'Calcular'}
          </button>
        </form>

        {error && (
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-400 text-sm flex items-center gap-2 max-w-md w-full">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            {error}
          </div>
        )}

        {result && (
          <div className="w-full max-w-md mt-2 p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] flex flex-col items-center animate-fade-in">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{result.emoji}</span>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">{result.tier}</span>
            </div>

            <p className="text-3xl md:text-4xl font-black text-emerald-400 my-2 flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              {fmt(result.min)} – {fmt(result.max)}
            </p>
            <p className="text-xs text-slate-500 font-medium">Potencial estimado por mês em patrocínios locais</p>

            <div className="w-full mt-5 pt-4 border-t border-white/[0.06] flex justify-around text-center text-xs text-slate-500">
              <div>
                <span className="block text-slate-200 font-bold text-sm">2–5</span>
                Marcas Parceiras
              </div>
              <div>
                <span className="block text-slate-200 font-bold text-sm">100%</span>
                Autonomia
              </div>
              <div>
                <span className="block text-slate-200 font-bold text-sm">R$ 0</span>
                Investimento
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
