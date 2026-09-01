"use client";

import { useCallback, useEffect, useState } from "react";
import "./PwaInstallPrompt.scss";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const SESSION_KEY = "pwa-install-session";
const SHOW_DELAY_MS = 5 * 60 * 1000;

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

function shouldShowPrompt() {
  return !isStandalone() && !isHandledThisSession();
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
      setVisible(true);
    }, SHOW_DELAY_MS);

    const onBip = (e: Event) => {
      if (!shouldShowPrompt()) return;
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setIosHint(false);
      clearTimeout(timer);
    };

    window.addEventListener("beforeinstallprompt", onBip);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", onBip);
    };
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    markSessionHandled();
  }, []);

  const install = useCallback(async () => {
    markSessionHandled();
    if (deferred) {
      await deferred.prompt();
      const { outcome } = await deferred.userChoice;
      setDeferred(null);
      setVisible(false);
      if (outcome === "accepted") return;
    }
    setVisible(false);
  }, [deferred]);

  if (!visible) return null;

  const canNativeInstall = Boolean(deferred);

  return (
    <div className="pwa-install" role="presentation">
      <button
        type="button"
        className="pwa-install__backdrop"
        aria-label="Закрыть окно установки"
        onClick={dismiss}
      />
      <div className="pwa-install__dialog" role="dialog" aria-modal="true" aria-labelledby="pwa-title">
        <div className="pwa-install__icon" aria-hidden="true">
          📱
        </div>
        <h2 id="pwa-title" className="pwa-install__title">
          Установить приложение
        </h2>
        <p className="pwa-install__text">
          {iosHint
            ? "Добавьте сайт на главный экран: Safari → «Поделиться» → «На экран Домой»."
            : canNativeInstall
              ? "Быстрый доступ к записи, контактам и материалам — одним нажатием с телефона."
              : "В Chrome: меню (⋮) → «Установить приложение» или «Добавить на главный экран»."}
        </p>
        <div className="pwa-install__actions">
          <button type="button" className="button button_primary button_small pwa-install__btn" onClick={install}>
            <span className="button__label">Установить</span>
          </button>
          <button type="button" className="button button_secondary button_small pwa-install__btn" onClick={dismiss}>
            <span className="button__label">Не сейчас</span>
          </button>
        </div>
      </div>
    </div>
  );
}
