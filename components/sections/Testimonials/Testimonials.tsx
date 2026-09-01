"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { testimonialsData } from "@/lib/content/testimonials";
import { Container } from "@/components/ui/Container";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import "./Testimonials.scss";

function StarRating({ count }: { count: number }) {
  return (
    <div
      className="testimonials__rating"
      role="img"
      aria-label={`Оценка ${count} из 5`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="testimonials__star" aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      className="testimonials"
      id="testimonials"
      aria-labelledby="testimonials-title"
    >
      <Container>
        <ScrollReveal as="header" className="testimonials__header">
          <span className="testimonials__eyebrow">Отзывы</span>
          <h2 id="testimonials-title" className="testimonials__title">
            Истории людей, которым{" "}
            <em className="testimonials__title_accent">мы помогли</em>
          </h2>
        </ScrollReveal>

        <ScrollReveal className="testimonials__carousel-wrap" delay={2}>
          <div
            className="testimonials__controls"
            role="group"
            aria-label="Управление каруселью отзывов"
          >
            <button
              type="button"
              className="testimonials__control"
              onClick={scrollPrev}
              aria-label="Предыдущий отзыв"
              role="button"
            >
              ←
            </button>
            <button
              type="button"
              className="testimonials__control"
              onClick={scrollNext}
              aria-label="Следующий отзыв"
              role="button"
            >
              →
            </button>
          </div>

          <div className="testimonials__viewport" ref={emblaRef}>
            <div className="testimonials__container" role="list">
              {testimonialsData.map((item) => (
                <article
                  key={item.id}
                  className="testimonials__slide"
                  role="listitem"
                  aria-roledescription="slide"
                  aria-label={`Отзыв от ${item.name}`}
                >
                  <blockquote className="testimonials__quote">
                    <StarRating count={item.rating} />
                    <p className="testimonials__text">&ldquo;{item.text}&rdquo;</p>
                    <footer className="testimonials__author">
                      <div className="testimonials__avatar">
                        <OptimizedImage
                          src={item.image}
                          alt={`Фото ${item.name}`}
                          width={56}
                          height={56}
                          loading="lazy"
                          className="testimonials__avatar-image"
                        />
                      </div>
                      <cite className="testimonials__cite">
                        <span className="testimonials__name">{item.name}</span>
                        <span className="testimonials__role">{item.role}</span>
                      </cite>
                    </footer>
                  </blockquote>
                </article>
              ))}
            </div>
          </div>

          <div
            className="testimonials__dots"
            role="tablist"
            aria-label="Выбор отзыва"
          >
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                className={`testimonials__dot${selectedIndex === index ? " testimonials__dot_active" : ""}`}
                aria-label={`Отзыв ${index + 1}`}
                aria-selected={selectedIndex === index}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
