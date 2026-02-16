/**
 * Item de navegação do Menu.
 *
 * @remarks
 * Representa uma **unidade de navegação navegável** da aplicação.
 * Este tipo atua como um **contrato de domínio** entre:
 *
 * - Configuração estática de rotas
 * - Lógica de domínio do menu (ex: visibilidade, estado ativo)
 * - Camada de apresentação (UI)
 *
 * Este contrato é **imutável** (`Readonly`) por definição,
 * garantindo previsibilidade e segurança ao longo do fluxo
 * de dados da aplicação.
 *
 * @public
 */
export type NavItem = Readonly<{
    /**
     * Chave de internacionalização (i18n) do rótulo do item.
     *
     * @remarks
     * Esta propriedade **não representa texto visível diretamente**,
     * mas sim uma chave resolvida por um sistema de internacionalização
     * (ex: `react-intl`, `i18next`, `next-intl`).
     *
     * A resolução do texto é responsabilidade exclusiva
     * da camada de apresentação.
     *
     * @example
     * ```ts
     * name: 'nav.home'
     * name: 'nav.settings.profile'
     * ```
     */
    name: string;

    /**
     * Rota interna da aplicação associada ao item.
     *
     * @remarks
     * - Deve sempre iniciar com `/`
     * - Representa uma rota **interna**, nunca uma URL externa
     * - Utilizada para navegação e determinação de estado ativo
     *
     * O uso de um *template literal type* (`/${string}`)
     * fornece validação estática em tempo de compilação,
     * prevenindo configurações inválidas.
     *
     * @example
     * ```ts
     * href: '/'
     * href: '/dashboard'
     * href: '/settings/profile'
     * ```
     */
    href: `/${string}`;

    /**
     * Feature flag associada ao item de navegação.
     *
     * @remarks
     * Quando definida, o item **só deve ser exibido**
     * se a flag correspondente estiver habilitada
     * pelo sistema de feature flags da aplicação.
     *
     * A avaliação desta flag **não é responsabilidade**
     * deste tipo, mas sim da lógica de domínio
     * (ex: `useMenuLogic`).
     *
     * A ausência desta propriedade implica que
     * o item é **sempre visível**, independentemente
     * de ambiente ou configuração.
     *
     * @example
     * ```ts
     * featureFlag: 'new-dashboard'
     * featureFlag: 'billing.v2'
     * ```
     */
    featureFlag?: string;
}>;
