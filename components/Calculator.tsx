"use client";

import React, { useState, useRef } from 'react';
import { Zap, AlertCircle, ChevronDown, ChevronUp, Trophy, Sparkles, Users, TrendingUp, Eye, Shield, CheckCircle, X, Share2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function Calculator() {
  // Required personal fields
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [position, setPosition] = useState('Meia Atacante');
  const [category, setCategory] = useState('Sub-20');
  
  // Required stats fields
  const [followers, setFollowers] = useState('');
  const [age, setAge] = useState('');
  const [jerseyNumber, setJerseyNumber] = useState('');
  
  // Optional field data toggle
  const [showFieldData, setShowFieldData] = useState(false);
  
  // Field data
  const [matches, setMatches] = useState('');
  const [goals, setGoals] = useState('');
  const [assists, setAssists] = useState('');
  const [trophies, setTrophies] = useState('');

  // VIP Modal state
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [vipContact, setVipContact] = useState('');
  const [vipStatus, setVipStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // Image Download State & Ref
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  interface ResultType {
    ovr: number;
    name: string;
    username: string;
    position: string;
    category: string;
    jerseyNumber: string;
    followersFormatted: string;
    reachFormatted: string;
    raw: {
      goals: number;
      assists: number;
      trophies: number;
    };
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

  const formatCompactNumber = (num: number) => {
    return Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(num);
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

  const calculate = async (e: React.FormEvent) => {
    e.preventDefault();
    const fNum = parseInt(followers.replace(/\D/g, ''), 10);
    const aNum = parseInt(age.replace(/\D/g, ''), 10);

    if (isNaN(fNum) || fNum < 0) {
      setError('Digite um número válido de seguidores (pode ser 0).');
      return;
    }
    if (isNaN(aNum) || aNum < 10 || aNum > 60) {
      setError('Digite uma idade válida.');
      return;
    }
    if (!name.trim() || !username.trim()) {
      setError('Preencha seu nome e usuário do Instagram.');
      return;
    }
    if (!jerseyNumber.trim()) {
      setError('Preencha o número da sua camisa.');
      return;
    }

    setError('');
    setIsCalculating(true);
    setResult(null);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // MOCK DATA for MVP (Would come from API in production)
    const mockER = 0.084; // 8.4% engagement rate
    const mockPostsPerMonth = 10;
    const reachMock = Math.floor(fNum * 3.98); // Mock reach ~ 4x followers

    // 1. SOCIAL SCORE
    const reachScore = normalize(fNum, 1000, 200000);
    const engScore = normalize(mockER, 0.01, 0.20);
    const consScore = normalize(mockPostsPerMonth, 1, 30);
    const socialScore = (reachScore * 0.35) + (engScore * 0.40) + (consScore * 0.25);

    const ageScore = getAgeScore(aNum);

    // Check if field data is present (Mode 2)
    const hasFieldData = matches || goals || assists || trophies;
    
    let finalOVR = 0;
    let mode = 1;
    
    let passValue = 0;
    let mediaValue = 0;

    // Media Value Calculation
    const activeAudience = fNum * mockER;
    const monthlyMedia = Math.max(activeAudience * 0.15, 50); 
    mediaValue = monthlyMedia;

    const gNum = parseInt(goals) || 0;
    const astNum = parseInt(assists) || 0;
    const tNum = parseInt(trophies) || 0;

    if (!hasFieldData) {
      // MODO 1: Só Social + Idade
      finalOVR = (socialScore * 0.65) + (ageScore * 0.35);
      passValue = (monthlyMedia * 12) * 1.5; 
    } else {
      // MODO 2: Completo
      mode = 2;
      const mNum = parseInt(matches) || 1; 

      const gpm = gNum / mNum;
      const apm = astNum / mNum;

      const golScore = normalize(gpm, 0, 1.0);
      const assScore = normalize(apm, 0, 0.5);

      // Distribuindo o peso da antiga métrica de temporada para Goals e Idade
      const rawPerf = (golScore * 0.35) + (assScore * 0.25) + (ageScore * 0.40);
      const perfScore = Math.min(rawPerf + getTrophyBonus(tNum), 99);

      finalOVR = (socialScore * 0.50) + (perfScore * 0.50);
      passValue = (monthlyMedia * 12) * 2.5;
    }

    passValue = passValue * (1 + (finalOVR / 100));

    setResult({
      ovr: Math.round(finalOVR),
      name: name,
      username: username.startsWith('@') ? username : `@${username}`,
      position: position,
      category: category,
      jerseyNumber: jerseyNumber,
      followersFormatted: formatCompactNumber(fNum),
      reachFormatted: formatCompactNumber(reachMock),
      raw: {
        goals: gNum,
        assists: astNum,
        trophies: tNum
      },
      mediaValue: Math.round(mediaValue / 10) * 10,
      passValue: Math.round(passValue / 100) * 100,
      mode
    });
    
    setIsCalculating(false);
  };

  const fmt = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);

  const handleVipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vipContact.trim()) return;
    setVipStatus('loading');
    
    try {
      const response = await fetch('/api/vip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: vipContact,
          name: result?.name,
          username: result?.username,
          aura: result?.ovr
        })
      });

      if (response.ok) {
        setVipStatus('success');
      } else {
        setVipStatus('idle');
        alert('Ocorreu um erro ao salvar seu contato. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setVipStatus('idle');
      alert('Erro de conexão. Verifique sua internet.');
    }
  };

  const handleDownloadCard = async () => {
    if (!cardRef.current || !result) return;
    setIsDownloading(true);
    try {
      const { toJpeg } = await import('html-to-image');
      const dataUrl = await toJpeg(cardRef.current, {
        quality: 0.95,
        backgroundColor: '#ffffff',
        pixelRatio: 3, // Alta resolução
      });

      // Compartilhamento Nativo no Celular (Abre aquela gavetinha do WhatsApp/Insta)
      if (navigator.share) {
        try {
          const response = await fetch(dataUrl);
          const blob = await response.blob();
          const file = new File([blob], `scout-${result.username.replace('@', '')}.jpg`, { type: 'image/jpeg' });
          
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: 'Meu Scout',
              text: `⚽ Saiu meu scout no SouJogadorCaro!\n🔥 AURA: ${result.ovr} | 💰 Meu Passe: ${fmt(result.passValue)}\n\nCalcule o seu também: https://soujogadorcaro.pro`,
              files: [file]
            });
            setIsDownloading(false);
            return; // Sucesso no compartilhamento nativo!
          }
        } catch (shareErr) {
          console.log('Compartilhamento cancelado ou falhou, caindo para download.', shareErr);
        }
      }

      // Fallback: Se for PC ou o compartilhamento falhar, faz o download normal da imagem
      const link = document.createElement('a');
      link.download = `scout-${result.username.replace('@', '')}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Erro ao gerar imagem:', err);
      alert('Não foi possível gerar a imagem no momento.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section id="calculadora" className="w-full py-24 px-4 relative bg-slate-50">
      <div className="relative max-w-2xl mx-auto flex flex-col items-center">
        <p className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-wider mb-3">
          Calculadora de Passe
        </p>

        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-center text-[var(--color-navy)]">
          Qual a sua <span className="text-[var(--color-gold)]">AURA e Valor?</span>
        </h2>

        <p className="text-slate-600 text-center max-w-lg mb-10">
          Descubra o seu potencial de patrocínio local e o valor do seu Passe Digital baseado em dados reais.
        </p>

        <form onSubmit={calculate} className="w-full max-w-md mb-6 flex flex-col gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Nome Completo</label>
              <input type="text" placeholder="Ex: Lucas Souza" className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2.5 focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] outline-none transition-all" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">@ Instagram</label>
              <input 
                type="text" 
                placeholder="Ex: @lucas_camisa10" 
                className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2.5 focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] outline-none transition-all" 
                value={username} 
                onChange={e => {
                  let val = e.target.value;
                  if (val.length > 0 && !val.startsWith('@')) {
                    val = '@' + val;
                  }
                  setUsername(val);
                }} 
                required 
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Posição</label>
              <select className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2.5 focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] outline-none bg-white transition-all" value={position} onChange={e => setPosition(e.target.value)}>
                <option>Goleiro</option>
                <option>Zagueiro</option>
                <option>Lateral</option>
                <option>Volante</option>
                <option>Meio-Campo</option>
                <option>Meia Atacante</option>
                <option>Atacante</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Categoria</label>
              <select className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2.5 focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] outline-none bg-white transition-all" value={category} onChange={e => setCategory(e.target.value)}>
                <option>Amador / Várzea</option>
                <option>Sub-17</option>
                <option>Sub-20</option>
                <option>Universitário</option>
                <option>Semi-Profissional</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-[2]">
              <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Qtd Seguidores</label>
              <input
                type="number"
                placeholder="Ex: 45000"
                className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2.5 focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] outline-none transition-all"
                value={followers}
                onChange={(e) => setFollowers(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Idade</label>
              <input
                type="number"
                placeholder="Ex: 19"
                className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2.5 focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] outline-none transition-all"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Nº Camisa</label>
              <input
                type="number"
                placeholder="Ex: 10"
                className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2.5 focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] outline-none transition-all"
                value={jerseyNumber}
                onChange={(e) => setJerseyNumber(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Expandable Field Data Section */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 mt-2">
            <button
              type="button"
              onClick={() => setShowFieldData(!showFieldData)}
              className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-[var(--color-navy)] hover:bg-slate-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                ⚽ Adicionar Dados de Campo <span className="text-[10px] font-normal text-slate-400">(Opcional)</span>
              </span>
              {showFieldData ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {showFieldData && (
              <div className="p-4 border-t border-slate-100 grid grid-cols-2 gap-3 bg-slate-50/50">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Partidas</label>
                  <input type="number" placeholder="Ex: 82" className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-[var(--color-gold)]" value={matches} onChange={e => setMatches(e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Gols</label>
                  <input type="number" placeholder="Ex: 47" className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-[var(--color-gold)]" value={goals} onChange={e => setGoals(e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Assistências</label>
                  <input type="number" placeholder="Ex: 23" className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-[var(--color-gold)]" value={assists} onChange={e => setAssists(e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Títulos / Troféus</label>
                  <input type="number" placeholder="Ex: 3" className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-[var(--color-gold)]" value={trophies} onChange={e => setTrophies(e.target.value)} />
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isCalculating}
            className="mt-4 w-full py-3.5 font-bold rounded-xl bg-[var(--color-gold)] text-white hover:bg-[var(--color-gold-hover)] transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-wait shadow-md"
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

        {/* RESULTS AREA */}
        {result && (
          <div className="w-full max-w-sm mt-4 animate-slide-up flex flex-col items-center">
            
            {/* The Main Card */}
            <div ref={cardRef} className="relative w-full max-w-[360px] bg-white rounded-[20px] shadow-2xl overflow-hidden border border-slate-100 pb-1">
              <div className="h-2 w-full bg-gradient-to-r from-[var(--color-navy)] via-[var(--color-gold)] to-[var(--color-navy)]"></div>
              
              <div className="p-6">
                {/* Row 1: Header */}
                <div className="flex justify-between items-start">
                  {/* AURA Badge */}
                  <div className="bg-[#fcefc7] border border-[#f5d996] rounded-xl px-4 py-2 flex flex-col items-center justify-center min-w-[4.5rem] shadow-sm">
                    <span className="text-3xl font-black text-[var(--color-navy)] leading-none drop-shadow-sm">{result.ovr}</span>
                    <span className="text-[10px] font-black text-amber-600 mt-1 tracking-wider">AURA</span>
                  </div>
                  
                  {/* Position */}
                  <div className="flex-1 px-4 pt-1 flex flex-col justify-center">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Posição</span>
                    <span className="block text-[15px] font-bold text-[var(--color-navy)]">{result.position}</span>
                  </div>
                </div>

                {/* Row 2: Profile */}
                <div className="flex items-center gap-4 mt-8">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    {/* Custom Football Jersey SVG */}
                    <svg 
                      viewBox="0 0 24 24" 
                      className="w-16 h-16 text-[var(--color-navy)] drop-shadow-md"
                      fill="currentColor" 
                    >
                      <path d="M7.5 3 C 7.5 3, 12 6, 16.5 3 L 21 7.5 V 11.5 H 18 V 21 H 6 V 11.5 H 3 V 7.5 L 7.5 3 Z" />
                    </svg>
                    {/* Jersey Number Overlay */}
                    <span className="absolute inset-0 flex items-center justify-center text-xl font-black text-white mt-2 drop-shadow-sm tracking-tighter">
                      {result.jerseyNumber}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[22px] font-black text-[var(--color-navy)] leading-tight">{result.name}</h3>
                    <p className="text-xs font-medium text-slate-500 mt-1">
                      {result.username} <span className="mx-1">·</span> {result.category}
                    </p>
                  </div>
                </div>

                {/* Row 3: Stats */}
                <div className="mt-7 bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col gap-4 shadow-inner">
                  <div className="flex justify-between items-center px-1">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Users className="w-4 h-4 text-[var(--color-gold)]" />
                        <span className="text-xl font-black text-[var(--color-navy)]">{result.followersFormatted}</span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Seguidores</span>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <TrendingUp className="w-4 h-4 text-[var(--color-gold)]" />
                        <span className="text-xl font-black text-[var(--color-navy)]">8.4%</span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Engajamento</span>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Eye className="w-4 h-4 text-[var(--color-gold)]" />
                        <span className="text-xl font-black text-[var(--color-navy)]">{result.reachFormatted}</span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Alcance</span>
                    </div>
                  </div>
                  
                  {/* Field Stats (Mode 2) */}
                  {result.mode === 2 && (
                    <>
                      <div className="w-full h-px bg-slate-200 my-1"></div>
                      <div className="flex justify-between items-center px-4">
                        <div className="flex flex-col items-center">
                          <span className="text-lg font-black text-[var(--color-navy)]">{result.raw.goals}</span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Gols</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-lg font-black text-[var(--color-navy)]">{result.raw.assists}</span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Passes</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-lg font-black text-[var(--color-navy)]">{result.raw.trophies}</span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Títulos</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Row 4: CTAs */}
                <div className="flex flex-col gap-2 mt-7">
                  {/* Patrocínio */}
                  <div className="bg-[var(--color-navy)] rounded-xl p-4 flex justify-between items-center shadow-lg border border-slate-800">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[var(--color-gold)]" />
                      <span className="text-[13px] font-medium text-white/90">Patrocínio:</span>
                    </div>
                    <span className="text-lg font-black text-[var(--color-gold)]">{fmt(result.mediaValue)}<span className="text-[10px] font-medium text-white/60 ml-0.5">/mês</span></span>
                  </div>

                  {/* Valor do Passe */}
                  <div className="bg-[var(--color-navy)] rounded-xl p-4 flex justify-between items-center shadow-lg border border-slate-800 opacity-95">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-slate-300" />
                      <span className="text-[13px] font-medium text-slate-300">Valor do Passe:</span>
                    </div>
                    <span className="text-lg font-black text-white">{fmt(result.passValue)}</span>
                  </div>
                </div>

                {/* Brand Footer & QR Code */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between items-center">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Calcule sua AURA em:</p>
                    <p className="text-xs font-black text-[var(--color-navy)] tracking-tight">soujogadorcaro.pro</p>
                  </div>
                  <div className="bg-white p-1 rounded-lg shadow-sm border border-slate-200 flex items-center justify-center">
                    <QRCodeSVG value="https://soujogadorcaro.pro" size={32} level="M" />
                  </div>
                </div>
              </div>
            </div>

            {/* Virality: Download Card Button */}
            <button 
              onClick={handleDownloadCard}
              disabled={isDownloading}
              className="mt-5 w-full max-w-[360px] bg-[var(--color-navy)] hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-slate-900/25 disabled:opacity-70"
            >
              {isDownloading ? (
                <span className="flex items-center gap-2">Gerando Imagem...</span>
              ) : (
                <>
                  <Share2 className="w-5 h-5 text-[var(--color-gold)]" />
                  Compartilhar Card
                </>
              )}
            </button>

            {/* Mode 1 Upsell */}
            {result.mode === 1 && (
              <div className="mt-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs px-4 py-3 rounded-xl text-center shadow-sm max-w-[360px] w-full">
                <p className="font-bold mb-1 flex items-center justify-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-[var(--color-gold)]" /> Destrave sua AURA Completa!
                </p>
                <p className="text-amber-800/80">Adicione seus dados de campo no formulário acima para aumentar seu Passe e liberar todas as estatísticas do card.</p>
              </div>
            )}

            {/* Premium AI Upsell */}
            <div className="mt-5 w-full max-w-[360px] bg-gradient-to-br from-[var(--color-navy)] to-[#0c1829] rounded-xl p-5 shadow-lg border border-[var(--color-gold)]/20 text-left relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-[var(--color-gold)]/10 rounded-full blur-2xl group-hover:bg-[var(--color-gold)]/20 transition-all"></div>
              
              <div className="flex items-center gap-2 mb-2 relative z-10">
                <Sparkles className="w-4 h-4 text-[var(--color-gold)]" />
                <span className="text-[10px] font-black text-[var(--color-gold)] uppercase tracking-widest">Em Breve: Plano PRO</span>
              </div>
              
              <p className="text-xs text-slate-300 font-medium leading-relaxed mb-4 relative z-10">
                O maior facilitador na busca de patrocínios e valorização da sua imagem. Tenha sua página exclusiva <strong className="text-white">soujogadorcaro.pro/{result.username.replace('@', '')}</strong> com a recuperação real dos seus dados nas redes sociais.
              </p>
              
              <button 
                onClick={() => setIsVipModalOpen(true)}
                className="w-full py-2.5 rounded-lg border border-[var(--color-gold)]/40 text-[var(--color-gold)] text-[11px] uppercase tracking-wider font-bold hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)] transition-colors relative z-10"
              >
                Entrar na Lista VIP
              </button>
            </div>

          </div>
        )}

        {/* Modal da Lista VIP */}
        {isVipModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-2xl animate-slide-up">
              <button 
                onClick={() => { setIsVipModalOpen(false); setVipStatus('idle'); setVipContact(''); }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              {vipStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-black text-[var(--color-navy)] mb-2">Você está na Lista!</h3>
                  <p className="text-slate-600">
                    Sua vaga VIP para garantir o perfil <strong className="text-slate-800">/{result?.username.replace('@', '')}</strong> foi reservada. Avisaremos você em breve!
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-[var(--color-gold)]" />
                    <h3 className="text-xl font-black text-[var(--color-navy)]">Destrave o Plano PRO</h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-6">
                    Seja um dos primeiros a ter sua página exclusiva <strong className="text-[var(--color-navy)]">soujogadorcaro.pro/{result?.username.replace('@', '')}</strong> e comece a fechar patrocínios na sua cidade.
                  </p>
                  
                  <form onSubmit={handleVipSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">E-mail ou WhatsApp</label>
                      <input 
                        type="text" 
                        placeholder="Ex: 11999999999 ou email@exemplo.com"
                        className="w-full text-sm rounded-xl border border-slate-200 px-4 py-3 focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] outline-none transition-all"
                        value={vipContact}
                        onChange={e => setVipContact(e.target.value)}
                        required
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={vipStatus === 'loading'}
                      className="w-full py-3.5 rounded-xl font-bold text-[var(--color-navy)] bg-[var(--color-gold)] hover:bg-[var(--color-gold-hover)] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {vipStatus === 'loading' ? 'Registrando...' : 'Garantir Minha Vaga VIP'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
