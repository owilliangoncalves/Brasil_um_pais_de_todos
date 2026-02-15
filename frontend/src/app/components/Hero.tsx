'use client';

import React from 'react';
import {ShieldCheck, ZoomIn } from 'lucide-react';

/**
 * Componente HeroSection.
 * * Representa a seção de impacto inicial da página principal (Landing Page).
 * Este componente utiliza tipografia expressiva e gradientes para reforçar o propósito
 * da plataforma "Cidadão de Olho", focando em clareza visual e acessibilidade.
 * * @component
 * @returns {JSX.Element} Uma seção de destaque com título, descrição e badges de confiança.
 */
export function HeroSection(): React.JSX.Element {
    return (
        <section
            aria-labelledby="hero-title"
            className="relative pt-20 pb-20 border-b border-border/40 overflow-hidden"
        >

            <div className="max-w-4xl mx-auto text-center space-y-10">

                {/* Badge flutuante com animação de entrada (zoom-in/fade-in).
                  Identifica a marca do projeto e atrai o foco visual inicial.
                */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-primary shadow-xl mx-auto animate-in fade-in zoom-in duration-500">
                    <ZoomIn className="w-4 h-4" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">Cidadão de Olho</span>
                </div>

                <div className="space-y-6">
                    {/* Título Principal: Utiliza tracking-tighter para um visual moderno e
                      um gradiente linear aplicado via mask (bg-clip-text) no termo em destaque.
                    */}
                    <h1
                        id="hero-title"
                        className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.9]"
                    >
                        O dinheiro público sob sua <br />
                        <span className="bg-linear-to-r from-primary via-green-500 to-emerald-400 bg-clip-text text-transparent italic">
                            fiscalização.
                        </span>
                    </h1>

                    <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-medium opacity-90">
                        Buscamos e disponibilizamos dado público para que a população se informe de como os governantes tem tratado nosso dinheiro
                    </p>
                </div>


                {/* Badges de Confiança: Área dedicada a reforçar a credibilidade dos dados.
                  Utiliza ícones da Lucide para reforço semântico visual.
                */}
                <div className="flex flex-wrap justify-center gap-10 pt-8 text-[11px] font-black text-muted-foreground/50 uppercase tracking-[0.2em]">
                    <div className="flex items-center gap-2.5">
                        <ShieldCheck className="w-5 h-5 text-primary/60" /> Fontes Oficiais
                    </div>
                </div>
            </div>
        </section>
    );
}