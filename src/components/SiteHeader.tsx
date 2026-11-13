"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import { Menu, Search, X } from "lucide-react";
import { NAV, SERIES } from "@/lib/site";
import { Logo } from "./Logo";

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
    <header className="sticky top-0 z-50 border-b border-line bg-bg/95 backdrop-blur-sm">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Główna" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const color = "series" in item && item.series ? SERIES[item.series].color : "var(--text)";
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                style={{ ["--accent" as string]: color }}
                className="label relative px-3 py-5 text-muted transition-colors hover:text-text aria-[current=page]:text-text
                  after:absolute after:inset-x-3 after:bottom-0 after:h-[3px] after:origin-left after:scale-x-0 after:bg-accent after:transition-transform
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
              <input
                id="q-desktop"
                name="q"
                type="search"
                placeholder="Szukaj"
                className="w-32 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted"
              />
            </div>
          </form>
          <Link
            href="/newsletter"
            className="label hidden bg-text px-4 py-2.5 text-bg transition-colors hover:bg-sygnal sm:inline-block"
          >
            Newsletter
          </Link>
          <button
            type="button"
            onClick={() => drawer.current?.showModal()}
            className="grid size-11 place-items-center lg:hidden"
            aria-label="Otwórz menu"
          >
            <Menu aria-hidden size={22} />
          </button>
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
              const color = "series" in item && item.series ? SERIES[item.series].color : "var(--text)";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="flex min-h-14 items-center gap-3 border-b border-line font-display text-2xl font-bold"
                >
                  <span aria-hidden className="h-5 w-[3px]" style={{ background: color }} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link href="/newsletter" onClick={close} className="label mt-auto bg-text px-4 py-4 text-center text-bg">
            Zapisz się do newslettera
          </Link>
        </div>
      </dialog>
    </header>
  );
}
