'use client';

import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { formatarValorGrande } from '@/data/mockData';
import { exportarParaCSV } from '@/utils/export';

/**
 * Interface para as propriedades do componente MainLineChart.
 * @interface MainLineChartProps
 * @property {Array<Object>} data - Array de objetos contendo os pontos do gráfico.
 * Esperado: Array<{ periodo: string, receitas: number, despesas: number }>
 */
interface MainLineChartProps {
    data: any[];
}

/**
 * Componente de Gráfico de Linhas Principal (MainLineChart).
 * * Apresenta a evolução temporal comparativa entre receitas e despesas.
 * Inclui funcionalidades de exportação para CSV e formatação dinâmica de eixos
 * para representar valores na escala de bilhões (B).
 * * @component
 * @param {MainLineChartProps} props - Propriedades do componente.
 * @returns {JSX.Element} Card com gráfico de linhas responsivo e controles de exportação.
 */
export function MainLineChart({ data }: MainLineChartProps): React.JSX.Element {
    return (
        <Card className="border-border/50 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                <div>
                    <CardTitle className="text-lg font-bold">Evolução Mensal</CardTitle>
                    <CardDescription>Comparativo entre Receitas e Despesas</CardDescription>
                </div>
                {/* Botão de ação para exportação de dados brutos */}
                <Button
                    variant="outline"
                    size="sm"
                    className="hidden sm:flex h-8"
                    onClick={() => exportarParaCSV(data, 'fluxo-mensal')}
                >
                    <Download className="w-3.5 h-3.5 mr-2" /> Exportar
                </Button>
            </CardHeader>
            <CardContent className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ left: 0, right: 10, top: 0, bottom: 0 }}>
                        {/* Grade de referência horizontal para facilitar a leitura de níveis */}
                        <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted/30" />

                        <XAxis
                            dataKey="periodo"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
                            dy={10}
                        />

                        <YAxis
                            /** * Formata o valor numérico bruto para uma representação simplificada em bilhões.
                             * Ex: 1.000.000.000 vira R$1B.
                             */
                            tickFormatter={(v) => `R$${v/1e9}B`}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                borderColor: 'hsl(var(--border))',
                                borderRadius: 'var(--radius)',
                                fontSize: '12px'
                            }}
                            formatter={(value: number) => [formatarValorGrande(value)]}
                        />

                        <Legend
                            verticalAlign="top"
                            align="right"
                            iconType="circle"
                            wrapperStyle={{ paddingBottom: '20px', fontSize: '12px' }}
                        />

                        {/* Série de Dados: Receitas */}
                        <Line
                            type="monotone"
                            dataKey="receitas"
                            name="Receita"
                            stroke="var(--chart-1)"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />

                        {/* Série de Dados: Despesas */}
                        <Line
                            type="monotone"
                            dataKey="despesas"
                            name="Despesa"
                            stroke="var(--status-empenhado)"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}