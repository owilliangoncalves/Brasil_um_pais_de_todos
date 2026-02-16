'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

import { Button } from '@/components/lucide/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,

} from '@/components/lucide/sheet';

import { Logo } from '../Logo';
import { ThemeToggle } from '../ThemeToggle';
import { Glossario } from '../Glossario';
import { cn } from '@/utils/utils';

import { useHeaderLogic } from '../menu/logic';

export function Header(): React.JSX.Element {
  const {
    navItems,
    isOpen,
    setIsOpen,
    isActive,
    closeMenu,
  } = useHeaderLogic();

  return (
      <header className="sticky top-0 z-50 w-full  bg-background/80 backdrop-blur-md">
        <a
            href="/"
            className="sr-only focus:not-sr-only focus:absolute focus:z-100 focus:p-4 focus:bg-primary focus:text-white focus:rounded-br-lg"
        >
          Pular para o conteúdo principal
        </a>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link
                href="/"
                className="hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                aria-label="Ir para a página inicial do Portal Cidadão de Olho"
            >
              <Logo showText={true} />
            </Link>
          </div>

          {/* Navegação Desktop */}


          {/* Navegação Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                    aria-label={
                      isOpen
                          ? 'Fechar menu de navegação'
                          : 'Abrir menu de navegação'
                    }
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>

              <SheetContent
                  side="right"
                  className="w-[85vw] sm:w-80 bg-background border-l"
              >
                {/* TODO o conteúdo mobile precisa estar aqui dentro */}
                <nav>
                  <ul className="flex flex-col gap-2 list-none p-0">
                    {item.name}
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          </div>


        </div>
      </header>
  );
}
