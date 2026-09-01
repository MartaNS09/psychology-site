import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { Container } from "@/components/ui/Container";
import "./PageHero.scss";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  accent?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
}

export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  image,
  imageAlt = "",
}: PageHeroProps) {
  return (
    <section className="page-hero" aria-labelledby="page-hero-title">
      {image && (
        <div className="page-hero__bg" aria-hidden="true">
          <OptimizedImage
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="page-hero__bg-image"
          />
          <div className="page-hero__bg-overlay" />
          <div className="page-hero__bg-fade" />
        </div>
      )}
      <Container>
        <div className="page-hero__inner">
          {eyebrow && <span className="page-hero__eyebrow">{eyebrow}</span>}
          <h1 id="page-hero-title" className="page-hero__title">
            {title}
            {accent && <em className="page-hero__title_accent"> {accent}</em>}
          </h1>
          {description && (
            <p className="page-hero__description">{description}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
