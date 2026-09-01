"use client";

import { useSyncExternalStore } from "react";

function subscribe(query: string, cb: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** Совпадает на сервере и при первом клиентском рендере (mobile-first). */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (cb) => subscribe(query, cb),
    () => window.matchMedia(query).matches,
    () => serverValue
  );
}
