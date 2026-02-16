/**
 * @module HeaderTypes
 * @description
 * Tipos de domínio utilizados pelo componente Header.
 *
 * Este módulo define os contratos de dados responsáveis
 * por descrever a navegação principal da aplicação,
 * mantendo consistência, segurança e extensibilidade.
 */

/**
 * Representa um item de navegação do Header.
 *
 * Um `NavItem` descreve um link interno exibido na
 * navegação principal (desktop e mobile), podendo
 * ser controlado por autenticação, feature flags
 * e internacionalização.
 *
 * Este tipo é projetado para:
 * - ser imutável
 * - prevenir estados inválidos em tempo de compilação
 * - servir como contrato público documentável
 *
 * @example
 * ```ts
 * const item: NavItem = {
 *   name: 'nav.estados',
 *   href: '/estados',
 *   requiresAuth: true,
 *   featureFlag: 'estados-v2',
 * };
 * ```
 *
 * @public
 */
export type NavItem = Readonly<{
    /**
     * Identificador textual do rótulo do item de navegação.
     *
     * @remarks
     * Este campo deve conter uma chave de internacionalização
     * (i18n), e não o texto literal exibido ao usuário.
     *
     * Exemplos válidos:
     * - `nav.home`
     * - `nav.estados`
     */
    name: string;

    /**
     * Rota interna da aplicação associada ao item.
     *
     * @remarks
     * - Deve sempre iniciar com `/`
     * - Não deve representar URLs externas
     * - Deve apontar para uma rota válida do Next.js
     *
     * O uso de template literal garante validação
     * em tempo de compilação.
     */
    href: `/${string}`;

    /**
     * Indica se o item de navegação exige que o usuário
     * esteja autenticado para ser exibido.
     *
     * @defaultValue false
     */
    requiresAuth?: boolean;

    /**
     * Identificador da feature flag associada ao item.
     *
     * @remarks
     * Quando definido, o item só será exibido caso
     * a feature flag correspondente esteja habilitada.
     *
     * Este campo permite:
     * - rollout progressivo
     * - testes A/B
     * - ativação controlada de funcionalidades
     */
    featureFlag?: string;
}>;
