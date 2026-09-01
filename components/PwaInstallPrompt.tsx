"use client";

import { useCallback, useEffect, useState } from "react";
import "./PwaInstallPrompt.scss";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const SESSION_KEY = "pwa-install-session";
const DISMISS_KEY = "pwa-install-dismissed-until";
const DISMISS_DAYS = 14;
const SHOW_DELAY_MS = 8000;

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator &&
      (navigator as Navigator & { standalone?: boolean }).standalone)
  );
}

function isIos() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isDismissedLongTerm() {
  try {
    const until = localStorage.getItem(DISMISS_KEY);
    if (!until) return false;
    return Date.now() < Number(until);
  } catch {
    return false;
  }
}

function isHandledThisSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function markSessionHandled() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* ignore */
  }
}

function markDismissedLongTerm() {
  try {
    const until = Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000;
    localStorage.setItem(DISMISS_KEY, String(until));
    markSessionHandled();
  } catch {
    /* ignore */
  }
}

function shouldShowPrompt() {
  return !isStandalone() && !isDismissedLongTerm() && !isHandledThisSession();
}

export function PwaInstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [iosHint, setIosHint] = useState(false);

  useEffect(() => {
    if (!shouldShowPrompt()) return;

    const timer = window.setTimeout(() => {
      if (!shouldShowPrompt()) return;
      if (isIos()) setIosHint(true);
      markSessionHandled();
      setVisible(true);
    }, SHOW_DELAY_MS);

    const onBip = (e: Event) => {
      if (!shouldShowPrompt()) return;
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setIosHint(false);
      markSessionHandled();
      setVisible(true);
      window.clearTimeout(timer);
    };

    window.addEventListener("beforeinstallprompt", onBip);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", onBip);
    };
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    markDismissedLongTerm();
  }, []);

  const install = useCallback(async () => {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    setDeferred(null);
    setVisible(false);
    markDismissedLongTerm();
    if (outcome === "accepted") {
      /* установлено — больше не показываем */
    }
  }, [deferred]);

  if (!visible) return null;

  return (
    <div className="pwa-install" role="dialog" aria-label="Установить приложение">
      <div className="pwa-install__card">
        <button
          type="button"
          className="pwa-install__close"
          onClick={dismiss}
          aria-label="Закрыть"
        >
          ×
        </button>
        <p className="pwa-install__title">Установить приложение</p>
        <p className="pwa-install__text">
          {iosHint
            ? "Safari → «Поделиться» → «На экран Домой»."
            : deferred
              ? "Быстрый доступ к записи и контактам — одним нажатием."
              : "Chrome → меню (⋮) → «Установить приложение»."}
        </p>
        <div className="pwa-install__actions">
          {deferred && (
            <button type="button" className="button button_primary button_small" onClick={install}>
              <span className="button__label">Установить</span>
            </button>
          )}
          <button type="button" className="pwa-install__dismiss" onClick={dismiss}>
            Не сейчас
          </button>
        </div>
      </div>
    </div>
  );
}
