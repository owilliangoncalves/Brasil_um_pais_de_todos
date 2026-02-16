import { NavItem } from './types';

/**
 * Dependências externas opcionais do domínio Menu.
 *
 * @remarks
 * Este contrato define o **boundary de infraestrutura**
 * consumido pelo domínio de Menu.
 *
 * O seu objetivo é permitir que a lógica de Menu permaneça
 * **totalmente desacoplada** de implementações concretas,
 * como:
 *
 * - Sistemas de feature flags
 * - Experimentos (A/B testing)
 * - Configurações por ambiente
 *
 * Nenhuma implementação concreta deve ser importada
 * diretamente pelo domínio — apenas este contrato.
 *
 * @public
 */
export interface MenuDeps {
    /**
     * Verifica se uma feature flag está habilitada.
     *
     * @param flag - Identificador único da feature flag.
     *
     * @returns
     * `true` se a feature estiver ativa para o contexto atual,
     * `false` caso contrário.
     *
     * @remarks
     * - A ausência desta função implica que **nenhuma feature flag está ativa**
     * - A estratégia de avaliação (usuário, ambiente, experimento)
     *   é responsabilidade exclusiva da camada de infraestrutura
     *
     * @example
     * ```ts
     * const deps: MenuDeps = {
     *   isFeatureEnabled: (flag) => flag === 'new-dashboard',
     * };
     * ```
     */
    isFeatureEnabled?: (flag: string) => boolean;
}

/**
 * Propriedades públicas dos componentes de Menu
 * (Desktop e Mobile).
 *
 * @remarks
 * Este contrato representa a **API pública estável**
 * dos componentes de Menu e define a fronteira entre:
 *
 * - Camada de composição/layout
 * - Domínio de navegação
 * - Componentes de apresentação
 *
 * ### Invariantes importantes
 * - Todas as props **devem ser serializáveis**
 * - Nenhuma função de callback deve cruzar a fronteira
 *   de componentes visuais
 * - Todos os dados devem ser tratados como imutáveis
 *
 * Essas restrições garantem compatibilidade com:
 * - Server Components
 * - Streaming / SSR
 * - Cache e reuso de renderização
 *
 * @public
 */
export interface MenuProps {
    /**
     * Lista de itens de navegação disponíveis.
     *
     * @remarks
     * Representa a configuração **bruta** do Menu.
     * Regras de visibilidade e ativação são aplicadas
     * posteriormente pela lógica de domínio.
     *
     * Deve ser tratada como **imutável** por todos
     * os consumidores.
     */
    readonly navItems: readonly NavItem[];

    /**
     * Caminho atual da aplicação.
     *
     * @remarks
     * Normalmente obtido a partir do sistema de roteamento
     * da aplicação (ex: `usePathname`, `router.asPath`).
     *
     * Utilizado para:
     * - Determinar estado ativo de itens
     * - Sincronizar UI com navegação atual
     *
     * @example
     * ```ts
     * currentPath: '/'
     * currentPath: '/dashboard'
     * currentPath: '/settings/profile'
     * ```
     */
    readonly currentPath: string;

    /**
     * Dependências opcionais de infraestrutura.
     *
     * @remarks
     * Permite injetar comportamentos externos
     * (ex: feature flags) sem acoplar o Menu
     * a bibliotecas ou serviços específicos.
     *
     * A ausência desta propriedade implica
     * comportamento padrão e previsível.
     */
    readonly deps?: MenuDeps;
}
