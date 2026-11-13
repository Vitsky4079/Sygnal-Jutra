"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Sekwencja wejścia dla /sygnal (~1.4 s, przerywalna, nie blokuje kliknięć):
 * 1. masthead [data-sm="mast"]  2. linia sygnału [data-sm="line"] + iskra [data-sm="spark"]
 * 3. media maską [data-sm="media"]  4. treści drugorzędne [data-sm="item"].
 * Stan początkowy ustawia CSS w @media (prefers-reduced-motion: no-preference); bez JS odsłania go <noscript>.
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

      const step = (k: string, from: gsap.TweenVars, to: gsap.TweenVars, at: number) => {
        const t = q(k);
        if (t.length) tl.fromTo(t, from, to, at);
      };
      // y: 0 jawnie, inaczej GSAP przejmuje translateY(105%) z CSS jako stałe przesunięcie w px
      step("mast", { yPercent: 105, y: 0 }, { yPercent: 0, y: 0, duration: 0.8, stagger: 0.06 }, 0);
      step("meta", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.05 }, 0.25);
      step("line", { scaleX: 0, transformOrigin: "0 50%" }, { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, 0.35);
      step("spark", { left: "0%", opacity: 1 }, { left: "100%", opacity: 0, duration: 1.1, ease: "power2.inOut" }, 0.35);
      step("media", { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 0.8, ease: "power3.inOut" }, 0.55);
      step("item", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 }, 0.8);
      if (q("media").length) tl.add(() => gsap.set(q("media"), { clearProps: "clipPath" }));

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
