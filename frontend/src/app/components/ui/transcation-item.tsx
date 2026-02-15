'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Landmark, Calendar, Tag } from 'lucide-react';
import { cn } from './utils';
import { formatarValorGrande } from '@/data/mockData';

export function TransactionItem({ t }: { t: any }) {
    const statusStyles = {
        executado: "bg-status-executado-bg text-status-executado border-status-executado/20",
        liquidado: "bg-status-liquidado-bg text-status-liquidado border-status-liquidado/20",
        empenhado: "bg-status-empenhado-bg text-status-empenhado border-status-empenhado/20",
    };

    return (
        <Link
            href={`/recurso/${t.id}`}
            className="group block outline-none rounded-xl"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-300 gap-4">

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
            <span className={cn(
                "px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-widest rounded-md border",
                statusStyles[t.status as keyof typeof statusStyles]
            )}>
              {t.status}
            </span>
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors truncate">
                            {t.descricao}
                        </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded">
              <Landmark className="w-3 h-3" />
                {t.orgao}
            </span>
                        <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
                            {new Date(t.data).toLocaleDateString('pt-BR')}
            </span>
                    </div>
                </div>

                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 border-t sm:border-0 pt-3 sm:pt-0">
                    <span className="text-xs font-bold text-muted-foreground sm:hidden">VALOR:</span>
                    <p className="font-mono font-bold text-xl text-foreground tabular-nums tracking-tighter">
                        {formatarValorGrande(t.valor)}
                    </p>
                    <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all hidden sm:block" />
                </div>
            </div>
        </Link>
    );
}