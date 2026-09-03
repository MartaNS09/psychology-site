"use client";

import { useEffect, useRef, useState } from "react";

const SCROLL_DELTA = 10;
const TOP_THRESHOLD = 24;

export function useAutoHideHeader(enabled: boolean, forceVisible: boolean) {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const visibleRef = useRef(true);
  const ticking = useRef(false);

  useEffect(() => {
    if (!enabled || forceVisible) {
      visibleRef.current = true;
      setVisible(true);
      return;
    }

    lastY.current = window.scrollY || 0;

    const apply = (next: boolean) => {
      if (visibleRef.current === next) return;
      visibleRef.current = next;
      setVisible(next);
    };

    const update = () => {
      ticking.current = false;
      const y = window.scrollY || document.documentElement.scrollTop || 0;

      if (y <= TOP_THRESHOLD) {
        apply(true);
        lastY.current = y;
        return;
      }

      const delta = y - lastY.current;
      if (delta > SCROLL_DELTA) apply(false);
      else if (delta < -SCROLL_DELTA) apply(true);

      lastY.current = y;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled, forceVisible]);

  return visible;
}
