"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { t } = useLanguage();

  return (
    <main className="container-shell flex min-h-screen items-center justify-center py-20">
      <div className="max-w-lg space-y-5 text-center">
        <p className="eyebrow">{t.systemPages.errorEyebrow}</p>
        <h1 className="text-4xl font-semibold text-ink">{t.systemPages.errorTitle}</h1>
        <p className="leading-7 text-muted-foreground">{t.systemPages.errorDescription}</p>
        <Button onClick={() => reset()}>{t.systemPages.reload}</Button>
      </div>
    </main>
  );
}
