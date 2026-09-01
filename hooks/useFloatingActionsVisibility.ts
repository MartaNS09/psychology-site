"use client";

import { useEffect, useRef, useState } from "react";

const SCROLL_DELTA = 10;
const IDLE_MS = 1400;

export function useFloatingActionsVisibility(forceVisible = false) {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const idleTimer = useRef<number | null>(null);

  useEffect(() => {
    if (forceVisible) {
      setVisible(true);
      return;
    }

    lastY.current = window.scrollY;

    const showAfterIdle = () => {
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => setVisible(true), IDLE_MS);
    };

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (delta > SCROLL_DELTA) setVisible(false);
      else if (delta < -SCROLL_DELTA) setVisible(true);

      lastY.current = y;
      showAfterIdle();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    };
  }, [forceVisible]);

  return forceVisible || visible;
}
