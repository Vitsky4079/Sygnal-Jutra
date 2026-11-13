import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3, FileText, Printer, BookOpen } from "lucide-react";
import { PDFS, PDF_STATUS } from "@/lib/pdfs";
import { PdfCover } from "@/components/cinematic/PdfCover";
import { Reveal } from "@/components/motion/Reveal";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export const metadata: Metadata = {
  title: "PDF-y PLAN B: poradniki i checklisty do druku",
  description: "Cyfrowa biblioteka PLAN B: poradniki o blackoucie, plecaku ewakuacyjnym, domowej gotowości na 7 dni i planie awaryjnym dla rodziny.",
  alternates: { canonical: "/pdfy" },
};

const PILLARS = [
  { icon: BookOpen, t: "Praktyczna wiedza", d: "Oparta na rządowym Poradniku bezpieczeństwa i źródłach, które podajemy." },
  { icon: FileText, t: "Gotowe checklisty", d: "Do odhaczania w domu, bez zbędnej teorii." },
  { icon: Printer, t: "Do druku", d: "Format A4, czytelny także w czerni i bieli, gdy nie ma prądu." },
];

export default function Page() {
  return (
    <>
      <section aria-labelledby="pdf-h" className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 size-[40rem] rounded-full bg-planb/[.06] blur-3xl" />
        <div className="wrap relative grid gap-12 py-14 md:py-20 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="label flex items-center gap-3 text-planb">Cyfrowa biblioteka PLAN B <span aria-hidden className="h-px w-16 bg-planb/60" /></p>
            <h1 id="pdf-h" className="display mt-5 text-[clamp(2.6rem,6.4vw,5.6rem)]">Przygotuj swój plan<span className="text-sygnal">.</span></h1>
            <p className="mt-6 max-w-xl text-lg text-text/80">
              Poradniki, checklisty i plany działania, które pomogą przygotować dom, rodzinę i siebie na sytuacje kryzysowe. Pierwsze tytuły są w przygotowaniu.
            </p>
          </div>
          <ul className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1 lg:border-l lg:border-line lg:pl-10">
            {PILLARS.map(({ icon: Icon, t, d }) => (
              <li key={t} className="flex gap-4">
                <Icon aria-hidden size={26} strokeWidth={1.5} className="shrink-0 text-planb" />
                <div><p className="font-display font-bold">{t}</p><p className="mt-1 text-sm text-muted">{d}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Reveal as="section" aria-labelledby="tytuly" className="wrap py-16 md:py-24">
        <h2 id="tytuly" className="sr-only">Tytuły</h2>
        <ol className="grid gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-4">
          {PDFS.map((p) => (
            <li key={p.slug} id={p.slug} data-reveal className="group scroll-mt-28">
              <div className="transition-transform duration-500 [transform:perspective(1200px)] group-hover:[transform:perspective(1200px)_rotateY(-6deg)_translateY(-4px)]">
                <PdfCover pdf={p} />
              </div>
              <h3 className="mt-7 font-display text-xl font-bold leading-tight">PLAN B: {p.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{p.lead}</p>
              <dl className="mt-5 space-y-3 border-t border-line pt-4 text-sm">
                <div><dt className="meta">Dla kogo</dt><dd className="mt-1 text-text/85">{p.audience}</dd></div>
                <div>
                  <dt className="meta">W środku</dt>
                  <dd className="mt-1"><ul className="space-y-0.5 text-text/85">{p.topics.map((t) => <li key={t} className="before:mr-2 before:text-planb before:content-['/']">{t}</li>)}</ul></dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <span className="inline-flex min-h-10 items-center gap-2 border border-planb/70 px-3.5 text-sm font-semibold text-planb">
                  <Clock3 aria-hidden size={15} /> {PDF_STATUS[p.status]}
                </span>
                {p.related && (
                  <Link href={p.related.href} className="inline-flex min-h-10 items-center gap-1.5 text-sm text-text/80 underline-offset-4 hover:text-text hover:underline">
                    Już teraz: {p.related.label} <ArrowRight aria-hidden size={14} />
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      <section aria-labelledby="powiadom" className="border-y border-line bg-bg-3">
        <div className="wrap grid gap-10 py-14 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <p className="label text-planb">Bez spamu, bez presji</p>
            <h2 id="powiadom" className="hl mt-3 text-3xl md:text-4xl">Daj znać, gdy pierwszy poradnik będzie gotowy.</h2>
            <p className="mt-4 max-w-md text-muted">Nie sprzedajemy jeszcze żadnych plików. Gdy materiały przejdą redakcję, poinformujemy o tym w newsletterze, razem z ceną lub informacją, że są bezpłatne.</p>
          </div>
          <NewsletterSignup />
        </div>
      </section>
    </>
  );
}
