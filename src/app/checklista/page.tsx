import type { Metadata } from "next";
import Link from "next/link";
import { Checklist72 } from "@/components/plan-b/Checklist72";
import { SCENARIOS } from "@/lib/preparedness";

export const metadata: Metadata = {
  title: "Checklista 72 godziny",
  description: "Sprawdź, czy Twój dom jest gotowy na 72 godziny. Interaktywna lista na podstawie rządowego Poradnika bezpieczeństwa.",
  alternates: { canonical: "/checklista" },
};

export default function Page() {
  return (
    <>
      <section className="border-b border-line">
        <div className="wrap py-12 md:py-16">
          <p className="label flex items-center gap-3 text-planb"><span aria-hidden className="h-4 w-1 bg-planb" />PLAN B · Checklista</p>
          <h1 className="hl mt-4 max-w-4xl text-4xl md:text-6xl">Czy Twój dom jest gotowy na 72 godziny?</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">Zaznacz to, co już masz. Brakujące pozycje to Twoja lista zakupów. Listę możesz wydrukować.</p>
        </div>
      </section>
      <div className="wrap mt-12">
        <Checklist72 />
      </div>
      <section className="wrap mt-16" aria-labelledby="dalej">
        <h2 id="dalej" className="label border-b border-line pb-3 text-muted">Przygotuj się na konkretną sytuację</h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-5">
          {SCENARIOS.map((s) => (
            <li key={s.slug} className="border-b border-line">
              <Link href={`/plan-b/scenariusze/${s.slug}`} className="group block py-5 pr-4">
                <span className="meta text-planb">{s.index}</span>
                <span className="mt-1 block font-display text-lg font-bold decoration-planb underline-offset-4 group-hover:underline">{s.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
