"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Sekwencja wejścia dla /sygnal (~1.4 s, przerywalna, nie blokuje kliknięć):
 * 1. masthead [data-sm="mast"]  2. linia sygnału [data-sm="line"] + iskra [data-sm="spark"]
 * 3. media maską [data-sm="media"]  4. treści drugorzędne [data-sm="item"].
 * Elementy są ukryte CSS-em tylko gdy <html> ma klasę .motion-ok (brak reduced-motion).
 */
export function SygnalMotion({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ready = () => el.setAttribute("data-sm-ready", "");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ready();
      return;
    }

    const ctx = gsap.context(() => {
      const q = (k: string) => gsap.utils.toArray<HTMLElement>(`[data-sm="${k}"]`, el);
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(q("mast"), { yPercent: 105 }, { yPercent: 0, duration: 0.8, stagger: 0.06 }, 0)
        .fromTo(q("meta"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.05 }, 0.25)
        .fromTo(q("line"), { scaleX: 0, transformOrigin: "0 50%" }, { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, 0.35)
        .fromTo(q("spark"), { left: "0%", opacity: 1 }, { left: "100%", opacity: 0, duration: 1.1, ease: "power2.inOut" }, 0.35)
        .fromTo(q("media"), { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 0.8, ease: "power3.inOut" }, 0.55)
        .fromTo(q("item"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 }, 0.8)
        .add(() => gsap.set(q("media"), { clearProps: "clipPath" }));

      ready(); // od teraz stan kontroluje GSAP (fromTo ustawił wartości startowe)
    }, el);

    const safety = window.setTimeout(ready, 3000);
    return () => {
      window.clearTimeout(safety);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} data-sm-root className={className}>
      {children}
    </div>
  );
}
