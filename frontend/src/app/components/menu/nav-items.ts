import { NavItem } from './types';

/**
 * Lista oficial de itens de navegação do Menu.
 *
 * @remarks
 * Esta constante representa a **Single Source of Truth (SSOT)**
 * para a configuração de navegação da aplicação.
 *
 * Todas as camadas devem consumir esta lista:
 * - Lógica de domínio (ex: `useMenuLogic`)
 * - Componentes de apresentação (Menu Desktop / Mobile)
 * - Testes, mocks e Storybook
 *
 * Nenhuma outra lista paralela de navegação deve existir.
 *
 * A tipagem utiliza `as const` em conjunto com `satisfies`
 * para garantir:
 * - Imutabilidade em tempo de execução
 * - Validação estrutural em tempo de compilação
 * - Inferência literal máxima para IDEs
 *
 * @public
 */
export const NAV_ITEMS = [
    {
        /**
         * Item de navegação: Home
         *
         * @remarks
         * Página inicial da aplicação.
         * Sempre visível e sem dependência de feature flag.
         */
        name: 'Home',
        href: '/',
    },
    {
        /**
         * Item de navegação: Estados
         *
         * @remarks
         * Rota principal para visualização de dados por estado.
         * Sempre visível.
         */
        name: 'Estados',
        href: '/estados',
    },
    {
        /**
         * Item de navegação: Explorar
         *
         * @remarks
         * Funcionalidade experimental/controlada.
         *
         * Este item só será exibido se a feature flag
         * `explorar-dados` estiver habilitada.
         *
         * A avaliação da flag é responsabilidade
         * da lógica de domínio (ex: `useMenuLogic`)
         * em conjunto com `MenuDeps`.
         */
        name: 'Explorar',
        href: '/explorar',
        featureFlag: 'explorar-dados',
    },
] as const satisfies readonly NavItem[];
