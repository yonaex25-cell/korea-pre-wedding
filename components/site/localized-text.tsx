"use client";

import { getValueByPath, useLanguage } from "@/components/providers/language-provider";

type LocalizedTextProps = {
  path: string;
  fallback?: string;
};

export function LocalizedText({ path, fallback = "" }: LocalizedTextProps) {
  const { t } = useLanguage();

  return <>{getValueByPath(t, path) || fallback}</>;
}
