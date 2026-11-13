import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { CATEGORIES, TIER_ORDER, formatPLN, getCategory, productsFor } from "@/lib/shop";
import { CategoryNav, Disclosure, TierCard } from "@/components/shop/ShopParts";
import { Reveal } from "@/components/motion/Reveal";

export const dynamicParams = false;
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ kategoria: c.id }));
}

export async function generateMetadata({ params }: PageProps<"/sklep/[kategoria]">): Promise<Metadata> {
  const c = getCategory((await params).kategoria);
  if (!c) return {};
  return {
    title: `${c.name}: trzy sprawdzone propozycje`,
    description: `${c.lead} Porównanie: budżetowy, polecany i premium.`,
    alternates: { canonical: `/sklep/${c.id}` },
    openGraph: { images: [{ url: c.image, width: 1376, height: 768 }] },
  };
}

export default async function Page({ params }: PageProps<"/sklep/[kategoria]">) {
  const c = getCategory((await params).kategoria);
  if (!c) notFound();
  const list = productsFor(c.id);
  const byTier = Object.fromEntries(list.map((p) => [p.tier, p]));
  const idx = CATEGORIES.findIndex((x) => x.id === c.id);
  const next = CATEGORIES[(idx + 1) % CATEGORIES.length];
  const prices = list.map((p) => p.pricePLN).filter((v): v is number => v != null);
  const minPrice = prices.length ? formatPLN(Math.floor(Math.min(...prices))) : "–";
  const checked = list.length ? new Date(list.map((p) => p.lastVerified).sort()[0]).toLocaleDateString("pl-PL", { day: "numeric", month: "short" }) : "–";
  const max = Math.max(0, ...list.map((p) => p.metric?.value ?? 0)) || undefined;

  return (
    <>
      <section aria-labelledby="kat-h" className="relative -mt-16 overflow-hidden md:-mt-20">
        {/* Tło: granat z rozproszonym ciepłym światłem z kierunku obrazu, bez pejzażu na całą szerokość */}
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_80%_at_85%_20%,rgba(255,113,61,.10),transparent_60%),radial-gradient(60%_60%_at_10%_100%,rgba(54,207,240,.05),transparent_70%),linear-gradient(180deg,#050d18_0%,#071321_100%)]" />
        <div aria-hidden className="grain absolute inset-0" />
        <div className="wrap relative grid gap-10 pb-12 pt-28 md:pt-36 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:items-center lg:gap-16 lg:pb-20">
          <div>
            <nav aria-label="Ścieżka" className="label flex items-center gap-2 text-[0.68rem] text-text/60">
              <Link href="/sklep" className="hover:text-text">PLAN B / Sklep</Link> <span aria-hidden>/</span> <span className="text-planb">{String(idx + 1).padStart(2, "0")}</span>
            </nav>
            <h1 id="kat-h" className="display mt-5 text-[clamp(2.4rem,5.4vw,4.8rem)]">{c.name}<span className="text-sygnal">.</span></h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-text/80">{c.lead}</p>
            <dl className="mt-8 grid max-w-md grid-cols-3 border-y border-line text-sm">
              <div className="py-3 pr-3"><dt className="meta">Propozycje</dt><dd className="mt-1 font-display text-xl font-bold">{list.length} / 3</dd></div>
              <div className="border-l border-line px-3 py-3"><dt className="meta">Od</dt><dd className="mt-1 font-display text-xl font-bold">{minPrice}</dd></div>
              <div className="border-l border-line py-3 pl-3"><dt className="meta">Sprawdzono</dt><dd className="mt-1 font-display text-xl font-bold">{checked}</dd></div>
            </dl>
          </div>
          <figure className="relative -mx-5 md:mx-0">
            <div className="relative aspect-[4/3] overflow-hidden bg-bg-3 md:aspect-[16/10] md:shadow-[0_50px_100px_-50px_rgba(0,0,0,.9)] md:ring-1 md:ring-white/[.06]">
              <Image src={c.image} alt={c.imageAlt} fill priority sizes="(min-width: 1024px) 56vw, 100vw" className={`object-cover ${c.focus ?? "object-center"}`} />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg-3/50 via-transparent to-transparent" />
            </div>
            <figcaption className="meta mt-3 px-5 md:px-0">Wizualizacja kategorii. Nie przedstawia konkretnego modelu z porównania.</figcaption>
          </figure>
        </div>
      </section>

      <div className="wrap border-t border-line pt-6">
        <CategoryNav active={c.id} />
      </div>

      <section aria-labelledby="porownanie" className="wrap mt-16 md:mt-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-planb">Trzy poziomy rekomendacji</p>
            <h2 id="porownanie" className="hl mt-3 text-3xl md:text-4xl">Porównanie</h2>
          </div>
          <p className="max-w-md text-sm text-muted">Budżetowy to rozsądny start, polecany to nasz wybór, premium daje więcej możliwości. Przy każdym produkcie podajemy też jego ograniczenia.</p>
        </div>
        <div className="mt-10 grid gap-6 lg:mt-16 lg:grid-cols-3 lg:items-start lg:gap-0">
          {TIER_ORDER.map((t) => (
            <div key={t} className={t === "polecany" ? "max-lg:order-first lg:z-10" : t === "budzetowy" ? "lg:-mr-px" : "lg:-ml-px"}>
              <TierCard tier={t} product={byTier[t]} max={max} />
            </div>
          ))}
        </div>
        <Disclosure className="mt-12" />
      </section>

      <Reveal as="section" aria-labelledby="wiedz" className="wrap mt-20 md:mt-28">
        <div className="grid gap-10 border-t border-line pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <div>
            <p className="label flex items-center gap-2 text-kontekst"><Info aria-hidden size={14} /> Zanim kupisz</p>
            <h2 id="wiedz" data-reveal="mask" className="hl mt-3 text-3xl md:text-4xl">{c.explainer.title}</h2>
          </div>
          <ol className="space-y-6">
            {c.explainer.points.map((p, i) => (
              <li key={p} data-reveal className="grid grid-cols-[2.5rem_1fr] gap-3 text-[1.02rem] leading-relaxed text-text/85">
                <span className="meta pt-1 text-kontekst">{String(i + 1).padStart(2, "0")}</span>{p}
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <nav aria-label="Kolejna kategoria" className="wrap mt-20 flex flex-wrap justify-between gap-4 border-t border-line pt-8">
        <Link href="/sklep" className="inline-flex min-h-11 items-center gap-2 text-muted hover:text-text"><ArrowLeft aria-hidden size={16} /> Wszystkie kategorie</Link>
        <Link href={`/sklep/${next.id}`} className="group inline-flex min-h-11 items-center gap-3 font-display text-xl font-bold">
          <span className="meta">Dalej</span> {next.name} <ArrowRight aria-hidden size={18} className="text-sygnal transition-transform group-hover:translate-x-1" />
        </Link>
      </nav>
    </>
  );
}
