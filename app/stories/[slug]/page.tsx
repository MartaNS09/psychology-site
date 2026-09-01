import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPageLayout } from "@/components/layout/DetailPageLayout";
import { Footer } from "@/components/sections/Footer";
import { storiesData } from "@/lib/content/stories";
import { createSiteMetadata } from "@/lib/seo/metadata";

interface Props {
  params: Promise<{ slug: string }>;
}

function getStory(slug: string) {
  return storiesData.find((s) => s.slug === slug);
}

export async function generateStaticParams() {
  return storiesData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return {};
  return createSiteMetadata({ title: story.title, description: story.excerpt });
}

export default async function StoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  return (
    <div className="page">
      <main id="main-content" className="page__main" role="main">
        <DetailPageLayout
          title={story.title}
          subtitle={`${story.category} · ${story.readTime}`}
          image={story.image}
          imageAlt={story.title}
          backHref="/stories"
          backLabel="Все истории"
          formType="consultation"
        >
          <p><em>{story.excerpt}</em></p>
          {story.content.map((p) => (
            <p key={p.slice(0, 30)}>{p}</p>
          ))}
        </DetailPageLayout>
      </main>
      <Footer />
    </div>
  );
}
