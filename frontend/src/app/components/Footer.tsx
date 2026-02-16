import React from "react";
import { FooterSection } from "./footer/propriedades";
import { FooterLegalNav } from "./footer/avisos";

/**
 * Componente principal do Footer.
 *
 * @description
 * Orquestra as seções internas e a navegação legal do rodapé.
 * Mantém semântica, acessibilidade e responsividade, pronto para uso em portais enterprise.
 *
 * @component
 * @returns JSX.Element
 */
export const Footer: React.FC = () => {
  /** Ano atual */
  const currentYear: number = new Date().getFullYear();

  /** Data da última atualização em formato brasileiro */
  const lastUpdate: string = new Date().toLocaleDateString("pt-BR");

  /** Links legais do rodapé */
  const legalLinks = [
    { href: "/privacidade", label: "Privacidade" },
    { href: "/termos", label: "Termos" },
  ];

  return (
      <footer
          role="contentinfo"
          className="bg-foreground dark:bg-background text-foreground mt-16"
      >
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-x-24">
            <FooterSection id="footer-about" title="Sobre o Portal">
              Plataforma de transparência dedicada ao controle social, garantindo
              acesso livre e democrático aos dados públicos.
            </FooterSection>

            <FooterSection id="footer-data" title="Dados Abertos">
              Base de dados disponível para download em formatos interoperáveis,
              seguindo a Lei de Acesso à Informação.
            </FooterSection>

            <FooterSection id="footer-sync" title="Sincronização">
              <span>Última atualização: </span>
              <time
                  dateTime={new Date().toISOString()}
                  className="text-emerald-400 font-mono font-medium"
              >
                {lastUpdate}
              </time>
            </FooterSection>
          </div>

          <FooterLegalNav currentYear={currentYear} links={legalLinks} />
        </div>
      </footer>
  );
};
