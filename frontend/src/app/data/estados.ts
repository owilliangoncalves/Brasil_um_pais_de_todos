/**
 * Dados dos Estados Brasileiros
 * 26 estados + Distrito Federal
 */

export interface Estado {
  sigla: string;
  nome: string;
  regiao: 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul';
  populacao: number;
  orcamento: number;
  receitas: number;
  despesas: number;
}

export const estados: Estado[] = [
  // Norte
  { sigla: 'AC', nome: 'Acre', regiao: 'Norte', populacao: 906876, orcamento: 8500000000, receitas: 8200000000, despesas: 7800000000 },
  { sigla: 'AP', nome: 'Amapá', regiao: 'Norte', populacao: 877613, orcamento: 7800000000, receitas: 7500000000, despesas: 7200000000 },
  { sigla: 'AM', nome: 'Amazonas', regiao: 'Norte', populacao: 4269995, orcamento: 22000000000, receitas: 21500000000, despesas: 20800000000 },
  { sigla: 'PA', nome: 'Pará', regiao: 'Norte', populacao: 8777124, orcamento: 28000000000, receitas: 27200000000, despesas: 26500000000 },
  { sigla: 'RO', nome: 'Rondônia', regiao: 'Norte', populacao: 1815278, orcamento: 11000000000, receitas: 10800000000, despesas: 10500000000 },
  { sigla: 'RR', nome: 'Roraima', regiao: 'Norte', populacao: 652713, orcamento: 6500000000, receitas: 6300000000, despesas: 6100000000 },
  { sigla: 'TO', nome: 'Tocantins', regiao: 'Norte', populacao: 1607363, orcamento: 10500000000, receitas: 10200000000, despesas: 9900000000 },
  
  // Nordeste
  { sigla: 'AL', nome: 'Alagoas', regiao: 'Nordeste', populacao: 3365351, orcamento: 14000000000, receitas: 13700000000, despesas: 13400000000 },
  { sigla: 'BA', nome: 'Bahia', regiao: 'Nordeste', populacao: 14985284, orcamento: 42000000000, receitas: 41200000000, despesas: 40500000000 },
  { sigla: 'CE', nome: 'Ceará', regiao: 'Nordeste', populacao: 9240580, orcamento: 32000000000, receitas: 31500000000, despesas: 30800000000 },
  { sigla: 'MA', nome: 'Maranhão', regiao: 'Nordeste', populacao: 7153262, orcamento: 24000000000, receitas: 23500000000, despesas: 23000000000 },
  { sigla: 'PB', nome: 'Paraíba', regiao: 'Nordeste', populacao: 4059905, orcamento: 16000000000, receitas: 15700000000, despesas: 15400000000 },
  { sigla: 'PE', nome: 'Pernambuco', regiao: 'Nordeste', populacao: 9674793, orcamento: 36000000000, receitas: 35400000000, despesas: 34800000000 },
  { sigla: 'PI', nome: 'Piauí', regiao: 'Nordeste', populacao: 3289290, orcamento: 14500000000, receitas: 14200000000, despesas: 13900000000 },
  { sigla: 'RN', nome: 'Rio Grande do Norte', regiao: 'Nordeste', populacao: 3560903, orcamento: 15500000000, receitas: 15200000000, despesas: 14900000000 },
  { sigla: 'SE', nome: 'Sergipe', regiao: 'Nordeste', populacao: 2338474, orcamento: 11500000000, receitas: 11300000000, despesas: 11100000000 },
  
  // Centro-Oeste
  { sigla: 'DF', nome: 'Distrito Federal', regiao: 'Centro-Oeste', populacao: 3094325, orcamento: 38000000000, receitas: 37500000000, despesas: 36800000000 },
  { sigla: 'GO', nome: 'Goiás', regiao: 'Centro-Oeste', populacao: 7206589, orcamento: 28000000000, receitas: 27600000000, despesas: 27000000000 },
  { sigla: 'MT', nome: 'Mato Grosso', regiao: 'Centro-Oeste', populacao: 3567234, orcamento: 20000000000, receitas: 19700000000, despesas: 19300000000 },
  { sigla: 'MS', nome: 'Mato Grosso do Sul', regiao: 'Centro-Oeste', populacao: 2839188, orcamento: 16500000000, receitas: 16200000000, despesas: 15900000000 },
  
  // Sudeste
  { sigla: 'ES', nome: 'Espírito Santo', regiao: 'Sudeste', populacao: 4108508, orcamento: 22000000000, receitas: 21700000000, despesas: 21300000000 },
  { sigla: 'MG', nome: 'Minas Gerais', regiao: 'Sudeste', populacao: 21411923, orcamento: 85000000000, receitas: 84000000000, despesas: 82500000000 },
  { sigla: 'RJ', nome: 'Rio de Janeiro', regiao: 'Sudeste', populacao: 17463349, orcamento: 95000000000, receitas: 93500000000, despesas: 92000000000 },
  { sigla: 'SP', nome: 'São Paulo', regiao: 'Sudeste', populacao: 46649132, orcamento: 280000000000, receitas: 275000000000, despesas: 270000000000 },
  
  // Sul
  { sigla: 'PR', nome: 'Paraná', regiao: 'Sul', populacao: 11597484, orcamento: 48000000000, receitas: 47300000000, despesas: 46500000000 },
  { sigla: 'RS', nome: 'Rio Grande do Sul', regiao: 'Sul', populacao: 11466630, orcamento: 52000000000, receitas: 51200000000, despesas: 50400000000 },
  { sigla: 'SC', nome: 'Santa Catarina', regiao: 'Sul', populacao: 7338473, orcamento: 35000000000, receitas: 34500000000, despesas: 33900000000 },
];

export const regioes = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'] as const;

export const coresRegioes = {
  'Norte': '#16a34a',      // Verde
  'Nordeste': '#f59e0b',   // Amarelo
  'Centro-Oeste': '#2563eb', // Azul
  'Sudeste': '#8b5cf6',    // Roxo
  'Sul': '#ec4899',        // Rosa
};

/**
 * Obter estados por região
 */
export const obterEstadosPorRegiao = (regiao: string) => {
  return estados.filter(e => e.regiao === regiao);
};

/**
 * Obter totais por região
 */
export const obterTotaisPorRegiao = () => {
  return regioes.map(regiao => {
    const estadosDaRegiao = obterEstadosPorRegiao(regiao);
    return {
      regiao,
      totalEstados: estadosDaRegiao.length,
      populacao: estadosDaRegiao.reduce((acc, e) => acc + e.populacao, 0),
      orcamento: estadosDaRegiao.reduce((acc, e) => acc + e.orcamento, 0),
      receitas: estadosDaRegiao.reduce((acc, e) => acc + e.receitas, 0),
      despesas: estadosDaRegiao.reduce((acc, e) => acc + e.despesas, 0),
      cor: coresRegioes[regiao],
    };
  });
};
