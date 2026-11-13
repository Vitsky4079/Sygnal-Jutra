import Link from "next/link";
import type { Metadata } from "next";
import { getVideos } from "@/lib/content";
import { SERIES, SITE, type SeriesKey } from "@/lib/site";
import { EmptyState, PageIntro, VideoCard } from "@/components/ui";

export const metadata: Metadata = { title: "Wideo", description: "Archiwum wideo Sygnał Jutra.", alternates: { canonical: "/wideo" } };

export default async function Page({ searchParams }: PageProps<"/wideo">) {
  const sp = await searchParams;
  const seria = typeof sp.seria === "string" && sp.seria in SERIES ? (sp.seria as SeriesKey) : undefined;
  const sort = sp.sort === "najstarsze" ? "najstarsze" : "najnowsze";
  let videos = await getVideos(seria);
  if (sort === "najstarsze") videos = [...videos].reverse();

  const chip = (active: boolean) =>
    `label border px-4 py-2.5 min-h-11 inline-flex items-center ${active ? "border-text bg-text text-bg" : "border-line text-muted hover:text-text"}`;

  return (
    <>
      <PageIntro eyebrow="Wideo" title="Krótko, konkretnie, w pionie." />
      <div className="wrap mt-8">
        <nav aria-label="Filtry" className="flex flex-wrap items-center gap-2">
          <Link href={`/wideo?sort=${sort}`} className={chip(!seria)}>Wszystkie</Link>
          {Object.values(SERIES).map((s) => (
            <Link key={s.key} href={`/wideo?seria=${s.key}&sort=${sort}`} className={chip(seria === s.key)} aria-current={seria === s.key ? "true" : undefined}>
              {s.name}
            </Link>
          ))}
          <span className="mx-2 hidden h-6 w-px bg-line md:block" />
          <Link href={`/wideo?${seria ? `seria=${seria}&` : ""}sort=${sort === "najnowsze" ? "najstarsze" : "najnowsze"}`} className={chip(false)}>
            Sortuj: {sort}
          </Link>
        </nav>

        <div className="mt-8">
          {videos.length ? (
            <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 xl:grid-cols-5">
              {videos.map((v) => <li key={v.slug}><VideoCard video={v} /></li>)}
            </ul>
          ) : (
            <EmptyState title="Archiwum wideo jest jeszcze puste.">
              Wszystkie odcinki znajdziesz na <a className="underline" href={SITE.social.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>.
            </EmptyState>
          )}
        </div>
      </div>
    </>
  );
}
