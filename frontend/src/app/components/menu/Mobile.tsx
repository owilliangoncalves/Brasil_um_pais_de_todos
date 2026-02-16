'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';

import { Button } from '@/components/lucide/button';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetDescription,
} from '@/components/lucide/sheet';
import { ThemeToggle } from '../ThemeToggle';
import { Glossario } from '../Glossario';
import { cn } from '@/utils/utils';

import { MenuProps } from './contracts';
import { useMenuLogic } from './logic';
import React from "react";

/**
 * Componente de Menu de Navegação para dispositivos móveis.
 *
 * @remarks
 * - Renderizado exclusivamente em layouts mobile (`md:hidden`)
 * - Atua como Presentation Component
 * - Consome lógica de domínio via `useMenuLogic`
 *
 * Responsabilidades:
 * - Exibir navegação principal em dispositivos móveis
 * - Controlar abertura/fechamento do menu lateral
 * - Indicar item de navegação ativo
 *
 * Não responsabilidades:
 * - Avaliar feature flags
 * - Resolver permissões ou regras de negócio
 *
 * @public
 */
export function MobileMenu({
                               navItems,
                               currentPath,
                               deps,
                           }: MenuProps): React.JSX.Element {
    const {
        isOpen,
        setIsOpen,
        closeMenu,
        visibleNavItems,
        isActive,
    } = useMenuLogic(navItems, currentPath, deps);

    return (
        <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10"
                        aria-label={
                            isOpen
                                ? 'Fechar menu de navegação'
                                : 'Abrir menu de navegação'
                        }
                    >
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </Button>
                </SheetTrigger>

                <SheetContent
                    side="right"
                    className="w-[85vw] sm:w-80 bg-background border-l"
                >
                    <SheetTitle className="pl-2 text-center text-lg font-bold border-b pb-2">
                        Menu
                    </SheetTitle>

                    <SheetDescription className="sr-only">
                        Acesse as diferentes seções do Portal.
                    </SheetDescription>

                    <nav aria-label="Navegação mobile">
                        <ul className="flex flex-col gap-2 list-none p-0">
                            {visibleNavItems.map((item) => {
                                const active = isActive(item.href);

                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            onClick={closeMenu}
                                            aria-current={active ? 'page' : undefined}
                                            className={cn(
                                                'relative flex w-full px-4 py-4 text-base font-semibold transition-colors',
                                                active
                                                    ? 'text-foreground'
                                                    : 'text-zinc-300 hover:text-white'
                                            )}
                                        >
                                            {item.name}

                                            {active && (
                                                <span
                                                    aria-hidden
                                                    className="absolute left-4 right-4 bottom-1 h-0.5 bg-brazil-gradient rounded-full"
                                                />
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="mt-8 pt-6 border-t border-border px-4">
                            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-400">
                  Dúvidas sobre termos?
                </span>
                                <Glossario />
                            </div>
                        </div>
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    );
}
