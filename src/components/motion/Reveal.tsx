"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Selektywne odsłanianie przy scrollu: animuje tylko elementy [data-reveal] wewnątrz sekcji.
 * Każdy [data-reveal] (także "mask", traktowany tak samo): krótkie pojawienie się z przesunięciem 14 px.
 * [data-draw] (SVG path/line) → rysowanie linii diagramu.
 */
export function Reveal({ children, className = "", style, as: Tag = "div", ...rest }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; as?: "div" | "section"; "aria-labelledby"?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Krótko i bez masek: treść nie znika na długo i nie pokazuje „ciętych” liter przy szybkim przewijaniu.
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", el);
      if (items.length)
        gsap.from(items, {
          opacity: 0,
          y: 14,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.05,
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });

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
