import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dasoni",
  description: "Korean wedding photography concierge for Japanese couples."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}