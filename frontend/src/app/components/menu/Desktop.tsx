'use client';

import Link from 'next/link';
import { cn } from '@/utils/utils';

import { MenuProps } from './contracts';
import { useMenuLogic } from './logic';
import React from 'react';

/**
 * Componente de Menu de Navegação para Desktop.
 *
 * @remarks
 * Este componente é responsável **exclusivamente pela renderização**
 * do Menu em layouts desktop.
 *
 * Ele atua como um **Presentation Component**, consumindo:
 * - Contratos públicos (`MenuProps`)
 * - Lógica de domínio encapsulada (`useMenuLogic`)
 *
 * Este componente **não contém regras de domínio**
 * e **não deve tomar decisões de negócio**.
 *
 * ### Responsabilidades
 * - Renderizar apenas os itens de navegação visíveis
 * - Indicar visualmente o item ativo
 * - Garantir acessibilidade semântica
 *
 * ### Não responsabilidades
 * - Avaliar feature flags
 * - Gerenciar estado global
 * - Resolver rotas ou permissões
 *
 * @public
 */
export function DesktopMenu({
                                navItems,
                                currentPath,
                                deps,
                            }: MenuProps): React.JSX.Element {
    /**
     * Consome a lógica de domínio do Menu.
     *
     * @remarks
     * Toda a lógica de visibilidade e ativação
     * é delegada ao hook de domínio.
     */
    const { visibleNavItems, isActive } =
        useMenuLogic(navItems, currentPath, deps);

    return (
        <nav
            /**
             * Elemento semântico de navegação principal.
             *
             * @remarks
             * - Visível apenas em resoluções desktop
             * - Oculto em mobile via classes responsivas
             */
            className="hidden md:flex items-center gap-6"
            aria-label="Navegação principal"
        >
            <ul className="flex items-center gap-1 list-none">
                {visibleNavItems.map((item) => {
                    /**
                     * Determina se o item atual está ativo.
                     *
                     * @remarks
                     * Utilizado exclusivamente para:
                     * - Atributos de acessibilidade
                     * - Estilização visual
                     */
                    const active = isActive(item.href);

                    return (
                        <li key={item.href}>
                            <Link
                                /**
                                 * Rota de navegação interna.
                                 *
                                 * @remarks
                                 * Utiliza o componente `Link` do Next.js
                                 * para garantir navegação client-side.
                                 */
                                href={item.href}
                                /**
                                 * Indica semanticamente a página atual
                                 * para leitores de tela.
                                 */
                                aria-current={active ? 'page' : undefined}
                                className={cn(
                                    'relative px-3 py-2 text-sm font-medium transition-colors',
                                    active
                                        ? 'text-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                {item.name}

                                {active && (
                                    /**
                                     * Indicador visual do item ativo.
                                     *
                                     * @remarks
                                     * - Puramente decorativo
                                     * - Marcado como `aria-hidden`
                                     * - Não interfere na navegação por teclado
                                     */
                                    <span
                                        aria-hidden
                                        className="absolute left-0 right-0 bottom-0 h-0.5 bg-brazil-gradient rounded-full"
                                    />
                                )}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
