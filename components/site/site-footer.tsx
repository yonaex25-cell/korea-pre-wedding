import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container-shell grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-md space-y-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Dasoni" width={40} height={40} className="rounded-lg" />
            <div>
              <span className="block font-semibold tracking-[0.14em]">DASONI</span>
              <span className="text-xs text-muted-foreground">Korea Wedding Photography Concierge</span>
            </div>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            Dasoni connects couples with curated Korean wedding photography studios, destination routes, and thoughtful concierge support.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold">Explore</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link className="hover:text-foreground" href="/studios">Studio List</Link></li>
            <li><Link className="hover:text-foreground" href="/ai-recommendation">AI Match</Link></li>
            <li><Link className="hover:text-foreground" href="/reviews">Reviews</Link></li>
            <li><Link className="hover:text-foreground" href="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold">Contact</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Mail className="size-4" aria-hidden /> yonaex25@gmail.com</li>
            <li className="flex items-center gap-2">
              <Instagram className="size-4" aria-hidden />
              <Link className="hover:text-foreground" href="https://www.instagram.com/dasoni_korea_wd" target="_blank" rel="noreferrer">@dasoni_korea_wd</Link>
            </li>
            <li className="flex items-center gap-2"><MapPin className="size-4" aria-hidden /> Seoul, Korea</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5">
        <div className="container-shell flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Dasoni. All rights reserved.</p>
          <p>Korea Wedding Photography Concierge.</p>
        </div>
      </div>
    </footer>
  );
}
