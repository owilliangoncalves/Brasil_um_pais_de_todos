/**
 * Hook customizado para dados do Dashboard
 * Gerencia múltiplas chamadas de serviço de forma centralizada
 */

import { useState, useEffect } from 'react';
import {
  obterResumoOrcamentario,
  obterFontesReceita,
  obterAreasDespesa,
  obterTransacoes,
  type ResumoOrcamentario,
  type FonteReceita,
  type AreaDespesa,
  type TransacaoPublica
} from '../services/transparenciaService';

interface DashboardData {
  resumoOrcamentario: ResumoOrcamentario[];
  fontesReceita: FonteReceita[];
  areasDespesa: AreaDespesa[];
  transacoesRecentes: TransacaoPublica[];
}

export function useDashboardData() {
  const [data, setData] = useState<DashboardData>({
    resumoOrcamentario: [],
    fontesReceita: [],
    areasDespesa: [],
    transacoesRecentes: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        setError(null);

        // Carregar todos os dados em paralelo
        const [resumo, fontes, areas, transacoes] = await Promise.all([
          obterResumoOrcamentario(),
          obterFontesReceita(),
          obterAreasDespesa(),
          obterTransacoes()
        ]);

        setData({
          resumoOrcamentario: resumo,
          fontesReceita: fontes,
          areasDespesa: areas,
          transacoesRecentes: transacoes.slice(0, 5)
        });
      } catch (err) {
        setError('Erro ao carregar dados do painel. Tente novamente.');
        console.error('Erro ao carregar dados do dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  return { data, loading, error };
}
