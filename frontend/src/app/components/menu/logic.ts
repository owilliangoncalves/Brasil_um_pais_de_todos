'use client';

import { useMemo, useState } from 'react';
import { NavItem } from './types';
import { MenuDeps } from './contracts';

/**
 * Hook de lógica de domínio responsável por encapsular
 * todas as regras e estados relacionados ao Menu de Navegação.
 *
 * @remarks
 * Este hook **não renderiza UI** e **não possui dependência direta de componentes visuais**.
 * Ele deve ser consumido por componentes de apresentação (ex: Header, Sidebar, MobileMenu).
 *
 * Principais responsabilidades:
 * - Aplicar regras de visibilidade de itens (feature flags)
 * - Determinar o estado ativo das rotas
 * - Gerenciar o estado de abertura/fechamento do menu mobile
 *
 * Este hook é executado **exclusivamente no client-side**, pois utiliza
 * hooks de estado do React (`useState`, `useMemo`).
 *
 * @public
 */
export function useMenuLogic(
    /**
     * Lista completa de itens de navegação disponíveis.
     *
     * @remarks
     * Esta lista representa o estado "bruto" do domínio.
     * Regras de visibilidade (feature flags) são aplicadas internamente.
     */
    navItems: readonly NavItem[],

    /**
     * Caminho atual da aplicação (ex: `/dashboard`, `/settings`).
     *
     * @remarks
     * Normalmente obtido a partir do router do framework
     * (ex: `usePathname`, `router.asPath`).
     */
    currentPath: string,

    /**
     * Dependências externas opcionais do domínio Menu.
     *
     * @remarks
     * Permite desacoplar o domínio de implementações concretas,
     * como sistemas de feature flags, permissões ou A/B testing.
     *
     * Pode ser omitido em ambientes onde tais regras não são necessárias.
     */
    deps?: MenuDeps
) {
    /**
     * Estado que controla se o menu mobile está aberto ou fechado.
     *
     * @remarks
     * Este estado **não deve ser utilizado em layouts desktop**.
     * A decisão de uso pertence ao componente de apresentação.
     */
    const [isOpen, setIsOpen] = useState<boolean>(false);

    /**
     * Fecha explicitamente o menu mobile.
     *
     * @remarks
     * Função utilitária para evitar vazamento de detalhes de implementação
     * (`setIsOpen(false)`) para a camada de UI.
     */
    const closeMenu = (): void => setIsOpen(false);

    /**
     * Lista de itens de navegação visíveis após aplicação
     * das regras de domínio.
     *
     * @remarks
     * - Itens sem `featureFlag` são sempre visíveis.
     * - Itens com `featureFlag` dependem da função `isFeatureEnabled`.
     * - Caso `deps` ou `isFeatureEnabled` não sejam fornecidos,
     *   itens com feature flag serão considerados **inativos**.
     *
     * A lista retornada é memoizada para evitar recomputações
     * desnecessárias em re-renderizações.
     */
    const visibleNavItems: readonly NavItem[] = useMemo(() => {
        return navItems.filter((item) => {
            if (!item.featureFlag) return true;
            return deps?.isFeatureEnabled?.(item.featureFlag) ?? false;
        });
    }, [navItems, deps]);

    /**
     * Verifica se um item de navegação está ativo com base
     * no caminho atual da aplicação.
     *
     * @param href - Rota associada ao item de navegação.
     *
     * @returns `true` se o item corresponder exatamente ao caminho atual.
     *
     * @remarks
     * A estratégia atual utiliza igualdade estrita.
     * Caso a aplicação evolua para rotas aninhadas ou parciais,
     * esta regra pode ser estendida sem impacto na UI.
     *
     * @example
     * ```ts
     * isActive('/dashboard'); // true | false
     * ```
     */
    const isActive = (href: NavItem['href']): boolean => {
        return currentPath === href;
    };

    /**
     * API pública do hook.
     *
     * @remarks
     * Este contrato é estável e representa o **Boundary**
     * entre o domínio de navegação e a camada de apresentação.
     */
    return {
        /**
         * Indica se o menu mobile está aberto.
         */
        isOpen,

        /**
         * Setter exposto intencionalmente para permitir
         * controle direto por componentes de UI quando necessário.
         */
        setIsOpen,

        /**
         * Fecha o menu mobile.
         */
        closeMenu,

        /**
         * Itens de navegação visíveis após aplicação
         * das regras de domínio.
         */
        visibleNavItems,

        /**
         * Função utilitária para determinar estado ativo de rotas.
         */
        isActive,
    };
}
