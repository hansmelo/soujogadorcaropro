import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function FooterCTA() {
  return (
    <section id="cta" className="w-full py-24 md:py-32 px-4">
      <div className="reveal relative max-w-5xl mx-auto overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#ffe7a3_0%,#f2c14e_40%,#c9971c_100%)] px-6 py-16 md:px-16 md:py-20 text-center">
        {/* Texture + pitch lines */}
        <div className="absolute inset-0 opacity-[0.08] bg-[repeating-linear-gradient(135deg,#2a1e05_0px,#2a1e05_1px,transparent_1px,transparent_14px)]" />
        <svg className="absolute -right-24 -bottom-24 w-96 h-96 opacity-20" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#2a1e05" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="#2a1e05" strokeWidth="1.5" />
        </svg>
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/40 blur-3xl" />

        <div className="relative flex flex-col items-center">
          <h2 className="font-display font-black uppercase text-5xl sm:text-6xl md:text-8xl leading-[0.85] tracking-tight text-gold-ink mb-5">
            Pronto para o <br />nível PRO?
          </h2>
          <p className="text-base md:text-lg text-gold-ink/75 max-w-lg mb-10 leading-relaxed">
            Reserve seu link exclusivo e comece a receber propostas de marcas da sua cidade ainda hoje.
          </p>

          <a
            href="#calculadora"
            className="group flex items-center gap-3 px-6 sm:px-8 py-4 sm:py-5 text-base sm:text-lg font-extrabold whitespace-nowrap text-white bg-ink rounded-2xl shadow-2xl shadow-gold-ink/30 hover:-translate-y-0.5 hover:shadow-gold-ink/50 transition-all mb-8"
          >
            Criar Meu Passe — Grátis
            <ArrowRight className="w-5 h-5 text-gold group-hover:translate-x-1 transition-transform" />
          </a>

          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-gold-ink/80">
            {['Sem cartão de crédito', 'Configuração em 2 minutos', 'Cancele quando quiser'].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <Check className="w-4 h-4" strokeWidth={3} /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
