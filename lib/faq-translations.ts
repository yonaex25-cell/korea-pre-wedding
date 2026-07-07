import type { LanguageCode } from "@/components/providers/language-provider";
import type { FAQ } from "@/lib/types";

type FaqTranslation = {
  question: string;
  answer: string;
};

const faqTranslations: Record<string, Record<LanguageCode, FaqTranslation>> = {
  "faq-1": {
    EN: {
      question: "How early should we book a Korean wedding photography studio?",
      answer:
        "For spring and autumn, three to four months ahead is ideal. For quieter seasons, two months is usually workable, and you can start with a consultation before flights are finalized."
    },
    JP: {
      question: "韓国のウェディングフォトスタジオはどのくらい前に予約すべきですか？",
      answer:
        "春と秋は3〜4か月前のご相談がおすすめです。比較的落ち着いた時期であれば2か月前でも調整できる場合が多く、航空券の確定前でも相談を始められます。"
    },
    KR: {
      question: "한국 웨딩 촬영 스튜디오는 언제쯤 예약하는 것이 좋나요?",
      answer:
        "봄과 가을 성수기는 3~4개월 전 상담을 권장합니다. 비교적 여유로운 시즌은 2개월 전에도 가능한 경우가 많으며, 항공권 확정 전에도 상담을 시작할 수 있습니다."
    }
  },
  "faq-2": {
    EN: {
      question: "Can Dasoni support international couples?",
      answer:
        "Yes. Dasoni is designed as a Korea wedding photography concierge, helping couples compare studios, locations, schedules, and communication details."
    },
    JP: {
      question: "海外からのカップルもサポートしてもらえますか？",
      answer:
        "はい。Dasoniは韓国ウェディング撮影のコンシェルジュとして、スタジオ比較、撮影地、日程、連絡まわりまで整理してご案内します。"
    },
    KR: {
      question: "해외 커플도 Dasoni의 도움을 받을 수 있나요?",
      answer:
        "네. Dasoni는 한국 웨딩 촬영 컨시어지로서 스튜디오 비교, 촬영지, 일정, 커뮤니케이션까지 정리해 안내합니다."
    }
  },
  "faq-3": {
    EN: {
      question: "What is usually included in the listed price?",
      answer:
        "Most listed packages include styling, photography, basic retouching, and selected outfit options. Transport, premium dresses, or extra retouching may vary by studio."
    },
    JP: {
      question: "表示料金には通常何が含まれますか？",
      answer:
        "多くのパッケージには、スタイリング、撮影、基本補正、指定衣装が含まれます。移動車両、プレミアムドレス、追加補正はスタジオにより異なります。"
    },
    KR: {
      question: "표시된 가격에는 보통 무엇이 포함되나요?",
      answer:
        "대부분의 패키지에는 스타일링, 촬영, 기본 보정, 일부 의상 옵션이 포함됩니다. 차량 이동, 프리미엄 드레스, 추가 보정은 스튜디오별로 다를 수 있습니다."
    }
  },
  "faq-4": {
    EN: {
      question: "What happens if it rains on an outdoor shoot day?",
      answer:
        "Each studio has its own policy. Common options include schedule adjustment, indoor studio alternatives, or changing the location route when possible."
    },
    JP: {
      question: "屋外撮影の日に雨が降った場合はどうなりますか？",
      answer:
        "対応はスタジオごとに異なります。一般的には日程調整、屋内スタジオへの変更、可能な範囲でロケーションルートの変更などを検討します。"
    },
    KR: {
      question: "야외 촬영일에 비가 오면 어떻게 하나요?",
      answer:
        "스튜디오마다 정책이 다릅니다. 일반적으로 일정 조정, 실내 스튜디오 대안, 가능한 경우 촬영 동선 변경 등을 검토합니다."
    }
  }
};

export function getLocalizedFaq(faq: FAQ, language: LanguageCode): FAQ {
  const translatedById = faqTranslations[faq.id]?.[language];

  if (translatedById) {
    return {
      ...faq,
      question: translatedById.question,
      answer: translatedById.answer
    };
  }

  const questionKey = typeof faq.question === "string" ? faq.question.toLowerCase() : "";
  const translatedByQuestion = Object.values(faqTranslations).find((translation) => {
    return translation.EN.question.toLowerCase() === questionKey;
  })?.[language];

  if (translatedByQuestion) {
    return {
      ...faq,
      question: translatedByQuestion.question,
      answer: translatedByQuestion.answer
    };
  }

  return faq;
}
