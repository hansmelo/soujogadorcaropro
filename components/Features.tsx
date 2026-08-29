import React from 'react';
import { BarChart3, Target, Sparkles } from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    iconBg: 'bg-[var(--color-brasil-green)]',
    title: 'Dados que Convencem',
    description: 'Seus números de engajamento, alcance e demografia são puxados automaticamente e apresentados de forma que qualquer marca entenda seu valor.',
  },
  {
    icon: Target,
    iconBg: 'bg-[var(--color-brasil-yellow-warm)]',
    title: 'Conexão com Marcas Locais',
    description: 'Barbearias, academias, suplementos, lojas de esporte. Seu Mídia Kit é formatado para o mercado que importa: o da sua cidade.',
  },
  {
    icon: Sparkles,
    iconBg: 'bg-[var(--color-brasil-blue)]',
    title: 'Roteiros de Conteúdo com IA',
    description: 'Receba ideias diárias de conteúdo para TikTok e Reels adaptadas à sua posição, temporada e estilo de jogo.',
  },
];

export default function Features() {
  return (
    <section id="recursos" className="py-24 px-4 max-w-5xl mx-auto w-full">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-sm font-semibold text-[var(--color-brasil-green)] uppercase tracking-wider mb-3">
          Recursos
        </p>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
          Tudo para jogar no{' '}
          <span className="text-[var(--color-brasil-green)]">nível PRO</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="group flex flex-col p-7 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-sm`}>
              <feature.icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-slate-800">{feature.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
