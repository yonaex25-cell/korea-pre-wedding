import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AiCta() {
  return (
    <section className="bg-champagne py-20">
      <div className="container-shell grid items-center gap-8 lg:grid-cols-[1fr_auto]">
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow">AI Match</p>
          <h2 className="text-3xl font-semibold leading-tight text-ink md:text-5xl">Find studios that match your destination, style, and budget.</h2>
          <p className="text-base leading-8 text-muted-foreground">
            Select your preferences and Dasoni will narrow the list to studios that actually fit your criteria.
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/ai-recommendation"><Sparkles aria-hidden /> Start matching</Link>
        </Button>
      </div>
    </section>
  );
}
