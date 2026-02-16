'use client';

import React from 'react';
import Link from 'next/link';
import { useExplorarTransacoes } from '@/hooks/useExplorarTransacoes';
import { exportarParaCSV } from '@/utils/export';


import { FilterPanel } from '@/components/FilterPanel';
import { ExportBanner } from '@/components/ExportBanner';
import { TransactionList } from '@/components/TransactionList';

/**
 * ExplorarPage - Orquestrador de Dados Públicos.
 * * @description Esta página atua como o ponto de entrada principal para a exploração de
 * transações financeiras. Ela coordena o estado de filtros, a exibição de resultados
 * e as ações de exportação.
 * * Melhores Práticas Aplicadas:
 * - **Landmarks**: Uso rigoroso de `<nav>`, `<header>`, `<main>` e `<section>` para facilitar a navegação por tecnologias assistivas.
 * - **Hierarquia**: Título `h1` único e bem definido para SEO e acessibilidade.
 * - **Modularização**: Separação clara entre a lógica de negócio (encapsulada no hook `useExplorarTransacoes`) e a interface.
 * * @component
 * @returns {React.JSX.Element} A estrutura completa da página de exploração de dados.
 */
export default function ExplorarPage(): React.JSX.Element {
  /**
   * Hook customizado que gerencia o estado dos filtros, a busca de dados e as ações de mutação.
   * @type {Object}
   * @property {Object} filtros - Estados controlados para Busca, Categoria, Órgão e Status.
   * @property {Object} data - Dados retornados, incluindo array de transações, total financeiro, status de loading e erro.
   * @property {Object} actions - Métodos para manipulação de estado, como reset de filtros.
   */
  const { filtros, data, actions } = useExplorarTransacoes();

  /**
   * Dispara o utilitário de exportação para CSV.
   * @description Verifica se há dados presentes no estado atual antes de invocar a função de download.
   * @function
   */
  const handleExportarAction = () => {
    if (data.transacoes.length > 0) {
      exportarParaCSV(data.transacoes, 'transparencia-explorar');
    }
  };

  return (
      <div className="min-h-screen bg-background pb-20">
        {/* Landmark: Main
          Contém o conteúdo central e exclusivo da página. O ID 'main-content'
          permite a implementação de links de "pular para o conteúdo".
        */}
        <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12 animate-in fade-in duration-700">

          {/* Landmark: Nav (Breadcrumb)
            Fornece contexto de localização hierárquica dentro da aplicação.
            Utiliza 'aria-current="page"' para identificar o link da página ativa.
          */}
          <nav aria-label="Você está em:" className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60">
            <ol className="flex items-center gap-2 list-none p-0">
              <li>
                <Link href="/" className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded">
                  Início
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground" aria-current="page">Explorar Dados</li>
            </ol>
          </nav>

          {/* Landmark: header Interno
              Apresenta o propósito da página com tipografia de alto impacto.
          */}
          <header className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-foreground">
              Transparência pra <br />
              <span className="bg-linear-to-r from-primary via-green-500 to-emerald-400 bg-clip-text text-transparent italic pr-2">
              você.
            </span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl font-medium leading-relaxed opacity-90">
              Acompanhe a aplicação dos recursos públicos com filtros detalhados e ferramentas de exportação em tempo real.
            </p>
          </header>

          {/* Componente: Painel de Filtros
            Responsável pela captura de intenção do usuário.
          */}
          <FilterPanel
              filtros={filtros}
              onClearAction={actions.limparFiltros}
          />

          {/* Componente: Banner de Resultados
            Sinaliza o resumo financeiro dos dados filtrados e oferece ação de exportação.
          */}
          <ExportBanner
              total={data.totalFiltrado}
              count={data.transacoes.length}
              onExportAction={handleExportarAction}
              isLoading={data.loading}
          />

          {/* Componente: Lista de Resultados
            Exibição granular das transações com suporte a estados assíncronos.
          */}
          <TransactionList
              transacoes={data.transacoes}
              loading={data.loading}
              error={data.error}
          />

        </main>
      </div>
  );
}