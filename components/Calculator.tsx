"use client";

import React, { useState } from 'react';
import { Zap, AlertCircle, ChevronDown, ChevronUp, Trophy } from 'lucide-react';

export default function Calculator() {
  // Required fields
  const [followers, setFollowers] = useState('');
  const [age, setAge] = useState('');
  
  // Optional field data toggle
  const [showFieldData, setShowFieldData] = useState(false);
  
  // Field data
  const [matches, setMatches] = useState('');
  const [goals, setGoals] = useState('');
  const [seasonGoals, setSeasonGoals] = useState('');
  const [assists, setAssists] = useState('');
  const [trophies, setTrophies] = useState('');

  interface ResultType {
    ovr: number;
    tier: { name: string; emoji: string; color: string; text: string };
    stats: { rch: number; eng: number; gol: number | string; ass: number | string; frm: number | string; tit: number | string };
    mediaValue: number;
    passValue: number;
    mode: number;
  }

  // Result state
  const [result, setResult] = useState<ResultType | null>(null);
  const [error, setError] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);

  // Helper: Normalize value between 0 and 99
  const normalize = (val: number, min: number, max: number) => {
    if (val <= min) return 0;
    if (val >= max) return 99;
    return ((val - min) / (max - min)) * 99;
  };

  const getAgeScore = (a: number) => {
    if (a <= 17) return 90;
    if (a >= 18 && a <= 21) return 99;
    if (a >= 22 && a <= 25) return 85;
    if (a >= 26 && a <= 29) return 65;
    if (a >= 30 && a <= 33) return 40;
    if (a >= 34 && a <= 37) return 20;
    return 10;
  };

  const getTrophyBonus = (t: number) => {
    if (t === 0) return 0;
    if (t === 1) return 5;
    if (t === 2) return 8;
    if (t >= 3 && t <= 4) return 12;
    return 15;
  };

  const getTier = (ovr: number) => {
    if (ovr < 30) return { name: 'Bronze', emoji: '🟤', color: 'from-amber-700 to-amber-900', text: 'text-amber-800' };
    if (ovr < 50) return { name: 'Prata', emoji: '⚪', color: 'from-slate-300 to-slate-500', text: 'text-slate-600' };
    if (ovr < 65) return { name: 'Ouro', emoji: '🟡', color: 'from-[var(--color-gold)] to-yellow-600', text: 'text-yellow-700' };
    if (ovr < 80) return { name: 'Diamante', emoji: '💎', color: 'from-blue-400 to-blue-600', text: 'text-blue-600' };
    if (ovr < 90) return { name: 'Elite', emoji: '⭐', color: 'from-[var(--color-navy)] to-indigo-900', text: 'text-[var(--color-navy)]' };
    return { name: 'Ícone', emoji: '🏆', color: 'from-purple-500 via-pink-500 to-orange-500', text: 'text-purple-600' };
  };

  const calculate = async (e: React.FormEvent) => {
    e.preventDefault();
    const fNum = parseInt(followers.replace(/\D/g, ''), 10);
    const aNum = parseInt(age.replace(/\D/g, ''), 10);

    if (isNaN(fNum) || fNum < 100) {
      setError('Digite um número válido de seguidores (mínimo 100).');
      return;
    }
    if (isNaN(aNum) || aNum < 10 || aNum > 60) {
      setError('Digite uma idade válida.');
      return;
    }

    setError('');
    setIsCalculating(true);
    setResult(null);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // MOCK DATA for MVP (Would come from API in production)
    const mockER = 0.08; // 8% engagement rate
    const mockPostsPerMonth = 10;

    // 1. SOCIAL SCORE
    const reachScore = normalize(fNum, 1000, 200000);
    const engScore = normalize(mockER, 0.01, 0.20);
    const consScore = normalize(mockPostsPerMonth, 1, 30);
    const socialScore = (reachScore * 0.35) + (engScore * 0.40) + (consScore * 0.25);

    const ageScore = getAgeScore(aNum);

    // Check if field data is present (Mode 2)
    const hasFieldData = matches || goals || seasonGoals || assists || trophies;
    
    let finalOVR = 0;
    let mode = 1;
    const stats = { rch: reachScore, eng: engScore, frm: 0, gol: 0, ass: 0, tit: 0 };
    
    let passValue = 0;
    let mediaValue = 0;

    // Media Value Calculation (Model B simplified logic)
    const activeAudience = fNum * mockER;
    // R$ 0.15 per engaged follower for local market base
    const monthlyMedia = Math.max(activeAudience * 0.15, 50); 
    mediaValue = monthlyMedia;

    if (!hasFieldData) {
      // MODO 1: Só Social + Idade
      finalOVR = (socialScore * 0.65) + (ageScore * 0.35);
      passValue = (monthlyMedia * 12) * 1.5; // Lower multiplier for Mode 1
    } else {
      // MODO 2: Completo
      mode = 2;
      const mNum = parseInt(matches) || 1; // Prevent div by 0
      const gNum = parseInt(goals) || 0;
      const sgNum = parseInt(seasonGoals) || 0;
      const astNum = parseInt(assists) || 0;
      const tNum = parseInt(trophies) || 0;

      const gpm = gNum / mNum;
      const apm = astNum / mNum;
      const form = sgNum + (astNum * 0.3);

      const golScore = normalize(gpm, 0, 1.0);
      const assScore = normalize(apm, 0, 0.5);
      const frmScore = normalize(form, 0, 30);

      stats.gol = golScore;
      stats.ass = assScore;
      stats.frm = frmScore;
      stats.tit = tNum; // Raw number for display

      const rawPerf = (golScore * 0.25) + (assScore * 0.20) + (frmScore * 0.25) + (ageScore * 0.30);
      const perfScore = Math.min(rawPerf + getTrophyBonus(tNum), 99);

      finalOVR = (socialScore * 0.50) + (perfScore * 0.50);
      passValue = (monthlyMedia * 12) * 2.5; // Higher multiplier for Mode 2 (Reward)
    }

    // Scale Pass Value slightly based on OVR tier to make it realistic
    passValue = passValue * (1 + (finalOVR / 100));

    setResult({
      ovr: Math.round(finalOVR),
      tier: getTier(Math.round(finalOVR)),
      stats: {
        rch: Math.round(stats.rch),
        eng: Math.round(stats.eng),
        gol: mode === 1 ? '—' : Math.round(stats.gol),
        ass: mode === 1 ? '—' : Math.round(stats.ass),
        frm: mode === 1 ? '—' : Math.round(stats.frm),
        tit: mode === 1 ? '—' : stats.tit
      },
      mediaValue: Math.round(mediaValue / 10) * 10, // Round to nearest 10
      passValue: Math.round(passValue / 100) * 100, // Round to nearest 100
      mode
    });
    
    setIsCalculating(false);
  };

  const fmt = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);

  return (
    <section id="calculadora" className="w-full py-24 px-4 relative bg-slate-50">
      <div className="relative max-w-2xl mx-auto flex flex-col items-center">
        <p className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-wider mb-3">
          Calculadora de Passe
        </p>

        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-center text-[var(--color-navy)]">
          Qual o seu <span className="text-[var(--color-gold)]">OVR e Valor?</span>
        </h2>

        <p className="text-slate-600 text-center max-w-lg mb-10">
          Descubra o seu potencial de patrocínio local e o valor do seu Passe Digital baseado em dados reais.
        </p>

        <form onSubmit={calculate} className="w-full max-w-md mb-6 flex flex-col gap-4">
          
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs font-bold text-[var(--color-navy)] mb-1 uppercase">Seguidores</label>
              <input
                type="number"
                placeholder="Ex: 15000"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 transition-all shadow-sm"
                value={followers}
                onChange={(e) => setFollowers(e.target.value)}
                required
              />
            </div>
            <div className="w-1/3">
              <label className="block text-xs font-bold text-[var(--color-navy)] mb-1 uppercase">Idade</label>
              <input
                type="number"
                placeholder="Ex: 19"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 transition-all shadow-sm"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Expandable Field Data Section */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 shadow-sm">
            <button
              type="button"
              onClick={() => setShowFieldData(!showFieldData)}
              className="w-full px-4 py-3 flex items-center justify-between text-sm font-bold text-[var(--color-navy)] hover:bg-slate-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                ⚽ Adicionar Dados de Campo <span className="text-xs font-normal text-slate-400">(Opcional)</span>
              </span>
              {showFieldData ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {showFieldData && (
              <div className="p-4 border-t border-slate-100 grid grid-cols-2 gap-3 bg-slate-50/50">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Jogos Totais</label>
                  <input type="number" placeholder="Ex: 82" className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2" value={matches} onChange={e => setMatches(e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Gols Totais</label>
                  <input type="number" placeholder="Ex: 47" className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2" value={goals} onChange={e => setGoals(e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Gols Temporada</label>
                  <input type="number" placeholder="Ex: 12" className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2" value={seasonGoals} onChange={e => setSeasonGoals(e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Assistências</label>
                  <input type="number" placeholder="Ex: 23" className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2" value={assists} onChange={e => setAssists(e.target.value)} />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Títulos / Troféus</label>
                  <input type="number" placeholder="Ex: 3" className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2" value={trophies} onChange={e => setTrophies(e.target.value)} />
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isCalculating}
            className="mt-2 w-full py-4 font-bold rounded-xl bg-[var(--color-gold)] text-white hover:bg-[var(--color-gold-hover)] transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-wait shadow-md"
          >
            <Zap className="w-4 h-4" />
            {isCalculating ? 'Calculando Scout...' : 'Gerar Meu Card'}
          </button>
        </form>

        {error && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-center gap-2 max-w-md w-full mb-6">
            <AlertCircle className="w-4 h-4 text-[var(--color-gold)] shrink-0" />
            {error}
          </div>
        )}

        {/* RESULTS CARD (FIFA STYLE) */}
        {result && (
          <div className="w-full max-w-sm mt-4 animate-slide-up flex flex-col items-center">
            
            {/* The Physical Card */}
            <div className={`relative w-72 rounded-2xl p-1.5 bg-gradient-to-br ${result.tier.color} shadow-2xl`}>
              <div className="w-full h-full bg-white/95 backdrop-blur-sm rounded-[14px] p-5 flex flex-col items-center">
                
                {/* Card Header (OVR & Tier) */}
                <div className="flex flex-col items-center mb-4">
                  <span className="text-5xl font-black text-[var(--color-navy)] leading-none drop-shadow-sm">{result.ovr}</span>
                  <div className="flex items-center gap-1.5 mt-1.5 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    <span className="text-xs">{result.tier.emoji}</span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${result.tier.text}`}>{result.tier.name}</span>
                  </div>
                </div>

                {/* HIGHLIGHT: Patrocínio Sugerido */}
                <div className="w-full bg-[var(--color-navy)] rounded-xl p-3.5 flex flex-col items-center justify-center shadow-lg mb-5 relative overflow-hidden group">
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-[var(--color-gold)]/20 rounded-full blur-xl group-hover:bg-[var(--color-gold)]/30 transition-all"></div>
                  <span className="text-[10px] text-white/70 uppercase font-bold tracking-widest mb-1 z-10">Patrocínio Mensal</span>
                  <div className="flex items-baseline gap-1 z-10">
                    <span className="text-2xl font-black text-[var(--color-gold)] drop-shadow-sm">{fmt(result.mediaValue)}</span>
                    <span className="text-xs font-medium text-white/60">/mês</span>
                  </div>
                </div>

                {/* 6 Stats Grid (Clear names) */}
                <div className="w-full grid grid-cols-2 gap-x-3 gap-y-2 mb-5">
                  <div className="flex justify-between items-center bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-lg">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Alcance</span>
                    <span className="text-sm font-black text-[var(--color-navy)]">{result.stats.rch}</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-lg">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Gols</span>
                    <span className="text-sm font-black text-[var(--color-navy)]">{result.stats.gol}</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-lg">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Engajam.</span>
                    <span className="text-sm font-black text-[var(--color-navy)]">{result.stats.eng}</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-lg">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Assists</span>
                    <span className="text-sm font-black text-[var(--color-navy)]">{result.stats.ass}</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-lg">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Fase Atual</span>
                    <span className="text-sm font-black text-[var(--color-navy)]">{result.stats.frm}</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-lg">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Títulos</span>
                    <span className="text-sm font-black text-[var(--color-navy)]">{result.stats.tit}</span>
                  </div>
                </div>

                {/* Valuation / Passe */}
                <div className="w-full pt-3.5 border-t border-slate-200 flex justify-between items-center px-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-[var(--color-gold)]" /> Passe Digital
                  </span>
                  <span className="text-sm font-black text-slate-700">{fmt(result.passValue)}</span>
                </div>

              </div>
            </div>

            {/* Mode 1 Upsell */}
            {result.mode === 1 && (
              <div className="mt-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs px-4 py-3 rounded-xl text-center shadow-sm max-w-sm">
                <p className="font-bold mb-1 flex items-center justify-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-[var(--color-gold)]" /> Destrave seu OVR Completo!
                </p>
                <p className="text-amber-800/80">Adicione seus dados de campo no formulário acima para aumentar seu Passe e liberar todas as estatísticas do card.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
