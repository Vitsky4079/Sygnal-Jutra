"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Sekwencja otwarcia (raz na sesję, ~1.8 s, nie blokuje interakcji) + pulsy sygnału.
 * Elementy [data-intro] są ukrywane CSS-em dopiero, gdy skrypt w <head> doda klasę
 * .intro-pending (brak prefers-reduced-motion i brak flagi sesji).
 */
export function HeroMotion({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const html = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finish = () => {
      html.classList.remove("intro-pending");
      try { sessionStorage.setItem("sj-intro", "1"); } catch {}
    };

    if (reduce) {
      finish();
      return;
    }

    const ctx = gsap.context(() => {
      const pulses = gsap.utils.toArray<SVGCircleElement>(".sj-pulse", el);
      const rings = gsap.utils.toArray<SVGCircleElement>(".sj-ring", el);

      // Ciągły puls: wstrzymywany poza viewportem
      const loop = gsap.timeline({ repeat: -1, repeatDelay: 3.2, paused: true });
      loop.fromTo(
        pulses,
        { scale: 0.12, opacity: 0.6, svgOrigin: "400 400" },
        { scale: 1, opacity: 0, svgOrigin: "400 400", duration: 2.6, ease: "power2.out", stagger: 0.55 },
      );

      const startLoop = () => loop.play();

      if (html.classList.contains("intro-pending")) {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: () => { gsap.set("[data-intro]", { clearProps: "all" }); startLoop(); } });
        gsap.set("[data-intro]", { opacity: 0 });
        finish(); // klasa CSS zdjęta, od teraz kontroluje GSAP
        tl.from(rings, { scale: 0.2, opacity: 0, svgOrigin: "400 400", duration: 1.1, stagger: 0.08 }, 0)
          .fromTo("[data-intro='mask']", { clipPath: "inset(0 0 100% 0)", y: 28, opacity: 1 }, { clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.7 }, 0.35)
          .fromTo("[data-intro='up']", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.07 }, 0.6)
          .fromTo("[data-intro='media']", { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8 }, 0.5);
      } else {
        startLoop();
      }

      // Pauza animacji dekoracyjnej poza ekranem
      const io = new IntersectionObserver(([e]) => (e.isIntersecting ? loop.play() : loop.pause()), { threshold: 0 });
      io.observe(el);
      return () => io.disconnect();
    }, el);

    // zabezpieczenie: nigdy nie zostawiaj treści ukrytej
    const safety = window.setTimeout(finish, 4000);
    return () => {
      window.clearTimeout(safety);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} className={className}>
      {children}
    </section>
  );
}
