import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import "./DualWings.scss";

export function DualWings() {
  return (
    <section className="dual-wings" aria-labelledby="dual-wings-title">
      <Container>
        <ScrollReveal as="header" className="dual-wings__header">
          <h2 id="dual-wings-title" className="dual-wings__title">
            Два направления —{" "}
            <em className="dual-wings__title_accent">один digital-офис</em>
          </h2>
          <p className="dual-wings__description">
            Клиенты и коллеги больше не теряются в ленте Instagram. Каждый сразу
            находит своё: терапия или обучение.
          </p>
        </ScrollReveal>

        <div className="dual-wings__grid">
          <ScrollReveal delay={1}>
            <Link href="/clients" className="dual-wings__card dual-wings__card_clients">
              <span className="dual-wings__eyebrow">Крыло 1</span>
              <h3 className="dual-wings__card-title">Для клиентов</h3>
              <p className="dual-wings__card-text">
                Женщины, мужчины, пары, семья, дети. Терапия, запись, стоимость,
                форматы работы.
              </p>
              <span className="button button_primary button_large dual-wings__cta">
                <span className="button__label">Записаться на консультацию</span>
              </span>
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <Link href="/education" className="dual-wings__card dual-wings__card_education">
              <span className="dual-wings__eyebrow">Крыло 2</span>
              <h3 className="dual-wings__card-title">Для коллег и студентов</h3>
              <p className="dual-wings__card-text">
                Курсы МГИ (1 и 2 ступень), супервизия, группы. Календарь дат и
                регистрация.
              </p>
              <span className="button button_secondary button_large dual-wings__cta">
                <span className="button__label">Стать участником курса</span>
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
