"use client";

import Link from "next/link";
import { clientsServices } from "@/lib/content/clients";
import { Container } from "@/components/ui/Container";
import { ImageCard } from "@/components/ui/ImageCard";
import { ResponsiveCarousel } from "@/components/ui/ResponsiveCarousel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import "./ServicesPreview.scss";

const PREVIEW_COUNT = 6;

export function ServicesPreview() {
  const cards = clientsServices.map((s) => (
    <ImageCard
      key={s.id}
      variant="full"
      title={s.title}
      hook={s.hook}
      subtitle={s.subtitle}
      description={s.description}
      features={[...s.features]}
      image={s.image}
      imageAlt={s.audience}
      href={`/clients/${s.slug}`}
      footer={`${s.price} · ${s.duration} · Подробнее →`}
    />
  ));

  return (
    <section className="services-preview" id="services" aria-labelledby="services-title">
      <Container>
        <ScrollReveal as="header" className="services-preview__header">
          <span className="services-preview__eyebrow">Для клиентов</span>
          <h2 id="services-title" className="services-preview__title">
            Терапия{" "}
            <em className="services-preview__title_accent">для каждого</em>
          </h2>
          <p className="services-preview__description">
            Женщины, мужчины, пары, семья, дети, онлайн и кризисная поддержка — каждый
            формат с понятной стоимостью и записью в{" "}
            <Link href="/contact">Telegram или WhatsApp</Link>.
          </p>
        </ScrollReveal>

        <ResponsiveCarousel
          gridClassName="services-preview__grid"
          slideClassName="services-preview__slide"
          ariaLabel="Форматы терапии"
          desktopLimit={PREVIEW_COUNT}
        >
          {cards}
        </ResponsiveCarousel>

        <ScrollReveal className="services-preview__footer" delay={3}>
          <Link href="/clients" className="button button_primary services-preview__cta">
            <span className="button__label">
              Все {clientsServices.length} форматов терапии →
            </span>
          </Link>
          <Link href="/stories" className="services-preview__link services-preview__link_secondary">
            Истории клиентов →
          </Link>
        </ScrollReveal>
      </Container>
    </section>
  );
}
