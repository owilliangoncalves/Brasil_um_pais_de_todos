import React from 'react';
import { Map, Users, DollarSign, Building2 } from 'lucide-react'; // Ícones pertinentes ao contexto
import { formatarValorGrande } from '@/data/mockData';

/**
 * Definição das propriedades para o componente HeroStats.
 * @interface HeroStatsProps
 * @property {Object} totalNacional - Objeto contendo os agregados demográficos e financeiros do país.
 * @property {number} totalNacional.populacao - Valor numérico bruto da população total nacional.
 * @property {number} totalNacional.orcamento - Valor numérico bruto do orçamento total nacional.
 */
interface HeroStatsProps {
    totalNacional: {
        populacao: number;
        orcamento: number;
    };
}

/**
 * Componente HeroStats (Padrão Landing Page).
 * * @description Seção de impacto visual (Above the Fold) alinhada ao Design System "Cidadão de Olho".
 * Exibe títulos expressivos e os grandes números nacionais de forma limpa e tipográfica.
 * Utiliza técnicas de gradiente de texto e animações de entrada via Tailwind CSS.
 * * @component
 * @param {HeroStatsProps} props - Propriedades de entrada do componente.
 * @returns {React.JSX.Element} Seção de destaque com dados nacionais integrados e semântica de região.
 */
export function HeroStats({ totalNacional }: HeroStatsProps): React.JSX.Element {
    return (
        <section
            aria-labelledby="hero-stats-title"
            className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-border/40 overflow-hidden"
        >
            <div className="max-w-5xl mx-auto text-center space-y-10 px-6">

                {/* Badge flutuante */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 backdrop-blur-md border border-primary/10 text-primary shadow-sm mx-auto animate-in fade-in zoom-in duration-500">
                    <Map className="w-4 h-4" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">
            Monitoramento Regional
          </span>
                </div>

                <div className="space-y-6">
                    {/* Título Principal com Gradiente */}
                    <h1
                        id="hero-stats-title"
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground leading-[0.9]"
                    >
                        Raio-X dos Estados <br />
                        <span className="bg-linear-to-r from-primary via-green-500 to-emerald-400 bg-clip-text text-transparent italic pr-2">
              e Orçamentos.
            </span>
                    </h1>

                    <p className="text-muted-foreground text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium opacity-90">
                        Compare a arrecadação e os gastos de cada unidade federativa.
                        Entenda para onde vai o dinheiro em cada região do Brasil.
                    </p>
                </div>

                {/* Área de Dados (Stats)
           Adaptada para seguir o estilo "Badges de Confiança".
        */}
                <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 pt-12">

                    {/* Stat 1: Unidades Federativas */}
                    <div className="flex flex-col items-center gap-2 group">
                        <div className="flex items-center gap-2 text-[11px] font-black text-muted-foreground/60 uppercase tracking-[0.2em]">
                            <Building2 className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                            Unidades
                        </div>
                        <p className="text-3xl md:text-4xl font-black tracking-tighter text-foreground">
                            27 <span className="text-lg text-muted-foreground font-medium">UFs</span>
                        </p>
                    </div>

                    {/* Separador visual sutil (apenas desktop) */}
                    <div className="hidden md:block w-px h-12 bg-border/40 rotate-12" />

                    {/* Stat 2: População */}
                    <div className="flex flex-col items-center gap-2 group">
                        <div className="flex items-center gap-2 text-[11px] font-black text-muted-foreground/60 uppercase tracking-[0.2em]">
                            <Users className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                            População
                        </div>
                        <p className="text-3xl md:text-4xl font-black tracking-tighter text-foreground">
                            {(totalNacional.populacao / 1_000_000).toFixed(0)} <span className="text-lg text-muted-foreground font-medium">Milhões</span>
                        </p>
                    </div>

                    {/* Separador visual sutil (apenas desktop) */}
                    <div className="hidden md:block w-px h-12 bg-border/40 rotate-12" />

                    {/* Stat 3: Orçamento */}
                    <div className="flex flex-col items-center gap-2 group">
                        <div className="flex items-center gap-2 text-[11px] font-black text-muted-foreground/60 uppercase tracking-[0.2em]">
                            <DollarSign className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                            Orçamento Total
                        </div>
                        <p className="text-3xl md:text-4xl font-black tracking-tighter text-foreground">
                            {formatarValorGrande(totalNacional.orcamento)}
                        </p>
                    </div>

                </div>
            </div>

            {/* Elemento Decorativo de Fundo*/}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        </section>
    );
}