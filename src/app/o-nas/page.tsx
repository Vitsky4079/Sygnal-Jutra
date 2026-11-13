import type { Metadata } from "next";
import { PageIntro, accent } from "@/components/ui";
import { SERIES, SITE } from "@/lib/site";

export const metadata: Metadata = { title: "O nas", alternates: { canonical: "/o-nas" } };

export default function Page() {
  return (
    <>
      <PageIntro eyebrow="O nas" title={SITE.tagline}>{SITE.description}</PageIntro>
      <div className="wrap mt-10 grid gap-8 md:grid-cols-3">
        {Object.values(SERIES).map((s) => (
          <section key={s.key} style={accent(s.color)} className="border-t-4 border-accent pt-4">
            <h2 className="label text-accent">{s.name} · {s.kind}</h2>
            <p className="mt-3 text-muted">{s.blurb}</p>
          </section>
        ))}
      </div>
      {/* TODO: dane redakcji, zespół i zasady etyczne dostarczy właściciel serwisu */}
    </>
  );
}
