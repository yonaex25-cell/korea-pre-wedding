"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { FAQ } from "@/lib/types";
import { cn } from "@/lib/utils";

export function FAQAccordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState(items[0]?.id ?? "");

  return (
    <div className="divide-y rounded-lg border bg-white">
      {items.map((item) => (
        <div key={item.id}>
          <button
            type="button"
            className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold"
            onClick={() => setOpen(open === item.id ? "" : item.id)}
          >
            <span>{item.question}</span>
            <ChevronDown className={cn("h-4 w-4 shrink-0 transition", open === item.id && "rotate-180")} />
          </button>
          {open === item.id ? (
            <p className="px-5 pb-5 text-sm leading-6 text-muted-foreground">{item.answer}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
