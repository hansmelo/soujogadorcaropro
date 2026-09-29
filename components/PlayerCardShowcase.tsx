import React from 'react';
import PlayerCard from './PlayerCard';
import { SAMPLE_PLAYER, SAMPLE_PLAYER_FULL } from '@/lib/samplePlayers';

const highlights = [
  {
    tag: 'AURA',
    title: 'Sua nota de 0 a 99',
    description: 'Combina alcance, engajamento, idade e desempenho em campo em um único número que qualquer marca entende.',
  },
  {
    tag: 'R$',
    title: 'Valor de patrocínio',
    description: 'Quanto sua mídia vale por mês para uma marca local — e o valor estimado do seu passe comercial.',
  },
  {
    tag: 'QR',
    title: 'Pronto para viralizar',
    description: 'Compartilhe o card nos Stories ou no WhatsApp. O QR code leva direto para a calculadora.',
  },
];

const segments = [
  'Barbearias', 'Academias', 'Suplementos', 'Lojas de Esporte', 'Hamburguerias',
  'Clínicas de Fisioterapia', 'Escolinhas', 'Açaiterias', 'Óticas', 'Oficinas',
];

export default function PlayerCardShowcase() {
  return (
    <>
      {/* Segments marquee */}
      <div className="w-full border-y border-white/5 bg-night py-5 overflow-hidden">
        <div className="flex w-max animate-marquee">
          {[...segments, ...segments].map((s, i) => (
            <span key={i} className="flex items-center gap-8 pr-8 font-display font-bold uppercase text-xl tracking-wide text-slate-500 whitespace-nowrap">
              {s}
              <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
            </span>
          ))}
        </div>
      </div>

      <section className="relative w-full py-24 md:py-32 px-4 overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal text-center lg:text-left">
            <p className="text-xs font-bold text-gold uppercase tracking-[0.25em] mb-4">Cartão do Atleta PRO</p>
            <h2 className="font-display font-black uppercase text-5xl md:text-6xl leading-[0.9] tracking-tight text-white mb-5">
              Seu perfil vira um <span className="text-gold-gradient">card de elite</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
              Apresente seus números com a credibilidade de um scout profissional. Marcas locais entendem seu valor em segundos.
            </p>

            <div className="flex flex-col gap-3 text-left max-w-lg mx-auto lg:mx-0">
              {highlights.map((h) => (
                <div key={h.tag} className="flex gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-gold/30 hover:bg-white/[0.05] transition-colors">
                  <span className="shrink-0 w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center font-display font-black text-gold text-lg">
                    {h.tag}
                  </span>
                  <div>
                    <h3 className="font-bold text-white mb-0.5">{h.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{h.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fanned cards */}
          <div className="reveal relative h-[600px] sm:h-[620px] flex items-center justify-center">
            <div className="absolute scale-[0.82] sm:scale-90 -translate-x-10 sm:-translate-x-24 -rotate-[8deg] opacity-60 blur-[1px]">
              <PlayerCard data={SAMPLE_PLAYER} />
            </div>
            <div className="absolute scale-90 sm:scale-100 translate-x-2 sm:translate-x-16 rotate-[5deg] transition-transform duration-500 hover:rotate-0 sm:hover:scale-[1.02]">
              <PlayerCard data={SAMPLE_PLAYER_FULL} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
