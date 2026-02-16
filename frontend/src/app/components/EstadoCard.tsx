import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/lucide/card';
import { Users, DollarSign, TrendingUp } from 'lucide-react';
import { coresRegioes, type Estado } from '@/data/estados';
import { formatarValorGrande } from '@/data/mockData';
import React from "react";

/**
 * Componente interno para renderização visual de um botão.
 * * @description Este componente simula a aparência de um botão dentro do Card,
 * mas é marcado com `aria-hidden="true"` para evitar redundância semântica,
 * uma vez que o componente pai (`Link`) já cumpre o papel de elemento interativo.
 * * @param {Object} props - Propriedades do componente.
 * @param {React.ReactNode} props.children - Conteúdo a ser exibido no botão.
 * @param {string} [props.className=""] - Classes CSS adicionais do Tailwind.
 * @param {string} [props.variant] - Variante visual do botão (reservado para uso futuro).
 * @returns {JSX.Element} Elemento div estilizado como botão.
 */
const ButtonVisual = ({ children, className = "" }: { children: React.ReactNode, className?: string, variant?: string }): React.JSX.Element => (
    <div
        aria-hidden="true"
        className={`h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 w-full mt-2 ${className}`}
    >
        {children}
    </div>
);

/**
 * Interface para as propriedades do componente EstadoCard.
 * @property {Estado} estado - Objeto contendo os dados geográficos e financeiros do estado.
 */
interface EstadoCardProps {
    estado: Estado;
}

/**
 * Componente de cartão para exibição resumida de dados financeiros estaduais.
 * * @description Renderiza um Card interativo que atua como link para a página de detalhes
 * de um estado específico. Apresenta métricas de população, orçamento, receitas,
 * despesas e o saldo final (Superávit/Déficit).
 * * @param {EstadoCardProps} props - Propriedades do componente.
 * @returns {JSX.Element} Um link encapsulando um Card com informações do estado.
 */
export function EstadoCard({ estado }: EstadoCardProps): React.JSX.Element {
    /** @type {number} Diferença entre receitas e despesas. */
    const saldo: number = estado.receitas - estado.despesas;

    /** @type {string} Cor hexadecimal baseada na região do estado definida em `coresRegioes`. */
    const corRegiao: string = coresRegioes[estado.regiao];

    /** @type {boolean} Flag que indica se o resultado financeiro é positivo ou zero. */
    const isPositivo: boolean = saldo >= 0;

    return (
        <Link
            href={`/estado/${estado.sigla.toLowerCase()}`}
            className="group block h-full focus:outline-none rounded-xl"
        >
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 group-focus-visible:ring-2 group-focus-visible:ring-primary group-focus-visible:ring-offset-2">
                <CardHeader
                    className="pb-3 border-b border-border/50"
                    style={{ backgroundColor: `${corRegiao}10` }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl shadow-sm font-bold"
                                style={{ backgroundColor: corRegiao }}
                                aria-hidden="true"
                            >
                                {estado.sigla}
                            </div>
                            <div>
                                <CardTitle className="text-lg leading-tight">
                                    {estado.nome}
                                    {/* Texto apenas para leitores de tela para dar contexto ao link */}
                                    <span className="sr-only">, ver detalhes financeiros</span>
                                </CardTitle>

                                <CardDescription className="text-xs font-medium mt-1 text-muted-foreground flex items-center gap-1">
                                    <span
                                        className="w-2 h-2 rounded-full inline-block"
                                        style={{ backgroundColor: corRegiao }}
                                        aria-hidden="true"
                                    />
                                    {estado.regiao}
                                </CardDescription>
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4 pt-4">
                    {/* Grupo semântico para leitores de tela */}
                    <dl className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <dt className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium">
                                <Users className="w-3.5 h-3.5" aria-hidden="true" />
                                População
                            </dt>
                            <dd className="text-sm font-semibold text-foreground">
                                {(estado.populacao / 1_000_000).toFixed(1)}M
                            </dd>
                        </div>
                        <div className="space-y-1">
                            <dt className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium">
                                <DollarSign className="w-3.5 h-3.5" aria-hidden="true" />
                                Orçamento
                            </dt>
                            <dd className="text-sm font-semibold text-foreground">
                                {formatarValorGrande(estado.orcamento)}
                            </dd>
                        </div>
                    </dl>

                    {/* Comparativo */}
                    <div className="space-y-2 pt-2 border-t border-border/50" role="list">
                        <div className="flex justify-between text-sm" role="listitem">
                            <span className="text-muted-foreground">Entradas</span>
                            <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                {formatarValorGrande(estado.receitas)}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm" role="listitem">
                            <span className="text-muted-foreground">Saídas</span>
                            <span className="font-medium text-rose-600 dark:text-rose-400">
                                {formatarValorGrande(estado.despesas)}
                            </span>
                        </div>
                    </div>

                    {/* Resultado */}
                    <div className={`flex items-center justify-between pt-3 border-t border-border ${isPositivo ? 'text-emerald-600' : 'text-rose-600'}`}>
                        <div className="flex items-center gap-2">
                            <TrendingUp className={`w-4 h-4 ${!isPositivo && 'rotate-180'}`} aria-hidden="true" />
                            <span className="text-sm font-bold">Resultado</span>
                        </div>
                        <span className="font-bold" aria-label={`Resultado de ${isPositivo ? 'Superávit' : 'Déficit'} de ${formatarValorGrande(Math.abs(saldo))}`}>
                            {isPositivo ? '+' : '-'}{formatarValorGrande(Math.abs(saldo))}
                        </span>
                    </div>

                    {/* Botão Visual - Ignorado por Screen Readers, pois o link já foi anunciado */}
                    <ButtonVisual variant="outline">Ver Raio-x Completo</ButtonVisual>
                </CardContent>
            </Card>
        </Link>
    );
}