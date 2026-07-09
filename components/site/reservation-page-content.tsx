"use client";

import { Clock3, Instagram, Mail } from "lucide-react";
import { useLanguage, type LanguageCode } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/site/section-heading";
import type { ComponentType, SVGProps } from "react";

const reservationPageCopy: Record<LanguageCode, {
  eyebrow: string;
  title: string;
  description: string;
  contactTitle: string;
  contactDescription: string;
  contactNote: string;
  contactItems: Array<{ icon: "line" | "instagram" | "email" | "hours"; title: string; description?: string; lines: string[]; highlight?: string }>;
}> = {
  KR: {
    eyebrow: "상담 신청",
    title: "상담 신청",
    description: "다소니는 일본 고객님의 한국 웨딩 촬영을 처음부터 끝까지 함께합니다. 아래 폼을 작성하시거나 원하시는 방법으로 편하게 연락 주세요.",
    contactTitle: "연락 방법",
    contactDescription: "원하시는 방법으로 편하게 문의 주세요.",
    contactNote: "순차적으로 답변드리고 있으며, 문의량에 따라 답변이 다소 지연될 수 있습니다.",
    contactItems: [
      { icon: "line", title: "LINE", description: "빠른 상담을 원하시면 LINE으로 연락 주세요.", lines: ["LINE ID"], highlight: "ngyn9813" },
      { icon: "instagram", title: "Instagram", description: "촬영 후기와 다양한 소식을 인스타그램에서 확인해보세요.", lines: ["아이디 : dasoni_korea_wd"] },
      { icon: "email", title: "Email", description: "이메일로 문의하시면 순차적으로 답변드리겠습니다.", lines: ["yonaex25@gmail.com"] },
      { icon: "hours", title: "운영시간", lines: ["Open 10:00 - 19:00", "Break 12:00 - 13:00 (KST)"] }
    ]
  },
  EN: {
    eyebrow: "Consultation",
    title: "Request a Consultation",
    description: "Dasoni supports Japanese clients through every step of Korean wedding photography. Fill out the form below or contact us in whichever way feels easiest.",
    contactTitle: "Contact Methods",
    contactDescription: "Contact us in whichever way feels easiest for you.",
    contactNote: "We reply in order, and responses may be slightly delayed depending on inquiry volume.",
    contactItems: [
      { icon: "line", title: "LINE", description: "For a faster consultation, please contact us on LINE.", lines: ["LINE ID"], highlight: "ngyn9813" },
      { icon: "instagram", title: "Instagram", description: "Check Instagram for shoot reviews and Dasoni updates.", lines: ["ID: dasoni_korea_wd"] },
      { icon: "email", title: "Email", description: "Email inquiries are answered in the order received.", lines: ["yonaex25@gmail.com"] },
      { icon: "hours", title: "Hours", lines: ["Open 10:00 - 19:00", "Break 12:00 - 13:00 (KST)"] }
    ]
  },
  JP: {
    eyebrow: "相談申請",
    title: "相談申請",
    description: "Dasoniは、日本のお客様の韓国ウェディング撮影を最初から最後までサポートします。下のフォーム、またはご希望の方法でお気軽にご連絡ください。",
    contactTitle: "連絡方法",
    contactDescription: "ご希望の方法でお気軽にお問い合わせください。",
    contactNote: "順番に返信しております。お問い合わせ状況により、返信まで少しお時間をいただく場合があります。",
    contactItems: [
      { icon: "line", title: "LINE", description: "お急ぎのご相談はLINEでご連絡ください。", lines: ["LINE ID"], highlight: "ngyn9813" },
      { icon: "instagram", title: "Instagram", description: "撮影レビューや最新情報はInstagramでご確認いただけます。", lines: ["ID：dasoni_korea_wd"] },
      { icon: "email", title: "Email", description: "メールでのお問い合わせには順番に返信いたします。", lines: ["yonaex25@gmail.com"] },
      { icon: "hours", title: "営業時間", lines: ["Open 10:00 - 19:00", "Break 12:00 - 13:00 (KST)"] }
    ]
  }
};

type IconProps = SVGProps<SVGSVGElement>;

const contactIcons: Record<"instagram" | "email" | "hours", ComponentType<IconProps>> = {
  instagram: Instagram,
  email: Mail,
  hours: Clock3
};

function ContactIcon({ type }: { type: "line" | "instagram" | "email" | "hours" }) {
  if (type === "line") {
    return (
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-white text-[11px] font-bold tracking-[0.02em] text-[#06c755]">
        LINE
      </span>
    );
  }

  const Icon = contactIcons[type];
  const tone = type === "instagram" ? "text-[#e1306c]" : "text-primary";

  return (
    <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-white">
      <Icon className={`size-6 ${tone}`} aria-hidden />
    </span>
  );
}

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
    <section className="h-full rounded-lg border border-border bg-white p-5 shadow-soft">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">{copy.contactTitle}</h2>
        <p className="text-sm leading-6 text-muted-foreground">{copy.contactDescription}</p>
      </div>
      <div className="mt-5 divide-y divide-border">
        {copy.contactItems.map((item) => (
          <div key={item.title} className="flex gap-4 py-6 first:pt-0 last:pb-0">
            <ContactIcon type={item.icon} />
            <div className="min-w-0 space-y-2">
              <h3 className="font-semibold text-ink">{item.title}</h3>
              <div className="space-y-1 text-sm font-medium leading-7 text-muted-foreground md:text-base">
                {item.description ? <p>{item.description}</p> : null}
                {item.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                {item.highlight ? <p className="font-semibold text-primary">{item.highlight}</p> : null}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-lg bg-muted p-4 text-sm leading-6 text-muted-foreground">
        {copy.contactNote}
      </div>
    </section>
  );
}
