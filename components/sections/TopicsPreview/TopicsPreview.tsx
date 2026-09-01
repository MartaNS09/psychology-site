"use client";

import Link from "next/link";
import { topicsData } from "@/lib/content/topics";
import { Container } from "@/components/ui/Container";
import { CardLink } from "@/components/ui/CardLink/CardLink";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { ResponsiveCarousel } from "@/components/ui/ResponsiveCarousel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import "./TopicsPreview.scss";

export function TopicsPreview() {
  const cards = topicsData.map((topic) => (
    <CardLink
      key={topic.slug}
      href={`/topics/${topic.slug}`}
      className="topics-preview__card"
      aria-label={`Читать статью: ${topic.title}`}
    >
      <div className="topics-preview__media">
        <OptimizedImage
          src={topic.image}
          alt=""
          fill
          sizes="(max-width: 768px) 88vw, 33vw"
          loading="lazy"
          className="topics-preview__image"
        />
      </div>
      <div className="topics-preview__body">
        <span className="topics-preview__category">{topic.category}</span>
        <h3 className="topics-preview__card-title">{topic.title}</h3>
        <p className="topics-preview__excerpt">{topic.excerpt}</p>
        <span className="topics-preview__more">{topic.readTime} · Читать →</span>
      </div>
    </CardLink>
  ));

  return (
    <section className="topics-preview" id="topics" aria-labelledby="topics-title">
      <Container>
        <ScrollReveal as="header" className="topics-preview__header">
          <span className="topics-preview__eyebrow">Актуальные темы</span>
          <h2 id="topics-title" className="topics-preview__title">
            Разбираем то,{" "}
            <em className="topics-preview__title_accent">что волнует</em>
          </h2>
          <p className="topics-preview__description">
            Глубокие материалы о тревоге, привязанности, выгорании, границах и горе —
            с примерами из жизни. Читайте{" "}
            <Link href="/topics/anxiety-everyday">о тревоге</Link>,{" "}
            <Link href="/topics/attachment-styles">об отношениях</Link> или{" "}
            <Link href="/contact">запишитесь</Link>.
          </p>
        </ScrollReveal>

        <ResponsiveCarousel
          gridClassName="topics-preview__grid"
          slideClassName="topics-preview__slide"
          ariaLabel="Статьи блога"
          desktopFrom={768}
        >
          {cards}
        </ResponsiveCarousel>

        <ScrollReveal className="topics-preview__footer" delay={2}>
          <Link href="/topics" className="topics-preview__link">
            Все темы и статьи →
          </Link>
        </ScrollReveal>
      </Container>
    </section>
  );
}
