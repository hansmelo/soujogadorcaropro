import React from 'react';
import { BarChart3, Target, Sparkles, MapPin } from 'lucide-react';

export default function Features() {
  return (
    <section id="recursos" className="relative w-full py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="reveal text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold text-gold uppercase tracking-[0.25em] mb-4">O Futuro do Seu Patrocínio</p>
          <h2 className="font-display font-black uppercase text-5xl md:text-6xl leading-[0.9] tracking-tight text-white">
            Tecnologia para jogar no <span className="text-gold-gradient">nível PRO</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
          {/* Data — large tile */}
          <div className="reveal md:col-span-4 relative overflow-hidden rounded-3xl bg-surface border border-white/5 p-8 md:p-10 group hover:border-white/10 transition-colors">
            <div className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full bg-pitch/10 blur-3xl" />
            <div className="relative flex flex-col md:flex-row gap-8 md:items-end">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-xl bg-pitch/10 border border-pitch/20 flex items-center justify-center mb-6">
                  <BarChart3 className="w-5 h-5 text-pitch" />
                </div>
                <h3 className="font-display font-extrabold uppercase text-3xl tracking-wide text-white mb-3">Dados Auditados e Precisos</h3>
                <p className="text-slate-400 leading-relaxed max-w-md">
                  Conexão direta com a API oficial do Instagram. Suas métricas de alcance e engajamento puxadas com 100% de precisão para convencer qualquer patrocinador.
                </p>
              </div>
              {/* Mini chart */}
              <div className="flex items-end gap-2 h-32 shrink-0" aria-hidden="true">
                {[35, 52, 44, 68, 60, 82, 96].map((h, i) => (
                  <div
                    key={i}
                    className={`w-5 rounded-t-md transition-all duration-500 group-hover:opacity-100 ${i === 6 ? 'bg-gradient-to-t from-pitch/40 to-pitch opacity-100' : 'bg-white/10 opacity-80'}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Local brands */}
          <div className="reveal md:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-gold/15 to-surface border border-gold/15 p-8 hover:border-gold/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/25 flex items-center justify-center mb-6">
              <Target className="w-5 h-5 text-gold" />
            </div>
            <h3 className="font-display font-extrabold uppercase text-3xl tracking-wide text-white mb-3">Conexão com Marcas Locais</h3>
            <p className="text-slate-400 leading-relaxed">
              Barbearias, academias, suplementos, lojas de esporte. Seu Passe Digital é formatado para o mercado que importa: o da sua cidade.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-gold/80">
              <MapPin className="w-3.5 h-3.5" /> Foco no seu bairro e na sua cidade
            </div>
          </div>

          {/* AI — full width */}
          <div className="reveal md:col-span-6 relative overflow-hidden rounded-3xl bg-surface border border-white/5 p-8 md:p-10 hover:border-white/10 transition-colors">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(242,193,78,0.12),transparent_60%)]" />
            <div className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="font-display font-extrabold uppercase text-3xl tracking-wide text-white">Posts e Vídeos com IA</h3>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-gold/10 text-gold border border-gold/30">
                    Em breve no PRO
                  </span>
                </div>
                <p className="text-slate-400 leading-relaxed max-w-2xl">
                  Nossa Inteligência Artificial gera roteiros para seus Reels e cria artes prontas automaticamente com a logo dos seus patrocinadores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
