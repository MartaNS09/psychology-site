import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteConfig } from "@/lib/seo/site-config";
import "./AboutPreview.scss";

const highlights = [
  "20+ лет практики: терапия, супервизия, обучение",
  "Два направления на одном сайте — клиенты и коллеги",
  "Запись через Telegram и WhatsApp без лишних шагов",
  "Блог, истории и ответы на частые вопросы",
];

export function AboutPreview() {
  const { psychologist } = siteConfig;
  const nameParts = psychologist.name.split(" ");
  const firstName = nameParts[0] ?? "Имя";
  const lastName = nameParts.slice(1).join(" ") || "Фамилия";

  return (
    <section className="about-preview" id="about" aria-labelledby="about-preview-title">
      <Container>
        <div className="about-preview__layout">
          <ScrollReveal className="about-preview__media">
            <div className="about-preview__photo-wrap about-preview__photo-wrap_animated">
              <OptimizedImage
                src="/images/psychologist-portrait.webp"
                alt={`${psychologist.name} — практикующий психолог`}
                width={520}
                height={640}
                loading="lazy"
                className="about-preview__photo"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={2} className="about-preview__content">
            <span className="about-preview__eyebrow">О специалисте</span>
            <h2 id="about-preview-title" className="about-preview__title">
              {firstName}{" "}
              <em className="about-preview__title_accent">{lastName}</em>
            </h2>
            <p className="about-preview__role">{psychologist.jobTitle}</p>
            <p className="about-preview__text">{psychologist.description}</p>
            <p className="about-preview__text">
              Instagram — живой канал, но анонсы теряются, а клиентам сложно понять:
              идти на терапию или на обучение. Этот сайт —{" "}
              <Link href="/clients">цифровой офис</Link>, где всё структурировано.
            </p>
            <ul className="about-preview__list" role="list">
              {highlights.map((item) => (
                <li key={item} role="listitem">
                  {item}
                </li>
              ))}
            </ul>
            <div className="about-preview__actions">
              <Link href="/clients" className="button button_primary">
                <span className="button__label">Записаться на консультацию</span>
              </Link>
              <Link href="/education" className="button button_secondary">
                <span className="button__label">Программы для коллег</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
