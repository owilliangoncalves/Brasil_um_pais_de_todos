'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileText, AlertCircle, Loader2 } from 'lucide-react';
import { formatarValorGrande } from '@/data/mockData';

/**
 * Interface para as propriedades do componente TransactionList.
 * @interface TransactionListProps
 * @property {any[]} transacoes - Array de objetos contendo os dados das transações financeiras.
 * @property {boolean} loading - Sinaliza se a busca de dados está em progresso.
 * @property {string | null} error - Mensagem de erro caso a requisição falhe; null se estiver íntegra.
 */
interface TransactionListProps {
    transacoes: any[];
    loading: boolean;
    error: string | null;
}

/**
 * Componente de Listagem de Transações Financeiras.
 * * @description Renderiza uma lista vertical de "cards" interativos que representam repasses ou gastos.
 * Possui estados integrados para carregamento (skeleton/spinner), erro e lista vazia.
 * Implementa padrões rigorosos de acessibilidade (A11y) com suporte a leitores de tela
 * através de `aria-live`, `role="status"` e etiquetas `sr-only`.
 * * @component
 * @param {TransactionListProps} props - Propriedades de entrada.
 * @returns {React.JSX.Element} Lista de transações ou feedbacks de estado (Loading/Error).
 */
export function TransactionList({ transacoes, loading, error }: TransactionListProps): React.JSX.Element {

    /** * Estado de Carregamento.
     * Renderiza um indicador visual centralizado com semântica de ocupação (aria-busy).
     */
    if (loading) return (
        <div className="py-20 flex flex-col items-center gap-3" role="status" aria-busy="true">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Sincronizando dados...</span>
        </div>
    );

    /** * Estado de Erro.
     * Exibe alerta crítico para falhas de rede ou processamento de dados do backend.
     */
    if (error) return (
        <div className="py-20 flex flex-col items-center gap-3 text-destructive" role="alert">
            <AlertCircle className="w-8 h-8" />
            <p className="font-bold">{error}</p>
        </div>
    );

    /** * Estado de Lista Vazia (Zero State).
     * Feedback quando a filtragem atual não retorna registros do banco de dados.
     */
    if (transacoes.length === 0) return (
        <div className="py-20 text-center text-muted-foreground" role="status">
            <p>Nenhum dado encontrado para os filtros selecionados.</p>
        </div>
    );

    return (
        /**
         * Container da Lista.
         * @aria-live polite: Garante que mudanças na lista (ao filtrar) sejam anunciadas aos
         * usuários de tecnologias assistivas de forma não interruptiva.
         */
        <ul aria-live="polite" className="grid gap-4 list-none p-0">
            {transacoes.map((t) => (
                <li key={t.id}>
                    <Link
                        href={`/recurso/${t.id}`}
                        className="group block focus-visible:ring-2 focus-visible:ring-primary outline-none rounded-2xl"
                        aria-label={`Ver detalhes da transação ${t.id}: ${t.descricao}`}
                    >
                        <div className="p-6 bg-card border border-border/60 rounded-2xl group-hover:border-primary transition-all shadow-sm">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="space-y-3 flex-1">
                                    <div className="flex items-center gap-2">
                                        {/* Metadados da Transação */}
                                        <span className="text-xs font-bold px-2 py-0.5 bg-muted rounded border border-border/40 font-mono">
                                            <span className="sr-only">ID da transação:</span> #{t.id}
                                        </span>
                                        <span
                                            className="text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded-full border border-primary/20 bg-primary/10 text-primary"
                                            role="status"
                                        >
                                            <span className="sr-only">Status:</span> {t.status}
                                        </span>
                                    </div>

                                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                                        {t.descricao}
                                    </h3>

                                    <div className="flex flex-wrap gap-x-6 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1.5">
                                            <FileText className="w-4 h-4" aria-hidden="true" />
                                            <span className="sr-only">Categoria:</span> {t.categoria}
                                        </span>
                                        <span className="italic">
                                            <span className="sr-only">Órgão:</span> {t.orgao}
                                        </span>
                                    </div>
                                </div>

                                {/* Valor e Call-to-Action */}
                                <div className="flex flex-row md:flex-col justify-between items-end md:text-right gap-2 border-t md:border-t-0 pt-4 md:pt-0 border-border/40">
                                    <div className="text-right">
                                        <p className="text-2xl font-black tracking-tight text-foreground">
                                            <span className="sr-only">Valor:</span> {formatarValorGrande(t.valor)}
                                        </p>
                                        <p className="text-xs text-muted-foreground font-medium">Clique para detalhes</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 group-hover:text-primary group-hover:translate-x-1 transition-all" aria-hidden="true" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}