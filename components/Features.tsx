import React from 'react';
import { BarChart3, Target, Sparkles } from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    iconBg: 'bg-[var(--color-navy)]',
    title: 'Dados Auditados e Precisos',
    description: 'Conexão direta com a API oficial do Instagram. Suas métricas de alcance e engajamento puxadas com 100% de precisão para convencer qualquer patrocinador.',
  },
  {
    icon: Target,
    iconBg: 'bg-[var(--color-gold)]',
    title: 'Conexão com Marcas Locais',
    description: 'Barbearias, academias, suplementos, lojas de esporte. Seu Passe Digital é formatado para o mercado que importa: o da sua cidade.',
  },
  {
    icon: Sparkles,
    iconBg: 'bg-[var(--color-navy)]',
    title: 'Posts e Vídeos com IA',
    description: 'Nossa Inteligência Artificial gera roteiros para seus Reels e cria artes prontas automaticamente com a logo dos seus patrocinadores.',
    badge: 'EM BREVE NO PRO'
  },
];

export default function Features() {
  return (
    <section id="recursos" className="py-24 px-4 max-w-5xl mx-auto w-full">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-wider mb-3">
          O Futuro do Seu Patrocínio
        </p>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[var(--color-navy)]">
          Tecnologia para jogar no{' '}
          <span className="text-[var(--color-gold)]">nível PRO</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="relative group flex flex-col p-7 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            {feature.badge && (
              <div className="absolute top-4 right-4 bg-[var(--color-gold)]/15 text-[var(--color-gold)] text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-[var(--color-gold)]/30">
                {feature.badge}
              </div>
            )}
            <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-sm`}>
              <feature.icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-slate-800 pr-16">{feature.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
