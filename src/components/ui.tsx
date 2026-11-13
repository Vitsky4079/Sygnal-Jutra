import Link from "next/link";
import { SERIES, formatDate, type SeriesKey } from "@/lib/site";
import type { Article, Product, Video } from "@/lib/content/types";

export const accent = (color: string) => ({ ["--accent" as string]: color });

export function SeriesLabel({ series }: { series: SeriesKey }) {
  const s = SERIES[series];
  return (
    <span className="label inline-flex items-center gap-2" style={accent(s.color)}>
      <span aria-hidden className="size-2 bg-accent" />
      <span className="text-accent">{s.name}</span>
    </span>
  );
}

export function SectionHead({ title, href, linkLabel, color }: { title: string; href?: string; linkLabel?: string; color?: string }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-line pb-3" style={color ? accent(color) : undefined}>
      <h2 className="label flex items-center gap-3 text-base">
        {color && <span aria-hidden className="h-4 w-1 bg-accent" />}
        {title}
      </h2>
      {href && (
        <Link href={href} className="label text-muted hover:text-text">
          {linkLabel ?? "Zobacz wszystkie"} →
        </Link>
      )}
    </div>
  );
}

export function EmptyState({ title, children, color }: { title: string; children?: React.ReactNode; color?: string }) {
  return (
    <div className="border border-dashed border-line px-6 py-12 md:px-10" style={color ? accent(color) : undefined}>
      <p className="font-display text-xl font-semibold">{title}</p>
      {children && <p className="mt-2 max-w-prose text-muted">{children}</p>}
    </div>
  );
}

export function PageIntro({ series, eyebrow, title, children }: { series?: SeriesKey; eyebrow: string; title: string; children?: React.ReactNode }) {
  const color = series ? SERIES[series].color : "var(--text)";
  return (
    <section className="border-b border-line" style={accent(color)}>
      <div className="wrap py-14 md:py-20">
        <p className="label flex items-center gap-3 text-accent">
          <span aria-hidden className="h-4 w-1 bg-accent" />
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">{title}</h1>
        {children && <div className="mt-5 max-w-2xl text-lg text-muted">{children}</div>}
      </div>
    </section>
  );
}

export const articleHref = (a: Pick<Article, "series" | "slug">) => `${SERIES[a.series].href}/${a.slug}`;

export function ArticleRow({ article }: { article: Article }) {
  return (
    <article className="group grid gap-1 border-b border-line py-5 md:grid-cols-[9rem_1fr] md:gap-6" style={accent(SERIES[article.series].color)}>
      <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-1">
        <SeriesLabel series={article.series} />
        <time dateTime={article.publishedAt} className="text-sm text-muted">{formatDate(article.publishedAt)}</time>
      </div>
      <div>
        <h3 className="font-display text-xl font-bold leading-snug md:text-2xl">
          <Link href={articleHref(article)} className="decoration-accent decoration-2 underline-offset-4 group-hover:underline">
            {article.title}
          </Link>
        </h3>
        {article.deck && <p className="mt-1 max-w-2xl text-muted">{article.deck}</p>}
      </div>
    </article>
  );
}

export const shortDate = (iso: string) =>
  new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));

export const ytUrl = (v: Pick<Video, "youtubeId">) => `https://www.youtube.com/watch?v=${v.youtubeId}`;
export const thumbOf = (v: Video) => v.thumbnail ?? `https://i.ytimg.com/vi/${v.youtubeId}/oar2.jpg`;

/** Znacznik odcinka: "SYGNAŁ #16", "SYMULACJA", "SYGNAŁ TERAZ" */
export function epTag(v: Video) {
  if (v.simulation) return "Symulacja";
  if (v.live) return "Teraz";
  return v.episode ? `#${String(v.episode).padStart(2, "0")}` : "";
}

export function VideoCard({ video, priority = false }: { video: Video; priority?: boolean }) {
  const s = SERIES[video.series];
  const tag = epTag(video);
  return (
    <article className="group w-full" style={accent(s.color)}>
      <a href={ytUrl(video)} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative aspect-[9/16] overflow-hidden border border-line bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumbOf(video)} alt="" loading={priority ? "eager" : "lazy"} className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
          <span className="absolute inset-x-0 bottom-0 h-1 bg-accent" />
        </div>
        <div className="mt-3">
          <p className="meta flex items-center gap-2"><span className="text-accent">{s.name}{tag && ` ${tag}`}</span><span>·</span><time dateTime={video.publishedAt}>{shortDate(video.publishedAt)}</time></p>
          <h3 className="mt-1 font-display text-[0.95rem] font-bold leading-snug group-hover:underline decoration-accent underline-offset-4">{video.title}</h3>
        </div>
      </a>
    </article>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const typeLabel = { affiliate: "Polecany partner", digital: "Produkt cyfrowy", physical: "Produkt fizyczny" }[product.type];
  return (
    <article className="flex flex-col border border-line bg-bg-2" style={accent("var(--planb)")}>
      <div className="aspect-[4/3] border-b border-line bg-surface">
        {product.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image.src} alt={product.image.alt} loading="lazy" className="size-full object-cover" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="label text-accent">{typeLabel}</p>
        <h3 className="mt-2 font-display text-lg font-bold">
          <Link href={`/sklep/${product.slug}`} className="hover:underline">{product.name}</Link>
        </h3>
        <p className="mt-2 text-sm text-muted">{product.summary}</p>
        {product.price && (
          <p className="mt-auto pt-4 font-display font-bold">
            {new Intl.NumberFormat("pl-PL", { style: "currency", currency: product.price.currency }).format(product.price.amount)}
          </p>
        )}
      </div>
    </article>
  );
}
