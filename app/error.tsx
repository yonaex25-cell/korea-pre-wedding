"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="container-shell flex min-h-screen items-center justify-center py-20">
      <div className="max-w-lg space-y-5 text-center">
        <p className="eyebrow">Error</p>
        <h1 className="text-4xl font-semibold text-ink">We could not load this page</h1>
        <p className="leading-7 text-muted-foreground">Please try again in a moment.</p>
        <Button onClick={() => reset()}>Reload</Button>
      </div>
    </main>
  );
}
