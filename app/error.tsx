"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="section-shell flex min-h-[55vh] items-center justify-center">
      <div className="max-w-lg rounded-lg border bg-card p-8 text-center shadow-luxury">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Something went wrong</p>
        <h1 className="mt-3 text-3xl font-semibold">We could not load this experience.</h1>
        <p className="mt-4 text-sm text-muted-foreground">{error.message}</p>
        <Button className="mt-6" onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
}
