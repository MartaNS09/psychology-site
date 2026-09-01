import Link from "next/link";
import { faqData } from "@/lib/content/faq";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import "./FaqPreview.scss";

export function FaqPreview() {
  return (
    <section className="faq-preview" id="faq" aria-labelledby="faq-title">
      <Container>
        <div className="faq-preview__layout">
          <ScrollReveal as="header" className="faq-preview__header">
            <span className="faq-preview__eyebrow">Вопросы</span>
            <h2 id="faq-title" className="faq-preview__title">
              Ответы на{" "}
              <em className="faq-preview__title_accent">ваши вопросы</em>
            </h2>
            <p className="faq-preview__description">
              Собрала частые вопросы о формате, конфиденциальности и том, как
              начать терапию без стресса.
            </p>
            <Link href="/faq" className="faq-preview__link">
              Полный список вопросов →
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <FaqAccordion items={faqData.slice(0, 6)} />
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
