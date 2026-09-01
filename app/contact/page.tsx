import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ui/ContactForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteConfig } from "@/lib/seo/site-config";
import { createSiteMetadata } from "@/lib/seo/metadata";
import "@/styles/pages/contact.scss";

export const metadata: Metadata = createSiteMetadata({
  title: "Контакты и запись",
  description: "Запись на консультацию или курс. Telegram, WhatsApp, форма обратной связи.",
  path: "/contact",
  image: "/images/services/couple.webp",
});

export default function ContactPage() {
  const { contacts } = siteConfig;

  return (
    <div className="page">
      <main id="main-content" className="page__main" role="main">
        <PageHero
          eyebrow="Контакты"
          title="Записаться"
          accent="на консультацию или курс"
          description="Первая 15-минутная знакомство-сессия — бесплатно. Выберите мессенджер или заполните форму."
          image="/images/services/couple.webp"
        />
        <section className="contact-page">
          <Container>
            <div className="contact-page__layout">
              <ScrollReveal className="contact-page__info">
                <h2 className="contact-page__title">
                  Свяжитесь <em className="contact-page__title_accent">удобным способом</em>
                </h2>
                <div className="contact-page__messengers">
                  <a href={contacts.telegram} className="button button_primary button_large" target="_blank" rel="noopener noreferrer">
                    <span className="button__label">Telegram</span>
                  </a>
                  <a href={contacts.whatsapp} className="button button_secondary button_large" target="_blank" rel="noopener noreferrer">
                    <span className="button__label">WhatsApp</span>
                  </a>
                </div>
                <ul className="contact-page__channels" role="list">
                  <li role="listitem"><a href={`mailto:${contacts.email}`}>{contacts.email}</a></li>
                  <li role="listitem"><a href={`tel:${contacts.phone.replace(/\s/g, "")}`}>{contacts.phone}</a></li>
                  <li role="listitem">{contacts.city}</li>
                </ul>
              </ScrollReveal>
              <ScrollReveal delay={2}>
                <ContactForm />
              </ScrollReveal>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
