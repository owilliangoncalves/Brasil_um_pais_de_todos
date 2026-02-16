import React from "react";

export interface FooterLegalNavProps {
    /** Ano atual para exibição de copyright */
    currentYear: number;
    /** Array de links legais do footer */
    links: Array<{ href: string; label: string }>;
}

/**
 * Componente de navegação legal do rodapé.
 *
 * @description
 * Exibe links de privacidade, termos e outras informações legais.
 * Implementa práticas de acessibilidade (ARIA) e foco visível.
 * Permite passar ano e links de forma dinâmica, garantindo reusabilidade e consistência.
 *
 * @component
 * @param props FooterLegalNavProps
 * @returns JSX.Element
 */
export const FooterLegalNav: React.FC<FooterLegalNavProps> = ({
                                                                  currentYear,
                                                                  links,
                                                              }) => {
    return (
        <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-medium tracking-wide">
            <p className="opacity-60">
                © {currentYear} Portal Cidadão de Olho. Conteúdo sob licença pública.
            </p>

            <nav aria-label="Links legais">
                <ul className="flex gap-8 list-none p-0 uppercase opacity-60">
                    {links.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="hover:text-secondary hover:opacity-100 transition-all focus-visible:ring-2 focus-visible:ring-primary p-1"
                                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};
