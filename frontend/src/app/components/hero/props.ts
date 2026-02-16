
import React from "react";

/** Define ação de botão do Hero */
type HeroAction = {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary';
};

/** Props do Hero Component */
export interface HeroProps {
    /** Elemento de identidade visual (Logo ou Badge) */
    logo?: React.ReactNode;

    /** Headline principal (H1 obrigatório) */
    titulo: React.ReactNode;

    /** Texto de apoio opcional */
    descricao?: React.ReactNode;

    /** Ações principais do Hero */
    acoes?: readonly HeroAction[];

    /** Conteúdo auxiliar (ex: provas, selos, confiança) */
    auxiliar?: React.ReactNode;

    /** Ajustes finos de layout */
    tamanho?: 'default' | 'compact';

    /** Imagem de fundo ou destaque no Hero */
    imagem?: string | React.ReactNode;

    /** Crédito ou fonte da imagem */
    creditoImagem?: string;

}
