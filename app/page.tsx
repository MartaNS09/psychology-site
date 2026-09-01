import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { DualWings } from "@/components/sections/DualWings";
import { BelowFoldSection } from "@/components/ui/BelowFoldSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllJsonLd } from "@/lib/seo/json-ld";

const AboutPreview = dynamic(
  () => import("@/components/sections/AboutPreview").then((m) => m.AboutPreview),
  { loading: () => null }
);
const ServicesPreview = dynamic(
  () => import("@/components/sections/ServicesPreview").then((m) => m.ServicesPreview),
  { loading: () => null }
);
const EducationPreview = dynamic(
  () => import("@/components/sections/EducationPreview").then((m) => m.EducationPreview),
  { loading: () => null }
);
const StoriesPreview = dynamic(
  () => import("@/components/sections/StoriesPreview").then((m) => m.StoriesPreview),
  { loading: () => null }
);
const TopicsPreview = dynamic(
  () => import("@/components/sections/TopicsPreview").then((m) => m.TopicsPreview),
  { loading: () => null }
);
const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials").then((m) => m.Testimonials),
  { loading: () => null }
);
const FaqPreview = dynamic(
  () => import("@/components/sections/FaqPreview").then((m) => m.FaqPreview),
  { loading: () => null }
);
const InternalLinks = dynamic(
  () => import("@/components/sections/InternalLinks").then((m) => m.InternalLinks),
  { loading: () => null }
);
const Cta = dynamic(
  () => import("@/components/sections/Cta").then((m) => m.Cta),
  { loading: () => null }
);
const Footer = dynamic(
  () => import("@/components/sections/Footer").then((m) => m.Footer),
  { loading: () => null }
);

export default function Home() {
  return (
    <>
      <JsonLd data={getAllJsonLd()} />
      <div className="page">
        <Hero />
        <DualWings />
        <main id="main-content" className="page__main" role="main">
          <BelowFoldSection ariaLabel="О специалисте">
            <AboutPreview />
          </BelowFoldSection>
          <BelowFoldSection ariaLabel="Услуги для клиентов">
            <ServicesPreview />
          </BelowFoldSection>
          <BelowFoldSection ariaLabel="Обучение для коллег">
            <EducationPreview />
          </BelowFoldSection>
          <BelowFoldSection ariaLabel="Истории">
            <StoriesPreview />
          </BelowFoldSection>
          <BelowFoldSection ariaLabel="Блог">
            <TopicsPreview />
          </BelowFoldSection>
          <BelowFoldSection ariaLabel="Отзывы">
            <Testimonials />
          </BelowFoldSection>
          <BelowFoldSection ariaLabel="Вопросы">
            <FaqPreview />
          </BelowFoldSection>
          <InternalLinks />
          <Cta />
        </main>
        <Footer />
      </div>
    </>
  );
}
