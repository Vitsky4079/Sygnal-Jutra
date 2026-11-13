import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getVideos } from "@/lib/content";
import { CHECKLIST, GEAR, SCENARIOS, SOURCE } from "@/lib/preparedness";
import { SERIES } from "@/lib/site";
import { IsoVignette } from "@/components/plan-b/Iso";
import { epTag, shortDate, thumbOf, ytUrl } from "@/components/ui";

export function generateStaticParams() {
  return SCENARIOS.map((s) => ({ slug: s.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/plan-b/scenariusze/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = SCENARIOS.find((x) => x.slug === slug);
  return s ? { title: `${s.title}: ${s.kicker}`, description: s.short, alternates: { canonical: `/plan-b/scenariusze/${slug}` } } : {};
}

export default async function Page({ params }: PageProps<"/plan-b/scenariusze/[slug]">) {
  const { slug } = await params;
  const s = SCENARIOS.find((x) => x.slug === slug);
  if (!s) notFound();
  const videos = await getVideos();
  const related = s.videoMatch ? videos.filter((v) => s.videoMatch!.some((m) => v.title.toLocaleLowerCase("pl").includes(m.toLocaleLowerCase("pl")))) : [];
  const groups = CHECKLIST.filter((g) => s.checklist.includes(g.id));
  const gear = GEAR.filter((g) => s.gear.includes(g.id));
  const next = SCENARIOS[(SCENARIOS.indexOf(s) + 1) % SCENARIOS.length];

  return (
    <article>
      <header className="relative overflow-hidden border-b border-line">
        <div className="wrap grid items-center gap-8 py-10 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:py-14">
          <div>
            <p className="meta"><Link href="/poradniki" className="hover:text-text">Poradniki</Link> / <span className="text-planb">Scenariusz {s.index}</span></p>
            <h1 className="hl mt-5 text-5xl md:text-7xl">{s.title}</h1>
            <p className="mt-3 font-display text-2xl font-semibold text-planb">{s.kicker}</p>
            <p className="mt-5 max-w-xl text-lg text-muted">{s.short}</p>
          </div>
          <IsoVignette kind={s.illustration} className="mx-auto w-full max-w-md" />
        </div>
      </header>

      <div className="wrap grid gap-14 py-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section aria-labelledby="kroki">
          <h2 id="kroki" className="label border-b border-text pb-3">Co zrobić według rządowego poradnika</h2>
          <ol className="divide-y divide-line">
            {s.steps.map((st, n) => (
              <li key={n} className="grid grid-cols-[3rem_1fr] gap-4 py-6">
                <span className="font-display text-3xl font-extrabold leading-none text-planb">{String(n + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-lg leading-relaxed">{st.text}</p>
                  <p className="meta mt-2">Poradnik bezpieczeństwa, {st.page}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-muted">
            Źródło: <a href={SOURCE.url} target="_blank" rel="noopener noreferrer" className="underline">{SOURCE.label}</a>. Numery stron według pliku PDF.
            Zawsze stosuj się do poleceń służb i komunikatów w Alertach RCB, RSO, radiu i telewizji.
          </p>

          <h2 className="label mt-14 border-b border-text pb-3">Sprawdź, czy masz</h2>
          <div className="grid gap-x-10 md:grid-cols-2">
            {groups.map((g) => (
              <div key={g.id} className="border-b border-line py-5">
                <h3 className="font-display text-lg font-bold">{g.title}</h3>
                <ul className="mt-2 space-y-1.5 text-[0.95rem] text-muted">
                  {g.items.map((it) => <li key={it.id} className="flex gap-3"><span aria-hidden className="mt-2 size-1.5 shrink-0 bg-planb" />{it.label}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <Link href="/checklista" className="label mt-6 inline-flex min-h-12 items-center gap-2 bg-planb px-6 text-bg hover:bg-text">
            Odhacz na pełnej checkliście 72 h <ArrowRight aria-hidden size={15} />
          </Link>
        </section>

        <aside className="space-y-10 lg:border-l lg:border-line lg:pl-8">
          <section aria-labelledby="sprzet">
            <h2 id="sprzet" className="label text-muted">Przydatny sprzęt</h2>
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {gear.map((g) => (
                <li key={g.id}>
                  <Link href={`/sklep#${g.id}`} className="group grid grid-cols-[4.5rem_1fr] items-center gap-3 py-3">
                    <IsoVignette kind={g.illustration} className="w-full" />
                    <span>
                      <span className="block font-display font-bold group-hover:text-planb">{g.name}</span>
                      <span className="block text-sm text-muted">{g.when}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {related.length > 0 && (
            <section aria-labelledby="wideo">
              <h2 id="wideo" className="label text-muted">Nasze materiały wideo</h2>
              <ul className="mt-3 space-y-4">
                {related.map((v) => (
                  <li key={v.slug} style={{ ["--accent" as string]: SERIES[v.series].color }}>
                    <a href={ytUrl(v)} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[4rem_1fr] gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={thumbOf(v)} alt="" loading="lazy" className="aspect-[9/16] w-full border border-line object-cover" />
                      <span>
                        <span className="meta text-accent">{SERIES[v.series].name} {epTag(v)}</span>
                        <span className="mt-1 block text-sm font-semibold leading-snug group-hover:underline">{v.title}</span>
                        <span className="meta mt-1 flex items-center gap-1">{shortDate(v.publishedAt)} · YouTube <ArrowUpRight aria-hidden size={11} /></span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <Link href={`/plan-b/scenariusze/${next.slug}`} className="group block border-t border-line pt-5">
            <span className="meta">Następny scenariusz</span>
            <span className="hl mt-1 block text-xl group-hover:text-planb">{next.title} →</span>
          </Link>
        </aside>
      </div>
    </article>
  );
}
