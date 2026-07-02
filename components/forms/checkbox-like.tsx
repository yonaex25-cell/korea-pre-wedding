"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type CheckboxLikeProps = {
  label: string;
  checked: boolean;
  onClick: () => void;
};

export function CheckboxLike({ label, checked, onClick }: CheckboxLikeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-11 items-center justify-between rounded-lg border px-3 text-sm font-medium transition",
        checked ? "border-gold-500 bg-gold-50 text-gold-700" : "border-border bg-white text-muted-foreground hover:border-gold-300"
      )}
      aria-pressed={checked}
    >
      {label}
      {checked ? <Check className="size-4" aria-hidden /> : null}
    </button>
  );
}
