import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  mainNav,
  footerClientsNav,
  footerEducationNav,
} from "@/lib/content/navigation";
import { siteConfig } from "@/lib/seo/site-config";
import "./Footer.scss";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { contacts, apsod, psychologist } = siteConfig;

  return (
    <footer className="footer" role="contentinfo" aria-labelledby="footer-heading">
      <Container>
        <ScrollReveal className="footer__inner">
          <div className="footer__brand">
            <p id="footer-heading" className="footer__logo">
              {siteConfig.name}
            </p>
            <p className="footer__tagline">
              {psychologist.name} · {psychologist.jobTitle}
            </p>
            <p className="footer__tagline">{contacts.city}</p>
            <Link href="/contact" className="footer__brand-cta">
              Записаться →
            </Link>
          </div>

          <nav className="footer__nav" aria-label="Для клиентов">
            <p className="footer__nav-title">Для клиентов</p>
            {footerClientsNav.map((link) => (
              <Link key={link.href} href={link.href} className="footer__link">
                {link.label}
              </Link>
            ))}
          </nav>

          <nav className="footer__nav" aria-label="Для коллег">
            <p className="footer__nav-title">Для коллег</p>
            {footerEducationNav.map((link) => (
              <Link key={link.href} href={link.href} className="footer__link">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="footer__contact">
            <p className="footer__nav-title">Контакты</p>
            <a href={contacts.telegram} className="footer__link" target="_blank" rel="noopener noreferrer">
              Telegram {contacts.telegramHandle}
            </a>
            <a href={contacts.whatsapp} className="footer__link" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a href={`mailto:${contacts.email}`} className="footer__link">
              {contacts.email}
            </a>
            <a href={`tel:${contacts.phone.replace(/\s/g, "")}`} className="footer__link">
              {contacts.phone}
            </a>
          </div>

          <nav className="footer__nav" aria-label="Сайт">
            <p className="footer__nav-title">Сайт</p>
            {mainNav.map((link) => (
              <Link key={link.href} href={link.href} className="footer__link">
                {link.label}
              </Link>
            ))}
            <Link href="/#about" className="footer__link">
              О специалисте
            </Link>
          </nav>
        </ScrollReveal>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} {psychologist.name}. Контент — демо-шаблон для
            психологической практики.
          </p>
          <p className="footer__copyright footer__copyright_dev">
            Разработка сайта:{" "}
            <a
              href={apsod.url}
              className="footer__dev-link footer__dev-link_glow"
              target="_blank"
              rel="noopener noreferrer"
            >
              {apsod.name}
            </a>
            {" "}·{" "}
            <Link href="/faq" className="footer__link footer__link_inline">
              Конфиденциальность
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
