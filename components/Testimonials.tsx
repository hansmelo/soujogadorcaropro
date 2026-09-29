import React from 'react';
import { Star } from 'lucide-react';

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

const initials = (name: string) => name.split(' ').map((n) => n[0]).join('').slice(0, 2);

export default function Testimonials() {
  return (
    <section className="w-full py-24 md:py-32 px-4 bg-night border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="reveal text-center mb-16">
          <p className="text-xs font-bold text-gold uppercase tracking-[0.25em] mb-4">Depoimentos</p>
          <h2 className="font-display font-black uppercase text-5xl md:text-6xl leading-[0.9] tracking-tight text-white">
            Atletas que já estão <br className="hidden sm:block" />
            <span className="text-gold-gradient">jogando no nível PRO</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="reveal relative flex flex-col p-7 rounded-3xl bg-surface border border-white/5 hover:border-gold/25 hover:-translate-y-1 transition-all duration-300"
            >
              <span className="absolute top-3 right-6 font-display font-black text-8xl leading-none text-white/5 select-none" aria-hidden="true">&rdquo;</span>
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="text-slate-300 leading-relaxed mb-8 flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-5 border-t border-white/5">
                <span className="w-11 h-11 rounded-full bg-gradient-to-br from-gold-light to-gold-deep text-gold-ink font-display font-black text-lg flex items-center justify-center">
                  {initials(t.name)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                  <p className="text-[11px] font-semibold text-gold mt-0.5">{t.followers}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
