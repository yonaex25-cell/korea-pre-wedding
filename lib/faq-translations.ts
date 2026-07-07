import type { LanguageCode } from "@/components/providers/language-provider";
import type { FAQ } from "@/lib/types";

type LocalizedFaq = {
  question: string;
  answer: string;
};

type LocalizedFaqSet = Record<LanguageCode, LocalizedFaq>;

const faqTranslationsById: Record<string, LocalizedFaqSet> = {
  "faq-1": {
    KR: {
      question: "한국 웨딩 촬영 스튜디오는 얼마나 일찍 예약해야 하나요?",
      answer:
        "봄과 가을 성수기에는 3~4개월 전 예약을 추천합니다. 비교적 여유로운 시즌에는 2개월 전에도 가능한 경우가 있으며, 항공권 확정 전에도 상담을 먼저 시작할 수 있습니다."
    },
    JP: {
      question: "韓国ウェディングフォトスタジオはどのくらい前に予約すべきですか？",
      answer:
        "春と秋の人気シーズンは3〜4か月前の予約がおすすめです。比較的落ち着いた時期であれば2か月前でも調整できる場合があり、航空券が確定する前でも相談を始められます。"
    },
    EN: {
      question: "How early should we book a Korean wedding photography studio?",
      answer:
        "For spring and autumn, three to four months ahead is ideal. For quieter seasons, two months is usually workable, and you can start with a consultation before flights are finalized."
    }
  },
  "faq-2": {
    KR: {
      question: "Dasoni는 해외 커플도 지원하나요?",
      answer:
        "네. Dasoni는 해외 커플을 위한 한국 웨딩 포토그래피 컨시어지로, 스튜디오 비교, 촬영지 선택, 일정 조율, 커뮤니케이션을 함께 도와드립니다."
    },
    JP: {
      question: "Dasoniは海外カップルにも対応していますか？",
      answer:
        "はい。Dasoniは海外カップル向けの韓国ウェディングフォト コンシェルジュとして、スタジオ比較、撮影地選び、スケジュール調整、コミュニケーションをサポートします。"
    },
    EN: {
      question: "Can Dasoni support international couples?",
      answer:
        "Yes. Dasoni is designed as a Korea wedding photography concierge, helping couples compare studios, locations, schedules, and communication details."
    }
  },
  "faq-3": {
    KR: {
      question: "표시된 가격에는 보통 무엇이 포함되나요?",
      answer:
        "대부분의 패키지에는 스타일링, 촬영, 기본 보정, 선택 가능한 의상 옵션이 포함됩니다. 이동 차량, 프리미엄 드레스, 추가 보정은 스튜디오별로 달라질 수 있습니다."
    },
    JP: {
      question: "表示価格には通常何が含まれますか？",
      answer:
        "多くのパッケージには、スタイリング、撮影、基本レタッチ、選択可能な衣装オプションが含まれます。移動、プレミアムドレス、追加レタッチはスタジオによって異なります。"
    },
    EN: {
      question: "What is usually included in the listed price?",
      answer:
        "Most listed packages include styling, photography, basic retouching, and selected outfit options. Transport, premium dresses, or extra retouching may vary by studio."
    }
  },
  "faq-4": {
    KR: {
      question: "야외 촬영일에 비가 오면 어떻게 되나요?",
      answer:
        "스튜디오마다 정책은 다르지만, 일반적으로 일정 조정, 실내 촬영 대안, 또는 가능한 경우 촬영 동선 변경을 검토합니다."
    },
    JP: {
      question: "屋外撮影日に雨が降った場合はどうなりますか？",
      answer:
        "スタジオごとにポリシーは異なりますが、一般的には日程調整、屋内スタジオへの変更、または可能な範囲で撮影ルートの変更を検討します。"
    },
    EN: {
      question: "What happens if it rains on an outdoor shoot day?",
      answer:
        "Each studio has its own policy. Common options include schedule adjustment, indoor studio alternatives, or changing the location route when possible."
    }
  }
};

const faqTranslationsByEnglishQuestion: Record<string, LocalizedFaqSet> = Object.values(
  faqTranslationsById
).reduce<Record<string, LocalizedFaqSet>>((acc, translations) => {
  acc[translations.EN.question] = translations;
  return acc;
}, {});

function getLocalizedField(
  value: unknown,
  language: LanguageCode
): string | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const localized = value as Partial<Record<LanguageCode, string>>;
  return localized[language] || localized.EN;
}

export function getLocalizedFaq(faq: FAQ, language: LanguageCode): LocalizedFaq {
  const questionFromData =
    getLocalizedField(faq.questionI18n, language) ||
    getLocalizedField(faq.questions, language) ||
    getLocalizedField(faq.questionTranslations, language);

  const answerFromData =
    getLocalizedField(faq.answerI18n, language) ||
    getLocalizedField(faq.answers, language) ||
    getLocalizedField(faq.answerTranslations, language);

  if (questionFromData && answerFromData) {
    return {
      question: questionFromData,
      answer: answerFromData
    };
  }

  const knownTranslation =
    faqTranslationsById[faq.id] ||
    faqTranslationsByEnglishQuestion[faq.question];

  if (knownTranslation) {
    return knownTranslation[language] || knownTranslation.EN;
  }

  return {
    question: faq.question,
    answer: faq.answer
  };
}