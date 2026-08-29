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
    <section id="calculadora" className="w-full py-24 px-4 relative bg-slate-50">
      <div className="relative max-w-2xl mx-auto flex flex-col items-center">
        <p className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-wider mb-3">
          Calculadora de Passe
        </p>

        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-center text-[var(--color-navy)]">
          Quanto vale sua <span className="text-[var(--color-gold)]">imagem?</span>
        </h2>

        <p className="text-slate-600 text-center max-w-lg mb-10">
          Descubra o potencial de patrocínio da sua audiência no mercado esportivo local.
        </p>

        <form onSubmit={calculate} className="w-full max-w-md mb-6 flex gap-2">
          <input
            type="number"
            placeholder="Seus seguidores no Instagram"
            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 transition-all shadow-sm"
            value={followers}
            onChange={(e) => setFollowers(e.target.value)}
          />
          <button
            type="submit"
            disabled={isCalculating}
            className="px-6 py-3.5 font-bold rounded-xl bg-[var(--color-gold)] text-white hover:bg-[var(--color-gold-hover)] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-wait shrink-0 shadow-sm"
          >
            <Zap className="w-4 h-4" />
            {isCalculating ? '...' : 'Calcular'}
          </button>
        </form>

        {error && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-center gap-2 max-w-md w-full">
            <AlertCircle className="w-4 h-4 text-[var(--color-gold)] shrink-0" />
            {error}
          </div>
        )}

        {result && (
          <div className="w-full max-w-md mt-2 p-6 rounded-2xl border border-[var(--color-gold)]/40 bg-amber-50/50 flex flex-col items-center animate-fade-in shadow-md">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{result.emoji}</span>
              <span className="text-xs font-bold text-[var(--color-gold)] uppercase tracking-wider">{result.tier}</span>
            </div>

            <p className="text-3xl md:text-4xl font-black text-[var(--color-navy)] my-2 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[var(--color-gold)]" />
              {fmt(result.min)} – {fmt(result.max)}
            </p>
            <p className="text-xs text-slate-500 font-medium">Potencial estimado por mês em patrocínios locais</p>

            <div className="w-full mt-5 pt-4 border-t border-amber-200/60 flex justify-around text-center text-xs text-slate-600">
              <div>
                <span className="block text-[var(--color-navy)] font-bold text-sm">2–5</span>
                Marcas Parceiras
              </div>
              <div>
                <span className="block text-[var(--color-navy)] font-bold text-sm">100%</span>
                Autonomia
              </div>
              <div>
                <span className="block text-[var(--color-navy)] font-bold text-sm">R$ 0</span>
                Investimento
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
