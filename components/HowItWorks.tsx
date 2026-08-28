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
    description: 'Marcas locais visualizam seu Mídia Kit com dados reais e entram em contato diretamente pelo WhatsApp.',
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="w-full py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">
            Simples como um gol de placa
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            3 passos para o seu primeiro patrocínio
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-amber-500/30 transition-colors">
              {/* Step number */}
              <span className="text-6xl font-black text-white/[0.04] absolute top-4 right-4 select-none">
                {step.number}
              </span>

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/20 flex items-center justify-center mb-6">
                <step.icon className="w-6 h-6 text-amber-400" />
              </div>

              <h3 className="text-lg font-bold mb-2 text-slate-100">{step.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>

              {/* Connector line (hidden on last item and on mobile) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t border-dashed border-slate-800" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
