import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteConfig } from "@/lib/seo/site-config";
import { HeroVideoBackground } from "./HeroVideoBackground";
import "./Hero.scss";

export function Hero() {
  return (
    <section
      className="hero"
      aria-labelledby="hero-title"
      aria-describedby="hero-subtitle"
    >
      <div className="hero__media" aria-hidden="true">
        <HeroVideoBackground
          src="/videos/hero-meditation.mp4"
          poster="/images/hero-video-poster.webp"
        />
        <div className="hero__overlay" />
        <div className="hero__shapes">
          <span className="hero__shape hero__shape_circle hero__shape_1" />
          <span className="hero__shape hero__shape_ring hero__shape_2" />
          <span className="hero__shape hero__shape_line hero__shape_3" />
        </div>
      </div>

      <Container>
        <ScrollReveal className="hero__inner">
          <div className="hero__profile">
            <div className="hero__portrait">
              <OptimizedImage
                src="/images/psychologist-portrait.webp"
                alt={`${siteConfig.psychologist.name} — практикующий психолог`}
                width={96}
                height={96}
                priority
                className="hero__portrait-image"
              />
            </div>
            <div className="hero__profile-text">
              <p className="hero__name">{siteConfig.psychologist.name}</p>
              <p className="hero__role">{siteConfig.psychologist.jobTitle}</p>
            </div>
          </div>

          <span className="hero__badge">Центральный digital-офис · 20+ лет практики</span>
          <h1 id="hero-title" className="hero__title">
            Ваш{" "}
            <em className="hero__title_accent">цифровой офис</em> практики
          </h1>
          <p id="hero-subtitle" className="hero__subtitle hero__subtitle_dropcap">
            Терапия для клиентов и обучение для коллег — в одном месте. Без
            потери анонсов в Instagram и с простой записью через Telegram и
            WhatsApp.
          </p>

          <div className="hero__actions" role="group" aria-label="Главные действия">
            <Link
              href="/clients"
              className="button button_primary button_large hero__button_primary"
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
