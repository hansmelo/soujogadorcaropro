import React from 'react';
import { UserPlus, Share2, HandCoins } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    color: 'bg-[var(--color-navy)]',
    title: 'Crie seu Perfil',
    description: 'Conecte seu Instagram e preencha seus dados de atleta em menos de 2 minutos. Sem formulários intermináveis.',
  },
  {
    number: '02',
    icon: Share2,
    color: 'bg-[var(--color-gold)]',
    title: 'Compartilhe seu Link',
    description: 'Receba uma página profissional com URL exclusiva. Envie para marcas da sua cidade ou coloque na bio.',
  },
  {
    number: '03',
    icon: HandCoins,
    color: 'bg-[var(--color-navy)]',
    title: 'Receba Propostas',
    description: 'Marcas locais visualizam seu Passe com dados reais e entram em contato diretamente pelo WhatsApp.',
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="w-full py-24 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-wider mb-3">
            Simples como um gol de placa
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[var(--color-navy)]">
            3 passos para o seu primeiro patrocínio
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              {/* Step number watermark */}
              <span className="text-7xl font-black text-slate-100 absolute top-3 right-4 select-none">
                {step.number}
              </span>

              <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mb-6 shadow-sm`}>
                <step.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-lg font-bold mb-2 text-slate-800">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>

              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-slate-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
