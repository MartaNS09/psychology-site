"use client";

import { useEffect, useRef } from "react";

const SCROLL_DELTA = 14;
const TOP_THRESHOLD = 16;
const MIN_TOGGLE_MS = 280;

/**
 * Управляет классом html.header-is-hidden без React setState —
 * иначе при скролле вверх Header перерисовывается и секции лагают.
 */
export function useAutoHideHeader(enabled: boolean, forceVisible: boolean) {
  const lastY = useRef(0);
  const hiddenRef = useRef(false);
  const ticking = useRef(false);
  const lastToggle = useRef(0);

  useEffect(() => {
    const root = document.documentElement;

    const setHidden = (hidden: boolean) => {
      if (hiddenRef.current === hidden) return;
      const now = performance.now();
      if (now - lastToggle.current < MIN_TOGGLE_MS && hidden) return;

      lastToggle.current = now;
      hiddenRef.current = hidden;
      root.classList.toggle("header-is-hidden", hidden);
    };

    if (!enabled || forceVisible) {
      setHidden(false);
      return;
    }

    lastY.current = window.scrollY || 0;

    const update = () => {
      ticking.current = false;
      const y = window.scrollY || document.documentElement.scrollTop || 0;

      if (y <= TOP_THRESHOLD) {
        setHidden(false);
        lastY.current = y;
        return;
      }

      const delta = y - lastY.current;
      if (Math.abs(delta) < SCROLL_DELTA) return;

      setHidden(delta > 0);
      lastY.current = y;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      root.classList.remove("header-is-hidden");
      hiddenRef.current = false;
    };
  }, [enabled, forceVisible]);
}
