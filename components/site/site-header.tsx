"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Globe2, Menu, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>("JP");

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!languageMenuRef.current?.contains(event.target as Node)) {
        setLanguageOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  if (pathname.startsWith("/admin")) {
    return null;
  }

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
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-6 sm:px-8 lg:px-10">
        <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setMobileOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff385c] text-sm font-bold text-white">
            D
          </span>
          <span className="truncate text-sm font-semibold tracking-[0.16em] text-neutral-950">
            DASONI
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                "whitespace-nowrap text-sm font-medium transition hover:text-neutral-950 " +
                (isActive(item.href) ? "text-neutral-950" : "text-neutral-500")
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <div ref={languageMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setLanguageOpen((value) => !value)}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 text-sm font-semibold text-neutral-950 shadow-sm transition hover:bg-neutral-50"
              aria-haspopup="menu"
              aria-expanded={languageOpen}
            >
              <Globe2 className="h-4 w-4" aria-hidden />
              {language}
              <ChevronDown className={"h-4 w-4 transition " + (languageOpen ? "rotate-180" : "")} aria-hidden />
            </button>

            {languageOpen ? (
              <div className="absolute right-0 top-12 z-50 w-40 overflow-hidden rounded-xl border border-neutral-200 bg-white p-1 shadow-lg" role="menu">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => selectLanguage(item.code)}
                    className={
                      "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition hover:bg-rose-50 " +
                      (language === item.code ? "font-semibold text-[#ff385c]" : "text-neutral-800")
                    }
                    role="menuitem"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs">{item.code}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <Link
            href="/reservation"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#ff385c] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e03150]"
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            Consultation
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-neutral-950 transition hover:bg-neutral-100 lg:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-neutral-200 bg-white shadow-lg lg:hidden">
          <nav className="mx-auto grid w-full max-w-7xl gap-2 px-6 py-4 sm:px-8" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={
                  "rounded-lg px-3 py-3 text-sm font-medium transition hover:bg-rose-50 hover:text-neutral-950 " +
                  (isActive(item.href) ? "bg-rose-50 text-neutral-950" : "text-neutral-600")
                }
              >
                {item.label}
              </Link>
            ))}

            <div className="grid gap-2 rounded-xl border border-neutral-200 bg-neutral-50 p-3">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                <Globe2 className="h-4 w-4" aria-hidden />
                Language
              </p>

              <div className="grid grid-cols-3 gap-2">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => selectLanguage(item.code)}
                    className={
                      "rounded-lg border px-3 py-2 text-sm font-semibold transition hover:bg-white " +
                      (language === item.code
                        ? "border-[#ff385c] bg-white text-[#ff385c]"
                        : "border-neutral-200 bg-white text-neutral-600")
                    }
                  >
                    {item.code}
                  </button>
                ))}
              </div>

              <div className="grid gap-1 text-xs text-neutral-500">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => selectLanguage(item.code)}
                    className="text-left hover:text-neutral-950"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <Link
              href="/reservation"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg bg-[#ff385c] px-3 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#e03150]"
            >
              Consultation
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}