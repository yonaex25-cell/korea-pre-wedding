import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage Korea Pre Wedding studios, reservations, reviews, and FAQs."
};

export default function AdminPage() {
  return (
    <section className="section-shell py-14">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.22em] text-primary">Admin</p>
        <h1 className="mt-3 text-5xl font-semibold">Operations dashboard.</h1>
      </div>
      <AdminDashboard />
    </section>
  );
}
