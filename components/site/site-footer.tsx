"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Mail, MapPin, X } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { legalContent, type LegalModalType } from "@/lib/legal-content";

export function SiteFooter() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [activeLegalModal, setActiveLegalModal] = useState<LegalModalType | null>(null);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const modalContent = activeLegalModal ? legalContent[activeLegalModal] : null;

  return (
    <footer className="border-t border-border bg-white">
      <div className="container-shell grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-md space-y-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Dasoni" width={40} height={40} className="rounded-lg" />
            <div>
              <span className="block font-semibold tracking-[0.14em]">DASONI</span>
              <span className="text-xs text-muted-foreground">{t.footer.subtitle}</span>
            </div>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">{t.footer.description}</p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold">{t.footer.explore}</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link className="hover:text-foreground" href="/studios">{t.footer.studioList}</Link></li>
            <li><Link className="hover:text-foreground" href="/ai-recommendation">{t.nav.aiMatch}</Link></li>
            <li><Link className="hover:text-foreground" href="/reviews">{t.nav.reviews}</Link></li>
            <li><Link className="hover:text-foreground" href="/faq">{t.nav.faq}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold">{t.footer.contact}</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Mail className="size-4" aria-hidden /> yonaex25@gmail.com</li>
            <li className="flex items-center gap-2">
              <Instagram className="size-4" aria-hidden />
              <Link className="hover:text-foreground" href="https://www.instagram.com/dasoni_korea_wd" target="_blank" rel="noreferrer">@dasoni_korea_wd</Link>
            </li>
            <li className="flex items-center gap-2"><MapPin className="size-4" aria-hidden /> {t.footer.location}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5">
        <div className="container-shell space-y-3 text-center text-xs leading-6 text-muted-foreground">
          <p>
            다소니  |  서울특별시 용산구 서빙고로 17 센트럴파크타워 23  |  사업자번호 : 534-30-01853  |  통신판매업신고 : 2026-서울용산-0505  |  남궁유나  |  E-MAIL : yonaex25@gmail.com
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <button type="button" className="font-medium text-foreground underline underline-offset-4 transition hover:text-primary" onClick={() => setActiveLegalModal("terms")}>
              이용약관
            </button>
            <button type="button" className="font-medium text-foreground underline underline-offset-4 transition hover:text-primary" onClick={() => setActiveLegalModal("privacy")}>
              개인정보처리방침
            </button>
          </div>
        </div>
      </div>

      {modalContent ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 px-4 py-6" role="dialog" aria-modal="true" aria-labelledby="legal-modal-title">
          <div className="relative flex max-h-[86vh] w-full max-w-2xl flex-col rounded-lg bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 id="legal-modal-title" className="text-lg font-semibold text-foreground">{modalContent.title}</h2>
              <button type="button" className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground" onClick={() => setActiveLegalModal(null)} aria-label="닫기">
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <div className="overflow-y-auto whitespace-pre-line px-5 py-5 text-sm leading-7 text-muted-foreground">
              {modalContent.body}
            </div>
          </div>
        </div>
      ) : null}
    </footer>
  );
}