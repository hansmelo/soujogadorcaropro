"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Zap, AlertCircle, ChevronDown, Trophy, Sparkles, CheckCircle, X, Share2, Loader2, Lock } from 'lucide-react';
import PlayerCard, { type PlayerCardData } from './PlayerCard';

const inputClass =
  'w-full text-sm text-white placeholder:text-slate-600 rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-3 outline-none transition-all hover:border-white/20 focus:border-gold focus:bg-white/[0.06] focus:ring-4 focus:ring-gold/15';

function Field({ id, label, className = '', children }: { id: string; label: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}

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
  const [vipError, setVipError] = useState('');

  // Image Download State & Ref
  const cardRef = useRef<HTMLDivElement>(null);
  const cardAreaRef = useRef<HTMLDivElement>(null);
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

    // On stacked (mobile) layouts the card sits below the form — bring it into view
    if (window.innerWidth < 1024) {
      requestAnimationFrame(() => cardAreaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  };

  const closeVipModal = () => {
    setIsVipModalOpen(false);
    setVipStatus('idle');
    setVipContact('');
    setVipError('');
  };

  const fmt = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);

  const handleVipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vipContact.trim()) return;
    setVipError('');
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
        setVipError('Ocorreu um erro ao salvar seu contato. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setVipStatus('idle');
      setVipError('Erro de conexão. Verifique sua internet.');
    }
  };

  const handleDownloadCard = async () => {
    if (!cardRef.current || !result) return;
    setIsDownloading(true);
    try {
      const { toJpeg } = await import('html-to-image');
      const dataUrl = await toJpeg(cardRef.current, {
        quality: 0.95,
        backgroundColor: '#05080f',
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
              text: `⚽ Saiu meu scout no Sou Jogador Caro!\n🔥 AURA: ${result.ovr}\n🤝 Patrocínio: ${fmt(result.mediaValue)}/mês\n💰 Meu Passe: ${fmt(result.passValue)}\n\nCalcule o seu também: https://soujogadorcaro.pro`,
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


  // Close the VIP modal with Escape
  useEffect(() => {
    if (!isVipModalOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeVipModal(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isVipModalOpen]);

  // Live preview while the form is being filled; real numbers once calculated
  const followersPreview = parseInt(followers.replace(/\D/g, ''), 10);
  const cardData: PlayerCardData = result
    ? {
        ovr: result.ovr,
        name: result.name,
        username: result.username,
        position: result.position,
        category: result.category,
        jerseyNumber: result.jerseyNumber,
        followers: result.followersFormatted,
        engagement: '8.4%',
        reach: result.reachFormatted,
        fieldStats: result.mode === 2 ? result.raw : undefined,
        sponsorship: fmt(result.mediaValue),
        passValue: fmt(result.passValue),
      }
    : {
        ovr: '??',
        name: name.trim() || 'Seu Nome',
        username: username || '@seu_insta',
        position,
        category,
        jerseyNumber,
        followers: isNaN(followersPreview) ? '—' : formatCompactNumber(followersPreview),
        engagement: '—',
        reach: '—',
        sponsorship: 'R$ ???',
        passValue: 'R$ ???',
      };

  const handle = (result?.username ?? username).replace('@', '');

  return (
    <section id="calculadora" className="relative w-full py-24 md:py-32 px-4 bg-night border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-gold/10 blur-[140px]" />
        <div className="absolute inset-0 bg-pitch-grid" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="reveal text-center mb-14">
          <p className="text-xs font-bold text-gold uppercase tracking-[0.25em] mb-4">Calculadora de Passe</p>
          <h2 className="font-display font-black uppercase text-5xl md:text-7xl leading-[0.88] tracking-tight text-white mb-5">
            Qual a sua <span className="text-gold-gradient">AURA e Valor?</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Descubra o seu potencial de patrocínio local e o valor do seu Passe Digital baseado em dados reais.
          </p>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-12 lg:gap-16 items-start max-w-5xl mx-auto">
          {/* FORM */}
          <form onSubmit={calculate} className="w-full flex flex-col gap-6 rounded-3xl bg-surface/80 backdrop-blur border border-white/10 p-5 sm:p-8 shadow-2xl shadow-black/40">
            <fieldset className="flex flex-col gap-4">
              <legend className="flex items-center gap-2 mb-4 font-display font-extrabold uppercase text-lg tracking-wide text-white">
                <span className="w-6 h-6 rounded-md bg-gold text-gold-ink text-sm font-black flex items-center justify-center">1</span>
                Sobre você
              </legend>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field id="calc-name" label="Nome Completo">
                  <input id="calc-name" type="text" placeholder="Ex: Lucas Souza" className={inputClass} value={name} onChange={e => setName(e.target.value)} required />
                </Field>
                <Field id="calc-username" label="@ Instagram">
                  <input
                    id="calc-username"
                    type="text"
                    placeholder="Ex: @lucas_camisa10"
                    className={inputClass}
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
                </Field>
                <Field id="calc-position" label="Posição">
                  <select id="calc-position" className={`${inputClass} cursor-pointer`} value={position} onChange={e => setPosition(e.target.value)}>
                    <option>Goleiro</option>
                    <option>Zagueiro</option>
                    <option>Lateral</option>
                    <option>Volante</option>
                    <option>Meio-Campo</option>
                    <option>Meia Atacante</option>
                    <option>Atacante</option>
                  </select>
                </Field>
                <Field id="calc-category" label="Categoria">
                  <select id="calc-category" className={`${inputClass} cursor-pointer`} value={category} onChange={e => setCategory(e.target.value)}>
                    <option>Amador / Várzea</option>
                    <option>Sub-17</option>
                    <option>Sub-20</option>
                    <option>Universitário</option>
                    <option>Semi-Profissional</option>
                  </select>
                </Field>
              </div>
            </fieldset>

            <fieldset className="flex flex-col gap-4">
              <legend className="flex items-center gap-2 mb-4 font-display font-extrabold uppercase text-lg tracking-wide text-white">
                <span className="w-6 h-6 rounded-md bg-gold text-gold-ink text-sm font-black flex items-center justify-center">2</span>
                Seus números
              </legend>
              <div className="grid grid-cols-[2fr_1fr_1fr] gap-3 sm:gap-4">
                <Field id="calc-followers" label="Seguidores">
                  <input id="calc-followers" type="number" inputMode="numeric" placeholder="Ex: 45000" className={inputClass} value={followers} onChange={(e) => setFollowers(e.target.value)} required />
                </Field>
                <Field id="calc-age" label="Idade">
                  <input id="calc-age" type="number" inputMode="numeric" placeholder="19" className={inputClass} value={age} onChange={(e) => setAge(e.target.value)} required />
                </Field>
                <Field id="calc-jersey" label="Camisa">
                  <input id="calc-jersey" type="number" inputMode="numeric" placeholder="10" className={inputClass} value={jerseyNumber} onChange={(e) => setJerseyNumber(e.target.value)} required />
                </Field>
              </div>
            </fieldset>

            {/* Expandable Field Data Section */}
            <div className={`rounded-2xl border transition-colors ${showFieldData ? 'border-gold/30 bg-gold/[0.04]' : 'border-white/10 border-dashed'}`}>
              <button
                type="button"
                onClick={() => setShowFieldData(!showFieldData)}
                aria-expanded={showFieldData}
                aria-controls="calc-field-data"
                className="w-full px-4 py-3.5 flex items-center justify-between gap-3 text-left rounded-2xl hover:bg-white/[0.03] transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg" aria-hidden="true">⚽</span>
                  <span>
                    <span className="block text-sm font-bold text-white">Adicionar Dados de Campo</span>
                    <span className="block text-xs text-slate-500">Opcional — aumenta sua AURA e o valor do passe</span>
                  </span>
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${showFieldData ? 'rotate-180' : ''}`} />
              </button>

              <div id="calc-field-data" className={`grid transition-[grid-template-rows] duration-300 ease-out ${showFieldData ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <div className="px-4 pb-4 pt-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <Field id="calc-matches" label="Partidas">
                      <input id="calc-matches" type="number" inputMode="numeric" placeholder="82" className={inputClass} value={matches} onChange={e => setMatches(e.target.value)} tabIndex={showFieldData ? 0 : -1} />
                    </Field>
                    <Field id="calc-goals" label="Gols">
                      <input id="calc-goals" type="number" inputMode="numeric" placeholder="47" className={inputClass} value={goals} onChange={e => setGoals(e.target.value)} tabIndex={showFieldData ? 0 : -1} />
                    </Field>
                    <Field id="calc-assists" label="Assist.">
                      <input id="calc-assists" type="number" inputMode="numeric" placeholder="23" className={inputClass} value={assists} onChange={e => setAssists(e.target.value)} tabIndex={showFieldData ? 0 : -1} />
                    </Field>
                    <Field id="calc-trophies" label="Títulos">
                      <input id="calc-trophies" type="number" inputMode="numeric" placeholder="3" className={inputClass} value={trophies} onChange={e => setTrophies(e.target.value)} tabIndex={showFieldData ? 0 : -1} />
                    </Field>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div role="alert" className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isCalculating}
              className="group w-full py-4 font-bold text-lg rounded-xl text-gold-ink bg-gradient-to-b from-gold-light to-gold shadow-[0_10px_40px_-10px_rgba(242,193,78,0.7)] hover:shadow-[0_14px_50px_-8px_rgba(242,193,78,0.85)] hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-wait disabled:hover:translate-y-0"
            >
              {isCalculating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />}
              {isCalculating ? 'Calculando Scout...' : result ? 'Recalcular Meu Card' : 'Gerar Meu Card'}
            </button>

            <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500 -mt-2">
              <Lock className="w-3 h-3" /> Grátis e sem cadastro. Seus dados não são compartilhados.
            </p>
          </form>

          {/* CARD AREA */}
          <div ref={cardAreaRef} className="flex flex-col items-center scroll-mt-24">
            <div className="flex items-center gap-2 mb-5 text-xs font-bold uppercase tracking-[0.2em]">
              {result ? (
                <><CheckCircle className="w-4 h-4 text-pitch" /><span className="text-pitch">Seu card está pronto</span></>
              ) : (
                <><span className="w-2 h-2 rounded-full bg-gold animate-live-pulse" /><span className="text-slate-400">Pré-visualização ao vivo</span></>
              )}
            </div>

            <div className="relative">
              <div className={`absolute inset-0 m-auto w-64 h-64 rounded-full blur-[80px] transition-colors duration-700 ${result ? 'bg-gold/40' : 'bg-gold/10'}`} />
              <div key={result ? `${result.name}-${result.ovr}-${result.passValue}` : 'preview'} className={`relative ${result ? 'animate-slide-up' : ''} ${isCalculating ? 'animate-pulse' : ''}`}>
                <PlayerCard ref={cardRef} data={cardData} className={result ? '' : 'saturate-[0.6]'} />
                {/* Sheen on reveal */}
                {result && (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
                    <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-sheen" />
                  </div>
                )}
              </div>
            </div>

            {result ? (
              <div className="w-full max-w-[340px] flex flex-col gap-4 mt-6 animate-slide-up [animation-delay:150ms]">
                <button
                  onClick={handleDownloadCard}
                  disabled={isDownloading}
                  className="w-full bg-white text-ink hover:bg-gold-light py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg disabled:opacity-70"
                >
                  {isDownloading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Gerando Imagem...</>
                  ) : (
                    <><Share2 className="w-5 h-5" /> Compartilhar Card</>
                  )}
                </button>

                {result.mode === 1 && (
                  <div className="rounded-xl border border-gold/25 bg-gold/[0.06] px-4 py-3 text-xs text-center">
                    <p className="font-bold text-gold mb-1 flex items-center justify-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5" /> Destrave sua AURA Completa!
                    </p>
                    <p className="text-slate-400">Adicione seus dados de campo no formulário para aumentar seu Passe e liberar todas as estatísticas do card.</p>
                  </div>
                )}

                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-2 to-surface border border-gold/20 p-5 group">
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-gold/15 rounded-full blur-2xl group-hover:bg-gold/25 transition-colors" />
                  <div className="relative flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">Em Breve: Plano PRO</span>
                  </div>
                  <p className="relative text-xs text-slate-400 leading-relaxed mb-4">
                    O maior facilitador na busca de patrocínios e valorização da sua imagem. Tenha sua página exclusiva <strong className="text-white">soujogadorcaro.pro/{handle}</strong> com a recuperação real dos seus dados nas redes sociais.
                  </p>
                  <button
                    onClick={() => setIsVipModalOpen(true)}
                    className="relative w-full py-2.5 rounded-lg bg-gold/10 border border-gold/40 text-gold text-xs uppercase tracking-wider font-bold hover:bg-gold hover:text-gold-ink transition-colors"
                  >
                    Entrar na Lista VIP
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-6 max-w-[300px] text-center text-sm text-slate-500">
                Preencha seus dados e clique em <span className="text-slate-300 font-semibold">Gerar Meu Card</span> para revelar sua AURA.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal da Lista VIP */}
      {isVipModalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-ink/80 backdrop-blur-md animate-fade-in"
          onClick={closeVipModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="vip-title"
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-surface border border-white/10 p-7 shadow-2xl animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
            <button
              onClick={closeVipModal}
              aria-label="Fechar"
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {vipStatus === 'success' ? (
              <div className="relative text-center py-6">
                <div className="w-16 h-16 bg-pitch/15 border border-pitch/30 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-8 h-8 text-pitch" />
                </div>
                <h3 id="vip-title" className="font-display font-black uppercase text-3xl text-white mb-2">Você está na Lista!</h3>
                <p className="text-slate-400">
                  Sua vaga VIP para garantir o perfil <strong className="text-white">/{handle}</strong> foi reservada. Avisaremos você em breve!
                </p>
              </div>
            ) : (
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-gold" />
                  <h3 id="vip-title" className="font-display font-black uppercase text-3xl text-white">Destrave o Plano PRO</h3>
                </div>
                <p className="text-sm text-slate-400 mb-6">
                  Seja um dos primeiros a ter sua página exclusiva <strong className="text-gold">soujogadorcaro.pro/{handle}</strong> e comece a fechar patrocínios na sua cidade.
                </p>

                <form onSubmit={handleVipSubmit} className="flex flex-col gap-4">
                  <Field id="vip-contact" label="E-mail ou WhatsApp">
                    <input
                      id="vip-contact"
                      type="text"
                      autoFocus
                      placeholder="Ex: 11999999999 ou email@exemplo.com"
                      className={inputClass}
                      value={vipContact}
                      onChange={e => setVipContact(e.target.value)}
                      required
                    />
                  </Field>
                  {vipError && (
                    <p role="alert" className="flex items-center gap-2 text-sm text-red-300">
                      <AlertCircle className="w-4 h-4 shrink-0" /> {vipError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={vipStatus === 'loading'}
                    className="w-full py-3.5 rounded-xl font-bold text-gold-ink bg-gradient-to-b from-gold-light to-gold hover:shadow-[0_10px_40px_-10px_rgba(242,193,78,0.8)] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {vipStatus === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" /> Registrando...</> : 'Garantir Minha Vaga VIP'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
