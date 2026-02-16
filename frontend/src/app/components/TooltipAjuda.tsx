'use client';

import React from 'react';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/lucide/tooltip';
import { glossario } from '@/data/glossario';

/**
 * Interface para as propriedades do componente TooltipAjuda.
 * @interface TooltipAjudaProps
 * @property {string} termo - O termo técnico ou palavra-chave que será exibido e definido.
 * @property {string} [explicacao] - Explicação manual. Se omitida, o componente busca no glossário global.
 * @property {boolean} [showIcon=true] - Define se o ícone de informação deve ser exibido ao lado do termo.
 */
interface TooltipAjudaProps {
  termo: string;
  explicacao?: string;
  showIcon?: boolean;
}

/**
 * Componente de Suporte Contextual (Tooltip de Ajuda).
 * * @description Fornece definições rápidas para termos técnicos orçamentários.
 * O componente possui inteligência para buscar automaticamente a definição no `glossario`
 * caso uma explicação manual não seja fornecida via props.
 * * @component
 * @example
 * <TooltipAjuda termo="Empenhado" />
 * * @returns {React.JSX.Element} O termo estilizado com gatilho para o balão de ajuda.
 */
export function TooltipAjuda({ termo, explicacao, showIcon = true }: TooltipAjudaProps): React.JSX.Element {
  /** * Lógica de Resolução de Definição:
   * 1. Prioriza a explicação passada via prop.
   * 2. Caso contrário, realiza uma busca case-insensitive no array global de glossário.
   * @type {string | undefined}
   */
  const definicaoFinal: string | undefined = explicacao || glossario.find(
      (item) => item.termo.toLowerCase() === termo.toLowerCase()
  )?.explicacao;

  /**
   * Fallback: Se nenhuma definição for encontrada, renderiza apenas o texto puro
   * para evitar interações vazias ou tooltips sem conteúdo.
   */
  if (!definicaoFinal) {
    return <span>{termo}</span>;
  }

  return (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
                type="button"
                className="group inline-flex items-center gap-1 font-medium text-foreground hover:text-primary transition-colors cursor-help border-b border-dashed border-primary/40 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xs"
                aria-label={`Definição de: ${termo}`}
            >
              {termo}
              {showIcon && (
                  <Info
                      className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors opacity-70"
                      aria-hidden="true"
                  />
              )}
            </button>
          </TooltipTrigger>

          <TooltipContent
              side="top"
              className="max-w-xs p-4 bg-popover text-popover-foreground border-primary/20 shadow-xl animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          >
            <div className="space-y-2">
              <p className="font-bold text-xs uppercase tracking-wider text-primary">
                O que isso significa?
              </p>
              <p className="text-sm leading-relaxed">
                {definicaoFinal}
              </p>
              {/* Metadado de Proveniência: Reforça a autoridade da informação */}
              <p className="text-[10px] text-muted-foreground italic border-t border-border pt-2 mt-2">
                Fonte: Glossário Cidadão de Olho
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
  );
}