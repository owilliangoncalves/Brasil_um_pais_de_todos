'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/utils/utils';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/lucide/button';

type HeroAction = {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary';
};

interface HeroProps {
    /** Elemento de identidade visual (Logo ou Badge) */
    logo?: React.ReactNode;

    /** Headline principal (H1 obrigatório) */
    titulo: React.ReactNode;

    /** Texto de apoio opcional */
    descricao?: React.ReactNode;

    /** Ações principais do Hero */
    acoes?: readonly HeroAction[];

    /** Conteúdo auxiliar (ex: provas, selos, confiança) */
    auxiliar?: React.ReactNode;

    /** Ajustes finos de layout */
    tamanho?: 'default' | 'compact';
}

/**
 * Hero unificada do sistema.
 *
 * Atua como componente estrutural de alto nível.
 * Não contém lógica de domínio.
 */
export function Hero({
                         logo,
                         titulo,
                         descricao,
                         acoes,
                         auxiliar,
                         tamanho = 'default',
                     }: HeroProps): React.JSX.Element {
    return (
        <section
            aria-labelledby="hero-title"
            className={cn(
                '',
                tamanho === 'default' ? 'pt-24 pb-24' : 'pt-16 pb-16'
            )}
        >
            <div className="max-w-5xl mx-auto text-center space-y-10 px-4">
                {logo && (
                    <div className="flex justify-center animate-in fade-in zoom-in duration-700">
                        {logo}
                    </div>
                )}

                <div className="space-y-6">
                    <h1
                        id="hero-title"
                        className="text-5xl md:text-8xl"
                    >
                        {titulo}
                    </h1>

                    {descricao && (
                        <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
                            {descricao}
                        </p>
                    )}
                </div>

                {acoes && acoes.length > 0 && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                        {acoes.map((action) => (
                            <Button
                                key={action.href}
                                size="lg"
                                asChild
                                className={cn(
                                    'rounded-full h-14 px-10 text-xl gap-2 group',
                                    action.variant === 'primary' && 'bg-accent text-white ',
                                    action.variant === 'secondary' && 'bg-secondary text-secondary-foreground '
                                )}
                            >
                                <Link href={action.href}>
                                    {action.label}
                                    {action.variant !== 'secondary' && (
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    )}
                                </Link>
                            </Button>
                        ))}
                    </div>
                )}


                {auxiliar && (
                    <div className="pt-10">{auxiliar}</div>
                )}
            </div>
        </section>
    );
}
