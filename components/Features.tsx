import React from 'react';
import { BarChart3, Target, Sparkles } from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: 'Dados que Convencem',
    description: 'Seus números de engajamento, alcance e demografia são puxados automaticamente e apresentados de forma que qualquer marca entenda seu valor.',
  },
  {
    icon: Target,
    title: 'Conexão com Marcas Locais',
    description: 'Barbearias, academias, suplementos, lojas de esporte. Seu Mídia Kit é formatado para o mercado que importa: o da sua cidade.',
  },
  {
    icon: Sparkles,
    title: 'Roteiros de Conteúdo com IA',
    description: 'Receba ideias diárias de conteúdo para TikTok e Reels adaptadas à sua posição, temporada e estilo de jogo.',
  },
];

export default function Features() {
  return (
    <section id="recursos" className="py-24 px-4 max-w-5xl mx-auto w-full">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">
          Recursos
        </p>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight">
          Tudo para jogar no{' '}
          <span className="text-amber-500">nível PRO</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="group flex flex-col p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-amber-500/30 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <feature.icon className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-slate-100">{feature.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
