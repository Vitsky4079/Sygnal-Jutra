import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

// Odświeżanie co 5 min: umożliwia planowaną publikację (artykuły z przyszłą datą).
export const revalidate = 300;

// Jeden krój dla nagłówków i tekstu: geometryczny, mocny w wersalikach (jak w mockupach PLAN B)
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name}. ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  openGraph: { siteName: SITE.name, locale: "pl_PL", type: "website", images: [{ url: "/brand/og.jpg", width: 2000, height: 1125 }] },
  twitter: { card: "summary_large_image", images: ["/brand/og.jpg"] },
  alternates: { canonical: "/", types: { "application/rss+xml": "/rss.xml" } },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" suppressHydrationWarning className={`${jakarta.variable} ${mono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <noscript>
          <style>{"[data-sm-root] [data-sm],[data-cine] [data-c]{opacity:1!important;transform:none!important;clip-path:none!important}"}</style>
        </noscript>
        <a
          href="#tresc"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-text focus:px-4 focus:py-2 focus:text-bg"
        >
          Przejdź do treści
        </a>
        <SiteHeader />
        <main id="tresc" className="flex-1 pt-16 md:pt-24">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
