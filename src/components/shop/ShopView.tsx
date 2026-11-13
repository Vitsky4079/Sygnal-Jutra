import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Backpack, Compass, Crown, Droplet, Flashlight, House, Info, Layers, Radio, ShieldCheck, Star, Zap, type LucideIcon } from "lucide-react";
import { CATEGORIES, TIER_ORDER, TIERS, formatPLN, getCategory, productsFor, tierImage, type CategoryId, type Tier } from "@/lib/shop";
import { Disclosure, TierCard } from "./ShopParts";

export const CAT_ICON: Record<CategoryId, LucideIcon> = {
  zasilanie: Zap,
  oswietlenie: Flashlight,
  lacznosc: Radio,
  woda: Droplet,
  ewakuacja: Backpack,
  dom: House,
};

const BENEFITS = [
  { icon: ShieldCheck, t: "Sprawdzone propozycje" },
  { icon: Layers, t: "3 poziomy rekomendacji" },
  { icon: Compass, t: "Praktyczne zastosowanie" },
];

function Badge({ tier }: { tier: Tier }) {
  if (tier === "polecany")
    return <span className="inline-flex items-center gap-1.5 rounded-full bg-planb px-3.5 py-1.5 text-[0.8rem] font-extrabold uppercase tracking-wide text-bg-3"><Star aria-hidden size={14} fill="currentColor" />{TIERS[tier].label}</span>;
  if (tier === "premium")
    return <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2a2216]/90 px-3.5 py-1.5 text-[0.8rem] font-extrabold uppercase tracking-wide text-[#f5b13d] backdrop-blur-sm"><Crown aria-hidden size={14} />{TIERS[tier].label}</span>;
  return <span className="inline-flex items-center rounded-full bg-[#1c2636]/90 px-3.5 py-1.5 text-[0.8rem] font-extrabold uppercase tracking-wide text-text/90 backdrop-blur-sm">{TIERS[tier].label}</span>;
}

/**
 * Sklep PLAN B (Reference C): nagłówek z korzyściami, zakładki kategorii, panel wybranej kategorii
 * z trzema poziomami, kafle pozostałych kategorii, a niżej szczegóły zweryfikowanych produktów.
 */
export function ShopView({ active }: { active: CategoryId }) {
  const c = getCategory(active)!;
  const list = productsFor(active);
  const byTier = Object.fromEntries(list.map((p) => [p.tier, p]));
  const idx = CATEGORIES.findIndex((x) => x.id === active);
  const next = CATEGORIES[(idx + 1) % CATEGORIES.length];
  const others = CATEGORIES.filter((x) => x.id !== active);
  const max = Math.max(0, ...list.map((p) => p.metric?.value ?? 0)) || undefined;

  return (
    <>
      <section aria-labelledby="sklep-h" className="relative -mt-16 overflow-hidden md:-mt-24">
        {/* tło: granat + ciepła poświata z prawej góry, bez zdjęcia na całą stronę */}
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(55%_60%_at_100%_0%,rgba(255,113,61,.28),rgba(255,113,61,.06)_45%,transparent_70%),radial-gradient(50%_50%_at_0%_100%,rgba(54,120,200,.10),transparent_70%),linear-gradient(180deg,#081627_0%,#071321_60%,#071321_100%)]" />
        <div aria-hidden className="grain absolute inset-0" />

        <div className="wrap relative pb-14 pt-24 md:pt-32">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
            <div>
              <p className="text-[0.95rem] font-semibold uppercase tracking-[0.16em]"><span className="text-planb">PLAN B</span> <span className="mx-2 text-text/60">/</span> <span className="text-text/85">Sklep</span></p>
              <h1 id="sklep-h" className="display mt-3 text-[clamp(2rem,3.6vw,3.9rem)] xl:whitespace-nowrap">Sprzęt, który ma znaczenie<span className="text-sygnal">.</span></h1>
              <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-text/80 md:text-xl">Wyselekcjonowane wyposażenie, które pomoże Ci przygotować dom, rodzinę i siebie na nieprzewidziane sytuacje.</p>
            </div>
            <ul className="grid grid-cols-3 lg:pb-2">
              {BENEFITS.map(({ icon: Icon, t }, i) => (
                <li key={t} className={`flex flex-col items-center gap-2 px-3 text-center md:px-6 ${i ? "border-l border-text/15" : ""}`}>
                  <Icon aria-hidden size={38} strokeWidth={1.4} className="text-sygnal" />
                  <span className="max-w-[8rem] text-[0.85rem] leading-snug text-text/80">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* zakładki kategorii */}
          <nav aria-label="Kategorie sprzętu" className="no-scrollbar -mx-5 mt-10 overflow-x-auto px-5 md:mx-0 md:px-0">
            <ul className="flex min-w-max gap-3 lg:grid lg:min-w-0 lg:grid-cols-6 lg:gap-4">
              {CATEGORIES.map((x) => {
                const Icon = CAT_ICON[x.id];
                const on = x.id === active;
                return (
                  <li key={x.id}>
                    <Link
                      href={x.id === "zasilanie" ? "/sklep" : `/sklep/${x.id}`}
                      scroll={false}
                      aria-current={on ? "page" : undefined}
                      className={`flex h-[4.5rem] items-center gap-3.5 rounded-lg border px-5 transition-colors ${on ? "border-sygnal bg-sygnal/[.06] shadow-[0_0_0_1px_rgba(255,113,61,.35),0_0_28px_-6px_rgba(255,113,61,.55)]" : "border-text/15 bg-bg-2/50 hover:border-text/40"}`}
                    >
                      <Icon aria-hidden size={26} strokeWidth={1.6} className={on ? "text-sygnal" : "text-text/85"} />
                      <span className="max-w-[7.5rem] text-[0.98rem] font-bold leading-tight">{x.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* panel wybranej kategorii */}
          <div className="relative mt-8 rounded-xl border border-text/12 bg-[linear-gradient(180deg,rgba(13,25,42,.85),rgba(8,18,32,.85))] p-3 md:p-4">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_repeat(3,minmax(0,1fr))]">
              <div className="relative flex flex-col justify-center overflow-hidden rounded-lg px-4 py-6 md:px-6">
                <p className="text-[0.85rem] font-bold uppercase tracking-[0.14em] text-sygnal">Kategoria</p>
                <h2 className="display mt-3 text-[clamp(1.9rem,2.6vw,2.6rem)]">{c.name}</h2>
                <p className="mt-4 max-w-xs text-[1.02rem] leading-relaxed text-text/80">{c.panel}</p>
              </div>
              {TIER_ORDER.map((t) => {
                const p = byTier[t];
                const featured = t === "polecany";
                return (
                  <article key={t} className={`group relative flex flex-col overflow-hidden rounded-lg border bg-[#0b1727] ${featured ? "border-[#c9e66b] shadow-[0_0_0_1px_rgba(201,230,107,.45),0_30px_60px_-30px_rgba(164,211,127,.35)]" : "border-text/12"}`}>
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image src={tierImage(active, t)} alt={`Wizualizacja: ${c.tiers[t].title.toLowerCase()}`} fill sizes="(min-width: 1024px) 24vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0b1727] to-transparent" />
                      <div className="absolute left-4 top-4"><Badge tier={t} /></div>
                    </div>
                    <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
                      <h3 className="text-[1.15rem] font-bold">{c.tiers[t].title}</h3>
                      <p className="mt-1.5 text-[0.92rem] leading-snug text-text/75">{c.tiers[t].blurb}</p>
                      {p && (
                        <a href={`#p-${p.id}`} className="mt-auto flex items-baseline justify-between gap-3 border-t border-text/10 pt-3 text-[0.82rem] text-muted hover:text-text">
                          <span className="truncate">Przykład: {p.brand.replace(/ \(.+\)$/, "")} {p.model}</span>
                          <span className="shrink-0 font-bold text-text">{formatPLN(p.pricePLN)}</span>
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
            <Link href={`/sklep/${next.id}`} scroll={false} aria-label={`Następna kategoria: ${next.name}`} className="absolute -right-4 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-sygnal text-bg-3 shadow-[0_8px_24px_-6px_rgba(255,113,61,.6)] transition-transform hover:scale-105 lg:grid">
              <ArrowRight aria-hidden size={22} strokeWidth={2.4} />
            </Link>
          </div>
          <p className="mt-3 text-xs text-muted">Zdjęcia to wizualizacje typów sprzętu, nie zdjęcia konkretnych modeli. Przykładowe produkty i ceny opisujemy niżej.</p>

          {/* kafle pozostałych kategorii */}
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((x) => <li key={x.id}><CategoryTile id={x.id} /></li>)}
          </ul>
        </div>
      </section>

      {/* szczegóły zweryfikowanych produktów */}
      <section aria-labelledby="szczegoly" className="wrap mt-10 md:mt-16">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-12">
          <div>
            <p className="text-[0.85rem] font-bold uppercase tracking-[0.14em] text-planb">{c.name}</p>
            <h2 id="szczegoly" className="display mt-2 text-3xl md:text-4xl">Przykładowe produkty</h2>
          </div>
          <p className="max-w-md text-sm text-muted">Konkretne modele, które sprawdziliśmy u producenta i polskiego sprzedawcy. Przy każdym podajemy też ograniczenia.</p>
        </div>
        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-3 lg:items-start lg:gap-0">
          {TIER_ORDER.map((t) => (
            <div key={t} className={t === "polecany" ? "max-lg:order-first lg:z-10" : t === "budzetowy" ? "lg:-mr-px" : "lg:-ml-px"}>
              <TierCard tier={t} product={byTier[t]} max={max} />
            </div>
          ))}
        </div>
        <Disclosure className="mt-12" />

        <div className="mt-16 grid gap-10 border-t border-line pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <div>
            <p className="label flex items-center gap-2 text-kontekst"><Info aria-hidden size={14} /> Zanim kupisz</p>
            <h2 className="display mt-3 text-2xl md:text-3xl">{c.explainer.title}</h2>
          </div>
          <ol className="space-y-6">
            {c.explainer.points.map((p, i) => (
              <li key={p} className="grid grid-cols-[2.5rem_1fr] gap-3 text-[1.02rem] leading-relaxed text-text/85">
                <span className="meta pt-1 text-kontekst">{String(i + 1).padStart(2, "0")}</span>{p}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

/** Kafel kategorii (dolny pasek w Reference C, także na stronie głównej). */
export function CategoryTile({ id }: { id: CategoryId }) {
  const x = getCategory(id)!;
  const Icon = CAT_ICON[id];
  return (
    <Link href={id === "zasilanie" ? "/sklep" : `/sklep/${id}`} scroll={false} className="group block overflow-hidden rounded-lg border border-text/12 bg-[#0b1727] transition-colors hover:border-text/35">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image src={tierImage(id, "polecany")} alt="" fill sizes="(min-width: 1024px) 19vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0b1727] to-transparent" />
      </div>
      <div className="flex items-center gap-3 px-4 pb-4 pt-1">
        <Icon aria-hidden size={26} strokeWidth={1.6} className="shrink-0 text-sygnal" />
        <span className="min-w-0 flex-1">
          <span className="block font-bold leading-tight">{x.name}</span>
          <span className="mt-0.5 block text-[0.74rem] leading-snug text-text/65">{x.tileLine}</span>
        </span>
        <ArrowRight aria-hidden size={20} className="shrink-0 text-sygnal transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
