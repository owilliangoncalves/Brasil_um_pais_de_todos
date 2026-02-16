'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/lucide/card';
import { TooltipAjuda } from './TooltipAjuda';
import { cn } from '@/utils/utils';

/**
 * Mapa de variantes cromáticas para o SummaryCard.
 * @description Define conjuntos de classes CSS (Tailwind) para diferentes contextos financeiros,
 * garantindo consistência visual entre estados de receita, despesa e saldo (positivo/negativo).
 */
const colorVariants = {
    receita: {
        card: "border-primary/20 bg-green-50 dark:bg-green-950/20",
        text: "text-green-700 dark:text-green-400",
        title: "text-green-900 dark:text-green-300",
        icon: "text-green-700 dark:text-green-400"
    },
    despesa: {
        card: "border-secondary/20 bg-amber-50 dark:bg-amber-950/20",
        text: "text-amber-700 dark:text-amber-400",
        title: "text-amber-900 dark:text-amber-300",
        icon: "text-amber-700 dark:text-amber-400"
    },
    saldoPositivo: {
        card: "border-green-500 bg-green-50 dark:bg-green-950/20 border-2",
        text: "text-green-700 dark:text-green-400",
        title: "text-green-900 dark:text-green-300",
        icon: "text-green-700 dark:text-green-400"
    },
    saldoNegativo: {
        card: "border-red-500 bg-red-50 dark:bg-red-950/20 border-2",
        text: "text-red-700 dark:text-red-400",
        title: "text-red-900 dark:text-red-300",
        icon: "text-red-700 dark:text-red-400"
    }
};

/**
 * Interface de propriedades para o componente SummaryCard.
 * @interface SummaryCardProps
 * @property {keyof typeof colorVariants} variant - A chave que define o estilo visual do card.
 * @property {string} title - O valor financeiro principal formatado (ex: "R$ 1.5 bi").
 * @property {string} descriptionTerm - O termo técnico ou título exibido no acionador do Tooltip.
 * @property {string} descriptionExplanation - A explicação detalhada que aparece no conteúdo do Tooltip.
 * @property {string} trendText - Texto descritivo da tendência ou variação (ex: "+12% este mês").
 * @property {LucideIcon} TrendIcon - Componente de ícone da biblioteca lucide-react para indicar a direção da tendência.
 */
interface SummaryCardProps {
    variant: keyof typeof colorVariants;
    title: string;
    descriptionTerm: string;
    descriptionExplanation: string;
    trendText: string;
    TrendIcon: LucideIcon;
}

/**
 * Componente de Cartão de Sumário de Indicadores (KPI).
 * * @description Renderiza uma métrica financeira de alto nível em um card estilizado.
 * Inclui suporte a acessibilidade através de tooltips explicativos para termos técnicos
 * e variações visuais semânticas baseadas no contexto (sucesso/alerta/erro).
 * * @component
 * @param {SummaryCardProps} props - Propriedades de entrada.
 * @returns {React.JSX.Element} Um card informativo com título, descrição assistida e tendência.
 */
export function SummaryCard({
                                variant,
                                title,
                                descriptionTerm,
                                descriptionExplanation,
                                trendText,
                                TrendIcon
                            }: SummaryCardProps): React.JSX.Element {
    /** * Recupera o conjunto de estilos baseado na variante informada.
     * @type {typeof colorVariants.receita}
     */
    const styles: typeof colorVariants.receita = colorVariants[variant];

    return (
        <Card className={cn(styles.card, "transition-all hover:shadow-md")}>
            <CardHeader className="pb-3">
                {/* Cabeçalho com Tooltip de Ajuda integrado para termos técnicos */}
                <CardDescription className={styles.text}>
                    <TooltipAjuda
                        termo={descriptionTerm}
                        explicacao={descriptionExplanation}
                    />
                </CardDescription>

                {/* Valor financeiro principal */}
                <CardTitle className={cn("text-3xl", styles.title)}>
                    {title}
                </CardTitle>
            </CardHeader>

            <CardContent>
                {/* Indicador de tendência visual e textual */}
                <div className={cn("flex items-center gap-2", styles.icon)}>
                    <TrendIcon className="w-4 h-4" />
                    <span className="text-sm">{trendText}</span>
                </div>
            </CardContent>
        </Card>
    );
}