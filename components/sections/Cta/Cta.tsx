import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import "./Cta.scss";

export function Cta() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <Container>
        <ScrollReveal className="cta__inner">
          <h2 id="cta-title" className="cta__title">
            Готовы сделать{" "}
            <em className="cta__title_accent">первый шаг</em>?
          </h2>
          <p className="cta__text">
            Запишитесь на бесплатную 15-минутную знакомство-сессию — обсудим
            ваш запрос и подберём комфортный формат работы.
          </p>
          <div className="cta__actions">
            <Link
              href="/clients"
              className="button button_primary button_large"
            >
              <span className="button__label">Записаться на консультацию</span>
            </Link>
            <Link href="/education" className="button button_secondary button_large">
              <span className="button__label">Стать участником курса</span>
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
