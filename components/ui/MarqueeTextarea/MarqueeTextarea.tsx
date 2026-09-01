"use client";

import { useId, useState } from "react";
import "./MarqueeTextarea.scss";

const HINTS = [
  "Кратко опишите запрос — мы ответим в Telegram или WhatsApp",
  "Например: тревога, отношения, выгорание, курс МГИ…",
  "Можно написать удобное время для связи",
  "Первые 15 минут знакомства — бесплатно",
];

interface MarqueeTextareaProps {
  id: string;
  name: string;
  rows?: number;
  required?: boolean;
  label: string;
}

export function MarqueeTextarea({
  id,
  name,
  rows = 4,
  required,
  label,
}: MarqueeTextareaProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const hintId = useId();
  const showMarquee = !focused && value.length === 0;

  return (
    <div className="marquee-textarea">
      <label htmlFor={id}>{label}</label>
      <div className="marquee-textarea__wrap">
        {showMarquee && (
          <div className="marquee-textarea__track" aria-hidden="true">
            <span className="marquee-textarea__text">
              {HINTS.join(" · ")} · {HINTS.join(" · ")}
            </span>
          </div>
        )}
        <textarea
          id={id}
          name={name}
          rows={rows}
          required={required}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-describedby={hintId}
          className="marquee-textarea__input"
        />
      </div>
      <span id={hintId} className="visually-hidden">
        {HINTS[0]}
      </span>
    </div>
  );
}
