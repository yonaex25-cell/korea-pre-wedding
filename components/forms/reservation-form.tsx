"use client";

import { CalendarDays, Send } from "lucide-react";
import { FormEvent, useState } from "react";
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

export function ReservationForm({ studios, selectedStudioSlug }: ReservationFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      studioSlug: String(formData.get("studioSlug") || ""),
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      lineId: String(formData.get("lineId") || ""),
      preferredDate: String(formData.get("preferredDate") || ""),
      message: String(formData.get("message") || "")
    };

    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      setStatus("error");
      setMessage(result.message || "Could not send your consultation request.");
      return;
    }

    event.currentTarget.reset();
    setStatus("success");
    setMessage(result.demo ? "Demo mode accepted the request. Supabase will save it after setup." : "Your consultation request was received.");
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-lg border border-border bg-white p-5 shadow-soft">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="studioSlug">Studio</Label>
          <Select id="studioSlug" name="studioSlug" defaultValue={selectedStudioSlug || ""}>
            <option value="">Help me choose</option>
            {studios.map((studio) => <option key={studio.slug} value={studio.slug}>{studio.name}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="preferredDate">Preferred date</Label>
          <div className="relative">
            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input id="preferredDate" name="preferredDate" type="date" className="pl-9" required />
          </div>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" autoComplete="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lineId">LINE ID</Label>
          <Input id="lineId" name="lineId" placeholder="ngyn9813" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" placeholder="Destination, preferred style, outfits, guests, budget, or travel details." required />
      </div>
      {message ? <p className={status === "error" ? "text-sm text-destructive" : "text-sm text-sage"}>{message}</p> : null}
      <Button type="submit" disabled={status === "loading"}>
        <Send aria-hidden /> {status === "loading" ? "Sending" : "Request consultation"}
      </Button>
    </form>
  );
}
