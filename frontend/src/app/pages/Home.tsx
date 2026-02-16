import React from 'react';
import {
    BarChart3, BookText,
    Download, MapIcon, MousePointer2, TrendingUp
} from 'lucide-react';

import { Logo } from '@/components/Logo';
import { Hero } from '@/components/Hero';
import { FeatureCard } from "@/components/Cartoes";

/**
 * Página inicial do Portal Cidadão de Olho.
 *
 * @description
 * Componente principal da home page, combinando elementos hero e cards de funcionalidades.
 * - Hero com logo, título e ações.
 * - Grid de FeatureCards com seis funcionalidades principais.
 *
 * Mantém responsividade, acessibilidade e consistência de design.
 * Indicado para portais públicos ou produtos corporativos.
 *
 * @layout
 * - Background global: bg-background (Tailwind)
 * - Grid responsivo: 1 coluna mobile, 3 colunas md/lg
 * - Gap entre cards: 6
 *
 * @accessibility
 * - Icons do lucide-react são decorativos (aria-hidden implícito)
 * - Links e botões de Hero possuem foco visível
 *
 * @uiux
 * - Hover effects (`hover:shadow-lg/scale`) garantem feedback visual
 * - Gradiente `bg-brazil-gradient` aplicado a palavras-chave do título
 * - Uso consistente de tipografia (`font-black`, `text-transparent`) e espaçamento
 */
export default function Home() {
    return (
        <div className="bg-background">

            {/* ==============================
          Hero Section
          - Logo responsivo
          - Título com destaque (gradiente)
          - Ações principais (primary/secondary)
         ============================== */}
            <Hero
                logo={
                    <Logo className="w-32 h-32 md:w-56 md:h-56" />
                }
                titulo={
                    <>
                        de{' '}
                        <span className="bg-brazil-gradient bg-clip-text text-transparent font-black">
              brasileiro
            </span>
                        <br />
                        para{' '}
                        <span className="bg-brazil-gradient bg-clip-text text-transparent font-black">
              brasileiro
            </span>
                        .
                    </>
                }
                acoes={[
                    {
                        label: 'Dar uma olhada',
                        href: '/geral',
                        variant: 'primary',
                    },
                    {
                        label: 'Como funciona?',
                        href: '#como-funciona',
                        variant: 'secondary',
                    },
                ]}
            />

            {/* ==============================
          Feature Cards Section
          - Grid responsivo de cards
          - 1-6 cards com variantes (primary, secondary, accent)
          - Hover effects e slots extras (ex.: Educativo)
         ============================== */}
            <section className="py-16 max-w-7xl mx-auto px-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">

                    {/* 1. Para onde vai? → Card principal */}
                    <FeatureCard
                        href="/gastos"
                        variant="primary"
                        icon={<BarChart3 className="w-7 h-7" />}
                        title="Para onde vai?"
                        description="Entenda como tem sido gasto o dinheiro que pagamamos de impostos."
                        actionLabel="Ver Despesas"
                        hoverClassName="hover:shadow-lg hover:scale-105 transition-transform"
                    />

                    {/* 2. De onde vem? → Complementar */}
                    <FeatureCard
                        href="/arrecadacao"
                        variant="secondary"
                        icon={<TrendingUp className="w-7 h-7" />}
                        title="De onde vem?"
                        description="Entenda quais são as principais formas com que o governo tem arrecadado dinheiro."
                        actionLabel="Ver Receitas"
                        hoverClassName="hover:shadow-md hover:scale-105 transition-transform"
                    />

                    {/* 3. Dados Livres → Avançado */}
                    <FeatureCard
                        href="/dados-abertos"
                        variant="accent"
                        icon={<Download className="w-7 h-7" />}
                        title="Dados Livres"
                        description="Você também pode baixar os dados que nós buscamos, consolidamos e divulgamos."
                        actionLabel="Exportar CSV"
                        hoverClassName="hover:shadow-lg hover:scale-110 transition-transform"
                    />

                    {/* 4. Performance por Estado */}
                    <FeatureCard
                        href="/performance"
                        variant="secondary"
                        icon={<MapIcon className="w-7 h-7" />}
                        title="Como é onde você mora"
                        description="Veja como tem sido as fontes de receitas e gastos do estado onde você mora e compare com outros locais."
                        actionLabel="Ver Comparativo"
                        hoverClassName="hover:shadow-lg hover:scale-105 transition-transform"
                    />

                    {/* 5. Projetos em Destaque → Impacto direto */}
                    <FeatureCard
                        href="/glossario"
                        variant="accent"
                        icon={<BookText className="w-7 h-7" />}
                        title="Dicionário"
                        description="Adotamos uma linguagem acessível, aqui você encontra vários termos que possam ser desconhecido."
                        actionLabel="Ver Dicionário"
                        hoverClassName="hover:shadow-md hover:scale-105 transition-transform"
                        extraSlot={<span className="text-xs uppercase font-bold text-muted-foreground">Educativo</span>}
                    />

                    {/* 6. Educação Fiscal → Aprendizado */}
                    <FeatureCard
                        href="/educacao-fiscal"
                        variant="primary"
                        icon={<MousePointer2 className="w-7 h-7" />}
                        title="Aprenda a fiscalizar"
                        description="Guias e tutoriais para entender orçamento, impostos e relatórios de forma simples."
                        actionLabel="Começar"
                        hoverClassName="hover:shadow-lg hover:scale-110 transition-transform"
                        extraSlot={<span className="text-xs uppercase font-bold text-muted-foreground">Educativo</span>}
                    />

                </div>
            </section>
        </div>
    );
}
