import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { internalLinksHub } from "@/lib/content/navigation";
import "./InternalLinks.scss";

interface InternalLinksProps {
  title?: string;
  className?: string;
}

export function InternalLinks({
  title = "Полезные разделы сайта",
  className,
}: InternalLinksProps) {
  return (
    <section
      className={`internal-links ${className ?? ""}`.trim()}
      aria-labelledby="internal-links-title"
    >
      <Container>
        <ScrollReveal as="header" className="internal-links__header">
          <h2 id="internal-links-title" className="internal-links__title">
            {title}
          </h2>
          <p className="internal-links__description">
            Внутренняя навигация по темам — чтобы быстро найти нужный формат работы,
            статью или ответ на вопрос.
          </p>
        </ScrollReveal>
        <div className="internal-links__grid">
          {internalLinksHub.map((group, index) => (
            <ScrollReveal
              key={group.title}
              className="internal-links__group"
              delay={(index + 1) as 1 | 2 | 3}
            >
              <h3 className="internal-links__group-title">{group.title}</h3>
              <ul className="internal-links__list" role="list">
                {group.links.map((link) => (
                  <li key={link.href} role="listitem">
                    <Link href={link.href} className="internal-links__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
