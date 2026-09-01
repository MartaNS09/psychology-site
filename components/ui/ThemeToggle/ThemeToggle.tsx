"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/Button";

export function ThemeToggle() {
  const { toggleTheme, isDark, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="small"
        ariaLabel="Переключить тему"
        aria-hidden="true"
        disabled
      >
        …
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="small"
      onClick={toggleTheme}
      ariaLabel={
        isDark ? "Переключить на светлую тему" : "Переключить на тёмную тему"
      }
      aria-pressed={isDark}
      title={`Текущая тема: ${resolvedTheme === "dark" ? "тёмная" : "светлая"}`}
    >
      {isDark ? "☀" : "☾"}
    </Button>
  );
}
