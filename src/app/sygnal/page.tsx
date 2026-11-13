import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { getArticles, getVideos } from "@/lib/content";
import type { Video } from "@/lib/content/types";
import { SERIES } from "@/lib/site";
import { ArticleRow, SectionHead, accent, epTag, thumbOf, ytUrl } from "@/components/ui";
import { VideoPlayer } from "@/components/VideoPlayer";
import { SygnalMotion } from "@/components/motion/SygnalMotion";
import { BreakingNewsBar } from "@/components/BreakingNewsBar";

const S = SERIES.sygnal;
const TZ = "Europe/Warsaw";

export const metadata: Metadata = {
  title: "SYGNAŁ · Newsy",
  description: S.blurb,
  alternates: { canonical: "/sygnal" },
};

const fmt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("pl-PL", { timeZone: TZ, ...o });
const dayKey = (iso: string) => fmt({ year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso));
const monthKey = (iso: string) => {
  const p = fmt({ year: "numeric", month: "2-digit" }).formatToParts(new Date(iso));
  return `${p.find((x) => x.type === "year")!.value}-${p.find((x) => x.type === "month")!.value}`;
};
const monthLabel = (key: string) => fmt({ month: "long", year: "numeric" }).format(new Date(`${key}-15T12:00:00Z`));
const longDate = (iso: string) => fmt({ day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));

function EpBadge({ v, large = false }: { v: Video; large?: boolean }) {
  const tag = epTag(v);
  const isNum = tag.startsWith("#");
  return (
    <span className={`meta ${large ? "text-[0.8rem]!" : ""}`}>
      <span className="text-sygnal">{isNum ? `SYGNAŁ ${tag}` : `SYGNAŁ ${tag.toUpperCase() || "· MATERIAŁ"}`}</span>
    </span>
  );
}

function ExtLabel() {
  return (
    <span className="label inline-flex items-center gap-1.5 text-muted transition-colors group-hover:text-sygnal">
      YouTube <ArrowUpRight aria-hidden size={13} />
    </span>
  );
}

export default async function Page({ searchParams }: PageProps<"/sygnal">) {
  const sp = await searchParams;
  const [all, articles, others] = await Promise.all([getVideos("sygnal"), getArticles("sygnal"), getVideos()]);

  const months = [...new Set(all.map((v) => monthKey(v.publishedAt)))];
  const month = typeof sp.miesiac === "string" && months.includes(sp.miesiac) ? sp.miesiac : undefined;
  const videos = month ? all.filter((v) => monthKey(v.publishedAt) === month) : all;

  const [lead, ...rest] = videos;
  const side = month ? [] : rest.slice(0, 2);
  const archive = month ? rest : rest.slice(2);

  const groups = archive.reduce<{ key: string; items: Video[] }[]>((acc, v) => {
    const key = dayKey(v.publishedAt);
    const g = acc.at(-1);
    if (g?.key === key) g.items.push(v);
    else acc.push({ key, items: [v] });
    return acc;
  }, []);

  const related = (["kontekst", "plan-b"] as const)
    .map((k) => others.find((v) => v.series === k))
    .filter((v): v is Video => Boolean(v));

  return (
    <div style={accent(S.color)}>
      <BreakingNewsBar />
      <SygnalMotion>
        {/* A. MASTHEAD */}
        <header className="relative overflow-hidden">
          <div className="wrap relative pt-8 md:pt-12">
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
              <p data-sm="meta" className="meta"><span className="text-sygnal">Seria 01</span> · Newsy · Polska, Europa, świat</p>
              <p data-sm="meta" className="meta">
                {all.length} materiałów · ostatni <time dateTime={all[0]?.publishedAt}>{all[0] ? longDate(all[0].publishedAt) : "—"}</time>
              </p>
            </div>

            <div className="mt-4 grid items-end gap-6 md:mt-6 md:grid-cols-[1fr_auto]">
              <h1 className="relative">
                <span className="block overflow-hidden pb-[0.04em]">
                  <span data-sm="mast" className="block font-display text-[19.5vw] font-extrabold leading-[0.82] tracking-[-0.045em] md:text-[15.5vw] xl:text-[13.5rem]">
                    SYGNAŁ<span className="text-sygnal">.</span>
                  </span>
                </span>
                <span className="sr-only"> · najważniejsze wydarzenia</span>
              </h1>

              <div className="flex items-end gap-5 pb-2 md:max-w-[17rem] md:flex-col md:items-start md:gap-4 md:pb-5">
                <svg aria-hidden viewBox="0 0 64 64" className="size-12 shrink-0 md:size-16" fill="none" stroke="#ff713d">
                  <circle cx="32" cy="32" r="30" strokeWidth="1" opacity="0.35" />
                  <circle cx="32" cy="32" r="20" strokeWidth="1" opacity="0.55" />
                  <circle className="sj-ping" cx="32" cy="32" r="30" strokeWidth="1.5" />
                  <circle cx="32" cy="32" r="4" fill="#ff713d" stroke="none" />
                </svg>
                <p data-sm="meta" className="min-w-0 text-[0.95rem] leading-snug text-muted">
                  Wydarzenia, które dotyczą bezpieczeństwa, infrastruktury i&nbsp;cyberprzestrzeni. Krótko i&nbsp;bez sensacji.
                </p>
              </div>
            </div>
          </div>

          {/* separator z linią sygnału */}
          <div className="wrap relative mt-6">
            <div data-sm="line" className="h-px bg-line" />
            <div data-sm="line" className="absolute left-0 top-0 h-px w-24 bg-sygnal" style={{ left: "1.25rem" }} />
            <span aria-hidden data-sm="spark" className="pointer-events-none absolute top-1/2 size-1.5 -translate-y-1/2 bg-sygnal opacity-0 shadow-[0_0_12px_2px_rgba(255,113,61,0.6)]" />
          </div>
        </header>

        {/* Nawigacja kategorii + filtr dat + szukaj */}
        <nav aria-label="Nawigacja sekcji" className="border-b border-line">
          <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-0 py-1 md:py-3">
            <ul className="no-scrollbar -mx-1 flex max-w-full items-center gap-x-5 overflow-x-auto whitespace-nowrap px-1">
              {Object.values(SERIES).map((s) => (
                <li key={s.key}>
                  <Link
                    href={s.href}
                    aria-current={s.key === "sygnal" ? "page" : undefined}
                    className="label inline-flex min-h-11 items-center gap-2 text-muted hover:text-text aria-[current=page]:text-text"
                  >
                    <span aria-hidden className="size-1.5" style={{ background: s.color }} />
                    {s.name}
                  </Link>
                </li>
              ))}
              <li><Link href="/wideo" className="label inline-flex min-h-11 items-center text-muted hover:text-text">Wideo</Link></li>
            </ul>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <ul className="flex items-center gap-1" aria-label="Filtr miesiąca">
                <li>
                  <Link href="/sygnal" aria-current={!month ? "true" : undefined} className="meta inline-flex min-h-11 items-center px-2 hover:text-text aria-[current=true]:text-sygnal">
                    Wszystkie
                  </Link>
                </li>
                {months.map((m) => (
                  <li key={m}>
                    <Link href={`/sygnal?miesiac=${m}`} aria-current={month === m ? "true" : undefined} className="meta inline-flex min-h-11 items-center px-2 hover:text-text aria-[current=true]:text-sygnal">
                      {monthLabel(m)}
                    </Link>
                  </li>
                ))}
              </ul>
              <form role="search" action="/szukaj" className="hidden items-center border-b md:flex border-line focus-within:border-sygnal">
                <label htmlFor="q-sygnal" className="sr-only">Szukaj w serwisie</label>
                <input id="q-sygnal" name="q" type="search" placeholder="Szukaj" className="min-h-10 w-36 bg-transparent text-sm outline-none placeholder:text-muted" />
                <button type="submit" aria-label="Szukaj" className="grid size-10 place-items-center text-muted hover:text-text"><Search aria-hidden size={16} /></button>
              </form>
            </div>
          </div>
        </nav>

        {/* B. KOMPOZYCJA WIODĄCA 65 / 35 */}
        {lead && !month && (
          <section aria-label="Najważniejsze" className="wrap grid gap-10 py-10 lg:grid-cols-[minmax(0,65fr)_minmax(0,35fr)] lg:gap-0 lg:py-14">
            <article className="grid gap-6 sm:grid-cols-[minmax(0,15rem)_1fr] md:gap-10 lg:border-r lg:border-line lg:pr-10 xl:grid-cols-[17.5rem_1fr]">
              <div data-sm="media" className="order-2 mx-auto w-full max-w-[15rem] sm:order-1 sm:max-w-none">
                <VideoPlayer id={lead.youtubeId} title={lead.title} thumbnail={thumbOf(lead)} color={S.color} />
              </div>
              <div className="order-1 flex flex-col sm:order-2">
                <div data-sm="item" className="flex items-center gap-3">
                  <EpBadge v={lead} large />
                  <span className="h-px flex-1 bg-line" />
                  <time dateTime={lead.publishedAt} className="meta">{longDate(lead.publishedAt)}</time>
                </div>
                <h2 data-sm="item" className="hl mt-5 text-[2rem] sm:text-4xl xl:text-[2.8rem]">{lead.title}</h2>
                {lead.description && <p data-sm="item" className="mt-5 max-w-xl text-[1.06rem] leading-relaxed text-muted">{lead.description}</p>}
                <div data-sm="item" className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8">
                  <a href={ytUrl(lead)} target="_blank" rel="noopener noreferrer" className="label inline-flex min-h-11 items-center gap-2 bg-sygnal px-5 text-bg transition-colors hover:bg-text">
                    Oglądaj na YouTube <ArrowUpRight aria-hidden size={14} />
                  </a>
                </div>
              </div>
            </article>

            <div className="grid content-start gap-0 lg:pl-10">
              <p data-sm="item" className="label mb-2 flex items-center gap-3 text-muted"><span aria-hidden className="h-3 w-[3px] bg-sygnal" />Także w serii</p>
              {side.map((v, i) => (
                <article key={v.slug} data-sm="item" className={`group border-line py-6 ${i === 0 ? "border-b" : ""}`}>
                  <a href={ytUrl(v)} target="_blank" rel="noopener noreferrer" className="grid grid-cols-[6.5rem_1fr] gap-5 xl:grid-cols-[7.5rem_1fr]">
                    <span className="relative block aspect-[9/16] overflow-hidden border border-line">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={thumbOf(v)} alt="" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                      <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-sygnal transition-transform duration-300 group-hover:scale-x-100" />
                    </span>
                    <span className="flex flex-col">
                      <EpBadge v={v} />
                      <span className="hl mt-2 text-xl leading-[1.12] group-hover:underline decoration-sygnal decoration-2 underline-offset-4 xl:text-[1.45rem]">{v.title}</span>
                      <span className="mt-auto flex items-center justify-between pt-3">
                        <time dateTime={v.publishedAt} className="meta">{longDate(v.publishedAt)}</time>
                        <ExtLabel />
                      </span>
                    </span>
                  </a>
                </article>
              ))}
            </div>
          </section>
        )}
      </SygnalMotion>

      {/* D. ARCHIWUM: grupowanie po dniach */}
      <section aria-labelledby="archiwum" className="border-t border-line bg-bg-3">
        <div className="wrap py-12 lg:py-16">
          <div className="flex items-end justify-between gap-6 border-b border-text pb-4">
            <h2 id="archiwum" className="hl text-3xl md:text-4xl">{month ? `Archiwum · ${monthLabel(month)}` : "Archiwum"}</h2>
            <p className="meta">{archive.length + (month && lead ? 1 : 0)} materiałów</p>
          </div>

          {month && lead && (
            <p className="mt-4 text-sm text-muted">Widok filtrowany. <Link href="/sygnal" className="underline">Pokaż wszystko</Link></p>
          )}

          {(month && lead ? [{ key: dayKey(lead.publishedAt), items: [lead] }, ...groups].reduce<{ key: string; items: Video[] }[]>((acc, g) => {
            const last = acc.at(-1);
            if (last?.key === g.key) last.items.push(...g.items);
            else acc.push({ key: g.key, items: [...g.items] });
            return acc;
          }, []) : groups).map((g) => {
            const d = new Date(g.items[0].publishedAt);
            return (
              <div key={g.key} className="grid gap-x-10 border-b border-line md:grid-cols-[10rem_1fr]">
                <div className="flex items-baseline gap-3 pt-6 md:block md:pt-8">
                  <div className="md:sticky md:top-28">
                    <p className="font-display text-5xl font-extrabold leading-none tracking-tight md:text-6xl">{fmt({ day: "numeric" }).format(d)}</p>
                    <p className="meta mt-2">{fmt({ month: "short", year: "numeric" }).format(d)}</p>
                    <p className="meta capitalize">{fmt({ weekday: "long" }).format(d)}</p>
                  </div>
                </div>
                <ol className="divide-y divide-line">
                  {g.items.map((v) => (
                    <li key={v.slug}>
                      <a href={ytUrl(v)} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[4.5rem_1fr] gap-x-5 py-6 md:grid-cols-[4.5rem_5rem_1fr_auto] md:gap-x-6 md:py-8">
                        <span className="hidden font-display text-4xl font-extrabold leading-none text-line transition-colors group-hover:text-sygnal md:block">
                          {v.episode ? String(v.episode).padStart(2, "0") : "—"}
                        </span>
                        <span className="relative row-span-2 block aspect-[9/16] overflow-hidden border border-line md:row-span-1">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={thumbOf(v)} alt="" loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                        </span>
                        <span className="min-w-0">
                          <EpBadge v={v} />
                          <span className="hl mt-2 block text-xl leading-[1.15] group-hover:underline decoration-sygnal decoration-2 underline-offset-4 md:text-[1.7rem]">{v.title}</span>
                          {v.description && <span className="mt-2 line-clamp-2 block max-w-2xl text-[0.95rem] text-muted">{v.description}</span>}
                        </span>
                        <span className="col-start-2 mt-3 md:col-start-auto md:mt-0 md:self-start md:pt-1"><ExtLabel /></span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}

          {videos.length === 0 && <p className="py-10 text-muted">Brak materiałów w wybranym okresie.</p>}
        </div>
      </section>

      {articles.length > 0 && (
        <section className="wrap mt-14">
          <SectionHead title="Teksty SYGNAŁ" color={S.color} />
          {articles.map((a) => <ArticleRow key={a.slug} article={a} />)}
        </section>
      )}

      {/* Powiązane: inne serie */}
      {related.length > 0 && (
        <section aria-labelledby="powiazane" className="wrap mt-14">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <h2 id="powiazane" className="label text-muted">Szerszy kontekst</h2>
            <p className="meta flex gap-4"><Link href="/kontekst" className="hover:text-kontekst">KONTEKST →</Link><Link href="/plan-b" className="hover:text-planb">PLAN B →</Link></p>
          </div>
          <div className="grid md:grid-cols-2">
            {related.map((v, i) => {
              const s = SERIES[v.series];
              return (
                <a key={v.slug} href={ytUrl(v)} target="_blank" rel="noopener noreferrer" style={accent(s.color)}
                  className={`group grid grid-cols-[4rem_1fr] gap-5 border-b border-line py-6 ${i === 0 ? "md:border-r md:pr-8" : "md:pl-8"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={thumbOf(v)} alt="" loading="lazy" className="aspect-[9/16] w-full border border-line object-cover" />
                  <span>
                    <span className="meta text-accent">{s.name} {epTag(v)}</span>
                    <span className="hl mt-1 block text-lg group-hover:underline decoration-accent underline-offset-4">{v.title}</span>
                  </span>
                </a>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
