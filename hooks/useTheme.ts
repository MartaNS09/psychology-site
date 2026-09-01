"use client";

import { useThemeContext } from "@/components/providers/ThemeProvider";

export function useTheme() {
  const { theme, setTheme, resolvedTheme, toggleTheme, isDark } = useThemeContext();

  return {
    theme,
    resolvedTheme,
    systemTheme: undefined,
    setTheme,
    toggleTheme,
    isDark,
  };
}
