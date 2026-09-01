import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { topicsData } from "@/lib/content/topics";
import { createSiteMetadata } from "@/lib/seo/metadata";
import "@/styles/pages/topics.scss";

export const metadata: Metadata = createSiteMetadata({
  title: "Актуальные темы и статьи",
  description:
    "Статьи о тревоге, отношениях, выгорании, границах и самопознании — полезные материалы от практикующего психолога.",
});

export default function TopicsPage() {
  return (
    <div className="page">
      <main id="main-content" className="page__main" role="main">
        <PageHero
          eyebrow="Темы"
          title="Материалы,"
          accent="которые помогают понять себя"
          description="Короткие и глубокие тексты о том, что волнует большинство клиентов — до и между сессиями."
          image="/images/stories/relationship.webp"
        />

        <section className="topics-page" aria-label="Статьи и темы">
          <Container>
            <div className="topics-page__grid" role="list">
              {topicsData.map((topic, index) => (
                <ScrollReveal
                  key={topic.id}
                  role="listitem"
                  delay={(index + 1) as 1 | 2 | 3 | 4 | 5 | 6}
                >
                  <Link href={`/topics/${topic.slug}`} className="topics-page__article">
                    <div className="topics-page__media">
                      <OptimizedImage
                        src={topic.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                        className="topics-page__image"
                      />
                    </div>
                    <div className="topics-page__body">
                      <span className="topics-page__category">{topic.category}</span>
                      <h2 className="topics-page__title">{topic.title}</h2>
                      <p className="topics-page__excerpt">{topic.excerpt}</p>
                      <p className="topics-page__meta">{topic.readTime} · Читать →</p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
