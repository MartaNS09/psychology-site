"use client";

import Link from "next/link";
import { storiesData } from "@/lib/content/stories";
import { Container } from "@/components/ui/Container";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { ResponsiveCarousel } from "@/components/ui/ResponsiveCarousel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import "./StoriesPreview.scss";

interface StoriesPreviewProps {
  limit?: number;
}

export function StoriesPreview({ limit = 3 }: StoriesPreviewProps) {
  const items = storiesData.slice(0, limit);

  const cards = items.map((story) => (
    <article key={story.slug} className="stories-preview__card">
      <div className="stories-preview__media">
        <OptimizedImage
          src={story.image}
          alt=""
          fill
          sizes="(max-width: 768px) 88vw, 33vw"
          loading="lazy"
          className="stories-preview__image"
        />
        <div className="stories-preview__overlay" />
        <span className="stories-preview__category">{story.category}</span>
      </div>
      <div className="stories-preview__body">
        <h3 className="stories-preview__card-title">{story.title}</h3>
        <p className="stories-preview__excerpt">{story.excerpt}</p>
        <Link
          href={`/stories/${story.slug}`}
          className="stories-preview__more"
          aria-label={`Читать историю: ${story.title}`}
        >
          {story.readTime} · Читать →
        </Link>
      </div>
    </article>
  ));

  return (
    <section className="stories-preview" id="stories" aria-labelledby="stories-title">
      <Container>
        <ScrollReveal as="header" className="stories-preview__header">
          <span className="stories-preview__eyebrow">Истории</span>
          <h2 id="stories-title" className="stories-preview__title">
            Жизненные истории{" "}
            <em className="stories-preview__title_accent">без имён</em>
          </h2>
          <p className="stories-preview__description">
            Реальные пути клиентов — анонимизированы и опубликованы с согласия.{" "}
            <Link href="/stories">Все истории</Link>.
          </p>
        </ScrollReveal>

        <ResponsiveCarousel
          gridClassName="stories-preview__grid"
          slideClassName="stories-preview__slide"
          ariaLabel="Истории клиентов"
          desktopFrom={1024}
        >
          {cards}
        </ResponsiveCarousel>

        <ScrollReveal className="stories-preview__footer" delay={2}>
          <Link href="/stories" className="stories-preview__link">
            Все истории →
          </Link>
        </ScrollReveal>
      </Container>
    </section>
  );
}
