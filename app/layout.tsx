import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/components/providers/language-provider";
import { SiteHeader } from "@/components/site/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Dasoni",
    template: "%s | Dasoni"
  },
  description: "Korea Wedding Photography Concierge"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <SiteHeader />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}