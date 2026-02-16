/**
 * API pública do módulo Menu.
 *
 * @remarks
 * Este arquivo atua como um **barrel file** e define
 * explicitamente a **superfície pública de exportação**
 * do domínio e dos componentes de Menu.
 *
 * Somente os símbolos exportados aqui devem ser consumidos
 * por módulos externos.
 *
 * Estrutura da API:
 * - Componentes de apresentação (Desktop e Mobile)
 * - Configuração oficial de navegação (SSOT)
 * - Tipos e contratos de domínio
 *
 * Qualquer item **não exportado neste arquivo**
 * é considerado **detalhe de implementação interno**
 * e pode ser alterado sem aviso prévio.
 *
 * @public
 */

/**
 * Componente de Menu para layouts desktop.
 *
 * @remarks
 * Responsável exclusivamente pela renderização
 * do Menu em resoluções desktop.
 *
 * Toda a lógica de domínio deve ser consumida
 * via hooks ou contratos do módulo.
 */
export { DesktopMenu } from './Desktop';

/**
 * Componente de Menu para layouts mobile.
 *
 * @remarks
 * Responsável pela renderização e interação
 * do Menu em dispositivos móveis.
 *
 * Inclui comportamento de abertura/fechamento
 * controlado por lógica de domínio.
 */
export { MobileMenu } from './Mobile';

/**
 * Lista oficial de itens de navegação do Menu.
 *
 * @remarks
 * Atua como **Single Source of Truth (SSOT)**
 * para a configuração de navegação da aplicação.
 *
 * Deve ser reutilizada por todos os consumidores
 * do Menu, evitando duplicação de configuração.
 */
export { NAV_ITEMS } from './nav-items';

/**
 * Tipo que representa um item de navegação do Menu.
 *
 * @remarks
 * Contrato de domínio compartilhado entre
 * configuração, lógica e UI.
 */
export type { NavItem } from './types';

/**
 * Contratos públicos do domínio Menu.
 *
 * @remarks
 * - `MenuProps`: API pública dos componentes de Menu
 * - `MenuDeps`: Boundary de infraestrutura do domínio
 *
 * Estes tipos representam contratos estáveis
 * e devem evoluir de forma retrocompatível.
 */
export type { MenuProps, MenuDeps } from './contracts';
