import Link from "next/link";
import Image from "next/image";
import { getArticles, getVideos } from "@/lib/content";
import { SERIES, SITE, formatDate } from "@/lib/site";
import { ArticleRow, EmptyState, SectionHead, SeriesLabel, VideoCard, accent, articleHref } from "@/components/ui";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export default async function Home() {
  const [articles, videos] = await Promise.all([getArticles(), getVideos()]);
  const lead = articles.find((a) => a.featured) ?? articles[0];
  const secondary = articles.filter((a) => a !== lead).slice(0, 3);
  const latest = articles.filter((a) => a !== lead && !secondary.includes(a)).slice(0, 8);
  const kontekst = articles.find((a) => a.series === "kontekst");
  const planb = articles.filter((a) => a.series === "plan-b").slice(0, 3);

  return (
    <>
      {/* Lead */}
      <section className="border-b border-line">
        <div className="wrap grid gap-10 py-10 md:py-16 lg:grid-cols-12">
          {lead ? (
            <>
              <article className="lg:col-span-8" style={accent(SERIES[lead.series].color)}>
                {lead.image && (
                  <div className="relative mb-6 aspect-[16/9] overflow-hidden border border-line">
                    <Image src={lead.image.src} alt={lead.image.alt} fill priority sizes="(min-width:1024px) 66vw, 100vw" className="object-cover" />
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <SeriesLabel series={lead.series} />
                  <time dateTime={lead.publishedAt} className="text-sm text-muted">{formatDate(lead.publishedAt)}</time>
                </div>
                <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
                  <Link href={articleHref(lead)} className="hover:underline decoration-accent decoration-4 underline-offset-[6px]">{lead.title}</Link>
                </h1>
                {lead.deck && <p className="mt-4 max-w-2xl text-lg text-muted">{lead.deck}</p>}
              </article>
              <aside className="lg:col-span-4 lg:border-l lg:border-line lg:pl-8" aria-label="Pozostałe tematy">
                {secondary.map((a) => <ArticleRow key={a.slug} article={a} />)}
              </aside>
            </>
          ) : (
            <>
              <div className="lg:col-span-7">
                <p className="label text-muted">Niezależny serwis · Polska</p>
                <h1 className="mt-4 font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl">
                  Świat się zmienia.<br />Zrozum dlaczego.
                </h1>
                <p className="mt-6 max-w-xl text-lg text-muted">{SITE.description}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/wideo" className="label bg-text px-6 py-3.5 text-bg hover:bg-sygnal">Oglądaj wideo</Link>
                  <Link href="/newsletter" className="label border border-line px-6 py-3.5 hover:border-text">Newsletter</Link>
                </div>
              </div>
              <ol className="lg:col-span-5 lg:border-l lg:border-line lg:pl-10" aria-label="Trzy serie">
                {Object.values(SERIES).map((s, i) => (
                  <li key={s.key} style={accent(s.color)} className="border-b border-line last:border-b-0">
                    <Link href={s.href} className="group grid grid-cols-[2.5rem_1fr] gap-x-3 py-6">
                      <span className="font-display text-sm font-bold text-muted">0{i + 1}</span>
                      <span>
                        <span className="label flex items-center gap-2 text-accent"><span aria-hidden className="size-2 bg-accent" />{s.name} · {s.kind}</span>
                        <span className="mt-2 block text-muted group-hover:text-text">{s.blurb}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
      </section>

      {/* Najnowsze sygnały */}
      <section className="wrap mt-16" aria-labelledby="najnowsze">
        <SectionHead title="Najnowsze sygnały" href="/sygnal" color={SERIES.sygnal.color} />
        <h2 id="najnowsze" className="sr-only">Najnowsze sygnały</h2>
        {latest.length ? (
          latest.map((a) => <ArticleRow key={a.slug} article={a} />)
        ) : (
          <div className="mt-6"><EmptyState title="Pierwsze materiały w przygotowaniu." color={SERIES.sygnal.color}>Gdy redakcja opublikuje pierwszy materiał, pojawi się tutaj. Do tego czasu zajrzyj do wideo.</EmptyState></div>
        )}
      </section>

      {/* KONTEKST */}
      <section className="mt-20 border-y border-line bg-bg-2" style={accent(SERIES.kontekst.color)}>
        <div className="wrap grid gap-8 py-14 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <p className="label text-accent">KONTEKST · Wyjaśniamy</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight md:text-5xl">Zrozumieć, jak to działa.</h2>
          </div>
          <div className="md:col-span-7">
            {kontekst ? (
              <article>
                <h3 className="font-display text-2xl font-bold"><Link href={articleHref(kontekst)} className="hover:underline">{kontekst.title}</Link></h3>
                {kontekst.deck && <p className="mt-3 text-muted">{kontekst.deck}</p>}
              </article>
            ) : (
              <p className="max-w-xl text-lg text-muted">{SERIES.kontekst.blurb}</p>
            )}
            <Link href="/kontekst" className="label mt-6 inline-block border-b-2 border-accent pb-1 text-accent">Archiwum KONTEKST →</Link>
          </div>
        </div>
      </section>

      {/* PLAN B */}
      <section className="wrap mt-20" style={accent(SERIES["plan-b"].color)}>
        <SectionHead title="PLAN B · Gotowość" href="/plan-b" color={SERIES["plan-b"].color} />
        <div className="mt-8 grid gap-8 md:grid-cols-12">
          <p className="text-lg text-muted md:col-span-5">{SERIES["plan-b"].blurb} Rekomendacje sprzętu są zawsze oznaczone i oddzielone od treści redakcyjnych.</p>
          <div className="md:col-span-7">
            {planb.length ? planb.map((a) => <ArticleRow key={a.slug} article={a} />) : <EmptyState title="Poradniki w przygotowaniu." color={SERIES["plan-b"].color} />}
            <Link href="/sklep" className="label mt-5 inline-block border-b-2 border-accent pb-1 text-accent">Sklep PLAN B →</Link>
          </div>
        </div>
      </section>

      {/* Wideo */}
      <section className="wrap mt-20">
        <SectionHead title="Wideo" href="/wideo" linkLabel="Całe archiwum" />
        {videos.length ? (
          <ul className="mt-6 flex snap-x gap-4 overflow-x-auto pb-4" aria-label="Najnowsze wideo">
            {videos.slice(0, 8).map((v) => (
              <li key={v.slug} className="w-44 shrink-0 snap-start md:w-52"><VideoCard video={v} /></li>
            ))}
          </ul>
        ) : (
          <div className="mt-6">
            <EmptyState title="Wideo znajdziesz na naszych kanałach.">
              <a className="underline" href={SITE.social.youtube} target="_blank" rel="noopener noreferrer">Otwórz kanał na YouTube</a>
            </EmptyState>
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="wrap mt-20">
        <div className="grid gap-8 border-t-4 border-text pt-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">Najważniejsze sygnały. Bez informacyjnego szumu.</h2>
            <p className="mt-3 text-muted">Wybrane materiały prosto na e-mail.</p>
          </div>
          <NewsletterSignup />
        </div>
      </section>
    </>
  );
}
