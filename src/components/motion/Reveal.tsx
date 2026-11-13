"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Selektywne odsłanianie przy scrollu: animuje tylko elementy [data-reveal] wewnątrz sekcji.
 * data-reveal="mask" → odsłonięcie maską (nagłówki), domyślnie → fade + przesunięcie.
 * [data-draw] (SVG path/line) → rysowanie linii diagramu.
 */
export function Reveal({ children, className = "", style, as: Tag = "div", ...rest }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; as?: "div" | "section"; "aria-labelledby"?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", el);
      const masks = items.filter((i) => i.dataset.reveal === "mask");
      const plain = items.filter((i) => i.dataset.reveal !== "mask");
      const common = { scrollTrigger: { trigger: el, start: "top 78%", once: true } };

      if (masks.length) gsap.from(masks, { clipPath: "inset(0 0 100% 0)", y: 24, duration: 0.7, ease: "power3.out", stagger: 0.1, ...common });
      if (plain.length) gsap.from(plain, { opacity: 0, y: 22, duration: 0.55, ease: "power2.out", stagger: 0.08, ...common });

      gsap.utils.toArray<SVGGeometryElement>("[data-draw]", el).forEach((p, i) => {
        const len = p.getTotalLength();
        gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, {
          strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut", delay: i * 0.12,
          scrollTrigger: { trigger: el, start: "top 70%", once: true },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={root as never} className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}
