import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";

export default function OfflinePage() {
  return (
    <div className="page">
      <main id="main-content" className="page__main" role="main">
        <Container>
          <section className="offline-page">
            <h1 className="offline-page__title">Нет подключения</h1>
            <p className="offline-page__text">
              Проверьте интернет и попробуйте снова. Часть материалов доступна офлайн.
            </p>
            <Link href="/" className="button button_primary">
              <span className="button__label">На главную</span>
            </Link>
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
