"use client";

import { useLanguage, type LanguageCode } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/site/section-heading";

const reservationPageCopy: Record<LanguageCode, {
  eyebrow: string;
  title: string;
  description: string;
  contactTitle: string;
  contactItems: Array<{ title: string; lines: string[] }>;
}> = {
  KR: {
    eyebrow: "상담 신청",
    title: "상담 신청",
    description: "다소니는 일본 고객님의 한국 웨딩 촬영을 처음부터 끝까지 함께합니다. 아래 폼을 작성하시거나 원하시는 방법으로 편하게 연락 주세요.",
    contactTitle: "연락 방법",
    contactItems: [
      { title: "LINE", lines: ["LINE ID", "ngyn9813"] },
      { title: "Instagram", lines: ["아이디 : dasoni_korea_wd"] },
      { title: "Email", lines: ["yonaex25@gmail.com"] },
      { title: "운영시간", lines: ["Open 10:00 - 19:00", "Break 12:00 - 13:00 (KST)"] }
    ]
  },
  EN: {
    eyebrow: "Consultation",
    title: "Request a Consultation",
    description: "Dasoni supports Japanese clients through every step of Korean wedding photography. Fill out the form below or contact us in whichever way feels easiest.",
    contactTitle: "Contact Methods",
    contactItems: [
      { title: "LINE", lines: ["LINE ID", "ngyn9813"] },
      { title: "Instagram", lines: ["ID: dasoni_korea_wd"] },
      { title: "Email", lines: ["yonaex25@gmail.com"] },
      { title: "Hours", lines: ["Open 10:00 - 19:00", "Break 12:00 - 13:00 (KST)"] }
    ]
  },
  JP: {
    eyebrow: "相談申請",
    title: "相談申請",
    description: "Dasoniは、日本のお客様の韓国ウェディング撮影を最初から最後までサポートします。下のフォーム、またはご希望の方法でお気軽にご連絡ください。",
    contactTitle: "連絡方法",
    contactItems: [
      { title: "LINE", lines: ["LINE ID", "ngyn9813"] },
      { title: "Instagram", lines: ["ID：dasoni_korea_wd"] },
      { title: "Email", lines: ["yonaex25@gmail.com"] },
      { title: "営業時間", lines: ["Open 10:00 - 19:00", "Break 12:00 - 13:00 (KST)"] }
    ]
  }
};

export function ReservationHeroCopy() {
  const { language } = useLanguage();
  const copy = reservationPageCopy[language];

  return (
    <SectionHeading
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
    />
  );
}

export function ReservationContactMethods() {
  const { language } = useLanguage();
  const copy = reservationPageCopy[language];

  return (
    <section className="grid h-full gap-5 rounded-lg border border-border bg-white p-5 shadow-soft">
      <h2 className="text-xl font-semibold text-foreground">{copy.contactTitle}</h2>
      <div className="space-y-5">
        {copy.contactItems.map((item) => (
          <div key={item.title} className="space-y-2 border-b border-border pb-5 last:border-b-0 last:pb-0">
            <h3 className="font-semibold text-ink">{item.title}</h3>
            <div className="space-y-1 text-sm font-medium leading-7 text-muted-foreground md:text-base">
              {item.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
