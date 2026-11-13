import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock3, Printer, SquareCheckBig } from "lucide-react";
import { PDFS, PDF_STATUS } from "@/lib/pdfs";
import { PdfCover } from "@/components/cinematic/PdfCover";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export const metadata: Metadata = {
  title: "PDF-y PLAN B: poradniki i checklisty do druku",
  description: "Cyfrowa biblioteka PLAN B: 72 godziny bez prądu, plecak ewakuacyjny, domowa gotowość na 7 dni i plan awaryjny dla rodziny.",
  alternates: { canonical: "/pdfy" },
};

const PILLARS = [
  { icon: BookOpen, t: ["Praktyczna", "wiedza"] },
  { icon: SquareCheckBig, t: ["Gotowe", "checklisty"] },
  { icon: Printer, t: ["Do pobrania", "i wydruku"] },
];

/** PDF-y (Reference D): cyfrowa biblioteka. Tytuły są w przygotowaniu; zakup i pobieranie włączymy, gdy pliki i płatności będą gotowe. */
export default function Page() {
  return (
    <>
      <section aria-labelledby="pdf-h" className="relative -mt-16 overflow-hidden md:-mt-24">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(45%_40%_at_0%_45%,rgba(164,211,127,.20),transparent_70%),radial-gradient(40%_45%_at_100%_35%,rgba(164,211,127,.10),transparent_70%),linear-gradient(180deg,#0a1a2a_0%,#081624_55%,#071321_100%)]" />
        {/* delikatne linie sygnału w prawym górnym rogu */}
        <svg aria-hidden className="pointer-events-none absolute right-0 top-0 h-[60%] w-[45%] opacity-[.22]" viewBox="0 0 600 400" preserveAspectRatio="none" fill="none">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={i} d={`M0 ${330 - i * 18} C 180 ${250 - i * 22}, 320 ${380 - i * 10}, 600 ${120 - i * 16}`} stroke="#a4d37f" strokeWidth="1" />
          ))}
        </svg>
        <div aria-hidden className="grain absolute inset-0" />

        <div className="wrap relative pb-16 pt-24 md:pb-24 md:pt-32">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1.6fr)_auto_minmax(0,1fr)] xl:items-center">
            <div>
              <p className="flex items-center gap-4 text-[0.95rem] font-bold uppercase tracking-[0.14em] text-planb">Cyfrowa biblioteka PLAN B <span aria-hidden className="h-0.5 w-24 bg-gradient-to-r from-planb to-transparent md:w-40" /></p>
              <h1 id="pdf-h" className="display mt-3 text-[clamp(2.3rem,4.2vw,4.6rem)] xl:whitespace-nowrap">Przygotuj swój plan<span className="text-sygnal">.</span></h1>
              <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-text/85 md:text-xl">Praktyczne poradniki, checklisty i gotowe plany działania, które pomogą Ci przygotować dom, rodzinę i siebie na sytuacje kryzysowe.</p>
            </div>
            <span aria-hidden className="hidden h-32 w-px bg-text/20 xl:block" />
            <ul className="grid grid-cols-3 gap-4">
              {PILLARS.map(({ icon: Icon, t }) => (
                <li key={t[0]} className="flex flex-col items-center gap-3 text-center">
                  <Icon aria-hidden size={46} strokeWidth={1.3} className="text-planb" />
                  <span className="text-[0.95rem] font-semibold leading-snug">{t[0]}<br />{t[1]}</span>
                </li>
              ))}
            </ul>
          </div>

          <h2 className="sr-only">Tytuły</h2>
          <ol className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 md:mt-20 xl:grid-cols-4">
            {PDFS.map((p) => (
              <li key={p.slug} id={p.slug} className="group flex scroll-mt-28 flex-col">
                <div className="px-2 transition-transform duration-500 group-hover:-translate-y-1.5">
                  <PdfCover pdf={p} />
                </div>
                <h3 className="mt-8 text-lg font-bold leading-tight xl:text-[1.2rem]">PLAN B — {p.title}</h3>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-text/75">{p.lead}</p>
                <div className="mt-6">
                  <span className="inline-flex min-h-11 items-center gap-2.5 rounded-lg border-2 border-planb/90 px-5 font-semibold">
                    <Clock3 aria-hidden size={18} className="text-planb" /> {PDF_STATUS[p.status]}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="wsrodku" className="wrap py-16 md:py-20">
        <h2 id="wsrodku" className="display text-2xl md:text-3xl">Co znajdziesz w środku<span className="text-sygnal">.</span></h2>
        <ul className="mt-8 grid gap-x-10 gap-y-8 border-t border-line pt-8 sm:grid-cols-2 xl:grid-cols-4">
          {PDFS.map((p) => (
            <li key={p.slug} className="text-sm">
              <p className="font-bold">{p.title}</p>
              <p className="mt-1 text-muted">{p.audience}</p>
              <ul className="mt-3 space-y-1 text-text/85">{p.topics.map((t) => <li key={t} className="before:mr-2 before:text-planb before:content-['/']">{t}</li>)}</ul>
              {p.related && <Link href={p.related.href} className="mt-3 inline-block text-planb underline-offset-4 hover:underline">Już teraz: {p.related.label}</Link>}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="powiadom" className="border-y border-line bg-bg-3">
        <div className="wrap grid gap-10 py-14 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <h2 id="powiadom" className="display text-3xl md:text-4xl">Daj znać, gdy pierwszy poradnik będzie gotowy<span className="text-sygnal">.</span></h2>
            <p className="mt-4 max-w-md text-muted">Nie sprzedajemy jeszcze żadnych plików. Gdy materiały przejdą redakcję, poinformujemy o tym w newsletterze, razem z ceną lub informacją, że są bezpłatne.</p>
          </div>
          <NewsletterSignup />
        </div>
      </section>
    </>
  );
}
