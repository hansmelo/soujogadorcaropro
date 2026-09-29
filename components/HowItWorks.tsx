import React from 'react';
import { UserPlus, Share2, HandCoins } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Crie seu Perfil',
    description: 'Conecte seu Instagram e preencha seus dados de atleta em menos de 2 minutos. Sem formulários intermináveis.',
  },
  {
    number: '02',
    icon: Share2,
    title: 'Compartilhe seu Link',
    description: 'Receba uma página profissional com URL exclusiva. Envie para marcas da sua cidade ou coloque na bio.',
  },
  {
    number: '03',
    icon: HandCoins,
    title: 'Receba Propostas',
    description: 'Marcas locais visualizam seu Passe com dados reais e entram em contato diretamente pelo WhatsApp.',
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="relative w-full py-24 md:py-32 px-4 bg-night border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="reveal text-center mb-16 md:mb-20">
          <p className="text-xs font-bold text-gold uppercase tracking-[0.25em] mb-4">Simples como um gol de placa</p>
          <h2 className="font-display font-black uppercase text-5xl md:text-6xl leading-[0.9] tracking-tight text-white">
            3 passos para o seu <br className="hidden sm:block" />
            <span className="text-gold-gradient">primeiro patrocínio</span>
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Connector line */}
          <div className="hidden md:block absolute top-[52px] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          {steps.map((step) => (
            <div
              key={step.number}
              className="reveal group relative flex flex-col items-center text-center p-8 pt-0 rounded-3xl"
            >
              <div className="relative mb-7">
                <div className="absolute inset-0 rounded-full bg-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-[104px] h-[104px] rounded-full bg-surface border border-white/10 flex items-center justify-center group-hover:border-gold/50 transition-colors">
                  <step.icon className="w-8 h-8 text-gold" />
                  <span className="absolute -top-1 -right-1 w-9 h-9 rounded-full bg-gold text-gold-ink font-display font-black text-base flex items-center justify-center shadow-lg">
                    {step.number}
                  </span>
                </div>
              </div>
              <h3 className="font-display font-extrabold uppercase text-2xl tracking-wide text-white mb-2">{step.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
