'use client';

import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { formatarValorGrande } from '@/data/mockData';

/**
 * Interface que define a estrutura de dados para o gráfico de barras de despesas.
 * @interface ExpensesBarChartProps
 * @property {Array<{area: string, valor: number, cor: string}>} data - Lista de objetos representando as áreas de investimento.
 */
interface ExpensesBarChartProps {
    data: { area: string; valor: number; cor: string }[];
}

/**
 * Componente de gráfico de barras horizontais para visualização de destinação de recursos.
 * * Este componente apresenta os dados de forma verticalizada (Y-Axis como categorias),
 * o que facilita a leitura de rótulos longos de áreas públicas. Inclui rótulos de dados
 * diretos (LabelList) para otimizar a experiência em dispositivos móveis.
 * * @component
 * @param {ExpensesBarChartProps} props - Propriedades do componente contendo os dados de investimento.
 * @returns {JSX.Element} Card contendo o gráfico de barras responsivo.
 */
export function ExpensesBarChart({ data }: ExpensesBarChartProps): React.JSX.Element {
    return (
        <Card className="overflow-hidden flex flex-col border-border">
            <CardHeader className="pb-2">
                <CardTitle>Destinação de Recursos</CardTitle>
                <CardDescription>Maiores áreas de investimento</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-4">
                <div
                    className="h-80 w-full"
                    role="img"
                    aria-label="Gráfico de barras horizontais mostrando investimentos por área pública"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            layout="vertical"
                            margin={{ top: 5, right: 45, left: 0, bottom: 5 }}
                        >
                            {/* Eixo X oculto para manter o visual limpo, priorizando a leitura via LabelList */}
                            <XAxis type="number" hide />

                            <YAxis
                                dataKey="area"
                                type="category"
                                width={100}
                                tick={{ fontSize: 12, fill: 'var(--muted-foreground)', fontWeight: 500 }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <Bar
                                dataKey="valor"
                                radius={[0, 4, 4, 0]}
                                barSize={24}
                            >

                                <LabelList
                                    dataKey="valor"
                                    position="right"
                                    formatter={formatarValorGrande}
                                    style={{ fontSize: '11px', fill: 'var(--muted-foreground)', fontWeight: 'bold' }}
                                />
                                {data.map((entry, index) => (
                                    /**
                                     * Renderiza cada célula com uma cor específica.
                                     * Prioriza a cor vinda do objeto de dados, com fallback para variáveis do tema.
                                     */
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.cor || `var(--chart-${(index % 5) + 1})`}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}