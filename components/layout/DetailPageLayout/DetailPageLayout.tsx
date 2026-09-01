import Link from "next/link";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { ContactForm } from "@/components/ui/ContactForm";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/seo/site-config";
import "@/styles/pages/detail.scss";

interface DetailHeroProps {
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
  price?: string;
  meta?: { label: string; value: string }[];
}

interface DetailPageLayoutProps extends DetailHeroProps {
  children: React.ReactNode;
  backHref: string;
  backLabel: string;
  ctaHref?: string;
  ctaLabel?: string;
  formType?: "consultation" | "course" | "general";
}

export function DetailPageLayout({
  title,
  subtitle,
  image,
  imageAlt,
  price,
  meta,
  children,
  backHref,
  backLabel,
  ctaHref = "/contact",
  ctaLabel = "Записаться",
  formType = "general",
}: DetailPageLayoutProps) {
  return (
    <article className="detail-page">
      <div className="detail-page__hero">
        <OptimizedImage
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="detail-page__hero-image"
        />
        <div className="detail-page__hero-overlay" />
        <Container>
          <div className="detail-page__hero-content">
            <Link href={backHref} className="detail-page__back">
              ← {backLabel}
            </Link>
            {subtitle && <p className="detail-page__subtitle">{subtitle}</p>}
            <h1 className="detail-page__title">{title}</h1>
            {price && <p className="detail-page__price">{price}</p>}
            {meta && (
              <dl className="detail-page__meta">
                {meta.map((m) => (
                  <div key={m.label} className="detail-page__meta-item">
                    <dt>{m.label}</dt>
                    <dd>{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </Container>
      </div>

      <Container>
        <div className="detail-page__layout">
          <div className="detail-page__content">{children}</div>
          <aside className="detail-page__sidebar" aria-label="Запись и связь">
            <div className="detail-page__sidebar-card">
              <h2 className="detail-page__sidebar-title">Записаться</h2>
              <p className="detail-page__sidebar-text">
                Или напишите напрямую в мессенджер:
              </p>
              <div className="detail-page__messengers">
                <a href={siteConfig.contacts.telegram} className="button button_primary">
                  <span className="button__label">Telegram</span>
                </a>
                <a href={siteConfig.contacts.whatsapp} className="button button_secondary">
                  <span className="button__label">WhatsApp</span>
                </a>
              </div>
              <Link href={ctaHref} className="detail-page__cta-link">
                {ctaLabel} →
              </Link>
              <ContactForm defaultType={formType} />
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}
