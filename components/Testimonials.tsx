import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: 'Em duas semanas fechei meu primeiro contrato com uma academia do bairro. O Passe Digital fez toda a diferença.',
    name: 'Gabriel Santos',
    role: 'Atacante · Sub-20 · São Paulo',
    followers: '12K seguidores',
  },
  {
    quote: 'Antes eu mandava print do Instagram. Agora mando um link profissional e as marcas levam a sério.',
    name: 'Matheus Silva',
    role: 'Lateral · Amador · Belo Horizonte',
    followers: '8.5K seguidores',
  },
  {
    quote: 'A calculadora mostrou que meus seguidores valiam mais do que eu imaginava. Hoje tenho 3 parceiros locais.',
    name: 'Pedro Oliveira',
    role: 'Goleiro · Sub-17 · Curitiba',
    followers: '22K seguidores',
  },
];

export default function Testimonials() {
  return (
    <section className="w-full py-24 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-wider mb-3">
            Depoimentos
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[var(--color-navy)]">
            Atletas que já estão jogando no nível PRO
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col p-6 rounded-2xl bg-white border border-slate-100 shadow-sm"
            >
              <Quote className="w-5 h-5 text-[var(--color-gold)] mb-3" />
              <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t border-slate-100 pt-4">
                <p className="text-sm font-bold text-[var(--color-navy)]">{t.name}</p>
                <p className="text-xs text-slate-400">{t.role}</p>
                <p className="text-xs text-[var(--color-gold)] font-medium mt-0.5">{t.followers}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
