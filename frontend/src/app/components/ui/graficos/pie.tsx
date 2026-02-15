'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { formatarValorGrande } from '@/data/mockData';

/**
 * Interface que define a estrutura dos dados para o gráfico de pizza/rosca.
 * @interface RevenuePieChartProps
 * @property {Array<{nome: string, valor: number}>} data - Array de objetos contendo o rótulo (nome) e o montante financeiro (valor).
 */
interface RevenuePieChartProps {
    data: { nome: string; valor: number }[];
}

/**
 * Componente de gráfico de rosca (Donut Chart) para visualização de fontes de receita.
 * * Este componente utiliza a biblioteca Recharts para renderizar uma distribuição proporcional
 * de dados financeiros, encapsulado em um componente de Card padronizado.
 * * @component
 * @param {RevenuePieChartProps} props - Propriedades do componente.
 * @returns {JSX.Element} Um Card contendo o gráfico responsivo e legendas.
 */
export function RevenuePieChart({ data }: RevenuePieChartProps): React.JSX.Element {
    /**
     * Mapeamento de variáveis de cores do CSS (Tailwind/Shadcn UI) para os segmentos do gráfico.
     * @type {string[]}
     */
    const coresGrafico: string[] = [
        'var(--chart-1)',
        'var(--chart-2)',
        'var(--chart-3)',
        'var(--chart-4)',
        'var(--chart-5)',
    ];

    return (
        <Card className="overflow-hidden flex flex-col border-border">
            <CardHeader className="pb-2">
                <CardTitle>Fontes de Receita</CardTitle>
                <CardDescription>Origem dos recursos públicos</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-4">
                <div
                    className="h-80 w-full"
                    role="img"
                    aria-label="Gráfico de rosca mostrando a distribuição das fontes de receita com etiquetas de valores"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="valor"
                                nameKey="nome"
                                cx="50%"
                                cy="50%" // Centralizado para dar espaço às labels em volta
                                innerRadius={55} // Define o estilo "rosca" (donut)
                                outerRadius={75}
                                paddingAngle={5}
                                stroke="none"

                                /** * Formatação customizada do rótulo exibido diretamente no gráfico.
                                 * @param {Object} props - Propriedades da label do Recharts.
                                 */
                                label={({ valor }) => formatarValorGrande(valor)}

                                labelLine={{
                                    stroke: 'var(--muted-foreground)',
                                    strokeWidth: 1,
                                    opacity: 0.5
                                }}
                            >
                                {data.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={coresGrafico[index % coresGrafico.length]}
                                        className="outline-none"
                                    />
                                ))}
                            </Pie>
                            {/* Legenda inferior com formatação de texto muted */}
                            <Legend
                                verticalAlign="bottom"
                                align="center"
                                layout="horizontal"
                                iconType="circle"
                                wrapperStyle={{
                                    paddingTop: '30px',
                                    fontSize: '11px',
                                }}
                                formatter={(value) => (
                                    <span className="text-muted-foreground font-medium ml-1">
                                        {value}
                                    </span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}