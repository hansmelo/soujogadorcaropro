"use client";

import React, { useState } from 'react';
import { Trophy, Zap, AlertCircle } from 'lucide-react';

export default function Calculator() {
  const [followers, setFollowers] = useState('');
  const [result, setResult] = useState<{ min: number; max: number; tier: string; badge: string } | null>(null);
  const [error, setError] = useState('');

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(followers.replace(/\D/g, ''), 10);

    if (isNaN(num) || num <= 0) {
      setError('Por favor, digite o número exato dos seus seguidores.');
      setResult(null);
      return;
    }

    if (num < 1000) {
      setError('Aumente sua base para mais de 1.000 seguidores para destravar seu Passe Comercial.');
      setResult(null);
      return;
    }

    setError('');

    let tier = 'Atleta Promessa';
    let badge = '⚡ TITULAR DO ELENCO';

    if (num >= 50000) {
      tier = 'Jogador Caro Nível Ouro';
      badge = '🏆 CAMISA 10 DA SELEÇÃO';
    } else if (num >= 10000) {
      tier = 'Atleta de Destaque Regional';
      badge = '⭐ CRAQUE DA RODADA';
    }

    setResult({
      min: num * 0.05,
      max: num * 0.12,
      tier,
      badge,
    });
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <section className="w-full py-20 px-4 flex justify-center bg-slate-900/50 relative">
      <div className="max-w-3xl w-full flex flex-col items-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Trophy className="w-3.5 h-3.5" /> Mercado de Transferências & Patrocínios
        </div>

        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-center">
          Calcule o <span className="text-emerald-400">Valor do seu Passe</span> de Patrocínio
        </h2>

        <p className="text-slate-400 text-center max-w-xl mb-10 text-base md:text-lg">
          Descubra quanto a sua imagem vale no mercado local para parcerias com academias, suplementos, barbearias e lojas esportivas.
        </p>

        <form onSubmit={calculate} className="w-full max-w-lg mb-8 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="number"
              placeholder="Ex: 8500 seguidores"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
              value={followers}
              onChange={(e) => setFollowers(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3.5 font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 hover:from-emerald-400 hover:to-teal-300 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 fill-slate-950" /> Calcular Passe
          </button>
        </form>

        {error && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-center text-sm flex items-center gap-2 justify-center max-w-lg w-full">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            {error}
          </div>
        )}

        {result && (
          <div className="w-full max-w-lg p-6 md:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/30 to-slate-950 shadow-[0_0_40px_rgba(16,185,129,0.15)] flex flex-col items-center relative overflow-hidden">
            <div className="mb-3 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wider">
              {result.badge}
            </div>

            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">
              {result.tier}
            </p>
            
            <p className="text-3xl md:text-5xl font-black text-emerald-400 my-2">
              {formatCurrency(result.min)} <span className="text-lg md:text-2xl font-medium text-slate-400">até</span> {formatCurrency(result.max)}
            </p>
            <p className="text-xs text-slate-500 font-medium mb-4">Potencial estimado em contratos de patrocínio / mês</p>

            <div className="w-full pt-4 border-t border-slate-800/80 flex justify-around text-center text-xs text-slate-400">
              <div>
                <span className="block text-slate-200 font-bold text-sm">2 a 5</span>
                Marcas Locais
              </div>
              <div className="h-8 w-[1px] bg-slate-800" />
              <div>
                <span className="block text-slate-200 font-bold text-sm">100%</span>
                Autonomia do Atleta
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
