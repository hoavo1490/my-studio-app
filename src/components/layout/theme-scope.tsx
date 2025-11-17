"use client";

import { useEffect } from "react";
import type { Theme } from "@/lib/types";

interface ThemeScopeProps {
  theme?: Theme;
}

let activeScopes = 0;

export function ThemeScope({ theme }: ThemeScopeProps) {
  useEffect(() => {
    activeScopes += 1;
    return () => {
      activeScopes = Math.max(0, activeScopes - 1);
      if (activeScopes === 0) {
        document.documentElement.classList.remove("dark");
        document.body.classList.remove("dark");
      }
    };
  }, []);

  useEffect(() => {
    const isDark = theme === "DARK";
    document.documentElement.classList.toggle("dark", isDark);
    document.body.classList.toggle("dark", isDark);
  }, [theme]);

  return null;
}
