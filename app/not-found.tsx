import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="section-shell flex min-h-[60vh] items-center justify-center">
      <div className="max-w-xl text-center">
        <p className="text-sm uppercase tracking-[0.22em] text-primary">404</p>
        <h1 className="mt-3 text-4xl font-semibold">This page has left the itinerary.</h1>
        <p className="mt-4 text-muted-foreground">
          Return to the studio collection and continue planning a polished Korea pre-wedding shoot.
        </p>
        <Button asChild className="mt-7">
          <Link href="/studios">Browse studios</Link>
        </Button>
      </div>
    </div>
  );
}
