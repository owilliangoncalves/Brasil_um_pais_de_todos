'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { estados, coresRegioes } from '@/data/estados';

/**
 * Propriedades para o componente MapaBrasil.
 * @interface MapaBrasilProps
 * @property {string} [className] - Classes CSS adicionais para estilização do container.
 */
interface MapaBrasilProps {
  className?: string;
}

/**
 * Declaração global para suporte a bibliotecas amCharts carregadas via CDN.
 * @global
 */
declare global {
  interface Window {
    am5?: any;
    am5map?: any;
    am5themes_Animated?: any;
    am5geodata_brazilLow?: any;
  }
}

/**
 * Componente de Mapa Interativo do Brasil.
 * * @description Renderiza uma representação cartográfica vetorial (SVG) do Brasil utilizando a amCharts 5.
 * O componente gerencia o carregamento dinâmico de scripts, adapta-se ao tema (claro/escuro) e
 * fornece uma navegação acessível via teclado e leitores de tela.
 * * @component
 * @returns {React.JSX.Element} Seção contendo o mapa interativo e fallback de acessibilidade.
 */
export function MapaBrasil({ className = '' }: MapaBrasilProps): React.JSX.Element {
  const router = useRouter();

  /** @type {React.RefObject<HTMLDivElement>} Referência ao elemento DOM onde o gráfico será injetado. */
  const chartRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  /** @type {React.RefObject<any>} Armazena a instância 'Root' da amCharts para permitir o descarte (dispose) correto. */
  const rootRef = useRef<any>(null);

  useEffect(() => {
    /**
     * Carrega scripts externos de forma assíncrona.
     * @param {string} src - URL do script.
     * @returns {Promise<void>}
     */
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) { resolve(); return; }

        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.head.appendChild(script);
      });
    };

    /**
     * Inicializa a instância do mapa e configura séries de polígonos.
     * * @description Define a lógica de cores por região, tooltips dinâmicos e
     * eventos de navegação programática.
     */
    const initMap = () => {
      if (!chartRef.current || !window.am5 || !window.am5map) {
        setError(true);
        setIsLoading(false);
        return;
      }

      try {
        // Garante a limpeza de instâncias prévias para evitar vazamento de memória
        if (rootRef.current) { rootRef.current.dispose(); }

        const root = window.am5.Root.new(chartRef.current);
        rootRef.current = root;

        // ACESSIBILIDADE: Label principal para usuários de tecnologias assistivas
        root.container.set("accessibleLabel", "Mapa Interativo do Brasil. Use as setas para navegar entre os estados e Enter para selecionar.");

        if (window.am5themes_Animated) {
          root.setThemes([window.am5themes_Animated.new(root)]);
        }

        const chart = root.container.children.push(
            window.am5map.MapChart.new(root, {
              panX: 'none', // Restringe o movimento para manter o foco visual e acessível
              panY: 'none',
              projection: window.am5map.geoMercator(),
            })
        );

        const polygonSeries = chart.series.push(
            window.am5map.MapPolygonSeries.new(root, {
              geoJSON: window.am5geodata_brazilLow,
              calculateVisualCenter: true
            })
        );

        /**
         * Localiza metadados do estado no domínio da aplicação com base no ID do GeoJSON.
         * @param {string} id - ID no formato 'BR-XX'.
         */
        const getEstadoInfo = (id: string) => {
          const sigla = id.replace('BR-', '');
          return estados.find(e => e.sigla === sigla);
        };

        // Configuração de interatividade e semântica dos polígonos (estados)
        polygonSeries.mapPolygons.template.setAll({
          tooltipText: "{name}: Região {regiao}",
          interactive: true,
          fill: window.am5.color(theme === 'dark' ? '#1e293b' : '#f8fafc'),
          strokeWidth: 1.5,
          stroke: window.am5.color('#ffffff'),
          focusable: true, // Habilita foco por Tab
          role: "button",
          ariaLabel: "{name}"
        });

        // Enriquecimento de dados após validação do GeoJSON
        polygonSeries.events.on("datavalidated", () => {
          polygonSeries.mapPolygons.each((polygon: any) => {
            const id = polygon.dataItem.get("id");
            const info = getEstadoInfo(id);
            if (info) {
              polygon.dataItem.set("regiao", info.regiao);
            }
          });
        });

        // Adaptador dinâmico para aplicar as cores do Design System por região
        polygonSeries.mapPolygons.template.adapters.add('fill', (fill: any, target: any) => {
          const id = target.dataItem?.get('id');
          const info = getEstadoInfo(id);
          return info ? window.am5.color(coresRegioes[info.regiao]) : fill;
        });

        // Navegação ao clicar ou pressionar 'Enter' no polígono selecionado
        polygonSeries.mapPolygons.template.events.on('click', (ev: any) => {
          const id = ev.target.dataItem.get('id');
          if (id) {
            const sigla = id.replace('BR-', '').toLowerCase();
            router.push(`/estado/${sigla}`);
          }
        });

        chart.goHome(0);
        setIsLoading(false);
      } catch (err) {
        setError(true);
        setIsLoading(false);
      }
    };

    /**
     * Coordena o carregamento sequencial dos recursos amCharts.
     */
    const loadAmCharts = async () => {
      try {
        setIsLoading(true);
        await loadScript('https://cdn.amcharts.com/lib/5/index.js');
        await loadScript('https://cdn.amcharts.com/lib/5/map.js');
        await loadScript('https://cdn.amcharts.com/lib/5/themes/Animated.js');
        await loadScript('https://cdn.amcharts.com/lib/5/geodata/brazilLow.js');
        // Pequeno atraso para garantir registro total no objeto window
        await new Promise(resolve => setTimeout(resolve, 200));
        initMap();
      } catch (err) {
        setError(true);
        setIsLoading(false);
      }
    };

    loadAmCharts();

    // Limpeza da instância ao desmontar o componente
    return () => rootRef.current?.dispose();
  }, [router, theme]);

  return (
      <section className={className} aria-labelledby="mapa-titulo">
        <h2 id="mapa-titulo" className="sr-only">Mapa de Transparência por Estado</h2>

        {/* * FALLBACK PARA LEITORES DE TELA (WCAG 1.1.1)
            * Garante que o conteúdo seja acessível caso o SVG não carregue
            * ou para usuários que preferem navegação linear por lista.
          */}
        <div className="sr-only">
          <p>Lista de estados brasileiros para navegação alternativa:</p>
          <ul>
            {estados.map(e => (
                <li key={e.sigla}>
                  <button onClick={() => router.push(`/estado/${e.sigla.toLowerCase()}`)}>
                    Ver dados de {e.nome}
                  </button>
                </li>
            ))}
          </ul>
        </div>

        {/* Feedback de carregamento com aria-live */}
        {isLoading && (
            <div className="w-full h-150 bg-muted/20 rounded-lg flex items-center justify-center" aria-live="polite">
              <p className="font-medium">Carregando mapa interativo...</p>
            </div>
        )}

        <div
            ref={chartRef}
            role="application"
            aria-roledescription="map"
            className={`w-full rounded-lg overflow-hidden transition-opacity duration-300 ${
                isLoading ? 'opacity-0 h-0' : 'opacity-100'
            }`}
            style={{ height: isLoading ? '0px' : '600px' }}
        />

        {!isLoading && !error && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              Clique no Estado que deseja visualizar as informações.
            </p>
        )}
      </section>
  );
}