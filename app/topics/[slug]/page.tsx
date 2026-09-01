import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DetailPageLayout } from "@/components/layout/DetailPageLayout";
import { InternalLinks } from "@/components/sections/InternalLinks";
import { Footer } from "@/components/sections/Footer";
import { topicsData, getTopic } from "@/lib/content/topics";
import { createSiteMetadata } from "@/lib/seo/metadata";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return topicsData.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return {};
  return createSiteMetadata({
    title: topic.title,
    description: topic.excerpt,
    path: `/topics/${slug}`,
    image: topic.image,
  });
}

export default async function TopicDetailPage({ params }: Props) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();

  const related = topic.relatedSlugs
    .map((s) => getTopic(s))
    .filter(Boolean);

  return (
    <div className="page">
      <main id="main-content" className="page__main" role="main">
        <DetailPageLayout
          title={topic.title}
          subtitle={`${topic.category} · ${topic.readTime}`}
          image={topic.image}
          imageAlt={topic.title}
          backHref="/topics"
          backLabel="Все темы"
          formType="consultation"
        >
          {topic.content.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
          {related.length > 0 && (
            <nav className="detail-page__related" aria-label="Похожие статьи">
              <h2 className="detail-page__related-title">Читайте также</h2>
              <ul role="list">
                {related.map((r) => (
                  <li key={r!.slug} role="listitem">
                    <Link href={`/topics/${r!.slug}`}>{r!.title}</Link>
                  </li>
                ))}
              </ul>
              <p>
                <Link href="/clients">Записаться на консультацию</Link>
                {" · "}
                <Link href="/contact">Задать вопрос</Link>
              </p>
            </nav>
          )}
        </DetailPageLayout>
        <InternalLinks title="Другие разделы сайта" />
      </main>
      <Footer />
    </div>
  );
}
