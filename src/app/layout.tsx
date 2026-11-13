import type { Metadata } from "next";
import Script from "next/script";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BreakingNewsBar } from "@/components/BreakingNewsBar";

// Odświeżanie co 5 min: umożliwia planowaną publikację (artykuły z przyszłą datą).
export const revalidate = 300;

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});
const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
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
    <html lang="pl" suppressHydrationWarning className={`${archivo.variable} ${plex.variable} ${mono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <Script id="sj-intro" strategy="beforeInteractive">
          {"try{var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion-ok');if(!sessionStorage.getItem('sj-intro'))d.classList.add('intro-pending')}}catch(e){}"}
        </Script>
        <a
          href="#tresc"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-text focus:px-4 focus:py-2 focus:text-bg"
        >
          Przejdź do treści
        </a>
        <SiteHeader />
        <BreakingNewsBar />
        <main id="tresc" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
