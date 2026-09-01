"use client";

import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/utils";

type RevealDelay = 1 | 2 | 3 | 4 | 5 | 6;

interface ScrollRevealProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  delay?: RevealDelay;
  className?: string;
}

export function ScrollReveal({
  as: Tag = "div",
  children,
  delay,
  className,
  ...props
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <Tag
      ref={ref}
      className={cn(
        "reveal",
        isVisible && "reveal_visible",
        delay && `reveal_delay-${delay}`,
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
