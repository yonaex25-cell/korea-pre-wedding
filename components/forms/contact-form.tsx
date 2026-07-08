"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactSuccessMessage = "\ubb38\uc758\uac00 \uc815\uc0c1\uc801\uc73c\ub85c \uc811\uc218\ub418\uc5c8\uc2b5\ub2c8\ub2e4.";
const contactErrorMessage = "\ubb38\uc758 \uc804\uc1a1\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4. \uc7a0\uc2dc \ud6c4 \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694.";

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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") || ""),
          email: String(formData.get("email") || ""),
          lineId: String(formData.get("lineId") || ""),
          message: String(formData.get("message") || "")
        })
      });

      await response.json().catch(() => null);

      if (!response.ok) {
        setStatus("error");
        setMessage(contactErrorMessage);
        return;
      }

      form.reset();
      setStatus("success");
      setMessage(contactSuccessMessage);
    } catch {
      setStatus("error");
      setMessage(contactErrorMessage);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-lg border border-border bg-white p-5 shadow-soft">
      <h2 className="text-xl font-semibold text-foreground">1:1 Q&A</h2>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t.forms.common.name}</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t.forms.common.email}</Label>
          <Input id="email" name="email" type="email" required />
        </div>
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