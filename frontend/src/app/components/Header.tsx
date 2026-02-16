'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { Glossario } from './Glossario';

import {
    DesktopMenu,
    MobileMenu,
    NAV_ITEMS,
} from '@/components/menu';
import React from 'react';

/**
 * Cabeçalho principal da aplicação.
 *
 * @remarks
 * Este componente atua como um **Layout Orchestrator**.
 * Ele é responsável por compor e posicionar elementos
 * estruturais do topo da aplicação, sem conter lógica
 * de domínio ou regras de negócio.
 *
 * O `Header` coordena:
 * - Identidade visual (Logo)
 * - Navegação principal (Desktop e Mobile)
 * - Utilidades globais (Tema, Glossário)
 *
 *  Este componente **não decide o que aparece no menu**.
 * Todas as regras de navegação são delegadas ao domínio
 * do módulo `Menu`.
 *
 * @public
 */
export function Header(): React.JSX.Element {
    /**
     * Caminho atual da aplicação.
     *
     * @remarks
     * Obtido a partir do App Router do Next.js.
     * É repassado aos componentes de Menu para:
     * - Determinar item ativo
     * - Sincronizar estado visual da navegação
     */
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <a
                href="/"
                className="sr-only focus:not-sr-only focus:absolute focus:z-100 focus:p-4 focus:bg-primary focus:text-white focus:rounded-br-lg"
            >
                Pular para o conteúdo principal
            </a>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <Link
                    href="/"
                    aria-label="Ir para a página inicial"
                    className="hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                    <Logo showText />
                </Link>

                <DesktopMenu
                    navItems={NAV_ITEMS}
                    currentPath={pathname}
                />

                <div className="flex items-center gap-2">
                    <div className="hidden md:flex items-center gap-2">
                        <Glossario />
                        <ThemeToggle />
                    </div>

                    <MobileMenu
                        navItems={NAV_ITEMS}
                        currentPath={pathname}
                    />
                </div>
            </div>
        </header>
    );
}
