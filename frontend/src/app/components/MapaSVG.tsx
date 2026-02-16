'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/lucide/card';
import { MapaBrasil } from '@/components/MapaBrasil';
import { regioes, coresRegioes } from '@/data/estados';

/**
 * Componente de Cartão para Exibição do Mapa Interativo.
 * * @description Este componente encapsula a representação vetorial do Brasil (`MapaBrasil`)
 * dentro de um container com restrições de largura para garantir a integridade visual.
 * Inclui uma legenda dinâmica gerada a partir das regiões e cores definidas no domínio de dados.
 * * @component
 * @example
 * return (* <InteractiveMapCard /> *)
 * * @returns {React.JSX.Element} Um componente Card contendo o mapa e a sua legenda semântica.
 */
export function InteractiveMapCard(): React.JSX.Element {
    return (
        <Card className="flex flex-col h-full overflow-hidden border-border shadow-sm">
            <CardHeader className="pb-2">
                <CardTitle id="map-title">Mapa Interativo</CardTitle>
                <CardDescription>Toque no Estado para ver detalhes</CardDescription>
            </CardHeader>

            <CardContent
                className="flex flex-col items-center justify-around p-4 sm:p-6 flex-1 min-h-0"
                role="region"
                aria-labelledby="map-title"
            >
                <div className="flex items-center justify-center">
                    <MapaBrasil />
                </div>

                {/* * Legenda com semântica de lista.
                  * Mapeia as regiões para criar indicadores visuais que auxiliam na
                  * compreensão da setorização cromática do mapa.
                  */}
                <div
                    className="flex flex-wrap gap-3 justify-center mt-auto pt-4"
                    role="list"
                    aria-label="Legenda de regiões"
                >
                    {regioes.map((regiao) => (
                        <div
                            key={regiao}
                            role="listitem"
                            className="flex items-center gap-1.5 bg-accent/30 px-2 py-1 rounded text-xs border border-transparent hover:border-border transition-colors"
                        >
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: coresRegioes[regiao] }}
                                aria-hidden="true"
                            />
                            <span className="text-muted-foreground font-medium">{regiao}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}