import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { ImageCard } from "@/components/ui/ImageCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { educationPrograms } from "@/lib/content/education";
import { createSiteMetadata } from "@/lib/seo/metadata";
import "@/styles/pages/topics.scss";

export const metadata: Metadata = createSiteMetadata({
  title: "Для коллег — курсы МГИ и супервизия",
  description: "Курсы МГИ 1 и 2 ступень, супервизия, группы. Календарь, регистрация.",
});

export default function EducationPage() {
  return (
    <div className="page">
      <main id="main-content" className="page__main" role="main">
        <PageHero
          eyebrow="Крыло для коллег"
          title="Обучение"
          accent="и супервизия"
          description="Курсы МГИ, супервизия для практикующих психологов, группы с датами и регистрацией — всё структурировано, как digital-офис."
          image="/images/education/mgi-stage-1.webp"
        />
        <section className="page-section">
          <Container>
            <div className="services-page__grid">
              {educationPrograms.map((p, i) => (
                <ScrollReveal key={p.id} delay={(i + 1) as 1 | 2 | 3 | 4}>
                  <ImageCard
                    title={p.title}
                    subtitle={p.subtitle}
                    description={p.description}
                    image={p.image}
                    imageAlt={p.title}
                    href={`/education/${p.slug}`}
                    footer={`Старт: ${p.startDate} · ${p.price}`}
                  />
                </ScrollReveal>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <Link href="/contact?type=course" className="button button_primary button_large">
                <span className="button__label">Стать участником курса</span>
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
