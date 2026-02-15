'use client';

import React from 'react';
import { RevenuePieChart } from '@/components/ui/graficos/pie';
import { InteractiveMapCard } from '@/components/MapaSVG';

interface DashboardChartsProps {
    totaisPorRegiao: Array<{ regiao: string; cor: string; orcamento: number; }>;
}

export function DashboardCharts({ totaisPorRegiao }: DashboardChartsProps) {
    const chartData = totaisPorRegiao.map(item => ({
        nome: item.regiao,
        valor: item.orcamento
    }));

    return (
        /**
         * GRID SIMÉTRICO:
         * - lg:grid-cols-2: Divide o espaço igualmente em desktop.
         * - items-stretch: Força ambos os Cards a terem a mesma altura da linha.
         */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="w-full flex flex-col">
                <RevenuePieChart data={chartData} />
            </div>
            <div className="w-full flex flex-col">
                <InteractiveMapCard />
            </div>
        </div>
    );
}