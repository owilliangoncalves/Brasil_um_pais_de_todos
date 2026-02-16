/**
 * Utilitários de exportação de dados
 * Separado da lógica de negócio
 */

import type { TransacaoPublica } from '@/data/mockData';

/**
 * Exporta dados para CSV
 * Em produção, isso seria feito no backend por questões de segurança
 */
export const exportarParaCSV = (dados: TransacaoPublica[], nomeArquivo: string = 'transparencia-dados') => {
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

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${nomeArquivo}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Cleanup
  URL.revokeObjectURL(url);
};

/**
 * Exporta transação individual
 */
export const exportarTransacaoIndividual = (transacao: TransacaoPublica) => {
  const csv = [
    ['Campo', 'Valor'],
    ['ID da Transação', transacao.id],
    ['Data', new Date(transacao.data).toLocaleDateString('pt-BR')],
    ['Origem', transacao.origem],
    ['Destino', transacao.destino],
    ['Categoria', transacao.categoria],
    ['Subcategoria', transacao.subcategoria],
    ['Valor', transacao.valor.toString()],
    ['Descrição', transacao.descricao],
    ['Status', transacao.status],
    ['Órgão', transacao.orgao],
  ].map(row => row.join(',')).join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `transacao-${transacao.id}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};
