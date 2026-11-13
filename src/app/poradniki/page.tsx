import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IsoVignette } from "@/components/plan-b/Iso";
import { SCENARIOS, SOURCE } from "@/lib/preparedness";

export const metadata: Metadata = {
  title: "Poradniki",
  description: "Praktyczne poradniki PLAN B: blackout, brak łączności, brak wody, ewakuacja i sygnały alarmowe.",
  alternates: { canonical: "/poradniki" },
};

export default function Page() {
  return (
    <>
      <section className="border-b border-line">
        <div className="wrap py-12 md:py-16">
          <p className="label flex items-center gap-3 text-planb"><span aria-hidden className="h-4 w-1 bg-planb" />PLAN B · Poradniki</p>
          <h1 className="hl mt-4 max-w-4xl text-4xl md:text-6xl">Co robić, zanim i kiedy coś się stanie.</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Każdy poradnik opiera się na rządowym{" "}
            <a href={SOURCE.url} target="_blank" rel="noopener noreferrer" className="underline">Poradniku bezpieczeństwa</a>, z odnośnikami do konkretnych stron.
          </p>
        </div>
      </section>
      <ol className="wrap">
        {SCENARIOS.map((s) => (
          <li key={s.slug} className="border-b border-line">
            <Link href={`/plan-b/scenariusze/${s.slug}`} className="group grid items-center gap-6 py-8 md:grid-cols-[4rem_minmax(0,1fr)_14rem] md:gap-10">
              <span className="font-display text-4xl font-extrabold text-line transition-colors group-hover:text-planb">{s.index}</span>
              <span>
                <span className="meta text-planb">{s.kicker}</span>
                <span className="hl mt-1 block text-3xl decoration-planb decoration-2 underline-offset-4 group-hover:underline md:text-4xl">{s.title}</span>
                <span className="mt-2 block max-w-2xl text-muted">{s.short}</span>
                <span className="label mt-4 inline-flex items-center gap-2 text-planb">Czytaj <ArrowRight aria-hidden size={14} /></span>
              </span>
              <IsoVignette kind={s.illustration} className="hidden w-full md:block" />
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
