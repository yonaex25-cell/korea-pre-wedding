import Link from "next/link";
import { Instagram, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-white">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <h2 className="text-xl font-semibold">Korea Pre Wedding</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            Premium Korean wedding studio curation for Japanese couples, from AI matching to reservation support.
          </p>
          <div className="mt-5 flex gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> Seoul, Jeju, Busan</span>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Plan</h3>
          <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
            <Link href="/studios">Studio list</Link>
            <Link href="/ai-recommendation">AI recommendation</Link>
            <Link href="/reservation">Reservation</Link>
            <Link href="/faq">FAQ</Link>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Contact</h3>
          <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
            <a className="inline-flex items-center gap-2" href="mailto:yonaex25@gmail.com">
              <Mail className="h-4 w-4" /> yonaex25@gmail.com
            </a>
            <span className="inline-flex items-center gap-2"><Instagram className="h-4 w-4" /> @koreaprewedding</span>
          </div>
        </div>
      </div>
      <div className="border-t py-5 text-center text-xs text-muted-foreground">
        (c) 2026 Korea Pre Wedding. Curated in Korea for Japan.
      </div>
    </footer>
  );
}
