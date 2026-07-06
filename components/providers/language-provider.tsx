"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type LanguageCode = "KR" | "JP" | "EN";

const STORAGE_KEY = "dasoni-language";

export const languages = [
  { code: "KR", label: "한국어" },
  { code: "JP", label: "日本語" },
  { code: "EN", label: "English" }
] as const;

export const dictionary = {
  KR: {
    nav: {
      home: "홈",
      studios: "스튜디오",
      aiMatch: "AI 매칭",
      reviews: "후기",
      faq: "FAQ",
      contact: "문의",
      consultation: "상담 신청",
      language: "언어"
    },
    hero: {
      eyebrow: "한국 웨딩 포토그래피 컨시어지",
      title: "Dasoni",
      description:
        "서울, 제주, 부산에서 가장 잘 맞는 한국 웨딩 촬영 스튜디오와 촬영 동선, 예약 상담을 도와드리는 프리미엄 컨시어지 서비스입니다.",
      primaryCta: "스튜디오 보기",
      secondaryCta: "상담 신청",
      studioMatching: "스튜디오 매칭",
      destinationPlanning: "촬영지 플래닝",
      conciergeSupport: "컨시어지 지원"
    }
  },
  JP: {
    nav: {
      home: "ホーム",
      studios: "スタジオ",
      aiMatch: "AIマッチ",
      reviews: "レビュー",
      faq: "FAQ",
      contact: "お問い合わせ",
      consultation: "相談予約",
      language: "言語"
    },
    hero: {
      eyebrow: "韓国ウェディングフォト コンシェルジュ",
      title: "Dasoni",
      description:
        "ソウル、済州、釜山で理想に合う韓国ウェディングフォトスタジオ、撮影ルート、予約相談まで丁寧にサポートします。",
      primaryCta: "スタジオを見る",
      secondaryCta: "相談する",
      studioMatching: "スタジオ提案",
      destinationPlanning: "撮影地プランニング",
      conciergeSupport: "コンシェルジュサポート"
    }
  },
  EN: {
    nav: {
      home: "Home",
      studios: "Studios",
      aiMatch: "AI Match",
      reviews: "Reviews",
      faq: "FAQ",
      contact: "Contact",
      consultation: "Consultation",
      language: "Language"
    },
    hero: {
      eyebrow: "Korea Wedding Photography Concierge",
      title: "Dasoni",
      description:
        "Curated Korean wedding photography studios, destination routes, and concierge support for couples who want a smooth, beautiful experience in Seoul, Jeju, or Busan.",
      primaryCta: "Explore studios",
      secondaryCta: "Request consultation",
      studioMatching: "Studio matching",
      destinationPlanning: "Destination planning",
      conciergeSupport: "Concierge support"
    }
  }
} as const;

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  text: (typeof dictionary)[LanguageCode];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "KR" || value === "JP" || value === "EN";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("JP");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY);

    if (isLanguageCode(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  function setLanguage(nextLanguage: LanguageCode) {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
  }

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      text: dictionary[language]
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}