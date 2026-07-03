"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { isAdminEmail } from "@/lib/admin";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/studios", label: "Studios" },
  { href: "/ai-recommendation", label: "AI Match" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [showAdminButton, setShowAdminButton] = useState(false);

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();

    if (!supabase) {
      setShowAdminButton(false);
      return;
    }

    let isMounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (isMounted) {
        setShowAdminButton(isAdminEmail(data.user?.email));
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setShowAdminButton(isAdminEmail(session?.user.email));
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full overflow-x-hidden border-b border-border/70 bg-background/88 backdrop-blur-xl">
      <div className="container-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Dasoni home">
          <Image src="/logo.svg" alt="Dasoni" width={36} height={36} className="rounded-lg" priority />
          <span className="truncate text-sm font-semibold tracking-[0.16em] text-ink">DASONI</span>
        </Link>

        <nav className="hidden min-w-0 items-center gap-7 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "whitespace-nowrap text-sm font-medium text-muted-foreground transition hover:text-foreground",
                pathname === item.href && "text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          {showAdminButton ? (
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/dashboard">Admin</Link>
            </Button>
          ) : null}
          <Button asChild size="sm">
            <Link href="/reservation"><Sparkles aria-hidden /> Consultation</Link>
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="shrink-0 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Open menu">
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </Button>
      </div>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-shell grid gap-2 py-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            {showAdminButton ? (
              <Link href="/admin/dashboard" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-secondary">
                Admin
              </Link>
            ) : null}
            <Link href="/reservation" onClick={() => setOpen(false)} className="rounded-lg bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground">
              Consultation
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}