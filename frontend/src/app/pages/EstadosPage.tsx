'use client';

import React, { useState, useMemo, useEffect, useDeferredValue } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {Estado, estados, obterTotaisPorRegiao} from '@/data/estados';

import { EstadoCard } from '@/components/EstadoCard';

import { HeroStats } from '@/components/HeroEstados';
import { RegionFilter } from '@/components/FiltroRegiao';
import { DashboardCharts } from '@/components/Resumos';

/**
 * Componente de Página Principal: Painel de Estados.
 * * @description Atua como o "Controller" da visualização de estados, gerenciando o estado global
 * da listagem, filtragem por região e busca textual. Coordena a sincronização desses estados
 * com a URL (Query Parameters) para permitir compartilhamento de links e persistência de navegação.
 * * @component
 * @returns {React.JSX.Element} A estrutura completa da página de estados.
 */
export function EstadosPage(): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();

  // --- 1. Lógica de Estado e URL ---

  /** @type {string} Termo de busca inicial recuperado da URL (`?q=`). */
  const initialSearch: string = searchParams.get('q') || '';

  /** @type {string|null} Região inicial recuperada da URL (`?regiao=`). */
  const initialRegion: string | null = searchParams.get('regiao');

  const [buscaEstado, setBuscaEstado] = useState(initialSearch);
  const [regiaoSelecionada, setRegiaoSelecionada] = useState<string | null>(initialRegion);

  /** * @type {string} Versão atrasada do termo de busca para otimização de performance.
   * Evita re-renderizações pesadas da lista de estados a cada pressionamento de tecla.
   */
  const buscaDeferred: string = useDeferredValue(buscaEstado);

  /**
   * Efeito de Sincronização: URL Reflection.
   * * @description Atualiza os parâmetros da URL sempre que a busca (deferred) ou
   * a região selecionada mudam, utilizando `router.replace` para evitar poluição no histórico.
   */
  useEffect(() => {
    const params = new URLSearchParams();
    if (buscaDeferred) params.set('q', buscaDeferred);
    if (regiaoSelecionada) params.set('regiao', regiaoSelecionada);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [buscaDeferred, regiaoSelecionada, router]);

  // --- 2. Processamento de Dados ---

  /**
   * @type {Array<Estado>} Lista de estados filtrada.
   * * @description Aplica filtros combinados de texto (nome/sigla) e região geográfica.
   * Computação memoizada para evitar filtragem desnecessária em re-renders não relacionados.
   */
  const estadosFiltrados: Array<Estado> = useMemo(() => {
    const termo = buscaDeferred.toLowerCase().trim();
    return estados.filter(estado => {
      const matchBusca = termo === '' ||
          estado.nome.toLowerCase().includes(termo) ||
          estado.sigla.toLowerCase().includes(termo);
      const matchRegiao = !regiaoSelecionada || estado.regiao === regiaoSelecionada;
      return matchBusca && matchRegiao;
    });
  }, [buscaDeferred, regiaoSelecionada]);

  /** * @type {RegionData[]} Agregados financeiros por região.
   * Memoizado com array de dependências vazio pois os dados fonte são estáticos neste contexto.
   */
  const totaisPorRegiao = useMemo(() => obterTotaisPorRegiao(), []);

  /** * @type {Object} Consolidação dos grandes números nacionais.
   */
  const totalNacional: object = useMemo(() => ({
    populacao: estados.reduce((acc, e) => acc + e.populacao, 0),
    orcamento: estados.reduce((acc, e) => acc + e.orcamento, 0),
  }), []);

  /**
   * Reseta todos os filtros ativos para o estado inicial.
   */
  const handleLimparFiltros = () => {
    setBuscaEstado('');
    setRegiaoSelecionada(null);
  };

  /**
   * Atualiza a região ativa para filtragem.
   * @param {string | null} regiao - Nome da região ou null para desativar.
   */
  const handleSelectRegiao = (regiao: string | null) => {
    setRegiaoSelecionada(regiao);
  };

  return (
      <div className="min-h-screen bg-background">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">

          {/* 1. HERO SECTION */}
          <HeroStats totalNacional={totalNacional} />

          {/* 2. FILTROS DE REGIÃO */}
          <RegionFilter
              totais={totaisPorRegiao}
              selecionada={regiaoSelecionada}
              buscaAtiva={buscaEstado}
              onSelect={handleSelectRegiao}
              onLimpar={handleLimparFiltros}
          />

          {/* 3. GRÁFICOS E MAPA (Refatorado) */}
          <DashboardCharts totaisPorRegiao={totaisPorRegiao} />

          {/* 4. LISTA DE ESTADOS E BUSCA */}
          <section aria-labelledby="search-title" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-xl">
                <h2 id="search-title" className="text-2xl font-bold mb-2">Lista de Estados</h2>
                <p className="text-muted-foreground">
                  Acompanhe indicadores detalhados de cada unidade federativa.
                </p>
              </div>

              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input
                    type="search"
                    placeholder="Buscar estado (Ex: SP, Bahia...)"
                    value={buscaEstado}
                    onChange={(e) => setBuscaEstado(e.target.value)}
                    className="pl-10 h-12 text-base shadow-sm"
                    aria-label="Buscar estado por nome ou sigla"
                />
                {buscaEstado && (
                    <button
                        onClick={() => setBuscaEstado('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                )}
              </div>
            </div>

            {/* Container de feedback dinâmico para acessibilidade */}
            <div aria-live="polite" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {estadosFiltrados.map((estado) => (
                  <EstadoCard key={estado.sigla} estado={estado} />
              ))}
            </div>

            {/* Empty State: Exibido quando a busca ou filtro não retornam resultados */}
            {estadosFiltrados.length === 0 && (
                <div className="text-center py-16 bg-accent/20 rounded-xl border border-dashed border-border animate-in fade-in zoom-in-95 duration-300">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium">Nenhum estado encontrado</h3>
                  <p className="text-muted-foreground mt-1 max-w-md mx-auto">
                    Não encontramos resultados para <span className="font-semibold text-foreground">"{buscaEstado}"</span>
                    {regiaoSelecionada && <span> na região <span className="font-semibold text-foreground">{regiaoSelecionada}</span></span>}.
                  </p>
                  <Button
                      variant="outline"
                      onClick={handleLimparFiltros}
                      className="mt-6"
                  >
                    Limpar todos os filtros
                  </Button>
                </div>
            )}
          </section>
        </main>
      </div>
  );
}