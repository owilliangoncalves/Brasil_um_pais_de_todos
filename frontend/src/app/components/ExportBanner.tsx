'use client';

import React from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/lucide/button';
import { formatarValorGrande } from '@/data/mockData';

/**
 * Interface para as propriedades do componente ExportBanner.
 * @interface ExportBannerProps
 * @property {number} total - Soma financeira total resultante da filtragem atual.
 * @property {number} count - Quantidade total de registros/transações encontrados.
 * @property {() => void} onExportAction - Função de callback para disparar a lógica de exportação (ex: gerar CSV).
 * @property {boolean} isLoading - Estado que indica se o processo de exportação está em execução.
 */
interface ExportBannerProps {
    total: number;
    count: number;
    onExportAction: () => void;
    isLoading: boolean;
}

/**
 * Componente de Resumo e Exportação de Dados.
 * * @description Exibe um banner de destaque com o somatório dos valores e a contagem de itens
 * filtrados. Oferece uma ação clara de exportação de dados, utilizando feedbacks visuais
 * de micro interações (scale) e estados de carregamento.
 * * @component
 * @param {ExportBannerProps} props - Propriedades de entrada.
 * @returns {React.JSX.Element} Seção de resumo financeiro com botão de download.
 */
export function ExportBanner({ total, count, onExportAction, isLoading }: ExportBannerProps): React.JSX.Element {
    return (
        <section
            className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-linear-to-br from-primary/10 to-emerald-500/5 rounded-3xl border border-primary/10"
            aria-labelledby="summary-title"
        >
            {/* Bloco de Dados Consolidados
                aria-live="polite": anuncia mudanças nos valores totais quando filtros são aplicados.
            */}
            <div className="text-center md:text-left" aria-live="polite">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-primary/60">
                    Consolidado da busca
                </span>
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mt-1">
                    <h2 id="summary-title" className="text-4xl font-black tracking-tighter text-foreground">
                        <span className="sr-only">Valor total dos resultados:</span>
                        {formatarValorGrande(total)}
                    </h2>
                    <span className="text-muted-foreground font-medium">
                        distribuídos em <strong className="text-foreground">{count}</strong> transações
                    </span>
                </div>
            </div>

            {/* Ação de Exportação
                - Desabilitado se não houver dados (count === 0) ou se já estiver carregando.
                - aria-label dinâmico fornece contexto extra sobre o que será baixado.
            */}
            <Button
                onClick={onExportAction}
                size="lg"
                disabled={isLoading || count === 0}
                className="rounded-full px-8 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 min-w-[200px]"
                aria-label={`Exportar ${count} transações para planilha CSV`}
            >
                {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                ) : (
                    <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                )}
                {isLoading ? 'Processando...' : 'Exportar Planilha'}
            </Button>
        </section>
    );
}