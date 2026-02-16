'use client';

/**
 * Toggle de Tema Claro/Escuro
 * Acessibilidade: permite escolher entre modo claro e escuro
 */

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/lucide/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evita hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
        <Button variant="ghost" size="icon" className="w-9 h-9">
          <Sun className="h-4 w-4" />
        </Button>
    );
  }

  return (
      <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-9 h-9"
          aria-label="Alternar tema"
      >
        {theme === "dark" ? (
            <Sun className="h-4 w-4 transition-transform rotate-0 scale-100" />
        ) : (
            <Moon className="h-4 w-4 transition-transform rotate-0 scale-100" />
        )}
      </Button>
  );
}