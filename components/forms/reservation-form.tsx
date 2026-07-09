"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { useLanguage, type LanguageCode } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Studio } from "@/lib/types";

type ReservationFormProps = {
  studios: Studio[];
  selectedStudioSlug?: string;
};

const RESERVATION_API_URL: string = "https://script.google.com/macros/s/AKfycbx0A7WVbEXV8h68m4eQglodRav993mzIPJHb9bdbkuFPvFkgOI_WPNvC4334kpa0v9x/exec";

type ReservationPayload = {
  formType: "reservation";
  studio: string;
  desiredDate: string;
  name: string;
  lineId: string;
  email: string;
  message: string;
  locale: LanguageCode;
  createdAt: string;
};

type ReservationApiResponse = {
  ok?: boolean;
  message?: string;
};

const reservationFormTitle: Record<LanguageCode, string> = {
  KR: "\uc0c1\ub2f4 \uc2e0\uccad \ud3fc",
  EN: "Consultation Form",
  JP: "\u76f8\u8ac7\u7533\u8acb\u30d5\u30a9\u30fc\u30e0"
};

const reservationFormNotice: Record<LanguageCode, string> = {
  KR: "* \uc0c1\ub2f4 \uc2e0\uccad\uc744 \ubcf4\ub0b4\uc2dc\uba74 \uc21c\ucc28\uc801\uc73c\ub85c \ub2f5\ubcc0\ub4dc\ub9ac\uaca0\uc2b5\ub2c8\ub2e4.",
  EN: "* After you send your consultation request, we will reply in order.",
  JP: "* \u76f8\u8ac7\u7533\u8acb\u3092\u9001\u4fe1\u3044\u305f\u3060\u304f\u3068\u3001\u9806\u6b21\u3054\u8fd4\u4fe1\u3044\u305f\u3057\u307e\u3059\u3002"
};

const reservationSuccessMessage: Record<LanguageCode, string> = {
  KR: "\uc0c1\ub2f4 \uc2e0\uccad\uc774 \uc644\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \uc21c\ucc28\uc801\uc73c\ub85c \ub2f5\ubcc0\ub4dc\ub9ac\uaca0\uc2b5\ub2c8\ub2e4. \uac10\uc0ac\ud569\ub2c8\ub2e4!",
  EN: "Your consultation request has been submitted. We will reply in order. Thank you!",
  JP: "\u76f8\u8ac7\u7533\u8acb\u304c\u5b8c\u4e86\u3057\u307e\u3057\u305f\u3002\u9806\u6b21\u3054\u8fd4\u4fe1\u3044\u305f\u3057\u307e\u3059\u3002\u3042\u308a\u304c\u3068\u3046\u3054\u3056\u3044\u307e\u3059\uff01"
};

const reservationErrorMessage: Record<LanguageCode, string> = {
  KR: "\uc0c1\ub2f4 \uc2e0\uccad\uc744 \ubcf4\ub0bc \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \uc7a0\uc2dc \ud6c4 \ub2e4\uc2dc \uc2dc\ub3c4\ud574 \uc8fc\uc138\uc694.",
  EN: "Could not send your consultation request. Please try again shortly.",
  JP: "\u76f8\u8ac7\u7533\u8acb\u3092\u9001\u4fe1\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002\u3057\u3070\u3089\u304f\u3057\u3066\u304b\u3089\u3082\u3046\u4e00\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002"
};

function isReservationApiConfigured(): boolean {
  try {
    const url = new URL(RESERVATION_API_URL);
    return url.protocol === "https:" && url.pathname.endsWith("/exec");
  } catch {
    return false;
  }
}

async function sendReservationMessage(payload: ReservationPayload): Promise<void> {
  if (!isReservationApiConfigured()) {
    throw new Error("Google Apps Script Web App URL is not configured.");
  }

  const response = await fetch(RESERVATION_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  });

  const result = (await response.json().catch(() => null)) as ReservationApiResponse | null;

  if (!response.ok || result?.ok !== true) {
    console.error("[reservation] Google Apps Script returned an unsuccessful response", {
      status: response.status,
      statusText: response.statusText,
      result
    });
    throw new Error(result?.message || "Google Apps Script submission failed.");
  }
}

export function ReservationForm({ studios, selectedStudioSlug }: ReservationFormProps) {
  const { language, t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const studioSlug = String(formData.get("studioSlug") || "");
    const selectedStudio = studios.find((studio) => studio.slug === studioSlug);
    const payload: ReservationPayload = {
      formType: "reservation",
      studio: selectedStudio?.name || studioSlug || t.forms.reservation.helpMeChoose,
      desiredDate: String(formData.get("preferredDate") || ""),
      name: String(formData.get("name") || ""),
      lineId: String(formData.get("lineId") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
      locale: language,
      createdAt: new Date().toISOString()
    };

    try {
      await sendReservationMessage(payload);
      form.reset();
      setStatus("success");
      setMessage(reservationSuccessMessage[language]);
    } catch (error) {
      console.error("[reservation] Google Apps Script submission failed", error);
      setStatus("error");
      setMessage(reservationErrorMessage[language]);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid h-full gap-5 rounded-lg border border-border bg-white p-5 shadow-soft">
      <h2 className="text-xl font-semibold text-foreground">{reservationFormTitle[language]}</h2>
      <div className="space-y-2">
        <Label htmlFor="studioSlug">{t.forms.reservation.studio}</Label>
        <Select id="studioSlug" name="studioSlug" defaultValue={selectedStudioSlug || ""}>
          <option value="">{t.forms.reservation.helpMeChoose}</option>
          {studios.map((studio) => <option key={studio.slug} value={studio.slug}>{studio.name}</option>)}
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="preferredDate">{t.forms.reservation.preferredDate}</Label>
        <Input id="preferredDate" name="preferredDate" type="date" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">{t.forms.common.name}</Label>
        <Input id="name" name="name" autoComplete="name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lineId">{t.forms.common.lineId} ({t.forms.common.optional})</Label>
        <Input id="lineId" name="lineId" placeholder="ngyn9813" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">{t.forms.common.email}</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">{t.forms.common.message}</Label>
        <Textarea id="message" name="message" placeholder={t.forms.reservation.placeholder} required />
      </div>
      {message ? <p className={status === "error" ? "text-sm text-destructive" : "text-sm text-sage"}>{message}</p> : null}
      <p className="text-sm leading-6 text-muted-foreground">{reservationFormNotice[language]}</p>
      <Button type="submit" disabled={status === "loading"}>
        <Send aria-hidden /> {status === "loading" ? t.forms.common.sending : t.forms.reservation.submit}
      </Button>
    </form>
  );
}
