'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription
} from '@/components/ui/sheet';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { Glossario } from './Glossario';
import { cn } from '../utils/utils';

interface NavItem {
  name: string;
  href: string;
}

/**
 * Configuração dos itens de navegação principal do portal.
 * @type {NavItem[]}
 */
const navItems: NavItem[] = [
  { name: 'Visão Geral', href: '/' },
  { name: 'Estados', href: '/estados' },
  { name: 'Explorar Dados', href: '/explorar' },
];

/**
 * Componente de cabeçalho principal (Header).
 * * Fornece a navegação global, alternância de tema e acesso ao glossário.
 * Implementa design responsivo com menu "hamburger" (Sheet) para dispositivos móveis
 * e uma barra de navegação horizontal para desktops.
 * * @component
 * @returns {JSX.Element} O elemento de cabeçalho renderizado.
 */
export function Header(): React.JSX.Element {
  /** * Hook para obter a rota atual e gerenciar estados visuais de 'active' nos links.
   * @type {string}
   */
  const pathname: string = usePathname();

  /** * Estado de controle de abertura do menu lateral em dispositivos móveis.
   * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   */
  const [isOpen, setIsOpen] = React.useState(false);

  return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        {/* Link de acessibilidade para saltar navegação (Skip Link) */}
        <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-100 focus:p-4 focus:bg-primary focus:text-white focus:rounded-br-lg"
        >
          Pular para o conteúdo principal
        </a>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link
                href="/"
                className="hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                aria-label="Ir para a página inicial do Portal de Transparência"
            >
              <Logo showText={true} />
            </Link>
          </div>

          {/* Navegação Desktop */}
          <nav
              className="hidden md:flex items-center gap-6"
              aria-label="Navegação Principal"
          >
            <ul className="flex items-center gap-1 list-none">
              {navItems.map((item) => {
                /** Verifica se a rota atual corresponde ao link para aplicar estilos ativos. */
                const isActive = pathname === item.href;
                return (
                    <li key={item.href}>
                      <Button
                          variant="ghost"
                          asChild
                          className={cn(
                              "text-sm font-medium transition-colors",
                              isActive
                                  ? "text-primary bg-primary/10 hover:bg-primary/20"
                                  : "text-muted-foreground hover:text-foreground"
                          )}
                      >
                        <Link
                            href={item.href}
                            aria-current={isActive ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      </Button>
                    </li>
                );
              })}
            </ul>

            <div className="h-6 w-px bg-border/50" aria-hidden="true" />

            <div className="flex items-center gap-2">
              <Glossario />
              <ThemeToggle />
            </div>
          </nav>

          {/* Navegação Mobile (Mobile Menu) */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                    aria-label={isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[85vw] sm:w-80 bg-background border-l">
                <SheetTitle className="pl-2 text-center text-lg font-bold border-b pb-2">
                  Menu
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Acesse as diferentes seções do Portal de Transparência.
                </SheetDescription>

                <nav >
                  <ul className="flex flex-col gap-2 list-none p-0">
                    {navItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                          <li key={item.href}>
                            <Link
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "flex items-center w-full px-4 py-4 rounded-md text-base font-semibold transition-all",
                                    isActive
                                        ? "bg-primary/10 text-primary border-l-4 border-primary"
                                        : "text-zinc-300 hover:bg-muted hover:text-white"
                                )}
                                aria-current={isActive ? "page" : undefined}
                            >
                              {item.name}
                            </Link>
                          </li>
                      );
                    })}
                  </ul>

                  {/* Seção utilitária dentro do menu lateral */}
                  <div className="mt-8 pt-6 border-t border-border px-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-zinc-400">Dúvidas sobre termos?</span>
                      <Glossario />
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
  );
}