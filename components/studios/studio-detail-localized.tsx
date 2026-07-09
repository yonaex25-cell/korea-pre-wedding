"use client";

import { useLanguage, type LanguageCode } from "@/components/providers/language-provider";
import { Badge } from "@/components/ui/badge";
import {
  getLocalizedStudioCopy,
  translateCity,
  translateDestination,
  translateRegion,
  translateService,
  translateStyle
} from "@/lib/public-content-translations";
import type { Studio } from "@/lib/types";

type StudioStylesProps = {
  styles: string[];
};

type StudioLocationProps = {
  city?: string;
  region?: string;
};

type StudioDescriptionProps = {
  studio: Studio;
};

type StudioDestinationsProps = {
  destinations: string[];
};

type StudioServiceProps = {
  service: string;
};

type StudioPackageServiceProps = {
  service: string;
};

const packageTitles: Record<LanguageCode, string> = {
  EN: "Package guide",
  JP: "パッケージ案内",
  KR: "패키지 안내"
};

const studioPackageIntroductions: Record<string, Record<LanguageCode, string>> = {
  "maison-de-luna-seoul": {
    EN: "Maison de Luna Seoul is a premium wedding studio that captures Seoul's refined mood. Beautiful natural light, white-toned sets, and sensitive direction create classic wedding photos that stay timeless. A professional team supports dress styling, hair and makeup, and posing direction, then provides all original files and high-quality retouched images after the shoot.",
    JP: "Maison de Luna Seoulは、ソウルの洗練された感性を映し出すプレミアムウェディングスタジオです。自然光が美しいホワイトトーンのセットと感覚的なディレクションで、クラシックで色あせないウェディング写真を仕上げます。ドレススタイリング、ヘアメイク、撮影ディレクションまで専門チームがサポートし、撮影後は全データと高品質なレタッチ写真を提供します。",
    KR: "서울의 세련된 감성을 담은 프리미엄 웨딩 스튜디오입니다. 자연광이 아름다운 화이트톤 세트와 감각적인 디렉팅으로 클래식하면서도 시간이 지나도 변하지 않는 웨딩 사진을 완성합니다. 드레스 스타일링, 헤어·메이크업, 촬영 디렉팅까지 전문팀이 함께하며, 촬영 후에는 원본 사진과 고품질 리터칭을 제공해 특별한 순간을 오래도록 간직할 수 있습니다."
  },
  "atelier-haneul-jeju": {
    EN: "Atelier Haneul Jeju is a premium wedding studio that frames the blue sea, forests, and oreum hills of Jeju. Studio and outdoor sessions are combined naturally so couples can enjoy travel and wedding photography together. Dress fitting, hair and makeup, and route planning are prepared with care for a comfortable shoot.",
    JP: "Atelier Haneul Jejuは、済州の青い海、森、オルムを背景に自然の美しさを残すプレミアムウェディングスタジオです。スタジオ撮影と屋外撮影を自然に組み合わせ、旅行とウェディング撮影を一緒に楽しめます。ドレスフィッティングからヘアメイク、撮影動線まで体系的に準備し、安心して撮影できる体験を提供します。",
    KR: "제주의 푸른 바다와 숲, 오름을 배경으로 자연의 아름다움을 담아내는 프리미엄 웨딩 스튜디오입니다. 스튜디오와 야외 촬영을 자연스럽게 조합하여 여행과 웨딩 촬영을 함께 즐길 수 있으며, 드레스 피팅부터 헤어·메이크업, 촬영 동선까지 체계적으로 준비되어 편안한 촬영 경험을 제공합니다."
  },
  "busan-lumiere-studio": {
    EN: "Busan Lumiere Studio is an atmospheric wedding studio where couples can capture both Busan's beaches and city views. Daytime sessions bring out the blue ocean, while sunset and night-view sessions add Busan's romantic mood. Professional styling and natural posing direction complete cinematic moments.",
    JP: "Busan Lumiere Studioは、釜山の海辺と都市風景を一緒に残せる感性豊かなウェディングスタジオです。昼は青い海を、夕日や夜景の時間には釜山ならではのロマンチックな雰囲気を演出し、多彩なスタイルのウェディング写真を残せます。専門的なスタイリングと自然なポーズディレクションで映画のような瞬間を完成させます。",
    KR: "부산의 해변과 도시 풍경을 함께 담을 수 있는 감성 웨딩 스튜디오입니다. 낮에는 푸른 바다를, 노을과 야경 시간에는 부산만의 로맨틱한 분위기를 연출하여 다양한 스타일의 웨딩 사진을 남길 수 있습니다. 전문 스타일링과 자연스러운 포즈 디렉팅으로 영화 같은 순간을 완성합니다."
  },
  "minuette-seongsu": {
    EN: "Minuette Seongsu is a contemporary wedding studio built around Seongsu's trendy mood and minimal spaces. Restrained backdrops and natural expression direction capture the couple's own atmosphere, making it a strong fit for couples who want simple yet polished wedding photos. Styling consultation through retouching is handled with close attention.",
    JP: "Minuette Seongsuは、聖水のトレンディな感性とミニマルな空間を活かしたコンテンポラリーウェディングスタジオです。控えめな背景と自然な表情の演出を中心に、ふたりだけの雰囲気を丁寧に残します。シンプルで洗練されたウェディング写真を求めるカップルに合い、撮影前のスタイル相談からレタッチまで細やかに進行します。",
    KR: "성수의 트렌디한 감성과 미니멀한 공간을 활용한 컨템포러리 웨딩 스튜디오입니다. 절제된 배경과 자연스러운 표정 연출을 중심으로 두 사람만의 분위기를 담아내며, 심플하면서도 세련된 웨딩 사진을 원하는 커플에게 잘 어울립니다. 촬영 전 스타일 상담부터 리터칭까지 세심하게 진행됩니다."
  },
  "royal-hanbok-house": {
    EN: "Royal Hanbok House is a premium hanbok wedding studio filled with Korean hanok and royal-inspired mood. Couples can create special wedding photos where tradition and modern styling meet in seasonal hanok scenery. Hanbok styling, hair design, and photo direction are handled professionally so the beauty of Korea can be experienced naturally.",
    JP: "Royal Hanbok Houseは、韓国伝統の韓屋と宮廷の雰囲気を取り入れたプレミアム韓服ウェディングスタジオです。季節ごとに美しい韓屋の風景の中で、伝統と現代が調和する特別なウェディング写真を撮影できます。韓服スタイリング、ヘア演出、撮影ディレクションまで専門的に進行し、韓国ならではの美しさを自然に体験できます。",
    KR: "한국 전통 한옥과 궁중 감성을 담은 프리미엄 한복 웨딩 스튜디오입니다. 계절마다 아름다운 한옥 풍경 속에서 전통과 현대가 조화를 이루는 특별한 웨딩 사진을 촬영할 수 있습니다. 한복 스타일링과 헤어 연출, 촬영 디렉팅까지 전문적으로 진행되어 한국만의 아름다움을 자연스럽게 경험할 수 있습니다."
  },
  "oro-jeju-garden": {
    EN: "Oro Jeju Garden is a garden wedding studio that captures Jeju's natural charm through flowers, forests, and wide meadows. Seasonal scenery creates bright, warm wedding photos, and an outdoor-experienced team carefully guides natural routes and poses. It is especially recommended for couples planning travel and wedding photography together.",
    JP: "Oro Jeju Gardenは、花や森、広い草原を背景に済州の自然の魅力を残すガーデンウェディングスタジオです。季節ごとに変わる風景を活かして明るく温かな雰囲気のウェディング写真を演出し、屋外撮影の経験が豊富な専門チームが自然な動線とポーズを丁寧に案内します。旅行とウェディング撮影を一緒に計画するカップルに特におすすめです。",
    KR: "꽃과 숲, 넓은 초원을 배경으로 제주 자연의 매력을 담아내는 가든 웨딩 스튜디오입니다. 계절마다 달라지는 풍경을 활용하여 밝고 따뜻한 분위기의 웨딩 사진을 연출하며, 야외 촬영 경험이 풍부한 전문팀이 자연스러운 동선과 포즈를 세심하게 안내합니다. 여행과 웨딩 촬영을 함께 계획하는 커플에게 특히 추천드립니다."
  }
};

const packageServices: Record<string, Record<LanguageCode, string>> = {
  "Dresses 2-3": { EN: "2-3 dresses", JP: "ドレス2〜3着", KR: "드레스 2~3벌" },
  "Tuxedo 1": { EN: "1 tuxedo", JP: "タキシード1着", KR: "턱시도 1벌" },
  "Casual outfit session": { EN: "Casual outfit session", JP: "カジュアル衣装撮影", KR: "캐주얼 의상 촬영" },
  "Hair & makeup": { EN: "Hair & makeup", JP: "ヘアメイク", KR: "헤어 & 메이크업" },
  "Hair style change": { EN: "Hair style change", JP: "ヘアスタイルチェンジ", KR: "헤어 스타일 변경" },
  "Professional photo direction": { EN: "Professional photo direction", JP: "専門撮影ディレクション", KR: "전문 촬영 디렉팅" },
  "All original photos": { EN: "All original photos provided", JP: "全カットデータ提供", KR: "원본 전체 제공" },
  "Retouched photos": { EN: "Retouched photos provided", JP: "レタッチ写真提供", KR: "리터칭 사진 제공" },
  "Album production": { EN: "Album production", JP: "アルバム制作", KR: "앨범 제작" },
  "Frame included": { EN: "Frame included", JP: "額縁込み", KR: "액자 포함" },
  "Japanese consultation support": { EN: "Japanese consultation support", JP: "日本語相談サポート", KR: "일본어 상담 지원" }
};

export function StudioStyleBadges({ styles }: StudioStylesProps) {
  const { language } = useLanguage();

  return (
    <>
      {styles.map((style) => <Badge key={style}>{translateStyle(style, language)}</Badge>)}
    </>
  );
}

export function StudioLocationText({ city, region }: StudioLocationProps) {
  const { language } = useLanguage();
  const translatedCity = translateCity(city, language);
  const translatedRegion = translateRegion(region, language);

  return <>{translatedCity ? translatedCity + ", " : ""}{translatedRegion}</>;
}

export function StudioDescriptionText({ studio }: StudioDescriptionProps) {
  const { language } = useLanguage();
  const copy = getLocalizedStudioCopy(studio, language);

  return <>{copy.longDescription || copy.description}</>;
}

export function StudioDestinationsText({ destinations }: StudioDestinationsProps) {
  const { language } = useLanguage();

  return <>{destinations.map((destination) => translateDestination(destination, language)).join(" / ")}</>;
}

export function StudioServiceText({ service }: StudioServiceProps) {
  const { language } = useLanguage();

  return <>{translateService(service, language)}</>;
}

export function StudioPackageTitleText() {
  const { language } = useLanguage();

  return <>{packageTitles[language]}</>;
}

export function StudioPackageDescriptionText({ studio }: StudioDescriptionProps) {
  const { language } = useLanguage();
  const copy = getLocalizedStudioCopy(studio, language);

  return <>{studioPackageIntroductions[studio.slug]?.[language] || copy.longDescription || copy.description}</>;
}

export function StudioPackageServiceText({ service }: StudioPackageServiceProps) {
  const { language } = useLanguage();

  return <>{packageServices[service]?.[language] || translateService(service, language)}</>;
}
