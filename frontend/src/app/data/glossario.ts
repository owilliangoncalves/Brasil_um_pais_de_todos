/**
 * Data Object: Glossário de Termos
 * Centralizamos aqui o conteúdo para facilitar a manutenção e tradução.
 */

export interface TermoGlossario {
    termo: string;
    explicacao: string;
    exemplo?: string;
}

export const glossario: TermoGlossario[] = [
    {
        termo: 'Receita',
        explicacao: 'É o dinheiro que entra nos cofres públicos. Como o salário que você recebe, o governo também "recebe" dinheiro através de impostos, taxas e outras fontes.',
        exemplo: 'Quando você paga IPTU, esse dinheiro vira receita para a prefeitura.',
    },
    {
        termo: 'Despesa',
        explicacao: 'É o dinheiro que sai dos cofres públicos para pagar por serviços e investimentos. Como quando você paga suas contas, o governo também tem gastos.',
        exemplo: 'Salário de professores, construção de escolas, compra de medicamentos.',
    },
    {
        termo: 'Orçamento',
        explicacao: 'É o planejamento de quanto o governo pretende receber e gastar durante o ano. Como um planejamento familiar, mas do governo.',
        exemplo: 'Se o governo planeja gastar R$ 100 milhões em saúde, isso está no orçamento.',
    },
    {
        termo: 'Empenhado',
        explicacao: 'Quando o governo "reserva" o dinheiro para pagar algo, mas ainda não pagou. É como quando você separa dinheiro para pagar uma conta futura.',
        exemplo: 'O governo empenhou R$ 50 mil para reformar uma escola, mas a obra ainda não começou.',
    },
    {
        termo: 'Liquidado',
        explicacao: 'Quando o serviço foi prestado ou o produto foi entregue, e o governo reconhece que deve pagar. O dinheiro ainda não saiu, mas a "dívida" está confirmada.',
        exemplo: 'A reforma da escola foi concluída. Agora o governo liquidou o pagamento e vai transferir o dinheiro.',
    },
    {
        termo: 'Executado (Pago)',
        explicacao: 'Quando o dinheiro realmente saiu dos cofres públicos. O pagamento foi feito. É como quando você paga uma conta e o dinheiro sai da sua conta bancária.',
        exemplo: 'A empresa que reformou a escola recebeu os R$ 50 mil na conta.',
    },
    {
        termo: 'Saldo Orçamentário',
        explicacao: 'É a diferença entre o que entrou (receitas) e o que saiu (despesas). Se entrou mais do que saiu, o saldo é positivo. Se saiu mais, é negativo.',
        exemplo: 'Se o estado recebeu R$ 100 milhões e gastou R$ 80 milhões, o saldo é de R$ 20 milhões.',
    },
    {
        termo: 'Órgão Público',
        explicacao: 'É uma repartição do governo responsável por uma área específica. Cada órgão cuida de uma parte dos serviços públicos.',
        exemplo: 'Secretaria de Saúde, Secretaria de Educação, Departamento de Trânsito.',
    },
    {
        termo: 'Fonte de Receita',
        explicacao: 'São as diferentes formas pelas quais o governo recebe dinheiro. Cada tipo de imposto ou taxa é uma fonte diferente.',
        exemplo: 'ICMS (imposto sobre produtos), IPVA (imposto do carro), transferências da União.',
    },
    {
        termo: 'Transferência da União',
        explicacao: 'É o dinheiro que o governo federal (Brasil) repassa para os estados e municípios. É uma forma de distribuir recursos pelo país.',
        exemplo: 'O governo federal transfere R$ 10 milhões para o estado investir em educação.',
    },
];