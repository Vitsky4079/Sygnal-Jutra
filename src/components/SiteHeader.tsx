"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Search, X } from "lucide-react";
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
      <div className="wrap flex h-16 items-center justify-between gap-6 md:h-24">
        <div className="flex items-center gap-3 md:gap-5">
          <Logo height={44} imgClassName="h-[30px] w-auto md:h-[44px]" />
          <span aria-hidden className="h-7 w-px bg-text/25 md:h-9" />
          <PlanBTag className="inline-flex" />
        </div>

        <nav aria-label="Główna" className="hidden items-center md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className="relative px-5 py-4 text-[1.05rem] font-semibold text-text/85 transition-colors hover:text-text aria-[current=page]:font-bold aria-[current=page]:text-text lg:px-7
                after:absolute after:inset-x-5 after:-bottom-1 after:h-[3px] after:rounded-full after:bg-sygnal after:opacity-0 after:transition-opacity lg:after:inset-x-7
                hover:after:opacity-50 aria-[current=page]:after:opacity-100"
            >
              {item.label}
            </Link>
          ))}
          <span aria-hidden className="mx-4 h-9 w-px bg-text/25" />
          <Link href="/szukaj" aria-label="Szukaj" className="grid size-11 place-items-center text-text/90 hover:text-text">
            <Search aria-hidden size={24} strokeWidth={1.8} />
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

/** Znacznik PLAN B obok logo: zielona, ścięta etykieta i dwa ukośniki, jak w identyfikacji z mockupów. */
export function PlanBTag({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="PLAN B, strona główna" className={`items-center gap-1.5 ${className}`}>
      <span className="-skew-x-12 rounded-[3px] bg-planb px-2 py-1 text-[0.78rem] font-extrabold md:px-2.5 md:text-[0.95rem] leading-none tracking-tight text-bg-3">
        <span className="inline-block skew-x-12">PLAN B</span>
      </span>
      <span aria-hidden className="text-lg font-extrabold italic leading-none tracking-[-0.15em] text-planb">{"//"}</span>
    </Link>
  );
}
