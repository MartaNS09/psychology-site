import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { storiesData } from "@/lib/content/stories";
import { createSiteMetadata } from "@/lib/seo/metadata";
import "@/styles/pages/stories.scss";

export const metadata: Metadata = createSiteMetadata({
  title: "Истории клиентов",
  description:
    "Анонимизированные истории людей, прошедших терапию: тревога, отношения, выгорание. Реальные пути изменений.",
});

export default function StoriesPage() {
  return (
    <div className="page">
      <main id="main-content" className="page__main" role="main">
        <PageHero
          eyebrow="Истории"
          title="Пути,"
          accent="которые вдохновляют"
          description="Имена изменены, детали обобщены. Каждая история — с согласия клиента. Чтобы вы знали: вы не одиноки."
          image="/images/stories/anxiety.webp"
        />

        <section className="stories-page" aria-label="Жизненные истории">
          <Container>
            {storiesData.map((story, index) => (
              <ScrollReveal
                key={story.id}
                className="stories-page__item"
                delay={(index + 1) as 1 | 2 | 3}
              >
                <Link href={`/stories/${story.slug}`} className="stories-page__article">
                  <div className="stories-page__media">
                    <OptimizedImage
                      src={story.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      loading="lazy"
                      className="stories-page__image"
                    />
                    <span className="stories-page__category">{story.category}</span>
                  </div>
                  <div className="stories-page__body">
                    <h2 className="stories-page__title">{story.title}</h2>
                    <p className="stories-page__excerpt">{story.excerpt}</p>
                    <p className="stories-page__meta">{story.readTime} · Читать полностью →</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
