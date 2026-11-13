"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play } from "lucide-react";

type Spot = { label: string; href: string; x: number; y: number };

/** Pozycje produktów na zdjęciu hero-desktop (ułamki szerokości i wysokości oryginału 1376×768). */
const SPOTS: Spot[] = [
  { label: "Zasilanie awaryjne", href: "/sklep/zasilanie", x: 0.645, y: 0.6 },
  { label: "Plecaki i ewakuacja", href: "/sklep/ewakuacja", x: 0.794, y: 0.37 },
  { label: "Łączność", href: "/sklep/lacznosc", x: 0.837, y: 0.64 },
  { label: "Oświetlenie", href: "/sklep/oswietlenie", x: 0.785, y: 0.735 },
];
const IMG_RATIO = 1376 / 768;

/**
 * Filmowy hero: zdjęcie dobrane do orientacji ekranu (<picture>), wejście maską i skalą,
 * kolejno podświetlane produkty, a przy przewijaniu delikatna paralaksa.
 * Pełna treść bez JS i przy prefers-reduced-motion.
 */
export function CinematicHero({ desktopSrcSet, mobileSrcSet, fallback }: { desktopSrcSet: string; mobileSrcSet: string; fallback: React.ImgHTMLAttributes<HTMLImageElement> }) {
  const root = useRef<HTMLElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number }[] | null>(null);

  // Przelicza położenie punktów dla object-fit: cover (tylko szerokie ekrany poziome).
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mq = window.matchMedia("(min-width: 1024px) and (min-aspect-ratio: 1/1)");
    const calc = () => {
      if (!mq.matches) return setPos(null);
      const W = el.clientWidth, H = el.clientHeight;
      const s = Math.max(W / IMG_RATIO, H);
      const iw = s * IMG_RATIO, ih = s;
      const ox = (W - iw) * 0.7, oy = (H - ih) * 0.6; // = object-position 70% 60%
      setPos(SPOTS.map((p) => ({ left: ox + p.x * iw, top: oy + p.y * ih })));
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    mq.addEventListener("change", calc);
    return () => { ro.disconnect(); mq.removeEventListener("change", calc); };
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ready = () => el.setAttribute("data-cine-ready", "");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return ready();
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo("[data-c='img']", { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 2.2, ease: "power2.out" }, 0)
        .fromTo("[data-c='line']", { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.09 }, 0.35)
        .fromTo("[data-c='fade']", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 0.8);
      ready();

      // paralaksa: tło wolniej niż treść; treść lekko gaśnie przy wyjściu
      gsap.to("[data-c='plx']", { yPercent: 10, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      gsap.to("[data-c='copy']", { y: -60, opacity: 0.2, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
    }, el);
    const safety = window.setTimeout(ready, 3000);
    return () => { window.clearTimeout(safety); ctx.revert(); };
  }, []);

  // Punkty produktów pojawiają się po wejściu tekstu
  useEffect(() => {
    if (!pos || !root.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-spot]", { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.18, delay: 1.5, ease: "power2.out" });
    }, root.current);
    return () => ctx.revert();
  }, [pos !== null]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section ref={root} data-cine aria-labelledby="hero-h" className="grain relative -mt-16 h-[100svh] min-h-[640px] overflow-hidden bg-bg-3 md:-mt-20 lg:min-h-[720px]">
      <div data-c="plx" className="absolute inset-0">
        <picture data-c="img" className="absolute inset-0 block">
          <source media="(min-aspect-ratio: 1/1)" srcSet={desktopSrcSet} />
          <source srcSet={mobileSrcSet} />
          {/* eslint-disable-next-line @next/next/no-img-element -- art direction przez <picture> z getImageProps */}
          <img {...fallback} alt="Stacja zasilania, plecak, radio i latarka na skalistym zboczu o zmierzchu" loading="eager" fetchPriority="high" decoding="async" className="size-full object-cover object-[50%_62%] [@media(min-aspect-ratio:1/1)]:object-[70%_60%]" />
        </picture>
      </div>

      {/* czytelność: przyciemnienie od strony tekstu i przejście w tło strony */}
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,13,24,.55)_0%,rgba(5,13,24,0)_45%)] [@media(min-aspect-ratio:1/1)]:bg-[linear-gradient(90deg,rgba(5,13,24,.78)_0%,rgba(5,13,24,.35)_38%,rgba(5,13,24,0)_60%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

      {pos && (
        <ul aria-label="Kategorie sprzętu na zdjęciu" className="absolute inset-0">
          {SPOTS.map((s, i) => (
            <li key={s.href} data-spot className="absolute" style={{ left: pos[i].left, top: pos[i].top }}>
              <Link href={s.href} className="group relative -ml-2.5 -mt-2.5 flex items-center gap-3">
                <span className="relative grid size-5 place-items-center">
                  <span className="sj-ping absolute inset-0 rounded-full border border-sygnal/70" />
                  <span className="size-2 rounded-full bg-sygnal shadow-[0_0_0_3px_rgba(5,13,24,.6)]" />
                </span>
                <span className="label translate-x-0 whitespace-nowrap bg-bg-3/70 px-2.5 py-1.5 text-[0.66rem] text-text/90 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {s.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div data-c="copy" className="wrap relative flex h-full flex-col pb-14 pt-[5.5rem] md:pt-36 [@media(min-aspect-ratio:1/1)]:justify-center [@media(min-aspect-ratio:1/1)]:pt-20">
        <p data-c="fade" className="label flex items-center gap-3 text-planb">
          <span aria-hidden className="h-px w-8 bg-planb" /> Sygnał Jutra · PLAN B
        </p>
        <h1 id="hero-h" className="display mt-4 text-[clamp(1.85rem,8.4vw,6.6rem)] md:mt-5 [@media(min-aspect-ratio:1/1)]:text-[clamp(2.6rem,4.4vw,4.5rem)]">
          <span className="block overflow-hidden pb-[0.04em]"><span data-c="line" className="block">Przygotuj się<span className="[@media(min-aspect-ratio:1/1)]:hidden"> na</span></span></span>
          <span className="block overflow-hidden pb-[0.04em]"><span data-c="line" className="block"><span className="hidden [@media(min-aspect-ratio:1/1)]:inline">na </span>nieprzewidziane<span className="text-sygnal">.</span></span></span>
        </h1>
        <p data-c="fade" className="mt-4 max-w-[34rem] text-[0.98rem] leading-relaxed text-text/85 md:mt-6 md:text-xl">
          Sprawdzone wyposażenie, praktyczne instrukcje i wiedza, która pomoże Ci przygotować się na sytuacje kryzysowe.
        </p>
        <div data-c="fade" className="mt-6 flex flex-wrap gap-2.5 md:mt-9 md:gap-3">
          <Link href="/sklep" className="group inline-flex min-h-12 items-center gap-2.5 bg-sygnal px-4 font-display text-sm md:min-h-13 md:text-[0.95rem] md:gap-3 md:px-6 font-bold text-bg-3 transition-colors hover:bg-text">
            Odkryj sprzęt <ArrowRight aria-hidden size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/instrukcje" className="group inline-flex min-h-12 items-center gap-2.5 border border-planb/80 bg-bg-3/30 px-4 font-display text-sm backdrop-blur-[2px] md:min-h-13 md:text-[0.95rem] md:gap-3 md:px-6 font-bold text-text transition-colors hover:bg-planb hover:text-bg-3">
            <Play aria-hidden size={15} className="text-planb transition-colors group-hover:text-bg-3" /> Poznaj instrukcje
          </Link>
        </div>
      </div>

      <div data-c="fade" aria-hidden className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="meta text-text/50">Przewiń</span>
        <span className="h-10 w-px bg-gradient-to-b from-text/50 to-transparent" />
      </div>
    </section>
  );
}
