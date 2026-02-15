'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Landmark, Calendar } from 'lucide-react';
import { cn } from './utils';
import { formatarValorGrande } from '@/data/mockData';

/**
 * Componente TransactionItem.
 * * Renderiza um card interativo representando uma transação financeira individual.
 * * @component
 * @param {Object} props - Propriedades do componente.
 * @param {any} props.t - Objeto da transação.
 * Esperado: { id: string, status: string, descricao: string, orgao: string, data: string, valor: number }.
 */
export function TransactionItem({ t }: { t: any }) {
    /**
     * Mapeamento de estilos baseados no estado da despesa.
     * Define cores de fundo, texto e borda para as fases de empenho, liquidação e execução.
     * @type {Record<string, string>}
     */
    const statusStyles: Record<string, string> = {
        executado: "bg-status-executado-bg text-status-executado border-status-executado/20",
        liquidado: "bg-status-liquidado-bg text-status-liquidado border-status-liquidado/20",
        empenhado: "bg-status-empenhado-bg text-status-empenhado border-status-empenhado/20",
    };

    return (
        <Link
            href={`/recurso/${t.id}`}
            className="group block outline-none rounded-xl w-full"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-300 gap-4 overflow-hidden">

                {/* LADO ESQUERDO: Conteúdo Informativo.
                   O uso de 'min-w-0' é crítico para permitir que os filhos com 'truncate'
                   funcionem corretamente dentro de um container flex.
                */}
                <div className="flex-1 min-w-0 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className={cn(
                            "px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-widest rounded-md border shrink-0",
                            statusStyles[t.status as keyof typeof statusStyles]
                        )}>
                          {t.status}
                        </span>

                        {/* Título com truncamento para evitar que descrições longas quebrem o grid */}
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors truncate text-sm md:text-base">
                            {t.descricao}
                        </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] md:text-xs font-medium text-muted-foreground">
                        {/* Identificação do Órgão com limite de largura adaptativo */}
                        <span className="flex items-center gap-1.5 shrink-0 bg-muted/30 px-2 py-1 rounded">
                          <Landmark className="w-3 h-3 text-primary/70" />
                          <span className="truncate max-w-37.5 md:max-w-none">{t.orgao}</span>
                        </span>

                        <span className="flex items-center gap-1.5 shrink-0">
                          <Calendar className="w-3 h-3" />
                            {new Date(t.data).toLocaleDateString('pt-BR')}
                        </span>
                    </div>
                </div>

                {/* LADO DIREITO: Informações Financeiras e Ação.
                   Em mobile, os itens ficam em linha; em desktop, alinham-se à direita (end).
                */}
                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 border-t sm:border-0 pt-3 sm:pt-0">
                    <div className="flex flex-col sm:items-end">
                        <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-tighter sm:hidden">VALOR:</span>
                        <p className="font-mono font-bold text-lg md:text-xl text-foreground tabular-nums tracking-tighter">
                            {formatarValorGrande(t.valor)}
                        </p>
                    </div>
                    {/* Indicador de direção com animação de translação ao dar hover no card */}
                    <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all hidden sm:block shrink-0" />
                </div>
            </div>
        </Link>
    );
}