/**
 * Item de navegação do Menu.
 *
 * Representa uma rota navegável da aplicação e
 * serve como contrato entre configuração, lógica e UI.
 */
export type NavItem = Readonly<{
    /**
     * Chave de internacionalização do rótulo do item.
     * Exemplo: `nav.home`
     */
    name: string;

    /**
     * Rota interna da aplicação.
     * Deve sempre iniciar com `/`.
     */
    href: `/${string}`;

    /**
     * Feature flag associada ao item.
     *
     * Quando definida, o item só será exibido
     * se a flag estiver habilitada.
     */
    featureFlag?: string;
}>;
