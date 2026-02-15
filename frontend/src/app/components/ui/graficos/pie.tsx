'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { formatarValorGrande } from '@/data/mockData';

interface RevenuePieChartProps {
    data: { nome: string; valor: number }[];
}

export function RevenuePieChart({ data }: RevenuePieChartProps) {
    const coresGrafico = [
        'var(--chart-1)',
        'var(--chart-2)',
        'var(--chart-3)',
        'var(--chart-4)',
        'var(--chart-5)',
    ];

    return (
        <Card className="overflow-hidden flex flex-col">
            <CardHeader className="pb-2">
                <CardTitle>Fontes de Receita</CardTitle>
                <CardDescription>Origem dos recursos</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-4">
                <div className="h-87.5 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="valor"
                                nameKey="nome"
                                cx="50%"
                                cy="45%"
                                innerRadius={65}
                                outerRadius={85}
                                paddingAngle={5}
                                stroke="none"
                            >
                                {data.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={coresGrafico[index % coresGrafico.length]}
                                        className="outline-none"
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--card))',
                                    borderColor: 'hsl(var(--border))',
                                    borderRadius: 'var(--radius)',
                                    color: 'hsl(var(--foreground))'
                                }}
                                itemStyle={{ color: 'hsl(var(--foreground))' }}
                                formatter={(value: number) => [formatarValorGrande(value), 'Valor']}
                            />
                            <Legend
                                verticalAlign="bottom"
                                align="center"
                                layout="horizontal"
                                iconType="circle"
                                wrapperStyle={{
                                    paddingTop: '20px',
                                    fontSize: '12px',
                                }}
                                formatter={(value) => <span className="text-muted-foreground">{value}</span>}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}