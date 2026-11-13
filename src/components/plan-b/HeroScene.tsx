"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Backpack, Flashlight, IsoDefs, Platform, PowerStation, Radio, WaterCan, iso } from "./Iso";

type Spot = { key: string; href: string; label: string; at: [number, number, number]; depth: number; node: React.ReactNode };

const Z = 14;
const SPOTS: Spot[] = [
  { key: "power", href: "/sklep#zasilanie", label: "Zasilanie awaryjne", at: [100, 76, Z + 128], depth: 1.0, node: <PowerStation x={40} y={40} z={Z} /> },
  { key: "radio", href: "/sklep#lacznosc", label: "Łączność", at: [108, 210, Z + 70], depth: 1.25, node: <Radio x={60} y={190} z={Z} /> },
  { key: "water", href: "/sklep#woda", label: "Woda i filtracja", at: [261, 71, Z + 140], depth: 0.9, node: <WaterCan x={230} y={40} z={Z} /> },
  { key: "light", href: "/sklep#oswietlenie", label: "Oświetlenie", at: [228, 242, Z + 36], depth: 1.4, node: <Flashlight x={180} y={230} z={Z} /> },
  { key: "pack", href: "/sklep#plecaki", label: "Plecaki i ewakuacja", at: [337, 175, Z + 118], depth: 1.3, node: <Backpack x={300} y={150} z={Z} /> },
];

// trasy sygnału po powierzchni platformy (prowadzone jak ścieżki na płytce)
const ROUTES: [number, number][][] = [
  [[100, 112], [100, 190]],
  [[160, 76], [230, 76]],
  [[292, 71], [337, 71], [337, 150]],
  [[156, 210], [180, 210], [180, 228]],
  [[100, 112], [60, 112], [60, 150], [300, 150]],
];
const routeD = (r: [number, number][]) => r.map(([x, y], i) => `${i ? "L" : "M"} ${iso(x, y, Z).map((n) => n.toFixed(1)).join(" ")}`).join(" ");

export function HeroScene() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.setAttribute("data-sm-ready", "");
      return;
    }

    const ctx = gsap.context(() => {
      const objs = gsap.utils.toArray<SVGGElement>("[data-obj]", el);
      const routes = gsap.utils.toArray<SVGPathElement>("[data-route]", el);

      // 1. wejście: platforma, przedmioty opadają warstwami, trasy się rysują
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo("[data-platform]", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 }, 0.1)
        .fromTo(objs, { opacity: 0, y: -46 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.09, ease: "power4.out" }, 0.35);
      routes.forEach((p, i) => {
        const len = p.getTotalLength();
        tl.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" }, 0.9 + i * 0.08);
      });
      tl.add(() => routes.forEach((p) => { p.style.strokeDasharray = ""; p.style.strokeDashoffset = ""; p.classList.add("sj-flow"); }));
      el.setAttribute("data-sm-ready", "");

      // 2. delikatne unoszenie (wstrzymywane poza ekranem)
      const floats = objs.map((o, i) =>
        gsap.to(o.querySelector("[data-floater]"), { y: -5 - (i % 3) * 2, duration: 2.8 + i * 0.35, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.4 + i * 0.2 }),
      );

      // 3. paralaksa za kursorem (tylko precyzyjny wskaźnik)
      const fine = window.matchMedia("(pointer: fine)").matches;
      const movers = objs.map((o) => ({ depth: Number(o.dataset.depth), x: gsap.quickTo(o, "x", { duration: 0.8, ease: "power3.out" }), y: gsap.quickTo(o, "y", { duration: 0.8, ease: "power3.out" }) }));
      const plat = { x: gsap.quickTo("[data-platform]", "x", { duration: 1, ease: "power3.out" }), y: gsap.quickTo("[data-platform]", "y", { duration: 1, ease: "power3.out" }) };
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        plat.x(nx * 6); plat.y(ny * 4);
        movers.forEach((m) => { m.x(nx * 14 * m.depth); m.y(ny * 9 * m.depth); });
      };
      if (fine) el.addEventListener("pointermove", onMove);

      const io = new IntersectionObserver(([e]) => floats.forEach((f) => (e.isIntersecting ? f.play() : f.pause())));
      io.observe(el);
      return () => { el.removeEventListener("pointermove", onMove); io.disconnect(); };
    }, el);

    const safety = window.setTimeout(() => el.setAttribute("data-sm-ready", ""), 3000);
    return () => { window.clearTimeout(safety); ctx.revert(); };
  }, []);

  return (
    <div ref={root} data-sm-root className="relative">
      <svg viewBox="-285 -120 660 480" className="h-auto w-full overflow-visible" role="group" aria-label="Wyposażenie na sytuacje kryzysowe: wybierz kategorię">
        <IsoDefs />
        <g data-platform data-sm="item">
          <Platform w={420} d={300} />
          <g fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            {ROUTES.map((r, i) => (
              <path key={i} data-route d={routeD(r)} stroke={i === 4 ? "#ff713d" : "#a4d37f"} opacity={i === 4 ? 0.7 : 0.85} />
            ))}
          </g>
        </g>

        {SPOTS.map((s) => {
          const [lx, ly] = iso(...s.at);
          const w = s.label.length * 7.2 + 26;
          return (
            <a key={s.key} href={s.href} aria-label={`${s.label}: zobacz kategorię`} className="group outline-none" data-obj data-sm="item" data-depth={s.depth}>
              <g data-floater>
                <g className="transition-transform duration-300 ease-out group-hover:-translate-y-2 group-focus-visible:-translate-y-2">{s.node}</g>
                {/* znacznik + etykieta */}
                <g transform={`translate(${lx} ${ly})`}>
                  <circle r="9" fill="none" stroke="#a4d37f" strokeWidth="1.2" className="sj-ping" />
                  <circle r="4" fill="#a4d37f" />
                  <g className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <line x1="0" y1="-6" x2="0" y2="-22" stroke="#a4d37f" strokeWidth="1" />
                    <rect x={-w / 2} y="-46" width={w} height="24" fill="#080f1d" stroke="#a4d37f" strokeWidth="1" />
                    <text x="0" y="-30" textAnchor="middle" fill="#f6f7fa" fontSize="11.5" fontWeight="600" style={{ fontFamily: "var(--font-archivo)", letterSpacing: "0.02em" }}>
                      {s.label} →
                    </text>
                  </g>
                </g>
              </g>
            </a>
          );
        })}
      </svg>
    </div>
  );
}
