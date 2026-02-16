'use client';
import { HeroProps } from '@/components/hero/props';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/utils/utils';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/lucide/button';

export function Hero({
                         logo,
                         titulo,
                         descricao,
                         acoes,
                         auxiliar,
                         tamanho = 'default',
                         imagem,
                         creditoImagem,
                     }: HeroProps & { creditoImagem?: string }): React.JSX.Element {
    return (
        <section
            aria-labelledby="hero-title"
            className={cn(
                'relative overflow-hidden rounded-2xl',
                tamanho === 'default' ? 'pt-24 pb-24' : 'pt-16 pb-16'
            )}
        >
            {/* --- Imagem Desktop --- */}
            {imagem && (
                <div className="hidden md:block absolute inset-0 -z-10 w-full h-full">
                    {typeof imagem === 'string' ? (
                        <img
                            src={imagem}
                            alt=""
                            className="w-full h-full object-cover object-center rounded-2xl"
                        />
                    ) : (
                        <div className="w-full h-full rounded-2xl overflow-hidden relative">
                            {imagem}
                            {creditoImagem && (
                                <div className="absolute bottom-2 right-2 text-xs text-foreground italic px-2 py-1 bg-black/30 rounded">
                                    {creditoImagem}
                                </div>
                            )}
                        </div>
                    )}
                    {/* Overlay escuro para contraste */}
                    <div className="absolute inset-0 bg-black/30 rounded-2xl" />
                </div>
            )}

            {/* --- Conteúdo principal --- */}
            <div className="max-w-5xl mx-auto text-center space-y-10 px-4 relative z-10">
                {logo && (
                    <div className="flex justify-center animate-in fade-in zoom-in duration-700">
                        {logo}
                    </div>
                )}

                <div className="space-y-6">
                    {/* --- Título principal --- */}
                    <h1 id="hero-title" className="text-4xl md:text-8xl font-black">
                        {/* Mobile simplificado */}
                        <span className="block md:hidden bg-brazil-gradient bg-clip-text text-transparent">
              Visão Geral
            </span>
                        {/* Desktop completo */}
                        <span className="hidden md:block">{titulo}</span>
                    </h1>

                    {descricao && (
                        <p className="hidden md:block text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
                            {descricao}
                        </p>
                    )}
                </div>

                {/* --- Ações / Botões --- */}
                {acoes && acoes.length > 0 && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                        {acoes.map((action) => (
                            <Button
                                key={action.href}
                                size="lg"
                                asChild
                                className={cn(
                                    'rounded-full h-14 px-10 text-xl gap-2 group',
                                    action.variant === 'primary' && 'bg-accent text-white',
                                    action.variant === 'secondary' && 'bg-secondary text-secondary-foreground'
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

                {/* --- Conteúdo auxiliar --- */}
                {auxiliar && <div className="pt-10 hidden md:block">{auxiliar}</div>}
            </div>
        </section>
    );
}
