"use client";

import { ImageUp, LogIn, Plus, RefreshCw, Save, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Tabs } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import type { Studio } from "@/lib/types";

type AdminReservation = {
  id: string;
  studio_id: string | null;
  name: string;
  email: string;
  line_id: string;
  preferred_date: string;
  message: string;
  status: string;
  created_at: string;
};

type AdminReview = {
  id: string;
  studio_id: string | null;
  customer_name: string;
  location: string;
  rating: number;
  body: string;
  is_published: boolean;
};

type AdminFAQ = {
  id: string;
  studio_id: string | null;
  category: string;
  question: string;
  answer: string;
  is_published: boolean;
};

const blankStudio = {
  slug: "",
  name: "",
  region: "Seoul",
  styles: "Classic, Modern",
  budget: "Premium",
  price_from_jpy: 280000,
  duration_hours: 5,
  summary: "",
  description: "",
  hero_image: "",
  included_services: "Gown fitting, Hair and makeup, Retouched images",
  featured: false
};

export function AdminDashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");
  const [studios, setStudios] = useState<Studio[]>([]);
  const [reservations, setReservations] = useState<AdminReservation[]>([]);
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [faqs, setFaqs] = useState<AdminFAQ[]>([]);
  const [studioForm, setStudioForm] = useState(blankStudio);
  const [editingStudioId, setEditingStudioId] = useState<string | null>(null);

  const authHeaders = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  async function login() {
    setStatus("");
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setToken(data.session.access_token);
      setStatus("Admin session active.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Login failed.");
    }
  }

  async function loadAdminData(activeToken = token) {
    if (!activeToken) return;
    const headers = { Authorization: `Bearer ${activeToken}` };
    const [studioRes, reservationRes, reviewRes, faqRes] = await Promise.all([
      fetch("/api/admin/studios", { headers }),
      fetch("/api/admin/reservations", { headers }),
      fetch("/api/admin/reviews", { headers }),
      fetch("/api/admin/faqs", { headers })
    ]);

    if ([studioRes, reservationRes, reviewRes, faqRes].some((res) => !res.ok)) {
      setStatus("Admin data could not be loaded. Check ADMIN_EMAILS and Supabase service role configuration.");
      return;
    }

    const studioJson = (await studioRes.json()) as { studios: Studio[] };
    const reservationJson = (await reservationRes.json()) as { reservations: AdminReservation[] };
    const reviewJson = (await reviewRes.json()) as { reviews: AdminReview[] };
    const faqJson = (await faqRes.json()) as { faqs: AdminFAQ[] };
    setStudios(studioJson.studios);
    setReservations(reservationJson.reservations);
    setReviews(reviewJson.reviews);
    setFaqs(faqJson.faqs);
    setStatus("Dashboard synced.");
  }

  useEffect(() => {
    if (token) void loadAdminData(token);
  }, [token]);

  function editStudio(studio: Studio) {
    setEditingStudioId(studio.id);
    setStudioForm({
      slug: studio.slug,
      name: studio.name,
      region: studio.region,
      styles: studio.styles.join(", "),
      budget: studio.budget,
      price_from_jpy: studio.priceFromJpy,
      duration_hours: studio.durationHours,
      summary: studio.summary,
      description: studio.description,
      hero_image: studio.heroImage,
      included_services: studio.includedServices.join(", "),
      featured: studio.featured
    });
  }

  async function saveStudio() {
    const payload = {
      ...studioForm,
      styles: studioForm.styles.split(",").map((item) => item.trim()).filter(Boolean),
      included_services: studioForm.included_services.split(",").map((item) => item.trim()).filter(Boolean)
    };

    const response = await fetch(editingStudioId ? `/api/admin/studios/${editingStudioId}` : "/api/admin/studios", {
      method: editingStudioId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json", ...authHeaders },
      body: JSON.stringify(payload)
    });

    setStatus(response.ok ? "Studio saved." : "Studio save failed.");
    if (response.ok) {
      setStudioForm(blankStudio);
      setEditingStudioId(null);
      await loadAdminData();
    }
  }

  async function deleteStudio(id: string) {
    const response = await fetch(`/api/admin/studios/${id}`, { method: "DELETE", headers: authHeaders });
    setStatus(response.ok ? "Studio deleted." : "Studio delete failed.");
    if (response.ok) await loadAdminData();
  }

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", headers: authHeaders, body: formData });
    const data = (await response.json()) as { publicUrl?: string; error?: string };
    if (data.publicUrl) {
      setStudioForm((value) => ({ ...value, hero_image: data.publicUrl || value.hero_image }));
      setStatus("Image uploaded and assigned as hero image.");
    } else {
      setStatus(data.error || "Upload failed.");
    }
  }

  async function saveReview(formData: FormData) {
    const response = await fetch("/api/admin/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders },
      body: JSON.stringify(Object.fromEntries(formData.entries()))
    });
    setStatus(response.ok ? "Review saved." : "Review save failed.");
    if (response.ok) await loadAdminData();
  }

  async function deleteReview(id: string) {
    const response = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE", headers: authHeaders });
    setStatus(response.ok ? "Review deleted." : "Review delete failed.");
    if (response.ok) await loadAdminData();
  }

  async function saveFAQ(formData: FormData) {
    const response = await fetch("/api/admin/faqs", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders },
      body: JSON.stringify(Object.fromEntries(formData.entries()))
    });
    setStatus(response.ok ? "FAQ saved." : "FAQ save failed.");
    if (response.ok) await loadAdminData();
  }

  async function deleteFAQ(id: string) {
    const response = await fetch(`/api/admin/faqs/${id}`, { method: "DELETE", headers: authHeaders });
    setStatus(response.ok ? "FAQ deleted." : "FAQ delete failed.");
    if (response.ok) await loadAdminData();
  }

  if (!token) {
    return (
      <Card className="mx-auto max-w-md shadow-luxury">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><LogIn className="h-5 w-5 text-primary" /> Admin login</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <Label>Email</Label>
            <Input className="mt-2" value={email} onChange={(event) => setEmail(event.target.value)} type="email" />
          </div>
          <div>
            <Label>Password</Label>
            <Input className="mt-2" value={password} onChange={(event) => setPassword(event.target.value)} type="password" />
          </div>
          {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
          <Button onClick={login}><LogIn /> Sign in</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-white p-4">
        <p className="text-sm text-muted-foreground">{status || "Admin dashboard ready."}</p>
        <Button variant="outline" onClick={() => loadAdminData()}><RefreshCw /> Refresh</Button>
      </div>
      <Tabs
        defaultValue="studios"
        tabs={[
          { value: "studios", label: "Studios" },
          { value: "reservations", label: "Reservations" },
          { value: "reviews", label: "Reviews" },
          { value: "faqs", label: "FAQs" }
        ]}
      >
        {(active) => (
          <>
            {active === "studios" ? (
              <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <Card>
                  <CardHeader><CardTitle>{editingStudioId ? "Edit studio" : "New studio"}</CardTitle></CardHeader>
                  <CardContent className="grid gap-4">
                    <Input value={studioForm.name} onChange={(e) => setStudioForm({ ...studioForm, name: e.target.value })} placeholder="Studio name" />
                    <Input value={studioForm.slug} onChange={(e) => setStudioForm({ ...studioForm, slug: e.target.value })} placeholder="studio-slug" />
                    <div className="grid gap-3 md:grid-cols-2">
                      <Select value={studioForm.region} onChange={(e) => setStudioForm({ ...studioForm, region: e.target.value })}>
                        <option>Seoul</option><option>Jeju</option><option>Busan</option>
                      </Select>
                      <Select value={studioForm.budget} onChange={(e) => setStudioForm({ ...studioForm, budget: e.target.value })}>
                        <option>Premium</option><option>Luxury</option><option>Signature</option>
                      </Select>
                    </div>
                    <Input value={studioForm.styles} onChange={(e) => setStudioForm({ ...studioForm, styles: e.target.value })} placeholder="Classic, Modern" />
                    <div className="grid gap-3 md:grid-cols-2">
                      <Input type="number" value={studioForm.price_from_jpy} onChange={(e) => setStudioForm({ ...studioForm, price_from_jpy: Number(e.target.value) })} />
                      <Input type="number" value={studioForm.duration_hours} onChange={(e) => setStudioForm({ ...studioForm, duration_hours: Number(e.target.value) })} />
                    </div>
                    <Textarea value={studioForm.summary} onChange={(e) => setStudioForm({ ...studioForm, summary: e.target.value })} placeholder="Short summary" />
                    <Textarea value={studioForm.description} onChange={(e) => setStudioForm({ ...studioForm, description: e.target.value })} placeholder="Full description" />
                    <Input value={studioForm.hero_image} onChange={(e) => setStudioForm({ ...studioForm, hero_image: e.target.value })} placeholder="Hero image URL" />
                    <Input value={studioForm.included_services} onChange={(e) => setStudioForm({ ...studioForm, included_services: e.target.value })} placeholder="Included services" />
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={studioForm.featured} onChange={(e) => setStudioForm({ ...studioForm, featured: e.target.checked })} />
                      Featured studio
                    </label>
                    <label className="focus-ring flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed p-4 text-sm text-muted-foreground">
                      <ImageUp className="h-4 w-4" /> Upload hero image
                      <input className="hidden" type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} />
                    </label>
                    <Button onClick={saveStudio}><Save /> Save studio</Button>
                  </CardContent>
                </Card>
                <div className="grid gap-4">
                  {studios.map((studio) => (
                    <Card key={studio.id}>
                      <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
                        <div>
                          <p className="font-semibold">{studio.name}</p>
                          <p className="text-sm text-muted-foreground">{studio.region} - {studio.budget}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => editStudio(studio)}>Edit</Button>
                          <Button variant="destructive" onClick={() => deleteStudio(studio.id)}><Trash2 /></Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : null}
            {active === "reservations" ? (
              <div className="grid gap-4">
                {reservations.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-5">
                      <p className="font-semibold">{item.name} - {item.preferred_date}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.email} - LINE {item.line_id} - {item.status}</p>
                      <p className="mt-3 text-sm">{item.message}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : null}
            {active === "reviews" ? (
              <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
                <Card>
                  <CardHeader><CardTitle>Add review</CardTitle></CardHeader>
                  <CardContent>
                    <form action={saveReview} className="grid gap-3">
                      <Input name="customer_name" placeholder="Customer name" required />
                      <Input name="location" placeholder="Tokyo" required />
                      <Input name="rating" type="number" min="1" max="5" defaultValue="5" required />
                      <Textarea name="body" placeholder="Review text" required />
                      <Button><Plus /> Save review</Button>
                    </form>
                  </CardContent>
                </Card>
                <div className="grid gap-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="flex items-center justify-between gap-3 p-5">
                        <div>
                          <p className="font-semibold">{review.customer_name}</p>
                          <p className="text-sm text-muted-foreground">{review.location} - {review.rating} stars</p>
                        </div>
                        <Button variant="destructive" onClick={() => deleteReview(review.id)}><Trash2 /></Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : null}
            {active === "faqs" ? (
              <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
                <Card>
                  <CardHeader><CardTitle>Add FAQ</CardTitle></CardHeader>
                  <CardContent>
                    <form action={saveFAQ} className="grid gap-3">
                      <Select name="category" defaultValue="general">
                        <option>general</option><option>studio</option><option>reservation</option><option>travel</option>
                      </Select>
                      <Input name="question" placeholder="Question" required />
                      <Textarea name="answer" placeholder="Answer" required />
                      <Button><Plus /> Save FAQ</Button>
                    </form>
                  </CardContent>
                </Card>
                <div className="grid gap-4">
                  {faqs.map((faq) => (
                    <Card key={faq.id}>
                      <CardContent className="flex items-center justify-between gap-3 p-5">
                        <div>
                          <p className="font-semibold">{faq.question}</p>
                          <p className="text-sm text-muted-foreground">{faq.category}</p>
                        </div>
                        <Button variant="destructive" onClick={() => deleteFAQ(faq.id)}><Trash2 /></Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : null}
          </>
        )}
      </Tabs>
    </div>
  );
}
