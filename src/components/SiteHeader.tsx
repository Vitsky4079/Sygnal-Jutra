"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { MEDIA_NAV, NAV } from "@/lib/site";
import { Logo } from "./Logo";

/**
 * Nagłówek: przezroczysty nad filmowym hero, po przewinięciu przechodzi w ciemne tło.
 * Główna nawigacja to trzy doświadczenia PLAN B; redakcja jest dyskretnym linkiem obok.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const drawer = useRef<HTMLDialogElement>(null);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const close = () => drawer.current?.close();

  return (
    <header
      data-solid={solid || undefined}
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-300 data-[solid]:border-line/70 data-[solid]:bg-bg/85 data-[solid]:backdrop-blur-md"
    >
      <div className="wrap flex h-16 items-center justify-between gap-6 md:h-20">
        <div className="flex items-center gap-4">
          <Logo height={32} />
          <span aria-hidden className="hidden h-6 w-px bg-line sm:block" />
          <Link href="/" className="label hidden bg-planb px-2 py-1 text-[0.66rem] text-bg-3 sm:block" aria-label="PLAN B, strona główna">PLAN B</Link>
        </div>

        <nav aria-label="Główna" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className="relative px-4 py-3 font-display text-[0.95rem] font-semibold text-text/80 transition-colors hover:text-text aria-[current=page]:text-text
                after:absolute after:inset-x-4 after:bottom-1 after:h-[2px] after:origin-left after:scale-x-0 after:bg-sygnal after:transition-transform after:duration-300
                hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
          <span aria-hidden className="mx-3 h-6 w-px bg-line" />
          <Link href="/sygnal" className="meta inline-flex items-center gap-1 px-2 py-3 hover:text-text">
            Redakcja <ArrowUpRight aria-hidden size={13} />
          </Link>
          <Link href="/szukaj" aria-label="Szukaj" className="grid size-11 place-items-center text-text/80 hover:text-text">
            <Search aria-hidden size={19} />
          </Link>
        </nav>

        <button type="button" onClick={() => drawer.current?.showModal()} className="grid size-11 place-items-center md:hidden" aria-label="Otwórz menu">
          <Menu aria-hidden size={24} />
        </button>
      </div>

      <dialog
        ref={drawer}
        aria-label="Menu"
        className="m-0 ml-auto h-dvh max-h-none w-full max-w-none bg-bg-3 p-0 text-text backdrop:bg-black/70 sm:w-[24rem] sm:border-l sm:border-line"
        onClick={(e) => e.target === drawer.current && close()}
      >
        <div className="flex h-full flex-col px-6 pb-8 pt-3">
          <div className="flex h-14 items-center justify-between">
            <span className="label text-muted">Menu</span>
            <button type="button" onClick={close} aria-label="Zamknij menu" className="grid size-11 place-items-center">
              <X aria-hidden size={24} />
            </button>
          </div>

          <nav aria-label="Menu mobilne" className="mt-6 flex flex-col">
            {NAV.map((item, i) => (
              <Link key={item.href} href={item.href} onClick={close} aria-current={isActive(item.href) ? "page" : undefined}
                className="flex min-h-16 items-baseline gap-4 border-b border-line font-display text-4xl font-extrabold uppercase tracking-tight aria-[current=page]:text-planb">
                <span className="meta w-6">{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-10">
            <p className="label text-muted">Redakcja Sygnał Jutra</p>
            <ul className="mt-2 flex flex-wrap gap-x-5">
              {MEDIA_NAV.map((m) => (
                <li key={m.href}><Link href={m.href} onClick={close} className="inline-flex min-h-11 items-center text-text/85 hover:text-text">{m.label}</Link></li>
              ))}
              <li><Link href="/szukaj" onClick={close} className="inline-flex min-h-11 items-center text-text/85 hover:text-text">Szukaj</Link></li>
            </ul>
          </div>

          <Link href="/sklep" onClick={close} className="label mt-auto bg-sygnal px-4 py-4 text-center text-bg-3">
            Odkryj sprzęt
          </Link>
        </div>
      </dialog>
    </header>
  );
}
