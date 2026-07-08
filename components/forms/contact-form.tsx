"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CONTACT_API_URL: string = "https://script.google.com/macros/s/AKfycbx0A7WVbEXV8h68m4eQglodRav993mzIPJHb9bdbkuFPvFkgOI_WPNvC4334kpa0v9x/exec";

const contactSuccessMessage = "\ubb38\uc758\uac00 \uc815\uc0c1\uc801\uc73c\ub85c \uc811\uc218\ub418\uc5c8\uc2b5\ub2c8\ub2e4. 24\uc2dc\uac04 \uc774\ub0b4\uc5d0 \ub2f5\ubcc0\ub4dc\ub9ac\uaca0\uc2b5\ub2c8\ub2e4.";
const contactErrorMessage = "\ubb38\uc758 \uc804\uc1a1\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4. \uc7a0\uc2dc \ud6c4 \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694.";

type ContactPayload = {
  name: string;
  email: string;
  lineId: string;
  message: string;
  submittedAt: string;
  source: string;
};

function isContactApiConfigured(): boolean {
  return CONTACT_API_URL !== "GOOGLE_APPS_SCRIPT_WEB_APP_URL" && CONTACT_API_URL.startsWith("https://");
}

async function sendContactMessage(payload: ContactPayload): Promise<void> {
  if (!isContactApiConfigured()) {
    throw new Error("Google Apps Script Web App URL is not configured.");
  }

  await fetch(CONTACT_API_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  });
}

export function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await sendContactMessage({
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        lineId: String(formData.get("lineId") || ""),
        message: String(formData.get("message") || ""),
        submittedAt: new Date().toISOString(),
        source: "Dasoni contact form"
      });

      form.reset();
      setStatus("success");
      setMessage(contactSuccessMessage);
    } catch (error) {
      console.error("[contact] Google Apps Script submission failed", error);
      setStatus("error");
      setMessage(contactErrorMessage);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid h-full gap-5 rounded-lg border border-border bg-white p-5 shadow-soft">
      <h2 className="text-xl font-semibold text-foreground">1:1 Q&A</h2>
      <div className="space-y-2">
        <Label htmlFor="name">{t.forms.common.name}</Label>
        <Input id="name" name="name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">{t.forms.common.email}</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lineId">{t.forms.common.lineId} ({t.forms.common.optional})</Label>
        <Input id="lineId" name="lineId" placeholder="ngyn9813" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">{t.forms.common.message}</Label>
        <Textarea id="message" name="message" placeholder={t.forms.contact.placeholder} required />
      </div>
      {message ? <p className={status === "error" ? "text-sm text-destructive" : "text-sm text-sage"}>{message}</p> : null}
      <Button type="submit" disabled={status === "loading"}>
        <Send aria-hidden /> {status === "loading" ? t.forms.common.sending : t.forms.common.sendMessage}
      </Button>
    </form>
  );
}
