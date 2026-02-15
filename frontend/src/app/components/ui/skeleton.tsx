'use client';

import React from 'react';

/**
 * Skeleton para cards de indicadores simples.
 * * Renderiza um bloco com animação pulse para representar métricas ou KPIs em carregamento.
 * @component
 */
function CardSkeleton() {
    return (
        <div className="h-32 rounded-2xl bg-muted/20 animate-pulse border border-border/50 shadow-sm" />
    );
}

/**
 * Skeleton para componentes de visualização de dados (Gráficos).
 * * Mantém a paridade de altura (350px/h-87.5) com o `ResponsiveContainer` utilizado nos
 * gráficos reais para prevenir o deslocamento visual da página durante o carregamento.
 * @component
 */
function ChartSkeleton() {
    return (
        <div className="h-87.5 w-full rounded-2xl bg-muted/10 animate-pulse border border-border/50 flex flex-col p-6 space-y-6">
            <div className="space-y-2">
                <div className="h-6 w-1/4 bg-muted/20 rounded-md" />
                <div className="h-4 w-1/3 bg-muted/10 rounded-md" />
            </div>
            <div className="flex-1 w-full bg-muted/5 rounded-xl border border-border/20" />
        </div>
    );
}

/**
 * Skeleton para itens da lista de transações financeiras.
 * * Espelha a estrutura flexível do `TransactionItem`, incluindo o tratamento de
 * 'min-w-0' e 'overflow-hidden' para garantir que a prévia visual seja fiel ao card real.
 * @component
 */
function TransactionSkeleton() {
    return (
        <div className="flex items-center justify-between p-5 rounded-xl border border-border/50 bg-muted/5 animate-pulse gap-4 overflow-hidden">
            <div className="flex-1 min-w-0 space-y-3">
                <div className="flex items-center gap-3">
                    <div className="h-5 w-20 bg-muted/30 rounded-md shrink-0" />
                    <div className="h-5 w-full max-w-75 bg-muted/20 rounded-md" />
                </div>
                <div className="flex gap-4">
                    <div className="h-4 w-24 bg-muted/10 rounded-md shrink-0" />
                    <div className="h-4 w-32 bg-muted/10 rounded-md hidden xs:block" />
                </div>
            </div>
            <div className="h-8 w-24 bg-muted/20 rounded-md hidden sm:block shrink-0" />
        </div>
    );
}

/**
 * Componente DashboardSkeleton.
 * * Fornece um layout completo de "casca" (shell) para o dashboard principal.
 * Agrupa os skeletons de Hero, indicadores, gráficos e listas.
 * * @note O atributo `aria-hidden="true"` é utilizado para que tecnologias assistivas
 * ignorem os elementos de carregamento, reduzindo ruído visual/auditivo.
 * * @component
 * @returns {JSX.Element} Estrutura de carregamento integral do dashboard.
 */
export function DashboardSkeleton(): React.JSX.Element {
    return (
        <div
            className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12 overflow-hidden"
            aria-hidden="true" /* Esconde do leitor de tela para evitar poluição sonora */
        >

            {/* Hero Skeleton: Mimetiza a HeroSection com opacidades suaves */}
            <div className="py-20 flex flex-col items-center text-center space-y-8">
                <div className="h-7 w-48 bg-primary/10 rounded-full border border-primary/10" />
                <div className="space-y-4 w-full flex flex-col items-center">
                    <div className="h-12 md:h-16 w-full max-w-2xl bg-muted/20 rounded-2xl" />
                    <div className="h-12 md:h-16 w-full max-w-md bg-muted/20 rounded-2xl" />
                </div>
                <div className="h-6 w-full max-w-lg bg-muted/10 rounded-xl" />
            </div>

            {/* Grid de Indicadores: Reflete os Cards de métricas superiores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>

            {/* Seção do Gráfico de Linha principal */}
            <ChartSkeleton />

            {/* Seção de Gráficos Secundários em grade */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartSkeleton />
                <ChartSkeleton />
            </div>

            {/* Lista de Transações: Renderiza múltiplos placeholders para preencher o viewport vertical */}
            <div className="space-y-4 pb-12">
                <div className="flex justify-between items-center mb-6">
                    <div className="h-8 w-48 bg-muted/20 rounded-md" />
                    <div className="h-8 w-32 bg-muted/10 rounded-md" />
                </div>
                <TransactionSkeleton />
                <TransactionSkeleton />
                <TransactionSkeleton />
                <TransactionSkeleton />
                <TransactionSkeleton />
            </div>
        </div>
    );
}