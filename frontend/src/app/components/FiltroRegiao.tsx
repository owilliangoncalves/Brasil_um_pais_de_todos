import { MapPin, X } from 'lucide-react';
import { Button } from '@/components/lucide/button';
import { formatarValorGrande } from '@/data/mockData';
import React from "react";

/**
 * Representa os dados consolidados de uma região geográfica.
 * @interface RegionData
 * @property {string} regiao - Nome da região (ex: "norte", "sudeste").
 * @property {string} cor - Valor de cor (hex, rgb ou classe) associado à região.
 * @property {number} orcamento - Valor numérico total do orçamento da região.
 */
interface RegionData {
    regiao: string;
    cor: string;
    orcamento: number;
}

/**
 * Propriedades para o componente RegionFilter.
 * @interface RegionFilterProps
 * @property {RegionData[]} totais - Lista de objetos contendo os dados de cada região disponível.
 * @property {string | null} selecionada - Identificador da região atualmente filtrada; null se nenhuma estiver ativa.
 * @property {string} buscaAtiva - Texto atual presente no campo de busca global (usado para controle de estado visual).
 * @property {(regiao: string | null) => void} onSelect - Callback disparado ao clicar em uma região para selecionar ou desmarcar.
 * @property {() => void} onLimpar - Callback disparado para resetar todos os filtros aplicados.
 */
interface RegionFilterProps {
    totais: RegionData[];
    selecionada: string | null;
    buscaAtiva: string;
    onSelect: (regiao: string | null) => void;
    onLimpar: () => void;
}

/**
 * Componente de filtragem por regiões geográficas.
 * * @description Apresenta um grid de botões interativos que permitem ao usuário filtrar dados
 * por região. Inclui feedback visual de seleção, estados de hover e um botão global de
 * limpeza de filtros. Utiliza acessibilidade via `aria-pressed` e gestão de foco.
 * * @component
 * @param {RegionFilterProps} props - Propriedades de entrada.
 * @returns {React.JSX.Element} Seção de filtros com cabeçalho e grid de regiões.
 */
export function RegionFilter({
                                 totais,
                                 selecionada,
                                 buscaAtiva,
                                 onSelect,
                                 onLimpar
                             }: RegionFilterProps): React.JSX.Element {

    /** @type {boolean} Indica se há algum critério de filtragem (região ou busca textual) aplicado no momento. */
    const temFiltroAtivo: boolean = selecionada !== null || buscaAtiva !== '';

    return (
        <section aria-labelledby="region-filter-title">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h2 id="region-filter-title" className="text-2xl font-bold text-foreground mb-2">
                        Filtrar por Região
                    </h2>
                    <p className="text-muted-foreground">
                        Selecione uma região para focar a análise
                    </p>
                </div>

                {temFiltroAtivo && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onLimpar}
                        className="text-muted-foreground hover:text-foreground animate-in fade-in slide-in-from-right-4"
                    >
                        <X className="w-4 h-4 mr-2" />
                        Limpar filtros
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                {totais.map((regiao) => {
                    /** @type {boolean} Determina se este botão específico representa a região selecionada. */
                    const isSelected: boolean = selecionada === regiao.regiao;

                    /** @type {string} Classe de opacidade aplicada para criar o efeito visual de "foco" na seleção ativa. */
                    const opacityClass: string = selecionada && !isSelected ? 'opacity-50 hover:opacity-100' : 'opacity-100';

                    return (
                        <button
                            key={regiao.regiao}
                            onClick={() => onSelect(isSelected ? null : regiao.regiao)}
                            aria-pressed={isSelected}
                            className={`
                group relative flex flex-col items-start text-left rounded-xl border-2 transition-all duration-300 p-0 overflow-hidden
                focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none
                ${opacityClass}
                ${isSelected
                                ? 'border-primary shadow-md scale-[1.02] bg-primary/5'
                                : 'border-transparent bg-card hover:bg-accent/50 hover:border-border'}
              `}
                        >
                            <div className="w-full h-full p-4 flex flex-col justify-between gap-3">
                                <div className="flex items-center justify-between w-full">
                  <span
                      className="font-bold text-sm sm:text-base"
                      style={{ color: isSelected ? 'inherit' : regiao.cor }}
                  >
                    {regiao.regiao}
                  </span>
                                    <MapPin className="w-4 h-4 opacity-70" style={{ color: regiao.cor }} />
                                </div>
                                <div>
                                    <span className="text-xs text-muted-foreground block">Orçamento</span>
                                    <span className="font-semibold text-sm">
                    {formatarValorGrande(regiao.orcamento)}
                  </span>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}