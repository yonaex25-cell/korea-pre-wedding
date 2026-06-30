"use client";

import { CalendarDays, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Studio } from "@/lib/types";

export function ReservationForm({ studios, defaultStudioId }: { studios: Studio[]; defaultStudioId?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(formData: FormData) {
    setStatus("loading");
    setMessage("");

    const payload = {
      studioId: String(formData.get("studioId") || ""),
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

    const result = (await response.json()) as { error?: string; message?: string };
    if (!response.ok) {
      setStatus("error");
      setMessage(result.error || "Reservation could not be saved.");
      return;
    }

    setStatus("success");
    setMessage(result.message || "Reservation request received. We will contact you shortly.");
  }

  return (
    <Card className="shadow-luxury">
      <CardHeader>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-gold-50 text-primary">
            <CalendarDays className="h-5 w-5" />
          </span>
          <CardTitle>Reservation request</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form action={submit} className="grid gap-5">
          <div>
            <Label htmlFor="studioId">Preferred studio</Label>
            <Select id="studioId" name="studioId" className="mt-2" defaultValue={defaultStudioId || ""}>
              <option value="">Consult me first</option>
              {studios.map((studio) => (
                <option key={studio.id} value={studio.id}>{studio.name}</option>
              ))}
            </Select>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" className="mt-2" required placeholder="Ami Tanaka" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" className="mt-2" required type="email" placeholder="ami@example.com" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="lineId">LINE ID</Label>
              <Input id="lineId" name="lineId" className="mt-2" required placeholder="ami_line" />
            </div>
            <div>
              <Label htmlFor="preferredDate">Preferred date</Label>
              <Input id="preferredDate" name="preferredDate" className="mt-2" required type="date" />
            </div>
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              className="mt-2"
              required
              placeholder="Tell us your travel dates, preferred image style, dress size concerns, or questions."
            />
          </div>
          {message ? (
            <p className={status === "error" ? "text-sm text-destructive" : "text-sm text-primary"}>{message}</p>
          ) : null}
          <Button type="submit" size="lg" disabled={status === "loading"}>
            <Send /> {status === "loading" ? "Sending..." : "Send request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
