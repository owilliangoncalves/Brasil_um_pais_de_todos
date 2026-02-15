'use client';

import React, { useMemo } from 'react';
import { ArrowRight, TrendingUp, TrendingDown, Info } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useDashboardData } from '@/hooks/useDashboardData';
import { formatarValorGrande } from '@/data/mockData';

// Componentes de Interface e Negócio
import { HeroSection } from '@/components/Hero';
import { SummaryCard } from '@/components/SummaryCard';
import { MainLineChart } from '@/components/ui/graficos/linha';
import { RevenuePieChart } from '@/components/ui/graficos/pie';
import { ExpensesBarChart } from '@/components/ui/graficos/bar';
import { TransactionItem } from '@/components/ui/transcation-item';
import { DashboardSkeleton } from '@/components/ui/skeleton';

/**
 * Componente de Página: DashboardPage.
 * * Atua como o container principal do Portal de Transparência.
 * Responsável por:
 * 1. Consumir dados do hook `useDashboardData`.
 * 2. Gerenciar estados de lifecycle (Loading, Error, Ready).
 * 3. Calcular métricas agregadas via `useMemo`.
 * 4. Orquestrar a disposição dos gráficos e componentes de UI.
 * * @component
 * @returns {JSX.Element} A página completa do dashboard renderizada.
 */
export default function DashboardPage(): React.JSX.Element {
    /**
     * Hook customizado para busca de dados orçamentários.
     * @returns {{ data: any, loading: boolean, error: string|null }}
     */
    const { data, loading, error } = useDashboardData();

    /**
     * Otimização de Performance: Cálculo memoizado dos indicadores anuais.
     * Evita re-processamento matemático em re-renders que não envolvam mudança nos dados.
     * Realiza a redução (reduce) dos arrays de resumo para obter totais globais.
     */
    const { totalReceitas, totalDespesas, saldo } = useMemo(() => {
        if (!data) return { totalReceitas: 0, totalDespesas: 0, saldo: 0 };

        const receitas = data.resumoOrcamentario.reduce((acc, item) => acc + item.receitas, 0);
        const despesas = data.resumoOrcamentario.reduce((acc, item) => acc + item.despesas, 0);

        return {
            totalReceitas: receitas,
            totalDespesas: despesas,
            saldo: receitas - despesas
        };
    }, [data]);

    // 1. Estado de Carregamento: Renderiza o Skeleton para evitar Layout Shift (CLS)
    if (loading) {
        return <DashboardSkeleton />;
    }

    // 2. Estado de Erro: Feedback visual ao usuário com opção de recuperação de estado
    if (error) {
        return (
            <div className="h-[60vh] flex items-center justify-center p-6">
                <Card className="max-w-md border-destructive/50 shadow-lg" role="alert">
                    <CardContent className="pt-6 text-center">
                        <p className="text-destructive mb-4 font-semibold">{error}</p>
                        <Button variant="outline" onClick={() => window.location.reload()}>
                            Tentar Novamente
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        /**
         * Container Principal:
         * - overflow-x-hidden: Garante estabilidade no mobile contra transbordos causados por gráficos.
         * - animate-in: Transição suave de entrada (fade) após a saída do skeleton.
         */
        <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12 outline-none overflow-x-hidden animate-in fade-in duration-700">

            {/* SEÇÃO 1: HERO - Apresentação e propósito do portal */}
            <HeroSection />

            {/* SEÇÃO 2: INDICADORES - Cards de resumo financeiro anual com acessibilidade via aria-label */}
            <section aria-label="Resumo Financeiro Anual" className="w-full">
                <h2 className="sr-only">Principais Indicadores Financeiros</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <SummaryCard
                        variant="receita"
                        title={formatarValorGrande(totalReceitas)}
                        descriptionTerm="Receitas Totais"
                        descriptionExplanation="Arrecadação total acumulada no exercício de 2026."
                        trendText="+8.5% vs 2025"
                        TrendIcon={TrendingUp}
                    />
                    <SummaryCard
                        variant="despesa"
                        title={formatarValorGrande(totalDespesas)}
                        descriptionTerm="Despesas Totais"
                        descriptionExplanation="Total de gastos processados e empenhados."
                        trendText="+5.2% vs 2025"
                        TrendIcon={TrendingDown}
                    />
                    <SummaryCard
                        variant={saldo >= 0 ? "saldoPositivo" : "saldoNegativo"}
                        title={formatarValorGrande(Math.abs(saldo))}
                        descriptionTerm="Resultado Líquido"
                        descriptionExplanation="Diferença entre arrecadação e execução de gastos."
                        trendText={saldo >= 0 ? "Superávit" : "Déficit"}
                        TrendIcon={saldo >= 0 ? TrendingUp : TrendingDown}
                    />
                </div>
            </section>

            {/* SEÇÃO 3: GRÁFICO PRINCIPAL - Evolução temporal (Timeline) */}
            <section className="space-y-6 w-full overflow-hidden">
                <h2 className="text-2xl font-bold tracking-tight px-1 text-foreground">
                    Evolução do Orçamento
                </h2>
                <MainLineChart data={data.resumoOrcamentario} />
            </section>

            {/* SEÇÃO 4: DISTRIBUIÇÃO - Visões qualitativas por área e fonte de recurso */}
            <section
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full"
                aria-label="Distribuição de Receitas e Despesas"
            >
                <RevenuePieChart data={data.fontesReceita} />
                <ExpensesBarChart data={data.areasDespesa} />
            </section>

            {/* SEÇÃO 5: LISTAGEM - Últimas transações com lógica de tratamento para lista vazia (Empty State) */}
            <section className="space-y-6 pb-4 w-full overflow-hidden" aria-labelledby="transactions-title">
                <div className="flex items-center justify-between px-1 gap-4">
                    <h2 id="transactions-title" className="text-xl md:text-2xl font-bold tracking-tight truncate">
                        Últimas Movimentações
                    </h2>
                    <Button variant="ghost" asChild className="text-primary hover:bg-primary/5 font-semibold shrink-0">
                        <Link href="/explorar" className="flex items-center gap-2">
                            <span className="hidden xs:inline">Ver histórico completo</span>
                            <span className="xs:hidden">Ver tudo</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 w-full">
                    {data.transacoesRecentes.length > 0 ? (
                        data.transacoesRecentes.slice(0, 5).map((t) => (
                            <TransactionItem key={t.id} t={t} />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-2xl border-muted/20 bg-muted/5">
                            <p className="text-muted-foreground font-medium text-center px-4">
                                Nenhuma transação recente encontrada para exibição.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* FOOTER DE APOIO: Reforço informativo e metadados sobre a origem dos dados */}
            <footer className="pt-8 border-t border-border/40">
                <div className="bg-muted/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-center md:text-left">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
                            <Info className="w-5 h-5" />
                        </div>
                        <p className="text-sm text-muted-foreground max-w-xl">
                            Os dados apresentados são extraídos diretamente do Portal da Transparência e atualizados diariamente.
                            <strong> A fiscalização é um dever e um direito de todo cidadão.</strong>
                        </p>
                    </div>
                    <Button variant="link" className="text-primary font-bold shrink-0" asChild>
                        <Link href="/ajuda">Como entender estes dados?</Link>
                    </Button>
                </div>
            </footer>
        </main>
    );
}