import Link from "next/link";
import { LocalizedText } from "@/components/site/localized-text";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="container-shell flex min-h-screen items-center justify-center py-20">
      <div className="max-w-lg space-y-5 text-center">
        <p className="eyebrow">404</p>
        <h1 className="text-4xl font-semibold text-ink"><LocalizedText path="systemPages.notFoundTitle" fallback="Page not found" /></h1>
        <p className="leading-7 text-muted-foreground"><LocalizedText path="systemPages.notFoundDescription" fallback="Check the URL or browse the studio list." /></p>
        <Button asChild><Link href="/studios"><LocalizedText path="systemPages.viewStudios" fallback="View studios" /></Link></Button>
      </div>
    </main>
  );
}
