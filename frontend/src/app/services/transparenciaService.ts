/**
 * Camada de Serviço - Simula chamadas a uma API Backend
 * Em produção, estas funções fariam requisições HTTP reais
 */

import { 
  transacoes, 
  resumoMensal, 
  fontesReceita, 
  areasDespesa,
  categorias,
  orgaos,
  statusOptions,
  type TransacaoPublica,
  type ResumoOrcamentario,
  type FonteReceita,
  type AreaDespesa
} from '@/data/mockData';

// Simula delay de rede para realismo
const simulateNetworkDelay = (ms: number = 300) => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Service: Obter todas as transações
 */
export const obterTransacoes = async (): Promise<TransacaoPublica[]> => {
  await simulateNetworkDelay();
  // Em produção: return await fetch('/api/transacoes').then(res => res.json());
  return transacoes;
};

/**
 * Service: Obter transação por ID
 */
export const obterTransacaoPorId = async (id: string): Promise<TransacaoPublica | null> => {
  await simulateNetworkDelay();
  // Em produção: return await fetch(`/api/transacoes/${id}`).then(res => res.json());
  const transacao = transacoes.find(t => t.id === id);
  return transacao || null;
};

/**
 * Service: Filtrar transações
 */
export interface FiltrosTransacao {
  busca?: string;
  categoria?: string;
  orgao?: string;
  status?: string;
}

export const filtrarTransacoes = async (filtros: FiltrosTransacao): Promise<TransacaoPublica[]> => {
  await simulateNetworkDelay();
  
  // Em produção: enviar filtros como query params
  // const params = new URLSearchParams(filtros);
  // return await fetch(`/api/transacoes?${params}`).then(res => res.json());
  
  return transacoes.filter((transacao) => {
    const matchBusca = !filtros.busca || 
      transacao.descricao.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      transacao.origem.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      transacao.destino.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      transacao.id.toLowerCase().includes(filtros.busca.toLowerCase());

    const matchCategoria = !filtros.categoria || filtros.categoria === 'Todas' || 
      transacao.categoria === filtros.categoria;
      
    const matchOrgao = !filtros.orgao || filtros.orgao === 'Todos' || 
      transacao.orgao === filtros.orgao;
      
    const matchStatus = !filtros.status || filtros.status === 'todos' || 
      transacao.status === filtros.status;

    return matchBusca && matchCategoria && matchOrgao && matchStatus;
  });
};

/**
 * Service: Obter resumo orçamentário
 */
export const obterResumoOrcamentario = async (): Promise<ResumoOrcamentario[]> => {
  await simulateNetworkDelay();
  // Em produção: return await fetch('/api/resumo-orcamentario').then(res => res.json());
  return resumoMensal;
};

/**
 * Service: Obter fontes de receita
 */
export const obterFontesReceita = async (): Promise<FonteReceita[]> => {
  await simulateNetworkDelay();
  // Em produção: return await fetch('/api/fontes-receita').then(res => res.json());
  return fontesReceita;
};

/**
 * Service: Obter áreas de despesa
 */
export const obterAreasDespesa = async (): Promise<AreaDespesa[]> => {
  await simulateNetworkDelay();
  // Em produção: return await fetch('/api/areas-despesa').then(res => res.json());
  return areasDespesa;
};

/**
 * Service: Obter opções de filtros
 */
export const obterOpcoesDeFiltragem = async () => {
  await simulateNetworkDelay();
  // Em produção: return await fetch('/api/filtros').then(res => res.json());
  return {
    categorias,
    orgaos,
    statusOptions
  };
};

/**
 * Service: Exportar dados (em produção, geraria arquivo no backend)
 */
export const exportarDados = async (dados: TransacaoPublica[], formato: 'csv' | 'xlsx' = 'csv'): Promise<void> => {
  // Em produção: enviar requisição ao backend para gerar arquivo
  // const response = await fetch('/api/exportar', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ dados, formato })
  // });
  // const blob = await response.blob();
  // ... download do arquivo
  
  // Por enquanto, gera CSV no frontend
  const headers = ['ID', 'Data', 'Origem', 'Destino', 'Categoria', 'Subcategoria', 'Valor', 'Descrição', 'Status', 'Órgão'];
  
  const csvContent = [
    headers.join(','),
    ...dados.map(t => [
      t.id,
      t.data,
      `"${t.origem}"`,
      `"${t.destino}"`,
      t.categoria,
      t.subcategoria,
      t.valor,
      `"${t.descricao}"`,
      t.status,
      `"${t.orgao}"`,
    ].join(',')),
  ].join('\n');

  return Promise.resolve();
};
