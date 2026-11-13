import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getArticle, getArticles, getVideos } from "@/lib/content";
import { PLANB_CATEGORIES, SERIES, SITE, formatDate, type SeriesKey } from "@/lib/site";
import { ArticleRow, PageIntro, SectionHead, SeriesLabel, VideoCard, accent } from "./ui";

export async function SeriesIndex({ series }: { series: SeriesKey }) {
  const s = SERIES[series];
  const [articles, videos] = await Promise.all([getArticles(series), getVideos(series)]);
  return (
    <>
      <PageIntro series={series} eyebrow={`${s.name} · ${s.kind}`} title={s.blurb} />
      <div className="wrap mt-10" style={accent(s.color)}>
        {series === "plan-b" && (
          <section aria-labelledby="kat" className="mb-14">
            <SectionHead title="Kategorie" color={s.color} />
            <h2 id="kat" className="sr-only">Kategorie PLAN B</h2>
            <ol className="grid border-l border-line sm:grid-cols-2 lg:grid-cols-3">
              {PLANB_CATEGORIES.map((c, i) => (
                <li key={c} className="border-b border-r border-line p-6">
                  <span className="meta text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <p className="hl mt-3 text-xl">{c}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-muted">Poradniki tekstowe dla każdej kategorii są w przygotowaniu. Na razie materiały dostępne są w formie wideo. Sprzęt i poradniki PDF: <Link href="/sklep" className="underline">Sklep PLAN B</Link>.</p>
          </section>
        )}

        <SectionHead title={`Odcinki ${s.name}`} href="/wideo" linkLabel="Biblioteka wideo" color={s.color} />
        <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 xl:grid-cols-5">
          {videos.map((v, i) => <li key={v.slug}><VideoCard video={v} priority={i < 5} /></li>)}
        </ul>

        {articles.length > 0 && (
          <section className="mt-14">
            <SectionHead title="Teksty" color={s.color} />
            {articles.map((a) => <ArticleRow key={a.slug} article={a} />)}
          </section>
        )}
      </div>
    </>
  );
}

export function seriesMetadata(series: SeriesKey): Metadata {
  const s = SERIES[series];
  return { title: `${s.name} · ${s.kind}`, description: s.blurb, alternates: { canonical: s.href } };
}

const KIND_LABEL = { reporting: "Relacja", analysis: "Analiza", simulation: "SYMULACJA" } as const;

export async function articleMetadata(series: SeriesKey, slug: string): Promise<Metadata> {
  const a = await getArticle(series, slug);
  if (!a) return {};
  const url = `${SERIES[series].href}/${slug}`;
  return {
    title: a.title,
    description: a.deck,
    alternates: { canonical: url },
    openGraph: { type: "article", title: a.title, description: a.deck, publishedTime: a.publishedAt, modifiedTime: a.updatedAt, url },
  };
}

export async function ArticleView({ series, slug }: { series: SeriesKey; slug: string }) {
  const a = await getArticle(series, slug);
  if (!a) notFound();
  const s = SERIES[series];
  const words = a.body.map((b) => ("text" in b ? b.text : b.items.join(" "))).join(" ").split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": series === "sygnal" ? "NewsArticle" : "Article",
    headline: a.title,
    description: a.deck,
    datePublished: a.publishedAt,
    dateModified: a.updatedAt ?? a.publishedAt,
    inLanguage: "pl-PL",
    mainEntityOfPage: `${SITE.url}${s.href}/${a.slug}`,
    publisher: { "@type": "Organization", name: SITE.name },
    ...(a.author && { author: { "@type": "Person", name: a.author } }),
  };

  return (
    <article style={accent(s.color)}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <header className="border-b border-line">
        <div className="wrap py-12 md:py-16">
          <div className="flex flex-wrap items-center gap-4">
            <SeriesLabel series={series} />
            <span className={`label ${a.kind === "simulation" ? "bg-planb px-2 py-1 text-bg" : "text-muted"}`}>{KIND_LABEL[a.kind]}</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">{a.title}</h1>
          {a.deck && <p className="mt-5 max-w-2xl text-xl text-muted">{a.deck}</p>}
          <p className="mt-6 text-sm text-muted">
            {a.author && <>{a.author} · </>}
            <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>
            {a.updatedAt && <> · zaktualizowano <time dateTime={a.updatedAt}>{formatDate(a.updatedAt)}</time></>}
            {" "}· {minutes} min czytania
          </p>
        </div>
      </header>

      <div className="wrap grid gap-12 py-12 lg:grid-cols-[1fr_20rem]">
        <div className="prose-sj">
          {a.body.map((b, i) =>
            b.type === "p" ? <p key={i}>{b.text}</p>
            : b.type === "h2" ? <h2 key={i}>{b.text}</h2>
            : b.type === "quote" ? <blockquote key={i}>{b.text}</blockquote>
            : <ul key={i}>{b.items.map((it) => <li key={it}>{it}</li>)}</ul>,
          )}
          {a.corrections?.length ? (
            <aside className="border border-line p-4 text-base" aria-label="Korekty i aktualizacje">
              <p className="label">Korekty i aktualizacje</p>
              <ul className="mt-2 list-none! pl-0! space-y-2">
                {a.corrections.map((c) => <li key={c.date}><time dateTime={c.date}>{formatDate(c.date)}</time>: {c.text}</li>)}
              </ul>
            </aside>
          ) : null}
        </div>

        {a.sources?.length ? (
          <aside className="lg:border-l lg:border-line lg:pl-8" aria-label="Źródła">
            <h2 className="label text-muted">Źródła</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm">
              {a.sources.map((src) => (
                <li key={src.url}><a href={src.url} target="_blank" rel="noopener noreferrer" className="underline">{src.label}</a></li>
              ))}
            </ol>
          </aside>
        ) : null}
      </div>
    </article>
  );
}
