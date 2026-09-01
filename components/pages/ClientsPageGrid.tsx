"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ImageCard } from "@/components/ui/ImageCard";
import { ResponsiveCarousel } from "@/components/ui/ResponsiveCarousel";
import { clientsServices } from "@/lib/content/clients";

export function ClientsPageGrid() {
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
      footer={`${s.price} · Подробнее →`}
    />
  ));

  return (
    <section className="page-section">
      <Container>
        <ResponsiveCarousel
          gridClassName="services-page__grid"
          slideClassName="services-page__slide"
          ariaLabel="Все форматы терапии"
        >
          {cards}
        </ResponsiveCarousel>
        <div className="page-section__cta">
          <Link href="/contact" className="button button_primary button_large">
            <span className="button__label">Записаться на консультацию</span>
          </Link>
          <Link href="/topics" className="button button_secondary button_large">
            <span className="button__label">Читать блог →</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
