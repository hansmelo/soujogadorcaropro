import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: 'Em duas semanas fechei meu primeiro contrato com uma academia do bairro. O Mídia Kit fez toda a diferença.',
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
    <section className="w-full py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">
            Depoimentos
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Atletas que já estão jogando no nível PRO
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
            >
              <Quote className="w-5 h-5 text-amber-500/40 mb-3" />
              <p className="text-sm text-slate-300 leading-relaxed mb-6 flex-1">
                {t.quote}
              </p>
              <div className="border-t border-white/[0.06] pt-4">
                <p className="text-sm font-bold text-slate-100">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
                <p className="text-xs text-amber-400/70 mt-0.5">{t.followers}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
