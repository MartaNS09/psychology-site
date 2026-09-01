import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPageLayout } from "@/components/layout/DetailPageLayout";
import { Footer } from "@/components/sections/Footer";
import { educationPrograms, getEducationProgram } from "@/lib/content/education";
import { createSiteMetadata } from "@/lib/seo/metadata";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return educationPrograms.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = getEducationProgram(slug);
  if (!program) return {};
  return createSiteMetadata({
    title: program.title,
    description: program.description,
  });
}

export default async function EducationDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = getEducationProgram(slug);
  if (!program) notFound();

  return (
    <div className="page">
      <main id="main-content" className="page__main" role="main">
        <DetailPageLayout
          title={program.title}
          subtitle={program.subtitle}
          image={program.image}
          imageAlt={program.title}
          price={program.price}
          meta={[
            { label: "Старт", value: program.startDate },
            { label: "Длительность", value: program.duration },
            { label: "Мест", value: program.spots },
          ]}
          backHref="/education"
          backLabel="Все программы"
          ctaHref="/contact?type=course"
          ctaLabel="Зарегистрироваться"
          formType="course"
        >
          {program.fullContent.map((p) => (
            <p key={p.slice(0, 30)}>{p}</p>
          ))}
          <h2>Программа включает</h2>
          <ul>
            {program.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </DetailPageLayout>
      </main>
      <Footer />
    </div>
  );
}
