import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils";
import "./Card.scss";

type CardVariant = "default" | "elevated" | "flat";

interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: CardVariant;
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
  children: ReactNode;
}

export function Card({
  variant = "default",
  title,
  subtitle,
  footer,
  children,
  className,
  ...props
}: CardProps) {
  return (
    <article
      className={cn("card", variant !== "default" && `card_${variant}`, className)}
      {...props}
    >
      {(title || subtitle) && (
        <header className="card__header">
          {title && <h3 className="card__title">{title}</h3>}
          {subtitle && <p className="card__subtitle">{subtitle}</p>}
        </header>
      )}
      <div className="card__body">{children}</div>
      {footer && <footer className="card__footer">{footer}</footer>}
    </article>
  );
}
