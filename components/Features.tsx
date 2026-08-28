import React from 'react';
import { BarChart3, Target, Sparkles, Trophy } from 'lucide-react';

export default function Features() {
  const items = [
    {
      icon: BarChart3,
      badge: "SCOUT PROFISSIONAL",
      title: "Dados de Partida em Tempo Real",
      description: "Diga adeus ao Linktree genérico. Exiba engajamento, alcance e demografia atualizados automaticamente com a precisão de um relatório de scout internacional."
    },
    {
      icon: Target,
      badge: "ARTILHEIRO B2B",
      title: "Conexão Direta com Marcas",
      description: "Estrutura profissional focada em conversão para apresentar seu Mídia Kit a barbearias, academias, lojas de suplementos e marcas da sua região."
    },
    {
      icon: Sparkles,
      badge: "TÁTICA DE CONTEÚDO",
      title: "Roteiros de IA do Camisa 10",
      description: "Não sabe o que postar? Receba ideias diárias para TikTok e Reels baseadas no seu momento na temporada, pré-jogo e bastidores de treinos."
    }
  ];

  return (
    <section className="py-24 px-4 max-w-6xl mx-auto w-full">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Trophy className="w-3.5 h-3.5" /> Recursos de Primeira Divisão
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
          Tudo o que você precisa para <span className="text-amber-500">jogar no nível PRO</span>
        </h2>
        <p className="text-slate-400 text-base md:text-lg">
          Ferramentas desenvolvidas especialmente para atletas de futebol construírem autoridade e fecharem contratos fora de campo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((feature, idx) => (
          <div 
            key={idx} 
            className="flex flex-col items-start p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 group hover:shadow-[0_10px_30px_rgba(245,158,11,0.1)] relative"
          >
            <span className="text-[10px] font-bold text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full mb-6 uppercase tracking-wider">
              {feature.badge}
            </span>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 mb-6 group-hover:border-amber-500/40 group-hover:scale-110 transition-transform">
              <feature.icon className="w-7 h-7 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-100">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
