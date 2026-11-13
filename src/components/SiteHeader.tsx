"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import { Menu, Search, X } from "lucide-react";
import { MEDIA_NAV, NAV, SERIES, SITE } from "@/lib/site";
import { Logo } from "./Logo";

const today = new Intl.DateTimeFormat("pl-PL", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const drawer = useRef<HTMLDialogElement>(null);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const close = () => drawer.current?.close();

  function onSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();
    close();
    if (q) router.push(`/szukaj?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-sm">
      {/* Pasek redakcyjny */}
      <div className="hidden border-b border-line md:block">
        <div className="wrap flex h-8 items-center justify-between">
          <p className="meta capitalize" suppressHydrationWarning>{today.format(new Date())}</p>
          <nav aria-label="Media" className="meta flex gap-4">
            <span className="text-muted/70">Media:</span>
            {MEDIA_NAV.map((m) => <Link key={m.href} href={m.href} className="hover:text-text">{m.label}</Link>)}
          </nav>
          <ul className="meta flex gap-4">
            {[["YouTube", SITE.social.youtube], ["TikTok", SITE.social.tiktok], ["Instagram", SITE.social.instagram]].map(([l, h]) => (
              <li key={l}><a href={h} target="_blank" rel="noopener noreferrer" className="hover:text-text">{l}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-b border-line">
        <div className="wrap flex h-16 items-center justify-between gap-6">
          <Logo height={34} />

          <nav aria-label="Główna" className="hidden items-center lg:flex">
            {NAV.map((item) => {
              const color = item.series ? SERIES[item.series].color : "var(--text)";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  style={{ ["--accent" as string]: color }}
                  className="label relative px-3 py-[1.4rem] xl:px-4 text-muted transition-colors hover:text-text aria-[current=page]:text-text
                    after:absolute after:inset-x-3 xl:after:inset-x-4 after:bottom-0 after:h-[3px] after:origin-left after:scale-x-0 after:bg-accent after:transition-transform
                    hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <form role="search" onSubmit={onSearch} className="hidden xl:block">
              <label className="sr-only" htmlFor="q-desktop">Szukaj</label>
              <div className="flex items-center border-b border-line focus-within:border-text">
                <Search aria-hidden size={16} className="text-muted" />
                <input id="q-desktop" name="q" type="search" placeholder="Szukaj" className="w-32 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted" />
              </div>
            </form>
            <Link href="/checklista" className="label hidden bg-planb px-4 py-2.5 text-bg transition-colors hover:bg-text sm:inline-block">
              Checklista 72 h
            </Link>
            <button type="button" onClick={() => drawer.current?.showModal()} className="grid size-11 place-items-center lg:hidden" aria-label="Otwórz menu">
              <Menu aria-hidden size={22} />
            </button>
          </div>
        </div>
      </div>

      <dialog
        ref={drawer}
        aria-label="Menu"
        className="m-0 ml-auto h-dvh max-h-none w-[min(22rem,100vw)] max-w-none border-l border-line bg-bg p-0 text-text backdrop:bg-black/60"
        onClick={(e) => e.target === drawer.current && close()}
      >
        <div className="flex h-full flex-col p-6">
          <div className="flex items-center justify-between">
            <span className="label text-muted">Menu</span>
            <button type="button" onClick={close} aria-label="Zamknij menu" className="grid size-11 place-items-center">
              <X aria-hidden size={22} />
            </button>
          </div>

          <form role="search" onSubmit={onSearch} className="mt-4 flex border-b border-line focus-within:border-text">
            <label className="sr-only" htmlFor="q-mobile">Szukaj</label>
            <input id="q-mobile" name="q" type="search" placeholder="Szukaj w serwisie" className="min-h-11 flex-1 bg-transparent text-base outline-none placeholder:text-muted" />
            <button type="submit" aria-label="Szukaj" className="grid size-11 place-items-center"><Search aria-hidden size={18} /></button>
          </form>

          <nav aria-label="Menu mobilne" className="mt-6 flex flex-col">
            {NAV.map((item) => {
              const color = item.series ? SERIES[item.series].color : "var(--text)";
              return (
                <Link key={item.href} href={item.href} onClick={close} className="flex min-h-14 items-center gap-3 border-b border-line font-display text-2xl font-bold">
                  <span aria-hidden className="h-5 w-[3px]" style={{ background: color }} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6">
            <p className="label text-muted">Media</p>
            <ul className="mt-2 flex flex-wrap gap-x-5">
              {MEDIA_NAV.map((m) => (
                <li key={m.href}><Link href={m.href} onClick={close} className="inline-flex min-h-11 items-center hover:text-text">{m.label}</Link></li>
              ))}
              <li><Link href="/newsletter" onClick={close} className="inline-flex min-h-11 items-center hover:text-text">Newsletter</Link></li>
            </ul>
          </div>

          <Link href="/checklista" onClick={close} className="label mt-auto bg-planb px-4 py-4 text-center text-bg">
            Sprawdź checklistę 72 h
          </Link>
        </div>
      </dialog>
    </header>
  );
}
