"use client";

import Link from "next/link";
import { educationPrograms } from "@/lib/content/education";
import { Container } from "@/components/ui/Container";
import { ImageCard } from "@/components/ui/ImageCard";
import { ResponsiveCarousel } from "@/components/ui/ResponsiveCarousel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import "./EducationPreview.scss";

export function EducationPreview() {
  const cards = educationPrograms.map((program) => (
    <ImageCard
      key={program.id}
      title={program.title}
      subtitle={program.subtitle}
      description={program.description}
      image={program.image}
      imageAlt={program.title}
      href={`/education/${program.slug}`}
      footer={`Старт: ${program.startDate} · Подробнее →`}
    />
  ));

  return (
    <section className="education-preview" id="education" aria-labelledby="education-title">
      <Container>
        <ScrollReveal as="header" className="education-preview__header">
          <span className="education-preview__eyebrow">Для коллег</span>
          <h2 id="education-title" className="education-preview__title">
            Курсы МГИ,{" "}
            <em className="education-preview__title_accent">супервизия и группы</em>
          </h2>
          <p className="education-preview__description">
            Календарь дат, программы и регистрация — всё в одном месте.{" "}
            <Link href="/education">Смотреть все программы</Link>.
          </p>
        </ScrollReveal>
        <ResponsiveCarousel
          gridClassName="education-preview__grid"
          slideClassName="education-preview__slide"
          ariaLabel="Программы обучения"
          desktopFrom={768}
        >
          {cards}
        </ResponsiveCarousel>
        <ScrollReveal className="education-preview__footer" delay={2}>
          <Link href="/education" className="education-preview__link">
            Все программы для коллег →
          </Link>
        </ScrollReveal>
      </Container>
    </section>
  );
}
