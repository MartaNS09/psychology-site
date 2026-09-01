"use client";

import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ImageCard } from "@/components/ui/ImageCard";
import { cn } from "@/utils";
import { EmblaCarouselTrack } from "./EmblaCarouselTrack";
import "./ResponsiveCarousel.scss";

interface ResponsiveCarouselProps {
  children: ReactNode;
  gridClassName: string;
  slideClassName?: string;
  ariaLabel: string;
  desktopFrom?: number;
  desktopLimit?: number;
}

function withCarouselMode(child: ReactNode, inCarousel: boolean) {
  if (isValidElement(child) && child.type === ImageCard) {
    return cloneElement(child, { inCarousel } as { inCarousel: boolean });
  }
  return child;
}

export function ResponsiveCarousel({
  children,
  gridClassName,
  slideClassName = "",
  ariaLabel,
  desktopFrom = 1024,
  desktopLimit,
}: ResponsiveCarouselProps) {
  const isDesktop = useMediaQuery(`(min-width: ${desktopFrom}px)`, false);
  const slides = Children.toArray(children);

  if (isDesktop) {
    const items = desktopLimit ? slides.slice(0, desktopLimit) : slides;
    return (
      <div className={gridClassName} role="list">
        {items.map((child, index) => (
          <div key={index} role="listitem">
            {withCarouselMode(child, false)}
          </div>
        ))}
      </div>
    );
  }

  const carouselSlides = slides.map((child) => withCarouselMode(child, true));

  return (
    <EmblaCarouselTrack
      slides={carouselSlides}
      slideClassName={slideClassName}
      ariaLabel={ariaLabel}
    />
  );
}
