"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { CardLink } from "@/components/ui/CardLink/CardLink";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { cn } from "@/utils";
import "./ImageCard.scss";

interface ImageCardProps {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  imageAlt: string;
  href?: string;
  footer?: ReactNode;
  hook?: string;
  features?: string[];
  variant?: "default" | "full";
  className?: string;
  inCarousel?: boolean;
}

export function ImageCard({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  href,
  footer,
  hook,
  features,
  variant = "default",
  className,
  inCarousel = false,
}: ImageCardProps) {
  const content = (
    <>
      <div className="image-card__media">
        <OptimizedImage
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          className="image-card__image"
        />
        <div className="image-card__overlay" aria-hidden="true" />
      </div>
      <div className="image-card__body">
        {subtitle && <p className="image-card__subtitle">{subtitle}</p>}
        {hook && <p className="image-card__hook">{hook}</p>}
        <h3 className="image-card__title">{title}</h3>
        <p className="image-card__description">{description}</p>
        {features && features.length > 0 && (
          <ul className="image-card__features" role="list">
            {features.map((feature) => (
              <li key={feature} role="listitem">
                {feature}
              </li>
            ))}
          </ul>
        )}
        {footer && <div className="image-card__footer">{footer}</div>}
      </div>
    </>
  );

  const cardClass = cn(
    "image-card",
    variant === "full" && "image-card_full",
    href && "image-card_interactive",
    inCarousel && "image-card_carousel",
    className
  );

  const label = href ? `${title} — подробнее` : undefined;

  if (href && inCarousel) {
    return (
      <CardLink href={href} className={cardClass} aria-label={label}>
        {content}
      </CardLink>
    );
  }

  if (href) {
    return (
      <Link href={href} className={cardClass} aria-label={label}>
        {content}
      </Link>
    );
  }

  return <article className={cardClass}>{content}</article>;
}
