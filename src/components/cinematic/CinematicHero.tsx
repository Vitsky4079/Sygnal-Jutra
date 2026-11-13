"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play, ShoppingCart } from "lucide-react";

/**
 * Filmowy hero (Reference A).
 * - Ekran poziomy (`land:`): zdjęcie na całą wysokość, tekst po lewej na przyciemnionym niebie.
 * - Ekran pionowy (telefon): tekst na spokojnym granacie, scena sprzętu osobno pod nim (bez nachodzenia na sprzęt).
 * Nagłówek to jeden logiczny tekst; łamanie zmienia tylko <br> zależny od orientacji.
 * Animacja jest krótka (ok. 0,5 s dla tekstu), bez masek; po 1,5 s zawsze stan końcowy. Bez JS i przy reduced-motion treść widoczna od razu.
 */
export function CinematicHero({ desktopSrcSet, mobileSrcSet, fallback }: { desktopSrcSet: string; mobileSrcSet: string; fallback: React.ImgHTMLAttributes<HTMLImageElement> }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ready = () => el.setAttribute("data-cine-ready", "");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return ready();
    gsap.registerPlugin(ScrollTrigger);

    let tl: gsap.core.Timeline | undefined;
    const ctx = gsap.context(() => {
      tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.fromTo("[data-c='img']", { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 1.1 }, 0)
        .fromTo("[data-c='fade']", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.06 }, 0.05);
      ready();
      // tylko tło: delikatna paralaksa; czytelność tekstu nie zależy od przewijania
      gsap.to("[data-c='plx']", { yPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
    }, el);
    const safety = window.setTimeout(() => { ready(); tl?.progress(1); }, 1500);
    return () => { window.clearTimeout(safety); ctx.revert(); };
  }, []);

  return (
    <section
      ref={root}
      data-cine
      aria-labelledby="hero-h"
      className="relative -mt-16 flex flex-col overflow-hidden bg-[linear-gradient(180deg,#06101d_0%,#0a1a2e_100%)] md:-mt-24 land:block land:h-[100svh] land:min-h-[620px] lg:land:min-h-[700px]"
    >
      <div data-c="copy" className="wrap relative z-10 pb-4 pt-24 md:pt-32 land:flex land:h-full land:flex-col land:justify-center land:pb-[11vh] land:pt-24">
        <h1
          id="hero-h"
          data-c="fade"
          className="display text-[calc((100vw-2.5rem)/9.8)] md:text-[min(calc((100vw-4rem)/9.8),4.2rem)] land:text-[clamp(2.4rem,4.4vw,5.2rem)]"
        >
          Przygotuj się<br className="hidden land:inline" /> na<br className="land:hidden" /> nieprzewidziane<span className="text-sygnal">.</span>
        </h1>
        <p data-c="fade" className="mt-4 max-w-[40rem] text-[1rem] leading-[1.5] text-text/90 md:mt-6 md:text-lg land:mt-7 land:text-[clamp(1.1rem,1.55vw,1.6rem)]">
          Sprawdzone wyposażenie, praktyczne instrukcje<br className="hidden lg:inline" /> i wiedza, która pomoże Ci przygotować się<br className="hidden lg:inline" /> na sytuacje kryzysowe.
        </p>
        <div data-c="fade" className="mt-6 flex flex-wrap gap-3 md:gap-5 land:mt-10">
          <Link href="/sklep" className="group inline-flex min-h-12 items-center gap-2.5 rounded-[5px] bg-sygnal px-5 text-[0.95rem] font-bold text-bg-3 transition-colors hover:bg-[#ff8a5c] md:min-h-[3.75rem] md:gap-3 md:px-8 md:text-lg">
            <ShoppingCart aria-hidden size={20} strokeWidth={2.2} /> Odkryj sprzęt <ArrowRight aria-hidden size={18} strokeWidth={2.4} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/instrukcje" className="group inline-flex min-h-12 items-center gap-2.5 rounded-[5px] border-2 border-planb px-5 text-[0.95rem] font-bold text-text transition-colors hover:bg-planb/10 md:min-h-[3.75rem] md:gap-3 md:px-8 md:text-lg">
            <Play aria-hidden size={20} strokeWidth={2.2} className="text-planb" /> Poznaj instrukcje
          </Link>
        </div>
      </div>

      {/* scena: na telefonie osobny pas pod tekstem, na ekranie poziomym tło całej sekcji */}
      <div data-c="plx" className="relative -mt-6 aspect-[4/5] max-h-[78svh] w-full md:aspect-[5/4] land:absolute land:inset-0 land:mt-0 land:aspect-auto land:max-h-none">
        <picture data-c="img" className="absolute inset-0 block">
          <source media="(min-aspect-ratio: 1/1)" srcSet={desktopSrcSet} />
          <source srcSet={mobileSrcSet} />
          {/* eslint-disable-next-line @next/next/no-img-element -- art direction przez <picture> z getImageProps */}
          <img
            {...fallback}
            alt="Stacja zasilania, plecak, radio, latarka i walizka ochronna na skalistym zboczu o zmierzchu"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="size-full object-cover object-[50%_100%] [mask-image:linear-gradient(180deg,transparent_0%,#000_18%)] land:object-[100%_55%] land:[mask-image:none]"
          />
        </picture>
        {/* czytelność tekstu na ekranie poziomym */}
        <div aria-hidden className="absolute inset-0 hidden land:block land:bg-[linear-gradient(90deg,rgba(5,13,24,.6)_0%,rgba(5,13,24,.25)_40%,rgba(5,13,24,0)_58%)]" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent land:h-32" />
      </div>
    </section>
  );
}
