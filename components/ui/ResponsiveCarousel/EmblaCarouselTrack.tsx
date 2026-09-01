"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/utils";

interface EmblaCarouselTrackProps {
  slides: ReactNode[];
  slideClassName: string;
  ariaLabel: string;
}

export function EmblaCarouselTrack({ slides, slideClassName, ariaLabel }: EmblaCarouselTrackProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onReInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    };

    onReInit();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onReInit);

    const ro = new ResizeObserver(() => emblaApi.reInit());
    ro.observe(emblaApi.rootNode());

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onReInit);
      ro.disconnect();
    };
  }, [emblaApi]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <div className="responsive-carousel" aria-roledescription="carousel" aria-label={ariaLabel}>
      <p className="responsive-carousel__hint" aria-hidden="true">
        Листайте пальцем влево или вправо
      </p>
      <div className="responsive-carousel__viewport" ref={emblaRef}>
        <div className="responsive-carousel__container">
          {slides.map((child, index) => (
            <div
              key={index}
              className={cn("responsive-carousel__slide", slideClassName)}
              role="listitem"
              aria-roledescription="slide"
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      {scrollSnaps.length > 1 && (
        <div className="responsive-carousel__dots" role="tablist" aria-label="Слайды">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              className={`responsive-carousel__dot${selectedIndex === index ? " responsive-carousel__dot_active" : ""}`}
              aria-label={`Слайд ${index + 1}`}
              aria-selected={selectedIndex === index}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
