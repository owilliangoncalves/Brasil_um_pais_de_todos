// Dados simulados realistas para demonstração do portal de transparência

export interface TransacaoPublica {
  id: string;
  data: string;
  origem: string;
  destino: string;
  categoria: string;
  subcategoria: string;
  valor: number;
  descricao: string;
  status: 'executado' | 'empenhado' | 'liquidado';
  orgao: string;
}

export interface ResumoOrcamentario {
  periodo: string;
  receitas: number;
  despesas: number;
  executado: number;
}

export interface FonteReceita {
  nome: string;
  valor: number;
  porcentagem: number;
}

export interface AreaDespesa {
  area: string;
  valor: number;
  porcentagem: number;
  cor: string;
}

// Dados de resumo orçamentário mensal
export const resumoMensal: ResumoOrcamentario[] = [
  { periodo: 'Jan/26', receitas: 4500000000, despesas: 4200000000, executado: 4100000000 },
  { periodo: 'Fev/26', receitas: 4800000000, despesas: 4500000000, executado: 4450000000 },
  { periodo: 'Mar/25', receitas: 5200000000, despesas: 4800000000, executado: 4700000000 },
  { periodo: 'Abr/25', receitas: 4900000000, despesas: 4600000000, executado: 4550000000 },
  { periodo: 'Maio/25', receitas: 5100000000, despesas: 4700000000, executado: 4650000000 },
  { periodo: 'Jun/25', receitas: 5300000000, despesas: 4900000000, executado: 4850000000 },
  { periodo: 'Jul/25', receitas: 5000000000, despesas: 4800000000, executado: 4700000000 },
  { periodo: 'Ago/25', receitas: 5200000000, despesas: 4900000000, executado: 4800000000 },
  { periodo: 'Set/25', receitas: 5400000000, despesas: 5100000000, executado: 5000000000 },
  { periodo: 'Out/25', receitas: 5600000000, despesas: 5200000000, executado: 5100000000 },
  { periodo: 'Nov/25', receitas: 5500000000, despesas: 5300000000, executado: 5200000000 },
  { periodo: 'Dez/25', receitas: 6200000000, despesas: 5800000000, executado: 5700000000 },
];

// Fontes de receita
export const fontesReceita: FonteReceita[] = [
  { nome: 'Impostos Federais', valor: 32500000000, porcentagem: 52 },
  { nome: 'Contribuições Sociais', valor: 18750000000, porcentagem: 30 },
  { nome: 'Receitas Patrimoniais', valor: 5000000000, porcentagem: 8 },
  { nome: 'Transferências', valor: 3750000000, porcentagem: 6 },
  { nome: 'Outras Receitas', valor: 2500000000, porcentagem: 4 },
];

// Áreas de despesa
export const areasDespesa: AreaDespesa[] = [
  { area: 'Educação', valor: 15000000000, porcentagem: 25, cor: '#3b82f6' },
  { area: 'Saúde', valor: 13500000000, porcentagem: 22.5, cor: '#10b981' },
  { area: 'Segurança', valor: 9000000000, porcentagem: 15, cor: '#8b5cf6' },
  { area: 'Infraestrutura', valor: 7500000000, porcentagem: 12.5, cor: '#f59e0b' },
  { area: 'Assistência Social', valor: 6000000000, porcentagem: 10, cor: '#ec4899' },
  { area: 'Previdência', valor: 5400000000, porcentagem: 9, cor: '#06b6d4' },
  { area: 'Administração', valor: 2400000000, porcentagem: 4, cor: '#64748b' },
  { area: 'Outras', valor: 1200000000, porcentagem: 2, cor: '#94a3b8' },
];

// Transações detalhadas
export const transacoes: TransacaoPublica[] = [
  {
    id: 'TXN001',
    data: '2026-02-10',
    origem: 'Receita Federal',
    destino: 'Secretaria de Educação',
    categoria: 'Educação',
    subcategoria: 'Ensino Fundamental',
    valor: 250000000,
    descricao: 'Repasse para construção de 50 escolas públicas',
    status: 'executado',
    orgao: 'Ministério da Educação',
  },
  {
    id: 'TXN002',
    data: '2026-02-12',
    origem: 'Receita Federal',
    destino: 'Secretaria de Saúde',
    categoria: 'Saúde',
    subcategoria: 'Atenção Básica',
    valor: 180000000,
    descricao: 'Aquisição de equipamentos hospitalares',
    status: 'executado',
    orgao: 'Ministério da Saúde',
  },
  {
    id: 'TXN003',
    data: '2026-02-13',
    origem: 'Contribuições Sociais',
    destino: 'Departamento de Infraestrutura',
    categoria: 'Infraestrutura',
    subcategoria: 'Rodovias',
    valor: 420000000,
    descricao: 'Pavimentação de 200km de rodovias federais',
    status: 'liquidado',
    orgao: 'Ministério da Infraestrutura',
  },
  {
    id: 'TXN004',
    data: '2026-02-13',
    origem: 'Receita Federal',
    destino: 'Secretaria de Segurança',
    categoria: 'Segurança',
    subcategoria: 'Segurança Pública',
    valor: 150000000,
    descricao: 'Modernização de sistema de vigilância',
    status: 'executado',
    orgao: 'Ministério da Justiça',
  },
  {
    id: 'TXN005',
    data: '2026-02-14',
    origem: 'Receitas Patrimoniais',
    destino: 'Secretaria de Educação',
    categoria: 'Educação',
    subcategoria: 'Ensino Superior',
    valor: 95000000,
    descricao: 'Bolsas de estudo para 15.000 estudantes',
    status: 'executado',
    orgao: 'Ministério da Educação',
  },
  {
    id: 'TXN006',
    data: '2026-02-14',
    origem: 'Receita Federal',
    destino: 'Secretaria de Assistência Social',
    categoria: 'Assistência Social',
    subcategoria: 'Programas Sociais',
    valor: 320000000,
    descricao: 'Transferência de renda para famílias em vulnerabilidade',
    status: 'executado',
    orgao: 'Ministério do Desenvolvimento Social',
  },
  {
    id: 'TXN007',
    data: '2026-02-11',
    origem: 'Contribuições Sociais',
    destino: 'Instituto de Previdência',
    categoria: 'Previdência',
    subcategoria: 'Aposentadorias',
    valor: 280000000,
    descricao: 'Pagamento de aposentadorias e pensões',
    status: 'executado',
    orgao: 'Instituto Nacional do Seguro Social',
  },
  {
    id: 'TXN008',
    data: '2026-02-09',
    origem: 'Receita Federal',
    destino: 'Secretaria de Saúde',
    categoria: 'Saúde',
    subcategoria: 'Medicamentos',
    valor: 125000000,
    descricao: 'Compra de medicamentos para rede pública',
    status: 'empenhado',
    orgao: 'Ministério da Saúde',
  },
  {
    id: 'TXN009',
    data: '2026-02-08',
    origem: 'Transferências',
    destino: 'Departamento de Infraestrutura',
    categoria: 'Infraestrutura',
    subcategoria: 'Saneamento',
    valor: 175000000,
    descricao: 'Expansão de rede de água e esgoto',
    status: 'liquidado',
    orgao: 'Ministério das Cidades',
  },
  {
    id: 'TXN010',
    data: '2026-02-07',
    origem: 'Receita Federal',
    destino: 'Secretaria de Educação',
    categoria: 'Educação',
    subcategoria: 'Educação Infantil',
    valor: 85000000,
    descricao: 'Ampliação de creches municipais',
    status: 'executado',
    orgao: 'Ministério da Educação',
  },
];

// Categorias disponíveis
export const categorias = [
  'Todas',
  'Educação',
  'Saúde',
  'Segurança',
  'Infraestrutura',
  'Assistência Social',
  'Previdência',
  'Administração',
];

// Órgãos
export const orgaos = [
  'Todos',
  'Ministério da Educação',
  'Ministério da Saúde',
  'Ministério da Infraestrutura',
  'Ministério da Justiça',
  'Ministério do Desenvolvimento Social',
  'Instituto Nacional do Seguro Social',
  'Ministério das Cidades',
];

// Status
export const statusOptions = [
  { value: 'todos', label: 'Todos' },
  { value: 'executado', label: 'Executado' },
  { value: 'empenhado', label: 'Empenhado' },
  { value: 'liquidado', label: 'Liquidado' },
];

// Função auxiliar para formatar valores em reais
export const formatarReal = (valor: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(valor);
};

// Função auxiliar para formatar valores grandes
export const formatarValorGrande = (valor: number): string => {
  if (valor >= 1000000000) {
    return `R$ ${(valor / 1000000000).toFixed(1)}bi`;
  }
  if (valor >= 1000000) {
    return `R$ ${(valor / 1000000).toFixed(1)}mi`;
  }
  return formatarReal(valor);
};

// Função para exportar dados para CSV
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
};
