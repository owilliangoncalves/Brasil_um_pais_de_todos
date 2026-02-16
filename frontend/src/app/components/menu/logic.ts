'use client';

import { useMemo, useState } from 'react';
import { NavItem } from './types';
import { MenuDeps } from './contracts';

/**
 * Hook de lógica compartilhada do domínio Menu.
 *
 * Responsabilidades:
 * - Determinar itens visíveis (feature flags)
 * - Determinar estado ativo de cada rota
 * - Controlar abertura/fechamento do menu mobile
 *
 * Este hook NÃO renderiza UI.
 */
export function useMenuLogic(
    navItems: readonly NavItem[],
    currentPath: string,
    deps?: MenuDeps
) {
    /**
     * Estado de abertura do menu (utilizado apenas no mobile).
     */
    const [isOpen, setIsOpen] = useState(false);

    /**
     * Fecha explicitamente o menu.
     */
    const closeMenu = () => setIsOpen(false);

    /**
     * Lista de itens visíveis após aplicar regras de domínio.
     */
    const visibleNavItems: readonly NavItem[] = useMemo(() => {
        return navItems.filter((item) => {
            if (!item.featureFlag) return true;
            return deps?.isFeatureEnabled?.(item.featureFlag) ?? false;
        });
    }, [navItems, deps]);

    /**
     * Verifica se uma rota está ativa com base no caminho atual.
     *
     * @param href - Rota do item de navegação
     */
    const isActive = (href: NavItem['href']): boolean => {
        return currentPath === href;
    };

    return {
        isOpen,
        setIsOpen,
        closeMenu,
        visibleNavItems,
        isActive,
    };
}
