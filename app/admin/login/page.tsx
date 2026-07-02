import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Login"
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link href="/" className="text-sm font-semibold tracking-[0.16em] text-gold-700">DASONI</Link>
          <h1 className="mt-4 text-4xl font-semibold text-ink">Admin Login</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Sign in with the Supabase admin account to manage Dasoni content.</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
