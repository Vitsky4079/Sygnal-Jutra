"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play, ShoppingCart } from "lucide-react";

/**
 * Filmowy hero (Reference A): zdjęcie dobrane do orientacji ekranu przez <picture>,
 * wejście: zdjęcie z lekkiej skali, nagłówek spod maski, potem tekst i przyciski; przy przewijaniu delikatna paralaksa.
 * Pełna treść bez JS i przy prefers-reduced-motion.
 */
export function CinematicHero({ desktopSrcSet, mobileSrcSet, fallback }: { desktopSrcSet: string; mobileSrcSet: string; fallback: React.ImgHTMLAttributes<HTMLImageElement> }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ready = () => el.setAttribute("data-cine-ready", "");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return ready();
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo("[data-c='img']", { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 1.8, ease: "power2.out" }, 0)
        .fromTo("[data-c='line']", { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.08 }, 0.25)
        .fromTo("[data-c='fade']", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.6);
      ready();
      gsap.to("[data-c='plx']", { yPercent: 8, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      gsap.to("[data-c='copy']", { y: -50, opacity: 0.25, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
    }, el);
    const safety = window.setTimeout(ready, 3000);
    return () => { window.clearTimeout(safety); ctx.revert(); };
  }, []);

  return (
    <section ref={root} data-cine aria-labelledby="hero-h" className="relative -mt-16 h-[100svh] min-h-[640px] overflow-hidden bg-bg-3 md:-mt-24 lg:min-h-[720px]">
      <div data-c="plx" className="absolute inset-0">
        <picture data-c="img" className="absolute inset-0 block">
          <source media="(min-aspect-ratio: 1/1)" srcSet={desktopSrcSet} />
          <source srcSet={mobileSrcSet} />
          {/* eslint-disable-next-line @next/next/no-img-element -- art direction przez <picture> z getImageProps */}
          <img {...fallback} alt="Stacja zasilania, plecak, radio, latarka i walizka ochronna na skalistym zboczu o zmierzchu" loading="eager" fetchPriority="high" decoding="async" className="size-full object-cover object-[50%_100%] [@media(min-aspect-ratio:1/1)]:object-[62%_55%]" />
        </picture>
      </div>

      {/* czytelność tekstu: delikatne przyciemnienie od strony treści i przejście w tło strony */}
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,13,24,.6)_0%,rgba(5,13,24,.15)_42%,rgba(5,13,24,0)_60%)] [@media(min-aspect-ratio:1/1)]:bg-[linear-gradient(90deg,rgba(5,13,24,.55)_0%,rgba(5,13,24,.2)_40%,rgba(5,13,24,0)_58%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent" />

      <div data-c="copy" className="wrap relative flex h-full flex-col pb-10 pt-24 [@media(min-aspect-ratio:1/1)]:justify-center [@media(min-aspect-ratio:1/1)]:pb-[12vh] [@media(min-aspect-ratio:1/1)]:pt-24">
        <h1 id="hero-h" className="display text-[clamp(1.9rem,8.6vw,3rem)] [@media(min-aspect-ratio:1/1)]:text-[clamp(2.6rem,4.4vw,5.2rem)]">
          <span className="block overflow-hidden pb-[0.06em]"><span data-c="line" className="block">Przygotuj się<span className="[@media(min-aspect-ratio:1/1)]:hidden"> na</span></span></span>
          <span className="block overflow-hidden pb-[0.06em]"><span data-c="line" className="block"><span className="hidden [@media(min-aspect-ratio:1/1)]:inline">na </span>nieprzewidziane<span className="text-sygnal">.</span></span></span>
        </h1>
        <p data-c="fade" className="mt-4 max-w-[40rem] text-[1rem] leading-[1.5] text-text/90 md:mt-7 [@media(min-aspect-ratio:1/1)]:text-[clamp(1.1rem,1.55vw,1.6rem)]">
          Sprawdzone wyposażenie, praktyczne instrukcje<br className="hidden lg:inline" /> i wiedza, która pomoże Ci przygotować się<br className="hidden lg:inline" /> na sytuacje kryzysowe.
        </p>
        <div data-c="fade" className="mt-6 flex flex-wrap gap-3 md:mt-10 md:gap-6">
          <Link href="/sklep" className="group inline-flex min-h-12 items-center gap-2.5 rounded-[5px] bg-sygnal px-5 text-[0.95rem] font-bold text-bg-3 transition-colors hover:bg-[#ff8a5c] md:min-h-[3.75rem] md:gap-3 md:px-8 md:text-lg">
            <ShoppingCart aria-hidden size={20} strokeWidth={2.2} /> Odkryj sprzęt <ArrowRight aria-hidden size={18} strokeWidth={2.4} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/instrukcje" className="group inline-flex min-h-12 items-center gap-2.5 rounded-[5px] border-2 border-planb px-5 text-[0.95rem] font-bold text-text transition-colors hover:bg-planb/10 md:min-h-[3.75rem] md:gap-3 md:px-8 md:text-lg">
            <Play aria-hidden size={20} strokeWidth={2.2} className="text-planb" /> Poznaj instrukcje
          </Link>
        </div>
      </div>
    </section>
  );
}
