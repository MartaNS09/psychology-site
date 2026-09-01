"use client";

import { useEffect, type RefObject } from "react";

function isIosDevice() {
  if (typeof navigator === "undefined") return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

export function useIosFixedHeader(
  headerRef: RefObject<HTMLElement | null>,
  anchorRef: RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    if (!isIosDevice()) return;

    document.documentElement.classList.add("is-ios");

    const header = headerRef.current;
    const anchor = anchorRef.current;
    if (!header || !anchor) return;

    const sync = () => {
      anchor.style.height = `${header.getBoundingClientRect().height}px`;
    };

    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(header);
    window.addEventListener("orientationchange", sync);

    return () => {
      observer.disconnect();
      window.removeEventListener("orientationchange", sync);
    };
  }, [headerRef, anchorRef]);
}
