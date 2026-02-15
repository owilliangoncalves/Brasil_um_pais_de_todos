import React from 'react';

/**
 * Componente de Rodapé Institucional (Footer).
 * * @description Fornece informações de encerramento da página seguindo padrões de transparência pública.
 * O componente organiza informações em três eixos: Institucional, Conformidade (Dados Abertos) e Auditoria Temporal.
 * Implementa o landmark `contentinfo` e estruturas de grid responsivas do Tailwind CSS 4.
 * * @component
 * @returns {React.JSX.Element} Estrutura de rodapé acessível com semântica de tempo e navegação legal.
 */
export function Footer(): React.JSX.Element {
  /** @type {number} Ano atual obtido dinamicamente para o copyright. */
  const currentYear: number = new Date().getFullYear();

  /** @type {string} Data formatada no padrão brasileiro (DD/MM/AAAA) para exibir a última carga de dados. */
  const lastUpdate: string = new Date().toLocaleDateString('pt-BR');

  return (
      <footer
          role="contentinfo"
          className="bg-slate-900 dark:bg-slate-950 text-slate-300 mt-16 border-t border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-x-24 ">

            {/* Seção Sobre: Responsabilidade e Controle Social */}
            <section aria-labelledby="footer-about" className="flex flex-col items-start">
              <h2 id="footer-about" className="font-bold text-white mb-4 uppercase text-xs tracking-[0.2em]">
                Sobre o Portal
              </h2>
              <p className="text-sm leading-relaxed opacity-80">
                Plataforma de transparência dedicada ao controle social, garantindo acesso livre e democrático aos dados públicos.
              </p>
            </section>

            {/* Seção Dados: Conformidade com a Lei de Acesso à Informação (LAI) */}
            <section aria-labelledby="footer-data" className="flex flex-col items-start">
              <h2 id="footer-data" className="font-bold text-white mb-4 uppercase text-xs tracking-[0.2em]">
                Dados Abertos
              </h2>
              <p className="text-sm leading-relaxed opacity-80">
                Base de dados disponível para download em formatos interoperáveis, seguindo a Lei de Acesso à Informação.
              </p>
            </section>

            {/* Seção Sincronização: Metadados temporais para auditoria.
                Usa a tag <time> com dateTime ISO para interoperabilidade semântica.
            */}
            <section aria-labelledby="footer-sync" className="flex flex-col items-start">
              <h2 id="footer-sync" className="font-bold text-white mb-4 uppercase text-xs tracking-[0.2em]">
                Sincronização
              </h2>
              <p className="text-sm flex flex-col gap-1 opacity-80">
                <span>Última atualização:</span>
                <time dateTime={new Date().toISOString()} className="text-emerald-400 font-mono font-medium">
                  {lastUpdate}
                </time>
              </p>
            </section>
          </div>

          {/* Barra Inferior: Licenciamento e Navegação Legal */}
          <div className="border-t border-slate-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-medium tracking-wide">
            <p className="opacity-60">© {currentYear} Portal Cidadão de Olho. Conteúdo sob licença pública.</p>

            <nav aria-label="Links legais">
              <ul className="flex gap-8 list-none p-0 uppercase opacity-60">
                <li>
                  <a href="/privacidade" className="hover:text-white hover:opacity-100 transition-all focus-visible:ring-2 focus-visible:ring-primary p-1">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="/termos" className="hover:text-white hover:opacity-100 transition-all focus-visible:ring-2 focus-visible:ring-primary p-1">
                    Termos
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
  );
}