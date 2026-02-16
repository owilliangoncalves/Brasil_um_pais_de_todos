'use client';

import React, { useState, useMemo, useId } from 'react';
import { Info, Search, BookOpen, Hash } from 'lucide-react';
import { Button } from '@/components/lucide/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/lucide/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/lucide/dialog';
import { Input } from '@/components/lucide/input';
import { glossario, TermoGlossario } from '@/data/glossario';

/**
 * Componente Glossário (Dicionário Cidadão).
 * * @description Renderiza um diálogo modal contendo definições de termos técnicos orçamentários.
 * Implementa busca em tempo real com feedback de acessibilidade via `aria-live` e
 * gerenciamento automático de foco para navegação por teclado.
 * * @component
 * @returns {React.JSX.Element} Um botão disparador e a estrutura do diálogo modal.
 */
export function Glossario(): React.JSX.Element {
    /** @type {string} Estado que armazena o valor do campo de busca. */
    const [busca, setBusca] = useState('');

    /** @type {string} ID único gerado para vincular o rótulo ao campo de busca. */
    const searchInputId: string = useId();

    /**
     * @type {TermoGlossario[]} Lista filtrada de termos baseada na busca textual.
     * * @description Filtra tanto pelo nome do termo quanto pelo conteúdo da explicação.
     * Memoizado para otimizar a performance durante a digitação.
     */
    const termosFiltrados: TermoGlossario[] = useMemo(() => {
        return glossario.filter(item =>
            item.termo.toLowerCase().includes(busca.toLowerCase()) ||
            item.explicacao.toLowerCase().includes(busca.toLowerCase())
        );
    }, [busca]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 font-bold uppercase text-[10px] tracking-widest hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Abrir glossário de termos técnicos governamentais"
                >
                    <Info className="w-4 h-4" aria-hidden="true" />
                    Glossário
                </Button>
            </DialogTrigger>

            <DialogContent
                className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col p-0 border-none shadow-2xl"
                onOpenAutoFocus={(e) => {
                    /** * UX de Foco: Foca automaticamente no input de busca ao abrir,
                     * facilitando a filtragem imediata para usuários de teclado.
                     */
                    document.getElementById(searchInputId)?.focus();
                }}
            >
                <DialogHeader className="p-6 bg-muted/30 border-b border-border/40">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/20 rounded-lg text-primary" aria-hidden="true">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <DialogTitle className="text-2xl font-black tracking-tighter uppercase">
                            Dicionário Cidadão
                        </DialogTitle>
                    </div>
                    <DialogDescription className="text-muted-foreground font-medium">
                        Entenda de forma simples os termos técnicos usados no orçamento público.
                    </DialogDescription>

                    {/* Área de Busca Acessível */}
                    <div className="relative mt-4">
                        <label htmlFor={searchInputId} className="sr-only">Filtrar termos por nome ou descrição</label>
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                        <Input
                            id={searchInputId}
                            type="search"
                            placeholder="Ex: O que é empenhado?"
                            className="pl-10 bg-background focus-visible:ring-primary"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />

                        {/* Feedback A11y: Anuncia a quantidade de resultados após filtragem */}
                        <div className="sr-only" aria-live="polite">
                            {busca && `${termosFiltrados.length} termos encontrados para ${busca}`}
                        </div>
                    </div>
                </DialogHeader>

                {/* Área de Conteúdo Scrolável com semântica de navegação e lista */}
                <nav className="flex-1 overflow-y-auto p-6 bg-muted/10">
                    <ul className="space-y-6 list-none p-0">
                        {termosFiltrados.length > 0 ? (
                            termosFiltrados.map((item) => (
                                <li key={item.termo}>
                                    <TermoCard item={item} />
                                </li>
                            ))
                        ) : (
                            <li className="text-center py-12" role="status">
                                <p className="font-bold text-muted-foreground">Nenhum termo encontrado para sua busca.</p>
                            </li>
                        )}
                    </ul>
                </nav>

                <footer className="p-4 bg-muted/30 border-t border-border/40 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                        Pressione ESC para fechar o glossário
                    </p>
                </footer>
            </DialogContent>
        </Dialog>
    );
}

/**
 * Componente interno para exibição de um termo individual do glossário.
 * * @param {Object} props - Propriedades.
 * @param {TermoGlossario} props.item - Objeto com os dados do termo.
 * @returns {React.JSX.Element} Card estilizado contendo termo, definição e exemplo.
 */
function TermoCard({ item }: { item: TermoGlossario }): React.JSX.Element {
    return (
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-3 border-b border-primary/5">
                <CardTitle className="text-lg font-black tracking-tight flex items-center gap-2">
                    <Hash className="w-4 h-4 text-secondary/30" aria-hidden="true" />
                    {/* Tag <dfn> marca o termo que está sendo definido para fins de SEO e semântica */}
                    <dfn className="not-italic text-secondary">{item.termo}</dfn>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
                <p className="text-white-foregound leading-relaxed">
                    {item.explicacao}
                </p>

                {item.exemplo && (
                    <div className="bg-primary/5 p-4 rounded-xl border-l-4 border-primary/30">
                        <p className="text-sm text-foreground">
                            <span className="font-bold text-primary" aria-hidden="true">💡 </span>
                            <strong className="text-primary font-bold">Exemplo:</strong> {item.exemplo}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}