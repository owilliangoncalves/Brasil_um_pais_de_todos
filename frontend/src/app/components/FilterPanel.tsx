'use client';

import React, { useId } from 'react'; // useId garante IDs únicos e estáveis
import { Filter, Search, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categorias, orgaos, statusOptions } from '@/data/mockData';

/**
 * Interface para as propriedades do Painel de Filtros.
 * @interface FilterPanelProps
 * @property {Object} filtros - Objeto contendo os estados e dispatchers de filtragem.
 * @property {string} filtros.busca - Termo de busca textual atual.
 * @property {(val: string) => void} filtros.setBusca - Função para atualizar o termo de busca.
 * @property {string} filtros.categoriaFiltro - Categoria selecionada para filtro.
 * @property {(val: string) => void} filtros.setCategoriaFiltro - Função para atualizar a categoria.
 * @property {string} filtros.orgaoFiltro - Órgão público selecionado para filtro.
 * @property {(val: string) => void} filtros.setOrgaoFiltro - Função para atualizar o órgão.
 * @property {string} filtros.statusFiltro - Status da transação selecionado para filtro.
 * @property {(val: string) => void} filtros.setStatusFiltro - Função para atualizar o status.
 * @property {() => void} onClearAction - Callback disparado para resetar todos os filtros.
 */
interface FilterPanelProps {
    filtros: {
        busca: string;
        setBusca: (val: string) => void;
        categoriaFiltro: string;
        setCategoriaFiltro: (val: string) => void;
        orgaoFiltro: string;
        setOrgaoFiltro: (val: string) => void;
        statusFiltro: string;
        setStatusFiltro: (val: string) => void;
    };
    onClearAction: () => void;
}

/**
 * Painel de Filtros Inteligentes.
 * * @description Fornece uma interface centralizada para o refinamento de pesquisas financeiras.
 * Utiliza componentes de Select personalizados e inputs de busca, garantindo sincronia
 * entre rótulos (labels) e controles via `useId` do React para conformidade com WCAG.
 * * @component
 * @param {FilterPanelProps} props - Propriedades de entrada.
 * @returns {React.JSX.Element} Um Card contendo os campos de entrada e seleção de filtros.
 */
export function FilterPanel({ filtros, onClearAction }: FilterPanelProps): React.JSX.Element {
    /** * Geração de IDs únicos e estáveis para vinculação correta entre Label e Input/Select.
     * Crucial para a acessibilidade (A11y) em formulários dinâmicos.
     */
    const searchId = useId();
    const categoryId = useId();
    const organId = useId();
    const statusId = useId();

    return (
        <Card className="border-border/40 shadow-sm overflow-hidden" role="search" aria-label="Filtros de pesquisa">
            <CardHeader className="bg-muted/30 border-b border-border/40">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary" aria-hidden="true">
                            <Filter className="w-5 h-5" />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-bold">Filtros Inteligentes</CardTitle>
                            <CardDescription>Refine sua busca por categorias e órgãos</CardDescription>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearAction}
                        className="font-bold text-xs tracking-widest uppercase hover:bg-destructive/10 hover:text-destructive focus-visible:ring-2 focus-visible:ring-destructive"
                        aria-label="Limpar todos os critérios de busca"
                    >
                        <X className="w-4 h-4 mr-2" aria-hidden="true" /> Limpar Filtros
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                {/* Fieldset agrupa logicamente os campos para tecnologias assistivas */}
                <fieldset className="space-y-6">
                    <legend className="sr-only">Critérios de filtragem</legend>

                    {/* Busca por texto */}
                    <div className="relative group">
                        <label htmlFor={searchId} className="sr-only">
                            Buscar por descrição, favorecido ou órgão
                        </label>
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors"
                            aria-hidden="true"
                        />
                        <Input
                            id={searchId}
                            type="search"
                            placeholder="Busque por descrição, favorecido ou órgão..."
                            value={filtros.busca}
                            onChange={(e) => filtros.setBusca(e.target.value)}
                            className="pl-12 h-14 text-lg bg-muted/20 border-border/40 focus-visible:ring-primary"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Categoria */}
                        <div className="space-y-2">
                            <label
                                htmlFor={categoryId}
                                className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1"
                            >
                                Categoria
                            </label>
                            <Select value={filtros.categoriaFiltro} onValueChange={filtros.setCategoriaFiltro}>
                                <SelectTrigger id={categoryId} className="h-11 bg-muted/20 border-border/40 focus:ring-primary">
                                    <SelectValue placeholder="Selecione uma categoria" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categorias.map(cat => (
                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Órgão */}
                        <div className="space-y-2">
                            <label
                                htmlFor={organId}
                                className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1"
                            >
                                Órgão
                            </label>
                            <Select value={filtros.orgaoFiltro} onValueChange={filtros.setOrgaoFiltro}>
                                <SelectTrigger id={organId} className="h-11 bg-muted/20 border-border/40 focus:ring-primary">
                                    <SelectValue placeholder="Selecione um órgão" />
                                </SelectTrigger>
                                <SelectContent>
                                    {orgaos.map(org => (
                                        <SelectItem key={org} value={org}>{org}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <label
                                htmlFor={statusId}
                                className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1"
                            >
                                Status
                            </label>
                            <Select value={filtros.statusFiltro} onValueChange={filtros.setStatusFiltro}>
                                <SelectTrigger id={statusId} className="h-11 bg-muted/20 border-border/40 focus:ring-primary">
                                    <SelectValue placeholder="Selecione o status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {statusOptions.map(o => (
                                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </fieldset>
            </CardContent>
        </Card>
    );
}