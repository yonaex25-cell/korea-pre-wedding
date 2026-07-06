"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, ChevronDown, Globe2, Menu, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { isAdminEmail } from "@/lib/admin";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Studios" },
  { href: "/ai-recommendation", label: "AI Match" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

const languages = [
  { code: "KR", label: "한국어" },
  { code: "JP", label: "日本語" },
  { code: "EN", label: "English" }
] as const;

type LanguageCode = (typeof languages)[number]["code"];

export function SiteHeader() {
  const pathname = usePathname();
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>("JP");
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

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!languageMenuRef.current?.contains(event.target as Node)) {
        setLanguageOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(href + "/");
  }

  function selectLanguage(nextLanguage: LanguageCode) {
    setLanguage(nextLanguage);
    setLanguageOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-white/95 shadow-[0_10px_30px_rgba(17,17,17,0.05)] backdrop-blur-xl">
      <div className="container-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Dasoni home" onClick={() => setOpen(false)}>
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
                isActive(item.href) && "text-foreground"
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

          <div ref={languageMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setLanguageOpen((value) => !value)}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-white px-3 text-sm font-semibold text-ink shadow-sm transition hover:bg-secondary"
              aria-haspopup="menu"
              aria-expanded={languageOpen}
            >
              <Globe2 className="size-4" aria-hidden />
              {language}
              <ChevronDown className={cn("size-4 transition", languageOpen && "rotate-180")} aria-hidden />
            </button>

            {languageOpen ? (
              <div className="absolute right-0 top-12 z-50 w-40 overflow-hidden rounded-lg border border-border bg-white p-1 shadow-soft" role="menu">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => selectLanguage(item.code)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-ink transition hover:bg-secondary"
                    role="menuitem"
                  >
                    <span>{item.label}</span>
                    {language === item.code ? <Check className="size-4 text-primary" aria-hidden /> : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <Button asChild size="sm">
            <Link href="/reservation"><Sparkles aria-hidden /> Consultation</Link>
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="shrink-0 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Open menu">
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </Button>
      </div>

      {open ? (
        <div className="border-t border-border bg-white shadow-soft lg:hidden">
          <nav className="container-shell grid gap-2 py-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground",
                  isActive(item.href) && "bg-secondary text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}

            {showAdminButton ? (
              <Link href="/admin/dashboard" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
                Admin
              </Link>
            ) : null}

            <div className="grid gap-2 rounded-lg border border-border bg-background p-3">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <Globe2 className="size-4" aria-hidden /> Language
              </p>
              <div className="grid grid-cols-3 gap-2">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => selectLanguage(item.code)}
                    className={cn(
                      "rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground",
                      language === item.code && "border-primary bg-secondary text-foreground"
                    )}
                  >
                    {item.code}
                  </button>
                ))}
              </div>
              <div className="grid gap-1 text-xs text-muted-foreground">
                {languages.map((item) => (
                  <button key={item.code} type="button" onClick={() => selectLanguage(item.code)} className="text-left hover:text-foreground">
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <Link href="/reservation" onClick={() => setOpen(false)} className="rounded-lg bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground">
              Consultation
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}