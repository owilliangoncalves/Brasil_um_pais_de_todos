'use client';

import React from 'react';

/**
 * Interface para as propriedades do componente Logo.
 * @interface LogoProps
 * @property {string} [className="w-10 h-10"] - Classes CSS do Tailwind para dimensionamento e posicionamento do SVG.
 * @property {boolean} [showText=false] - Define se o nome institucional "Cidadão de Olho" deve ser exibido ao lado do ícone.
 */
interface LogoProps {
    className?: string;
    showText?: boolean;
}

/**
 * Componente de Identidade Visual (Logo).
 * * @description Renderiza o símbolo oficial do portal: um olho estilizado com elementos de obturador fotográfico.
 * Inclui uma micro-interação de "piscar" (blink) disparada via hover no container pai,
 * utilizando transformações CSS nativas para performance.
 * * @component
 * @param {LogoProps} props - Propriedades de entrada.
 * @returns {React.JSX.Element} Container flexível com o ícone SVG e, opcionalmente, o texto da marca.
 */
export function Logo({ className = "w-10 h-10", showText = false }: LogoProps) {
    return (
        <div className="flex items-center gap-3 group select-none">
            {/* O SVG é puramente decorativo para leitores de tela; o texto descritivo (se presente)
                ou o contexto do link de navegação fornece a semântica necessária. */}
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"

                className={`${className} transition-all drop-shadow-sm`}
                aria-hidden="true"
            >
                {/* --- CAMADA BASE (Fundo do olho) ---
                    Representa a esclera/contorno do olho em Amarelo Ouro (Secondary).
                 */}
                <circle cx="50" cy="50" r="38" className="fill-secondary" />


                {/* --- GRUPO DE ANIMAÇÃO "PISCAR" ---
                    A classe 'group-hover:scale-y-[0.02]' achata o olho no eixo Y,
                    simulando o fechamento das pálpebras de forma fluida.
                 */}
                <g className="origin-center transition-transform duration-300 ease-in-out group-hover:scale-y-[0.02]">

                    {/* --- MIOLO DO OLHO (Íris e Pupila) --- */}
                    <g>
                        {/* 1. Íris: Verde natural (#388E3C) representando equilíbrio e fiscalização orgânica. */}
                        <circle cx="50" cy="50" r="12" fill="#388E3C" />
                        {/* 2. Pupila: Chumbo escuro (#212121) para alto contraste. */}
                        <circle cx="50" cy="50" r="6" fill="#212121" />
                    </g>

                    {/* --- ELEMENTOS DA LENTE (Sobreposição Branca) ---
                        Representação de lâminas de obturador e componentes ópticos,
                        reforçando a ideia de "captura" e "foco" nos dados.
                    */}
                    <g className="fill-white">
                        {/* Lâminas do obturador (Norte, Sul, Leste, Oeste) */}
                        <path d="M50 20 L55 35 L45 35 Z" className="opacity-90" />
                        <path d="M50 80 L55 65 L45 65 Z" className="opacity-90" />
                        <path d="M80 50 L65 45 L65 55 Z" className="opacity-90" />
                        <path d="M20 50 L35 45 L35 55 Z" className="opacity-90" />

                        {/* Pontos de conexão nos cantos (Elementos decorativos de profundidade) */}
                        <circle cx="32" cy="32" r="3" className="opacity-40" />
                        <circle cx="68" cy="32" r="3" className="opacity-40" />
                        <circle cx="32" cy="68" r="3" className="opacity-40" />
                        <circle cx="68" cy="68" r="3" className="opacity-40" />
                    </g>

                    {/* Brilho/Reflexo da Lente: Ponto de luz descentralizado para realismo visual. */}
                    <circle
                        cx="43"
                        cy="43"
                        r="3.5"
                        fill="white"
                        className="opacity-70"
                    />
                </g> {/* Fim do grupo do piscar */}
            </svg>

            {/* Texto institucional exibido apenas se showText for true */}
            {showText && (
                <div className="flex flex-col justify-center">
                    <h1 className="font-black text-foreground leading-none tracking-tighter uppercase text-xl">
                        Cidadão <span className="text-primary italic font-black">de Olho</span>
                    </h1>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mt-1">
                        Portal de Transparência
                    </p>
                </div>
            )}
        </div>
    );
}