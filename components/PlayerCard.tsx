import React from 'react';
import { Users, TrendingUp, Eye, Shield, Trophy } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const POSITION_CODES: Record<string, string> = {
  'Goleiro': 'GOL',
  'Zagueiro': 'ZAG',
  'Lateral': 'LAT',
  'Volante': 'VOL',
  'Meio-Campo': 'MC',
  'Meia Atacante': 'MEI',
  'Atacante': 'ATA',
};

export interface PlayerCardData {
  ovr: number | string;
  name: string;
  username: string;
  position: string;
  category: string;
  jerseyNumber: string;
  followers: string;
  engagement: string;
  reach: string;
  fieldStats?: { goals: number; assists: number; trophies: number };
  sponsorship: string;
  passValue: string;
}

interface PlayerCardProps {
  data: PlayerCardData;
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
}

export default function PlayerCard({ data, ref, className = '' }: PlayerCardProps) {
  const positionCode = POSITION_CODES[data.position] ?? data.position.slice(0, 3).toUpperCase();

  return (
    <div
      ref={ref}
      className={`relative w-[340px] max-w-full rounded-[28px] p-[3px] bg-gradient-to-br from-gold-light via-gold to-gold-deep shadow-[0_30px_80px_-20px_rgba(242,193,78,0.45)] ${className}`}
    >
      <div className="relative overflow-hidden rounded-[25px] bg-[linear-gradient(160deg,#fff3c9_0%,#f7d57a_28%,#f2c14e_55%,#d9a52a_100%)] text-gold-ink">
        {/* Diagonal texture */}
        <div className="absolute inset-0 opacity-[0.12] bg-[repeating-linear-gradient(135deg,#2a1e05_0px,#2a1e05_1px,transparent_1px,transparent_12px)]" />
        {/* Top-right glow */}
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/50 blur-3xl" />

        <div className="relative px-6 pt-6 pb-5">
          {/* Header: AURA + position | jersey */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col items-center leading-none">
              <span className="font-display font-black text-[64px] tracking-tight leading-[0.85]">{data.ovr}</span>
              <span className="font-display font-extrabold text-[13px] tracking-[0.3em] mt-1.5 pl-[0.3em]">AURA</span>
              <span className="mt-2 w-8 h-px bg-gold-ink/30" />
              <span className="font-display font-extrabold text-xl mt-2 tracking-wide">{positionCode}</span>
            </div>

            <div className="relative w-[92px] h-[92px] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="absolute inset-0 w-full h-full drop-shadow-[0_6px_10px_rgba(42,30,5,0.35)]" aria-hidden="true">
                <path d="M7.5 3 C 7.5 3, 12 6, 16.5 3 L 21 7.5 V 11.5 H 18 V 21 H 6 V 11.5 H 3 V 7.5 L 7.5 3 Z" fill="#0a1120" />
                <path d="M7.5 3 C 7.5 3, 12 6, 16.5 3" fill="none" stroke="#f2c14e" strokeWidth="0.6" />
              </svg>
              <span className="relative mt-4 font-display font-black text-[34px] leading-none text-gold tracking-tight">
                {data.jerseyNumber || '?'}
              </span>
            </div>
          </div>

          {/* Name */}
          <div className="mt-5 text-center">
            <h3 className="font-display font-black uppercase text-[30px] leading-none tracking-tight truncate">
              {data.name}
            </h3>
            <p className="mt-1.5 text-[12px] font-semibold text-gold-ink/70 truncate">
              {data.username} <span className="mx-1">·</span> {data.category}
            </p>
          </div>

          {/* Social stats */}
          <div className="mt-5 grid grid-cols-3 border-y border-gold-ink/20 py-3">
            {[
              { icon: Users, value: data.followers, label: 'Seguidores' },
              { icon: TrendingUp, value: data.engagement, label: 'Engaj.' },
              { icon: Eye, value: data.reach, label: 'Alcance' },
            ].map((stat, i) => (
              <div key={stat.label} className={`flex flex-col items-center ${i > 0 ? 'border-l border-gold-ink/20' : ''}`}>
                <div className="flex items-center gap-1">
                  <stat.icon className="w-3.5 h-3.5 opacity-70" />
                  <span className="font-display font-black text-[22px] leading-none">{stat.value}</span>
                </div>
                <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-gold-ink/60">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Field stats (full mode) */}
          {data.fieldStats && (
            <div className="grid grid-cols-3 border-b border-gold-ink/20 py-3">
              {[
                { value: data.fieldStats.goals, label: 'Gols' },
                { value: data.fieldStats.assists, label: 'Assist.' },
                { value: data.fieldStats.trophies, label: 'Títulos' },
              ].map((stat, i) => (
                <div key={stat.label} className={`flex items-baseline justify-center gap-1.5 ${i > 0 ? 'border-l border-gold-ink/20' : ''}`}>
                  <span className="font-display font-black text-[20px] leading-none">{stat.value}</span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-gold-ink/60">{stat.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Values */}
          <div className="mt-4 rounded-2xl bg-ink text-white overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="flex items-center gap-2 text-[12px] font-medium text-slate-300">
                <Shield className="w-4 h-4 text-gold" /> Patrocínio
              </span>
              <span className="font-display font-black text-[22px] leading-none text-gold">
                {data.sponsorship}
                <span className="font-sans text-[10px] font-medium text-white/50 ml-0.5">/mês</span>
              </span>
            </div>
            <div className="h-px bg-white/10 mx-4" />
            <div className="flex items-center justify-between px-4 py-3">
              <span className="flex items-center gap-2 text-[12px] font-medium text-slate-300">
                <Trophy className="w-4 h-4 text-slate-400" /> Valor do Passe
              </span>
              <span className="font-display font-black text-[22px] leading-none">{data.passValue}</span>
            </div>
          </div>

          {/* Brand footer */}
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-gold-ink/60">Calcule sua AURA em</p>
              <p className="font-display font-black text-[15px] tracking-tight leading-tight">SOUJOGADORCARO.PRO</p>
            </div>
            <div className="rounded-lg bg-white p-1 shadow-sm">
              <QRCodeSVG value="https://soujogadorcaro.pro" size={34} level="M" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
