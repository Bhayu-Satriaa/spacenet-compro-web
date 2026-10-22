"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/types";

type AccordionProps = {
  items: FaqItem[];
};

export function Accordion({ items }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  function toggle(id: string) {
    setOpenIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => {
        const open = openIds.includes(item.id);
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={open}
                aria-controls={`faq-panel-${item.id}`}
                id={`faq-button-${item.id}`}
                className="flex w-full items-start justify-between gap-4 py-4 text-left"
              >
                <span className="text-base font-semibold not-italic text-ink">{item.question}</span>
                <ChevronDown
                  className={`mt-0.5 h-5 w-5 shrink-0 text-muted transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={`faq-panel-${item.id}`}
              role="region"
              aria-labelledby={`faq-button-${item.id}`}
              hidden={!open}
              className="pb-4"
            >
              <p className="measure text-sm leading-relaxed text-muted">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
