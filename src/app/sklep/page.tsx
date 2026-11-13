import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/content";
import { GEAR } from "@/lib/preparedness";
import { IsoVignette } from "@/components/plan-b/Iso";
import { PageIntro, ProductCard } from "@/components/ui";

export const metadata: Metadata = { title: "Sklep PLAN B", description: "Wyselekcjonowany sprzęt i poradniki PDF do przygotowań kryzysowych.", alternates: { canonical: "/sklep" } };

const MODES = [
  ["Polecany sprzęt", "Wybrane produkty u zewnętrznych sprzedawców. Linki partnerskie są zawsze oznaczone, a zakupu dokonujesz u sprzedawcy."],
  ["Poradniki PDF", "Checklisty i plany do pobrania, m.in. 72 godziny bez prądu i plecak ewakuacyjny. Sprzedaż po uruchomieniu płatności."],
  ["Własna oferta", "Produkty fizyczne wysyłane przez partnerów. Uruchomimy dopiero po uzgodnieniu warunków dostawy, zwrotów i gwarancji."],
];

export default async function Page() {
  const products = await getProducts();
  return (
    <>
      <PageIntro series="plan-b" eyebrow="PLAN B · Sklep" title="Sprzęt, który ma sens.">
        Wyselekcjonowana lista zamiast tysiąca ofert. Rekomendacje redakcyjne zawsze oddzielamy od treści reklamowych.
      </PageIntro>

      <div className="wrap mt-10" style={{ ["--accent" as string]: "var(--planb)" }}>
        {products.length > 0 && (
          <ul className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => <li key={p.slug}><ProductCard product={p} /></li>)}
          </ul>
        )}

        <section aria-labelledby="jak" className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label text-accent">Jak to będzie działać</p>
            <h2 id="jak" className="hl mt-3 text-3xl md:text-4xl">Trzy rodzaje oferty. Zawsze podpisane.</h2>
          </div>
          <ol className="divide-y divide-line border-y border-line lg:col-span-8">
            {MODES.map(([t, d], i) => (
              <li key={t} className="grid gap-2 py-6 md:grid-cols-[3rem_14rem_1fr]">
                <span className="meta">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-lg font-bold">{t}</h3>
                <p className="text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="kat" className="mt-16">
          <h2 id="kat" className="label border-b border-text pb-3">Kategorie sprzętu</h2>
          <ul className="divide-y divide-line">
            {GEAR.map((g, i) => (
              <li key={g.id} id={g.id} className="grid scroll-mt-28 gap-6 py-8 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-10">
                <IsoVignette kind={g.illustration} className="w-full max-w-[12rem]" />
                <div>
                  <span className="meta text-accent">{String(i + 1).padStart(2, "0")} · produkty w selekcji</span>
                  <h3 className="hl mt-1 text-2xl md:text-3xl">{g.name}</h3>
                  <p className="mt-2 max-w-2xl text-muted">{g.what}</p>
                  <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
                    <div><dt className="meta">Dla kogo</dt><dd className="mt-1">{g.who}</dd></div>
                    <div><dt className="meta">Kiedy się przydaje</dt><dd className="mt-1">{g.when}</dd></div>
                    <div><dt className="meta">Ograniczenia</dt><dd className="mt-1">{g.limits}</dd></div>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">Katalog uzupełnimy po weryfikacji produktów i warunków partnerów. Do tego czasu zobacz <Link href="/plan-b" className="underline">materiały PLAN B</Link>.</p>
        </section>
      </div>
    </>
  );
}
