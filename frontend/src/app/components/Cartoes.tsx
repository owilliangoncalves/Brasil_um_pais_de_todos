'use client';

import React from 'react';
import Link from 'next/link';
import { Card as LucideCard } from '@/components/lucide/card';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/utils/utils';

export type FeatureCardVariant = 'primary' | 'secondary' | 'accent';

export interface FeatureCardProps {
    href: string;

    /** Ícone ou imagem no topo do card */
    icon: React.ReactNode;

    /** Título principal */
    title: React.ReactNode;

    /** Texto de descrição */
    description: React.ReactNode;

    /** Texto do link/ação */
    actionLabel: string;

    /** Variante de cor (mapa de cores padrão do portal) */
    variant?: FeatureCardVariant;

    /** Classe customizada para o Card (padding, altura, etc.) */
    className?: string;

    /** Hover customizado: cor, sombra ou transform */
    hoverClassName?: string;

    /** Background customizado (override de variant) */
    backgroundClassName?: string;

    /** Ícone ou badge extra opcional */
    extraSlot?: React.ReactNode;
}

/**
 * FeatureCard
 *
 * Mantém consistência visual e permite:
 * - variantes de cor
 * - hover customizado
 * - background customizado
 * - slot extra para badges ou imagens
 */
export function FeatureCard({
                                href,
                                icon,
                                title,
                                description,
                                actionLabel,
                                variant = 'primary',
                                className,
                                hoverClassName,
                                backgroundClassName,
                                extraSlot,
                            }: FeatureCardProps): React.JSX.Element {
    const variantMap = {
        primary: {
            border: 'border-primary/10',
            hoverBorder: 'hover:border-primary/40',
            hoverBg: 'hover:bg-primary/2',
            iconBg: 'bg-primary/10',
            iconColor: 'text-primary',
            actionColor: 'text-primary',
        },
        secondary: {
            border: 'border-secondary/10',
            hoverBorder: 'hover:border-secondary/40',
            hoverBg: 'hover:bg-secondary/2',
            iconBg: 'bg-secondary/10',
            iconColor: 'text-secondary',
            actionColor: 'text-secondary',
        },
        accent: {
            border: 'border-accent/10',
            hoverBorder: 'hover:border-accent/40',
            hoverBg: 'hover:bg-accent/2',
            iconBg: 'bg-accent/10',
            iconColor: 'text-accent',
            actionColor: 'text-accent',
        },
    } as const;

    const colors = variantMap[variant];

    return (
        <Link href={href} className="group">
            <LucideCard
                className={cn(
                    'p-8 h-full flex flex-col transition-all',
                    colors.border,
                    colors.hoverBorder,
                    colors.hoverBg,
                    backgroundClassName,
                    hoverClassName,
                    className
                )}
            >
                {/* Topo: ícone */}
                <div
                    className={cn(
                        'w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform',
                        colors.iconBg,
                        colors.iconColor
                    )}
                >
                    {icon}
                </div>

                {/* Slot extra: badge ou imagem */}
                {extraSlot && <div className="mb-4">{extraSlot}</div>}

                {/* Título e descrição */}
                <h3 className="text-2xl font-black mb-3 italic uppercase">{title}</h3>
                <p className="text-foreground mb-8 grow leading-relaxed">{description}</p>

                {/* Link de ação */}
                <div
                    className={cn(
                        'flex items-center font-black text-sm uppercase tracking-widest',
                        colors.actionColor
                    )}
                >
                    {actionLabel}
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
            </LucideCard>
        </Link>
    );
}
