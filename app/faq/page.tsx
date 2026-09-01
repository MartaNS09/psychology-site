import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { faqData } from "@/lib/content/faq";
import { createSiteMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createSiteMetadata({
  title: "Частые вопросы",
  description:
    "Ответы о первой сессии, онлайн-терапии, конфиденциальности, оплате и формате работы с психологом.",
});

export default function FaqPage() {
  return (
    <div className="page">
      <main id="main-content" className="page__main" role="main">
        <PageHero
          eyebrow="Вопросы"
          title="Ответы,"
          accent="которые вы искали"
          description="Если не нашли ответ — напишите мне. Отвечаю лично в течение рабочего дня."
          image="/images/hero-bg.webp"
        />

        <section className="page-section" aria-label="Вопросы и ответы">
          <Container>
            <ScrollReveal>
              <FaqAccordion items={faqData} />
            </ScrollReveal>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
