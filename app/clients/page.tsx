import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Footer } from "@/components/sections/Footer";
import { ClientsPageGrid } from "@/components/pages/ClientsPageGrid";
import { createSiteMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createSiteMetadata({
  title: "Для клиентов — терапия и запись",
  description: "Терапия для женщин, мужчин, пар, семей и детей. Стоимость, форматы, запись.",
});

export default function ClientsPage() {
  return (
    <div className="page">
      <main id="main-content" className="page__main" role="main">
        <PageHero
          eyebrow="Крыло для клиентов"
          title="Терапия"
          accent="и поддержка"
          description="Женщины, мужчины, пары, семья, дети — каждый формат с понятной структурой, стоимостью и простой записью."
          image="/images/services/women-therapy.webp"
        />
        <ClientsPageGrid />
      </main>
      <Footer />
    </div>
  );
}
