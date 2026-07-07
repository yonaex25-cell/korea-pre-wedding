"use client";

import { useLanguage } from "@/components/providers/language-provider";
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
