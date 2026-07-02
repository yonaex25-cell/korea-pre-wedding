import { HelpCircle } from "lucide-react";
import type { FAQ } from "@/lib/types";

type FaqListProps = {
  faqs: FAQ[];
};

export function FaqList({ faqs }: FaqListProps) {
  return (
    <div className="grid gap-4">
      {faqs.map((faq) => (
        <details key={faq.id} className="group rounded-lg border border-border bg-white p-5 shadow-soft">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold text-ink">
            <span className="flex items-start gap-3">
              <HelpCircle className="mt-0.5 size-5 text-gold-700" aria-hidden />
              {faq.question}
            </span>
            <span className="text-gold-700 transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-4 pl-8 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
