"use client";

import { useEffect, useState } from "react";

export function AriaLiveWelcome() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("Добро пожаловать на сайт");
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="aria-live-welcome"
    >
      {message}
    </div>
  );
}
