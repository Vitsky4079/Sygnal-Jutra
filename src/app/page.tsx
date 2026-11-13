import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getArticles, getVideos } from "@/lib/content";
import type { Video } from "@/lib/content/types";
import { PLANB_CATEGORIES, SERIES, SITE } from "@/lib/site";
import { ArticleRow, SectionHead, VideoCard, accent, epTag, shortDate, thumbOf, ytUrl } from "@/components/ui";
import { VideoPlayer } from "@/components/VideoPlayer";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { HeroMotion } from "@/components/motion/HeroMotion";
import { Reveal } from "@/components/motion/Reveal";
import { SignalRadar } from "@/components/motion/SignalRadar";
import { ContextDiagram } from "@/components/motion/ContextDiagram";

function Row({ v }: { v: Video }) {
  const s = SERIES[v.series];
  const tag = epTag(v);
  return (
    <li style={accent(s.color)} className="border-b border-line">
      <a href={ytUrl(v)} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[4.25rem_1fr] gap-4 py-4">
        <time dateTime={v.publishedAt} className="meta pt-1 leading-tight">{shortDate(v.publishedAt).replace(/ \d{4}$/, "")}</time>
        <span>
          <span className="meta text-accent">{s.name}{tag && ` ${tag}`}</span>
          <span className="mt-1 block font-display text-[1.02rem] font-bold leading-snug group-hover:underline decoration-accent underline-offset-4">{v.title}</span>
        </span>
      </a>
    </li>
  );
}

export default async function Home() {
  const [videos, articles] = await Promise.all([getVideos(), getArticles()]);
  const news = videos.filter((v) => v.series === "sygnal");
  const kontekst = videos.filter((v) => v.series === "kontekst");
  const planb = videos.filter((v) => v.series === "plan-b");

  const lead = news[0] ?? videos[0];
  const second = news.slice(1, 3);
  const feed = videos.filter((v) => v !== lead && !second.includes(v)).slice(0, 9);

  return (
    <>
      {/* 1. LEAD: pionowy materiał + nagłówek + strumień najnowszych */}
      {lead && (
        <HeroMotion className="relative overflow-hidden border-b border-line">
          <div className="wrap relative grid gap-x-10 gap-y-8 py-8 md:py-12 lg:grid-cols-12">
            <SignalRadar className="absolute -right-[45%] -top-24 z-0 w-[150%] max-w-none opacity-70 sm:-right-1/3 sm:w-[110%] lg:hidden" />
            <div className="relative order-2 lg:order-1 lg:col-span-3" style={accent(SERIES[lead.series].color)}>
              <SignalRadar className="absolute left-1/2 top-1/2 z-0 w-[170%] max-w-none -translate-x-1/2 -translate-y-1/2 lg:w-[290%]" />
              <div data-intro="media" className="relative z-10 mx-auto max-w-[17rem] lg:max-w-none">
                <VideoPlayer id={lead.youtubeId} title={lead.title} thumbnail={thumbOf(lead)} color={SERIES[lead.series].color} />
              </div>
            </div>

            <article className="relative z-10 order-1 flex flex-col lg:order-2 lg:col-span-5" style={accent(SERIES[lead.series].color)}>
              <p data-intro="up" className="label mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-text">
                <span className="flex items-center gap-2 whitespace-nowrap"><span aria-hidden className="size-2 animate-pulse bg-sygnal" />Sygnał Jutra</span>
                <span className="hidden text-muted sm:inline">·</span>
                <span className="w-full text-muted sm:w-auto">Świat się zmienia. Zrozum dlaczego.</span>
              </p>
              <p data-intro="up" className="meta flex items-center gap-3">
                <span className="label text-accent">{SERIES[lead.series].name} {epTag(lead)}</span>
                <span>{shortDate(lead.publishedAt)}</span>
              </p>
              <h1 data-intro="mask" className="hl mt-4 text-[2.15rem] md:text-5xl xl:text-[3.4rem]">{lead.title}</h1>
              {lead.description && <p data-intro="up" className="mt-5 max-w-[34rem] text-lg leading-relaxed text-muted">{lead.description}</p>}
              <div data-intro="up" className="mt-6 flex flex-wrap gap-3">
                <a href={ytUrl(lead)} target="_blank" rel="noopener noreferrer" className="label inline-flex items-center gap-2 border border-line px-5 py-3 hover:border-accent hover:text-accent">
                  Otwórz na YouTube <ArrowUpRight aria-hidden size={14} />
                </a>
              </div>

              {second.length > 0 && (
                <div data-intro="up" className="mt-auto grid gap-6 border-t border-line pt-6 sm:grid-cols-2 lg:mt-10">
                  {second.map((v) => (
                    <a key={v.slug} href={ytUrl(v)} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[4.5rem_1fr] gap-4" style={accent(SERIES[v.series].color)}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={thumbOf(v)} alt="" loading="lazy" className="aspect-[9/16] w-full border border-line object-cover" />
                      <span>
                        <span className="meta text-accent">{SERIES[v.series].name} {epTag(v)}</span>
                        <span className="mt-1 block font-display text-[0.98rem] font-bold leading-snug group-hover:underline decoration-accent underline-offset-4">{v.title}</span>
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </article>

            <aside data-intro="up" className="relative z-10 order-3 lg:col-span-4 lg:border-l lg:border-line lg:bg-bg/70 lg:pl-8" aria-labelledby="najnowsze">
              <h2 id="najnowsze" className="label flex items-center gap-3 border-b border-text pb-3">
                <span aria-hidden className="size-2 animate-pulse bg-sygnal" /> Najnowsze sygnały
              </h2>
              <ul>{feed.slice(0, 7).map((v) => <Row key={v.slug} v={v} />)}</ul>
              <Link href="/wideo" className="label mt-4 inline-block text-muted hover:text-text">Całe archiwum →</Link>
            </aside>
          </div>
        </HeroMotion>
      )}

      {articles.length > 0 && (
        <section className="wrap mt-12">
          <SectionHead title="Teksty" href="/sygnal" />
          {articles.slice(0, 5).map((a) => <ArticleRow key={a.slug} article={a} />)}
        </section>
      )}

      {/* 2. KONTEKST: typograficzny panel z numerami odcinków */}
      <Reveal as="section" className="relative mt-16 overflow-hidden border-y border-line bg-bg-3" style={accent(SERIES.kontekst.color)} aria-labelledby="kontekst">
        <ContextDiagram className="pointer-events-none absolute -bottom-10 -left-10 w-[46rem] max-w-none opacity-60" />
        <div className="wrap relative grid gap-10 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-4">
            <p className="label flex items-center gap-3 text-accent"><span aria-hidden className="h-4 w-1 bg-accent" />KONTEKST · Wyjaśniamy</p>
            <h2 id="kontekst" data-reveal="mask" className="hl mt-5 text-4xl md:text-5xl">Jak to naprawdę działa.</h2>
            <p className="mt-5 max-w-sm text-muted">{SERIES.kontekst.blurb}</p>
            <Link href="/kontekst" className="label mt-6 inline-block border-b-2 border-accent pb-1 text-accent">Wszystkie odcinki →</Link>
          </div>
          <div className="grid gap-px bg-line sm:grid-cols-2 lg:col-span-8">
            {kontekst.slice(0, 2).map((v) => (
              <a key={v.slug} data-reveal href={ytUrl(v)} target="_blank" rel="noopener noreferrer" className="group relative grid grid-cols-[1fr_7rem] gap-4 bg-bg-3 p-6 sm:grid-cols-1 sm:gap-6">
                <span className="relative z-10 flex flex-col">
                  <span className="font-display text-7xl font-extrabold leading-none text-accent md:text-8xl">{String(v.episode ?? "").padStart(2, "0")}</span>
                  <span className="meta mt-3">{shortDate(v.publishedAt)}</span>
                  <span className="hl mt-2 text-xl group-hover:underline decoration-accent underline-offset-4 md:text-2xl">{v.title}</span>
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumbOf(v)} alt="" loading="lazy" className="aspect-[9/16] w-full self-end border border-line object-cover sm:max-w-[9rem]" />
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 3. PLAN B: lista kategorii + filmy + zapowiedź sklepu */}
      <Reveal as="section" className="wrap mt-16" style={accent(SERIES["plan-b"].color)} aria-labelledby="planb">
        <SectionHead title="PLAN B · Gotowość" href="/plan-b" color={SERIES["plan-b"].color} linkLabel="Centrum PLAN B" />
        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="planb" data-reveal="mask" className="hl text-4xl md:text-[2.6rem]">Spokojnie. Masz plan.</h2>
            <p className="mt-4 text-muted">{SERIES["plan-b"].blurb}</p>
            <ol data-reveal className="mt-6 divide-y divide-line border-y border-line">
              {PLANB_CATEGORIES.map((c, i) => (
                <li key={c} className="flex items-baseline gap-4 py-3">
                  <span className="meta">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display font-semibold">{c}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-8">
            <ul className="grid grid-cols-3 gap-4">
              {planb.slice(0, 3).map((v) => <li key={v.slug} data-reveal><VideoCard video={v} /></li>)}
            </ul>
            <div className="mt-8 flex flex-col gap-4 border border-line bg-bg-2 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="label text-accent">Sklep PLAN B · wkrótce</p>
                <p className="mt-1 max-w-md text-muted">Wyselekcjonowany sprzęt i poradniki PDF. Linki partnerskie będą zawsze oznaczone.</p>
              </div>
              <Link href="/sklep" className="label shrink-0 bg-planb px-5 py-3 text-bg hover:bg-text">Zobacz plan sklepu</Link>
            </div>
          </div>
        </div>
      </Reveal>

      {/* 4. Biblioteka wideo */}
      <section className="mt-20 border-t border-line pt-8">
        <div className="wrap">
          <SectionHead title="Biblioteka wideo" href="/wideo" linkLabel="Wszystkie filmy" />
        </div>
        <ul className="no-scrollbar wrap mt-6 flex snap-x gap-4 overflow-x-auto pb-4" aria-label="Najnowsze filmy">
          {videos.slice(0, 12).map((v) => (
            <li key={v.slug} className="w-40 shrink-0 snap-start md:w-52"><VideoCard video={v} /></li>
          ))}
        </ul>
      </section>

      {/* 5. Newsletter */}
      <section className="wrap mt-20">
        <div className="grid gap-8 border-t-4 border-text pt-10 md:grid-cols-2">
          <div>
            <h2 className="hl text-3xl md:text-4xl">Najważniejsze sygnały. Bez informacyjnego szumu.</h2>
            <p className="mt-3 text-muted">Wybrane materiały z SYGNAŁ, KONTEKST i PLAN B prosto na e-mail. Obserwuj nas też na{" "}
              <a className="underline" href={SITE.social.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>,{" "}
              <a className="underline" href={SITE.social.tiktok} target="_blank" rel="noopener noreferrer">TikToku</a> i{" "}
              <a className="underline" href={SITE.social.instagram} target="_blank" rel="noopener noreferrer">Instagramie</a>.</p>
          </div>
          <NewsletterSignup />
        </div>
      </section>
    </>
  );
}
