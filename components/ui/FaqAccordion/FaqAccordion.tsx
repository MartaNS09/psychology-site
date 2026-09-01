"use client";

import { useId, useState } from "react";
import { cn } from "@/utils";
import "./FaqAccordion.scss";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: readonly FaqItem[];
  className?: string;
}

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className={cn("faq-accordion", className)} role="presentation">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `${baseId}-${item.id}`;

        return (
          <div key={item.id} className="faq-accordion__item">
            <h3 className="faq-accordion__heading">
              <button
                type="button"
                className={cn(
                  "faq-accordion__trigger",
                  isOpen && "faq-accordion__trigger_open"
                )}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <span className="faq-accordion__question">{item.question}</span>
                <span className="faq-accordion__icon" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={panelId}
              className={cn(
                "faq-accordion__panel",
                isOpen && "faq-accordion__panel_open"
              )}
              hidden={!isOpen}
            >
              <p className="faq-accordion__answer">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
