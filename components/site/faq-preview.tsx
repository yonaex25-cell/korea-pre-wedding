"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { FaqList } from "@/components/site/faq-list";
import { SectionHeading } from "@/components/site/section-heading";
import type { FAQ } from "@/lib/types";

type FaqPreviewProps = {
  faqs: FAQ[];
};

export function FaqPreview({ faqs }: FaqPreviewProps) {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-20">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <SectionHeading eyebrow={t.home.faqEyebrow} title={t.home.faqTitle} description={t.home.faqDescription} />
          <Button asChild variant="outline"><Link href="/faq">{t.home.faqCta}</Link></Button>
        </div>
        <FaqList faqs={faqs.slice(0, 4)} />
      </div>
    </section>
  );
}
