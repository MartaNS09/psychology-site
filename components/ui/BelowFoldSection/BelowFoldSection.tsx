import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils";

interface BelowFoldSectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  ariaLabel?: string;
}

export function BelowFoldSection({
  children,
  className,
  ariaLabel,
  ...props
}: BelowFoldSectionProps) {
  return (
    <section
      className={cn("below-fold", className)}
      aria-label={ariaLabel}
      data-loading="lazy"
      {...props}
    >
      {children}
    </section>
  );
}
