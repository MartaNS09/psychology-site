"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/seo/site-config";
import { ContactForm } from "@/components/ui/ContactForm";
import "./ChatWidget.scss";

const NUDGE_DURATION_MS = 30_000;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [panelDismissed, setPanelDismissed] = useState(false);
  const [showNudge, setShowNudge] = useState(false);

  useEffect(() => {
    setPanelDismissed(sessionStorage.getItem("chat-panel-dismissed") === "1");
  }, []);

  useEffect(() => {
    if (open || panelDismissed) {
      setShowNudge(false);
      return;
    }

    setShowNudge(true);
    const timer = window.setTimeout(() => setShowNudge(false), NUDGE_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [open, panelDismissed]);

  function handleClosePanel() {
    setOpen(false);
    setPanelDismissed(true);
    setShowNudge(false);
    sessionStorage.setItem("chat-panel-dismissed", "1");
  }

  function handleOpen() {
    setOpen(true);
    setShowNudge(false);
  }

  return (
    <div className="chat-widget" aria-live="polite">
      {open && (
        <div
          className="chat-widget__panel"
          role="dialog"
          aria-label="Окно связи с психологом"
        >
          <header className="chat-widget__header">
            <div>
              <p className="chat-widget__title">Напишите нам</p>
              <p className="chat-widget__subtitle">Ответим в Telegram или WhatsApp</p>
            </div>
            <button
              type="button"
              className="chat-widget__close"
              onClick={handleClosePanel}
              aria-label="Закрыть окно"
            >
              ×
            </button>
          </header>

          <div className="chat-widget__links">
            <a
              href={siteConfig.contacts.telegram}
              className="chat-widget__link chat-widget__link_telegram"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram {siteConfig.contacts.telegramHandle}
            </a>
            <a
              href={siteConfig.contacts.whatsapp}
              className="chat-widget__link chat-widget__link_whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>

          <ContactForm defaultType="consultation" />
        </div>
      )}

      {!open && !panelDismissed && showNudge && (
        <button
          type="button"
          className="chat-widget__nudge"
          onClick={handleOpen}
          aria-label="Открыть окно связи с психологом"
        >
          Есть вопрос? Напишите нам
        </button>
      )}

      <button
        type="button"
        className="chat-widget__toggle"
        onClick={() => (open ? setOpen(false) : handleOpen())}
        aria-label={open ? "Свернуть чат" : "Открыть чат"}
        aria-expanded={open}
      >
        <span className="chat-widget__toggle-icon" aria-hidden="true">
          {open ? "↓" : "💬"}
        </span>
        <span className="chat-widget__toggle-label">Чат</span>
      </button>
    </div>
  );
}
