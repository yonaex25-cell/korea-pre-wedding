"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/components/providers/language-provider";

export function ContactForm() {
  const { text } = useLanguage();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
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

    const result = await response.json();

    if (!response.ok) {
      setStatus("error");
      setMessage(result.message || "Could not send your message.");
      return;
    }

    event.currentTarget.reset();
    setStatus("success");
    setMessage(text.forms.contactSuccess);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-lg border border-border bg-white p-5 shadow-soft">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{text.forms.name}</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{text.forms.email}</Label>
          <Input id="email" name="email" type="email" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="lineId">{text.forms.lineId}</Label>
        <Input id="lineId" name="lineId" placeholder="ngyn9813" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">{text.forms.message}</Label>
        <Textarea id="message" name="message" placeholder={text.forms.contactPlaceholder} required />
      </div>
      {message ? <p className={status === "error" ? "text-sm text-destructive" : "text-sm text-sage"}>{message}</p> : null}
      <Button type="submit" disabled={status === "loading"}><Send aria-hidden /> {status === "loading" ? text.forms.sending : text.forms.sendMessage}</Button>
    </form>
  );
}