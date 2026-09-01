"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/lib/content/navigation";
import { siteConfig } from "@/lib/seo/site-config";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAutoHideHeader } from "@/hooks/useAutoHideHeader";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/utils";
import "./Header.scss";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const headerVisible = useAutoHideHeader(isMobile, menuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <div className="header-anchor" aria-hidden="true">
        <header
          className={cn(
            "header",
            scrolled && "header_scrolled",
            menuOpen && "header_menu-open",
            isMobile && !headerVisible && "header_hidden"
          )}
          role="banner"
        >
          <Container className="header__inner">
            <Link href="/" className="header__logo" aria-label="На главную">
              <span className="header__logo-name header__logo-name_full">{siteConfig.name}</span>
              <span className="header__logo-name header__logo-name_short">{siteConfig.shortName}</span>
              <span className="header__logo-tagline">психологи · терапия</span>
            </Link>

            <nav className="header__nav" aria-label="Основная навигация">
              <ul className="header__menu" role="list">
                {mainNav.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <li key={item.href} className="header__menu-item" role="listitem">
                      <Link
                        href={item.href}
                        className={cn("header__link", isActive && "header__link_active")}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="header__actions">
              <ThemeToggle />
              <Link
                href="/contact"
                className="button button_primary button_small header__cta"
                aria-label="Записаться на консультацию"
              >
                <span className="button__label header__cta-short">Запись</span>
                <span className="button__label header__cta-full">Записаться</span>
              </Link>
              <button
                type="button"
                className="header__burger"
                aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span className="header__burger-line" />
                <span className="header__burger-line" />
                <span className="header__burger-line" />
              </button>
            </div>
          </Container>
        </header>
      </div>

      <button
        type="button"
        className={cn("header__backdrop", menuOpen && "header__backdrop_visible")}
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />

      <div
        id="mobile-menu"
        className={cn("header__mobile", menuOpen && "header__mobile_open")}
        aria-hidden={!menuOpen}
      >
        <div className="header__mobile-head">
          <p className="header__mobile-title">Меню</p>
          <button
            type="button"
            className="header__mobile-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Закрыть меню"
          >
            ×
          </button>
        </div>
        <nav aria-label="Мобильная навигация">
          <ul className="header__mobile-list" role="list">
            <li role="listitem">
              <Link
                href="/"
                className={cn("header__mobile-link", pathname === "/" && "header__mobile-link_active")}
              >
                Главная
              </Link>
            </li>
            {mainNav.map((item) => (
              <li key={item.href} role="listitem">
                <Link
                  href={item.href}
                  className={cn(
                    "header__mobile-link",
                    pathname.startsWith(item.href) && "header__mobile-link_active"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" className="header__mobile-cta" onClick={() => setMenuOpen(false)}>
            Записаться на консультацию
          </Link>
        </nav>
      </div>
    </>
  );
}
