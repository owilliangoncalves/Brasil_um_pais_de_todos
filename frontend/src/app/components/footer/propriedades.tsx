import React from "react";

export interface FooterSectionProps {
    /** ID único usado para aria-labelledby */
    id: string;
    /** Título do bloco do footer */
    title: string;
    /** Conteúdo JSX do bloco */
    children: React.ReactNode;
}

/**
 * Componente reutilizável de seção do rodapé.
 *
 * @description
 * Proporciona estrutura semântica e acessível para seções do footer.
 * Cada seção é marcada com `aria-labelledby` e suporta conteúdo customizado.
 * Ideal para uso em portais públicos ou aplicações enterprise.
 *
 * @component
 * @param props FooterSectionProps
 * @returns JSX.Element
 */
export const FooterSection: React.FC<FooterSectionProps> = ({
                                                                id,
                                                                title,
                                                                children,
                                                            }) => {
    return (
        <section aria-labelledby={id} className="flex flex-col items-start">
            <h2
                id={id}
                className="font-bold dark:text-foreground mb-4 uppercase text-xs tracking-[0.2em]"
            >
                {title}
            </h2>
            <div className="text-sm leading-relaxed opacity-80">{children}</div>
        </section>
    );
};
