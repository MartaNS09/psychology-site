"use client";

import { useEffect, useRef, useState } from "react";

const SCROLL_DELTA = 8;
const TOP_THRESHOLD = 32;
const IDLE_MS = 1200;

export function useAutoHideHeader(enabled: boolean, forceVisible: boolean) {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const idleTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      setVisible(true);
      return;
    }

    if (forceVisible) {
      setVisible(true);
      return;
    }

    lastY.current = window.scrollY;

    const scheduleShow = () => {
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => setVisible(true), IDLE_MS);
    };

    const onScroll = () => {
      const y = window.scrollY;

      if (y <= TOP_THRESHOLD) {
        setVisible(true);
        lastY.current = y;
        scheduleShow();
        return;
      }

      const delta = y - lastY.current;
      if (delta > SCROLL_DELTA) setVisible(false);
      else if (delta < -SCROLL_DELTA) setVisible(true);

      lastY.current = y;
      scheduleShow();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    };
  }, [enabled, forceVisible]);

  return visible;
}
