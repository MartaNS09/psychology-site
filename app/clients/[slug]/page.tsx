import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DetailPageLayout } from "@/components/layout/DetailPageLayout";
import { InternalLinks } from "@/components/sections/InternalLinks";
import { Footer } from "@/components/sections/Footer";
import { clientsServices, getClientService } from "@/lib/content/clients";
import { createSiteMetadata } from "@/lib/seo/metadata";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return clientsServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getClientService(slug);
  if (!service) return {};
  return createSiteMetadata({
    title: service.title,
    description: service.description,
    path: `/clients/${slug}`,
    image: service.image,
  });
}

export default async function ClientDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getClientService(slug);
  if (!service) notFound();

  const related = clientsServices
    .filter((s) => s.slug !== slug)
    .slice(0, 3);

  return (
    <div className="page">
      <main id="main-content" className="page__main" role="main">
        <DetailPageLayout
          title={service.title}
          subtitle={service.subtitle}
          image={service.image}
          imageAlt={service.audience}
          price={service.price}
          meta={[
            { label: "Длительность", value: service.duration },
            { label: "Аудитория", value: service.audience },
          ]}
          backHref="/clients"
          backLabel="Все услуги для клиентов"
          ctaHref="/contact"
          ctaLabel="Записаться на консультацию"
          formType="consultation"
        >
          {service.fullContent.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}

          <h2>Кому подойдёт</h2>
          <ul className="detail-page__list">
            {service.forWhom.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2>Как проходит работа</h2>
          <ol className="detail-page__steps">
            {service.process.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>

          <h2>Что входит</h2>
          <ul className="detail-page__list">
            {service.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <nav className="detail-page__related" aria-label="Другие форматы">
            <h2 className="detail-page__related-title">Другие форматы терапии</h2>
            <ul role="list">
              {related.map((s) => (
                <li key={s.slug} role="listitem">
                  <Link href={`/clients/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
            <p>
              <Link href="/topics">Читать блог</Link>
              {" · "}
              <Link href="/contact">Записаться</Link>
            </p>
          </nav>
        </DetailPageLayout>
        <InternalLinks title="Разделы сайта" />
      </main>
      <Footer />
    </div>
  );
}
