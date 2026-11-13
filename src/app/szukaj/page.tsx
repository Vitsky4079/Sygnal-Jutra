import type { Metadata } from "next";
import { search } from "@/lib/content";
import { ArticleRow, EmptyState, PageIntro, ProductCard, VideoCard } from "@/components/ui";

export const metadata: Metadata = { title: "Szukaj", robots: { index: false } };

export default async function Page({ searchParams }: PageProps<"/szukaj">) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const r = await search(q);
  const total = r.articles.length + r.videos.length + r.products.length;

  return (
    <>
      <PageIntro eyebrow="Szukaj" title={q ? `Wyniki dla „${q}”` : "Czego szukasz?"} />
      <div className="wrap mt-8">
        <form role="search" action="/szukaj" className="flex max-w-xl border-b border-line focus-within:border-text">
          <label htmlFor="q" className="sr-only">Fraza</label>
          <input id="q" name="q" type="search" defaultValue={q} placeholder="Wpisz frazę" className="min-h-12 flex-1 bg-transparent text-lg outline-none placeholder:text-muted" />
          <button className="label px-4">Szukaj</button>
        </form>

        <div className="mt-10 space-y-12">
          {q && total === 0 && <EmptyState title="Brak wyników.">Spróbuj innej frazy.</EmptyState>}
          {r.articles.length > 0 && <section><h2 className="label text-muted">Artykuły</h2>{r.articles.map((a) => <ArticleRow key={a.slug} article={a} />)}</section>}
          {r.videos.length > 0 && <section><h2 className="label text-muted">Wideo</h2><ul className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">{r.videos.map((v) => <li key={v.slug}><VideoCard video={v} /></li>)}</ul></section>}
          {r.products.length > 0 && <section><h2 className="label text-muted">Produkty</h2><ul className="mt-4 grid gap-4 md:grid-cols-3">{r.products.map((p) => <li key={p.slug}><ProductCard product={p} /></li>)}</ul></section>}
        </div>
      </div>
    </>
  );
}
