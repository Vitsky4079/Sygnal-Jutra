import Link from "next/link";
import { ArrowUpRight, Check, ImageOff, Minus, Star } from "lucide-react";
import { CATEGORIES, TIERS, formatPLN, type CategoryId, type Product, type Tier } from "@/lib/shop";

/** Pasek kategorii: przewijany poziomo na telefonie, aktywna kategoria podkreślona pomarańczem marki. */
export function CategoryNav({ active }: { active?: CategoryId }) {
  return (
    <nav aria-label="Kategorie sprzętu" className="no-scrollbar -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
      <ul className="flex min-w-max gap-2 lg:grid lg:min-w-0 lg:grid-cols-6">
        {CATEGORIES.map((c, i) => (
          <li key={c.id}>
            <Link
              href={`/sklep/${c.id}`}
              aria-current={active === c.id ? "page" : undefined}
              className="group flex h-full min-h-14 items-center gap-3 border border-line bg-bg-2/60 px-4 py-3 transition-colors hover:border-text/40 aria-[current=page]:border-sygnal aria-[current=page]:bg-sygnal/[.06]"
            >
              <span className="meta text-text/40 group-aria-[current=page]:text-sygnal">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-[0.92rem] font-semibold leading-tight">{c.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const tierTone: Record<Tier, string> = {
  budzetowy: "text-text/70 border-line",
  polecany: "text-bg-3 bg-planb border-planb",
  premium: "text-sygnal border-sygnal/60",
};

export function TierBadge({ tier }: { tier: Tier }) {
  return (
    <span className={`label inline-flex items-center gap-1.5 border px-2.5 py-1 text-[0.66rem] ${tierTone[tier]}`}>
      {tier === "polecany" && <Star aria-hidden size={11} fill="currentColor" />}
      {TIERS[tier].label}
    </span>
  );
}

/** Karta porównania jednego poziomu. Polecany jest wyróżniony ramką i jaśniejszym tłem. */
export function TierCard({ product, tier, max }: { product?: Product; tier: Tier; max?: number }) {
  const featured = tier === "polecany";
  if (!product) {
    return (
      <article className="flex flex-col border border-dashed border-line p-6 md:p-8">
        <TierBadge tier={tier} />
        <p className="mt-6 font-display text-xl font-bold text-muted">Produkt w trakcie weryfikacji</p>
        <p className="mt-2 text-sm text-muted">Nie pokazujemy rekomendacji, której nie sprawdziliśmy u producenta i polskiego sprzedawcy.</p>
      </article>
    );
  }
  return (
    <article
      id={`model-${product.id}`}
      aria-labelledby={`p-${product.id}`}
      className={`relative flex flex-col p-6 md:p-8 ${featured ? "border border-planb/80 bg-[linear-gradient(180deg,rgba(164,211,127,.07),rgba(164,211,127,0)_40%)] shadow-[0_40px_80px_-50px_rgba(164,211,127,.35)] lg:-my-6 lg:py-12" : "border border-line bg-bg-2/40"}`}
    >
      <div className="flex items-center justify-between gap-4">
        <TierBadge tier={tier} />
        {featured && <span className="meta text-planb">Wybór redakcji</span>}
      </div>
      {product.image ? null : (
        <div className="mt-6 flex aspect-[16/7] flex-col items-center justify-center gap-2 rounded-md border border-dashed border-text/20 bg-bg-3/40 px-4 text-center">
          <ImageOff aria-hidden size={22} strokeWidth={1.5} className="text-muted" />
          <p className="text-xs leading-snug text-muted">Brak zdjęcia tego modelu. Dodamy je po uzyskaniu zgody producenta lub sprzedawcy.</p>
        </div>
      )}
      <p className="meta mt-6">{product.brand}</p>
      <h3 id={`p-${product.id}`} className="mt-1 font-display text-2xl font-extrabold leading-tight md:text-[1.65rem]">{product.model}</h3>
      <p className="mt-4 flex items-baseline gap-2">
        <span className="font-display text-3xl font-bold">{formatPLN(product.pricePLN)}</span>
        <span className="meta">orientacyjnie</span>
      </p>
      <p className="mt-4 text-[0.95rem] leading-relaxed text-text/80">{product.description}</p>

      {product.metric && max ? (
        <div className="mt-6">
          <div className="flex items-baseline justify-between gap-3">
            <span className="meta">{product.metric.label}</span>
            <span className="font-display text-lg font-bold">{product.metric.value.toLocaleString("pl-PL")} {product.metric.unit}</span>
          </div>
          <div className="relative mt-2 h-1.5 bg-line" role="img" aria-label={`${product.metric.label}: ${product.metric.value} ${product.metric.unit} na tle najmocniejszej propozycji w kategorii`}>
            <span className={`absolute inset-y-0 left-0 ${featured ? "bg-planb" : "bg-text/70"}`} style={{ width: `${Math.max(3, (product.metric.value / max) * 100)}%` }} />
          </div>
          {product.metric.note && <p className="mt-1.5 text-xs text-muted">{product.metric.note}</p>}
        </div>
      ) : null}

      <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
        {product.specs.map((s) => (
          <div key={s.label} className="grid grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)] gap-3 py-2.5 sm:grid-cols-[8.5rem_minmax(0,1fr)]">
            <dt className="text-muted">{s.label}</dt>
            <dd className="font-medium [overflow-wrap:anywhere]">{s.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 text-sm"><span className="label mr-2 text-[0.66rem] text-muted">Do czego</span>{product.useCase}</p>

      <div className="mt-6 grid gap-5 text-sm">
        <ul className="space-y-2" aria-label="Zalety">
          {product.pros.map((p) => <li key={p} className="flex gap-2.5"><Check aria-hidden size={16} className="mt-0.5 shrink-0 text-planb" />{p}</li>)}
        </ul>
        <ul className="space-y-2" aria-label="Ograniczenia">
          {product.cons.map((p) => <li key={p} className="flex gap-2.5 text-text/75"><Minus aria-hidden size={16} className="mt-0.5 shrink-0 text-sygnal" />{p}</li>)}
        </ul>
      </div>

      <div className="mt-auto pt-8">
        <a
          href={product.retailerUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className={`group flex min-h-12 items-center justify-between gap-3 px-5 font-display text-[0.92rem] font-bold transition-colors ${featured ? "bg-planb text-bg-3 hover:bg-text" : "border border-line hover:border-text"}`}
        >
          Sprawdź w: {product.retailer.replace(/ \(.+\)$/, "")}
          <ArrowUpRight aria-hidden size={17} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
        <p className="meta mt-3 flex flex-wrap justify-between gap-2">
          <span>Sprawdzono {new Date(product.lastVerified).toLocaleDateString("pl-PL")}</span>
          {product.manufacturerUrl !== product.retailerUrl && (
            <a href={product.manufacturerUrl} target="_blank" rel="noopener noreferrer nofollow" className="underline-offset-2 hover:text-text hover:underline">Strona producenta</a>
          )}
        </p>
        {product.availability === "sprawdz" && <p className="mt-2 text-xs text-muted">Dostępność zależy od wariantu. Sprawdź u sprzedawcy.</p>}
      </div>
    </article>
  );
}

export function Disclosure({ className = "" }: { className?: string }) {
  return (
    <p className={`max-w-3xl text-sm leading-relaxed text-muted ${className}`}>
      <strong className="font-semibold text-text/85">Przejrzystość.</strong> Nie sprzedajemy tych produktów i nie mamy umów partnerskich. Linki prowadzą do zwykłych stron sprzedawców, bez prowizji.
      Ceny są orientacyjne, sprawdzone w dniu podanym przy produkcie, i mogą się zmienić. Zdjęcia na stronie to wizualizacje kategorii, nie zdjęcia konkretnych modeli.
    </p>
  );
}
