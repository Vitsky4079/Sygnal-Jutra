import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getVideos } from "@/lib/content";
import { SERIES } from "@/lib/site";
import { DIGITAL_GUIDES, GEAR, SCENARIOS, SOURCE } from "@/lib/preparedness";
import { epTag, shortDate, thumbOf, ytUrl } from "@/components/ui";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { SygnalMotion } from "@/components/motion/SygnalMotion";
import { Reveal } from "@/components/motion/Reveal";
import { HeroScene } from "@/components/plan-b/HeroScene";
import { ScenarioExplorer } from "@/components/plan-b/ScenarioExplorer";
import { Checklist72 } from "@/components/plan-b/Checklist72";
import { GuideCover } from "@/components/plan-b/GuideCover";
import { IsoVignette } from "@/components/plan-b/Iso";

const LEARN = [
  { q: "Jak przygotować się na wielodniowy blackout?", a: "Światło, ciepło, łączność, zapasy i gotówka: co mówi rządowy poradnik.", slug: "blackout" },
  { q: "Ile wody zgromadzić i jak radzić sobie bez bieżącej wody?", a: "Minimum 3 litry na osobę na dobę, a do tego higiena i prowizoryczna toaleta.", slug: "brak-wody" },
  { q: "Co spakować do plecaka ewakuacyjnego?", a: "Lista z poradnika: od wody i apteczki po kopie dokumentów i gotówkę.", slug: "ewakuacja" },
  { q: "Jak odróżnić sygnały alarmowe?", a: "Dwa sygnały, po 3 minuty każdy. Modulowany ogłasza alarm, jednostajny go odwołuje.", slug: "alarmy" },
];

function SectionTitle({ eyebrow, title, children, id }: { eyebrow: string; title: string; children?: React.ReactNode; id: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-end">
      <div>
        <p data-reveal className="label flex items-center gap-3 text-planb"><span aria-hidden className="h-4 w-1 bg-planb" />{eyebrow}</p>
        <h2 id={id} data-reveal="mask" className="hl mt-4 text-[2.3rem] md:text-5xl xl:text-[3.6rem]">{title}</h2>
      </div>
      {children && <div data-reveal className="text-muted md:pb-2">{children}</div>}
    </div>
  );
}

export default async function Home() {
  const videos = await getVideos();
  const media = (["sygnal", "kontekst", "plan-b"] as const).map((k) => videos.find((v) => v.series === k)).filter((v) => v !== undefined);

  return (
    <>
      {/* A. HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_75%_45%,rgba(164,211,127,0.07),transparent_70%)]" />
        <div className="wrap relative grid items-center gap-6 pb-10 pt-4 md:pt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-4 lg:pb-14 lg:pt-10">
          <SygnalMotion className="relative z-10">
            <p data-sm="meta" className="label flex items-center gap-3 text-planb">
              <span aria-hidden className="size-2 bg-planb" /> PLAN B · Sygnał Jutra
            </p>
            <h1 className="hl mt-5 text-[2.6rem] leading-[0.98] sm:text-6xl xl:text-[4.6rem]">
              <span className="block overflow-hidden pb-1"><span data-sm="mast" className="block">Nie czekaj na kryzys.</span></span>
              <span className="block overflow-hidden pb-1"><span data-sm="mast" className="block text-planb">Przygotuj swój plan.</span></span>
            </h1>
            <p data-sm="meta" className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Praktyczne instrukcje, sprawdzone wyposażenie i narzędzia, które pomogą Ci przygotować się na nieprzewidziane sytuacje.
            </p>
            <div data-sm="meta" className="mt-8 flex flex-wrap gap-3">
              <Link href="/checklista" className="label inline-flex min-h-12 items-center gap-2 bg-planb px-6 text-bg transition-colors hover:bg-text">
                Zacznij przygotowania <ArrowRight aria-hidden size={15} />
              </Link>
              <Link href="#sprzet" className="label inline-flex min-h-12 items-center border border-line px-6 transition-colors hover:border-planb hover:text-planb">
                Zobacz wyposażenie
              </Link>
            </div>
            <p data-sm="meta" className="mt-6 max-w-sm text-sm leading-relaxed text-muted md:mt-8">
              Zalecenia opieramy na rządowym{" "}
              <a href={SOURCE.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-text">Poradniku bezpieczeństwa</a>.
            </p>
          </SygnalMotion>

          <div className="relative order-first -mx-3 -mb-4 sm:mx-0 lg:order-none lg:-mr-10 lg:mb-0">
            <HeroScene />
            <p className="meta absolute bottom-0 right-0 hidden lg:block">Wskaż przedmiot, by zobaczyć kategorię</p>
          </div>
        </div>
      </section>

      {/* B. SCENARIUSZE */}
      <Reveal as="section" className="wrap mt-20 md:mt-28" aria-labelledby="scenariusze">
        <SectionTitle id="scenariusze" eyebrow="Scenariusze" title="Na co chcesz się przygotować?">
          Pięć realnych sytuacji. W każdej znajdziesz zalecenia z rządowego poradnika, listę rzeczy do sprawdzenia i potrzebny sprzęt.
        </SectionTitle>
        <div data-reveal className="mt-12">
          <ScenarioExplorer scenarios={SCENARIOS} />
        </div>
      </Reveal>

      {/* C. SPRZĘT */}
      <Reveal as="section" className="mt-24 border-y border-line bg-bg-3 py-16 md:mt-32 md:py-24" aria-labelledby="sprzet">
        <div className="wrap">
          <SectionTitle id="sprzet" eyebrow="Sprzęt i sklep" title="Sprzęt, na którym możesz polegać.">
            Pokażemy wyłącznie sprawdzone produkty z prawdziwymi cenami i jasno oznaczonymi linkami partnerskimi. Pierwsze rekomendacje są w selekcji.
          </SectionTitle>

          <ul className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2">
            {GEAR.map((g, i) => (
              <li key={g.id} data-reveal className={`bg-bg-3 ${i === 0 ? "sm:col-span-2 lg:col-span-6 lg:row-span-2" : "lg:col-span-3"}`}>
                <Link href={`/sklep#${g.id}`} className="group relative flex h-full flex-col p-6 md:p-7">
                  <div className="flex items-baseline justify-between">
                    <span className="meta text-planb">{String(i + 1).padStart(2, "0")}</span>
                    <span className="meta">W selekcji</span>
                  </div>
                  <IsoVignette kind={g.illustration} className={`mx-auto my-2 w-full transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.03] ${i === 0 ? "max-w-[30rem] lg:my-8" : "max-w-[15rem]"}`} />
                  <h3 className={`hl ${i === 0 ? "text-3xl md:text-4xl" : "text-xl"}`}>{g.name}</h3>
                  <p className={`mt-2 text-muted ${i === 0 ? "max-w-md" : "text-sm"}`}>{g.what}</p>
                  {i === 0 && (
                    <dl className="mt-6 grid gap-4 border-t border-line pt-5 text-sm sm:grid-cols-2">
                      <div><dt className="meta">Kiedy się przydaje</dt><dd className="mt-1">{g.when}</dd></div>
                      <div><dt className="meta">Ograniczenia</dt><dd className="mt-1">{g.limits}</dd></div>
                    </dl>
                  )}
                  <span className="label mt-auto inline-flex items-center gap-2 pt-5 text-planb">
                    Zobacz kategorię <ArrowRight aria-hidden size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-planb transition-transform duration-500 group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* D. CHECKLISTA 72 h */}
      <Reveal as="section" className="wrap mt-24 md:mt-32" aria-labelledby="gotowosc">
        <SectionTitle id="gotowosc" eyebrow="Narzędzie" title="Czy Twój dom jest gotowy na 72 godziny?">
          Zaznacz, co już masz. Lista pochodzi z rządowego poradnika i zapisuje się tylko na Twoim urządzeniu.
        </SectionTitle>
        <div data-reveal className="mt-12">
          <Checklist72 compact />
        </div>
      </Reveal>

      {/* E. PORADNIKI PDF */}
      <Reveal as="section" className="mt-24 border-y border-line py-16 md:mt-32 md:py-24" aria-labelledby="pdf">
        <div className="wrap">
          <SectionTitle id="pdf" eyebrow="Poradniki PLAN B" title="Wiedza, którą możesz wydrukować.">
            Nasze własne poradniki PDF. Są w przygotowaniu i nie są jeszcze w sprzedaży. Zapisz się, a damy znać o premierze.
          </SectionTitle>
          <ul className="mt-14 grid gap-14 md:grid-cols-3 md:gap-10">
            {DIGITAL_GUIDES.map((g) => (
              <li key={g.id} data-reveal>
                <GuideCover no={g.no} title={g.title} kind={g.kind} className="mx-auto max-w-[16rem] lg:max-w-[17.5rem]" />
                <div className="mx-auto mt-8 max-w-[16rem] lg:max-w-[17.5rem]">
                  <p className="meta">Planowana zawartość</p>
                  <ul className="mt-3 divide-y divide-line border-y border-line text-[0.95rem]">
                    {g.plan.map((p) => <li key={p} className="py-2.5">{p}</li>)}
                  </ul>
                  <p className="mt-4 flex items-center justify-between gap-4">
                    <span className="meta text-planb">W przygotowaniu</span>
                    <Link href="/newsletter" className="label text-muted hover:text-text">Powiadom mnie →</Link>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* F. PORADNIKI PRAKTYCZNE */}
      <Reveal as="section" className="wrap mt-24 md:mt-32" aria-labelledby="wiedza">
        <SectionTitle id="wiedza" eyebrow="Poradniki" title="Konkretne odpowiedzi na konkretne pytania." />
        <ol className="mt-12 grid border-t border-line md:grid-cols-2">
          {LEARN.map((l, i) => (
            <li key={l.slug} data-reveal className={`border-b border-line ${i % 2 === 0 ? "md:border-r md:pr-10" : "md:pl-10"}`}>
              <Link href={`/plan-b/scenariusze/${l.slug}`} className="group grid grid-cols-[3rem_1fr] gap-4 py-8">
                <span className="font-display text-3xl font-extrabold leading-none text-line transition-colors group-hover:text-planb">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="hl block text-2xl group-hover:underline decoration-planb decoration-2 underline-offset-4">{l.q}</span>
                  <span className="mt-2 block text-muted">{l.a}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <Link href="/poradniki" className="label mt-6 inline-block text-planb">Wszystkie poradniki →</Link>
      </Reveal>

      {/* G. MEDIA */}
      {media.length > 0 && (
        <section className="wrap mt-24 md:mt-32" aria-labelledby="media">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-text pb-3">
            <h2 id="media" className="label">Z redakcji Sygnał Jutra</h2>
            <p className="meta flex gap-5">
              <Link href="/sygnal" className="hover:text-sygnal">Aktualności →</Link>
              <Link href="/kontekst" className="hover:text-kontekst">KONTEKST →</Link>
              <Link href="/wideo" className="hover:text-text">Wideo →</Link>
            </p>
          </div>
          <ul className="grid md:grid-cols-3">
            {media.map((v, i) => {
              const s = SERIES[v.series];
              return (
                <li key={v.slug} className={`border-b border-line md:border-b-0 ${i > 0 ? "md:border-l md:pl-8" : ""} ${i < media.length - 1 ? "md:pr-8" : ""}`} style={{ ["--accent" as string]: s.color }}>
                  <a href={ytUrl(v)} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[4.5rem_1fr] gap-4 py-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={thumbOf(v)} alt="" loading="lazy" className="aspect-[9/16] w-full border border-line object-cover" />
                    <span>
                      <span className="meta text-accent">{s.name} {epTag(v)}</span>
                      <span className="mt-1 block font-display text-[1.05rem] font-bold leading-snug group-hover:underline decoration-accent underline-offset-4">{v.title}</span>
                      <span className="meta mt-2 flex items-center gap-2">{shortDate(v.publishedAt)} · YouTube <ArrowUpRight aria-hidden size={12} /></span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* H. NEWSLETTER */}
      <section className="wrap mt-24 md:mt-28">
        <div className="grid gap-8 border-t-4 border-planb pt-10 md:grid-cols-2">
          <div>
            <h2 className="hl text-3xl md:text-[2.6rem]">Przygotuj się, zanim będzie trzeba.</h2>
            <p className="mt-3 max-w-md text-muted">Praktyczne materiały, nowe poradniki i informacja o premierze poradników PDF. Bez straszenia i bez spamu.</p>
          </div>
          <NewsletterSignup />
        </div>
      </section>
    </>
  );
}
