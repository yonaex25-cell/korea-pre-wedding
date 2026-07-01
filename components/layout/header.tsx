"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import { isAdminEmail } from "@/lib/admin";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/studios", label: "Studios" },
  { href: "/ai-recommendation", label: "AI Match" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [showAdminButton, setShowAdminButton] = useState(false);

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      setShowAdminButton(false);
      return;
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
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
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/88 backdrop-blur-xl">
      <div className="container-shell flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Korea Pre Wedding home">
          <Image src="/logo.svg" alt="Korea Pre Wedding" width={36} height={36} className="rounded-lg" priority />
          <span className="text-sm font-semibold tracking-[0.16em] text-ink">KOREA PRE WEDDING</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-muted-foreground transition hover:text-foreground",
                pathname === item.href && "text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {showAdminButton ? (
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/dashboard">Admin</Link>
            </Button>
          ) : null}

          <Button asChild size="sm">
            <Link href="/reservation">
              <Sparkles aria-hidden /> Reserve
            </Link>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Open menu"
        >
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

            <Link
              href="/reservation"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground"
            >
              予約相談
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
