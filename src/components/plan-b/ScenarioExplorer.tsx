"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import type { Scenario } from "@/lib/preparedness";
import { IsoVignette } from "./Iso";

/** Interaktywny wybór scenariusza: lista + scena z płynnym przejściem. */
export function ScenarioExplorer({ scenarios }: { scenarios: Scenario[] }) {
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const s = scenarios[active];

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const el = stage.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-st='art']", { opacity: 0, y: 26, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" });
      gsap.fromTo("[data-st='txt']", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "power2.out", delay: 0.08 });
    }, el);
    return () => ctx.revert();
  }, [active]);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-0">
      <div role="tablist" aria-label="Scenariusze" className="no-scrollbar -mx-5 flex overflow-x-auto border-t border-line px-5 md:-mx-8 md:px-8 lg:mx-0 lg:block lg:overflow-visible lg:border-r lg:px-0 lg:pr-8">
        {scenarios.map((x, i) => (
          <button
            key={x.slug}
            role="tab"
            id={`tab-${x.slug}`}
            aria-selected={i === active}
            aria-controls="scenariusz-panel"
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                e.preventDefault();
                const n = (i + (e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1) + scenarios.length) % scenarios.length;
                setActive(n);
                document.getElementById(`tab-${scenarios[n].slug}`)?.focus();
              }
            }}
            tabIndex={i === active ? 0 : -1}
            className="group relative grid shrink-0 grid-cols-[2rem_1fr] items-baseline gap-2 border-b border-line py-4 pr-6 text-left transition-colors lg:w-full lg:grid-cols-[2.5rem_1fr] lg:gap-3 lg:py-5 lg:pr-0"
          >
            <span className={`meta transition-colors ${i === active ? "text-planb" : ""}`}>{x.index}</span>
            <span>
              <span className={`hl block whitespace-nowrap text-lg transition-colors lg:whitespace-normal lg:text-[1.9rem] ${i === active ? "text-text" : "text-muted group-hover:text-text"}`}>{x.title}</span>
              <span className="meta mt-1 hidden lg:block">{x.kicker}</span>
            </span>
            <span aria-hidden className={`absolute bottom-[-1px] left-0 h-[2px] bg-planb transition-all duration-500 ${i === active ? "w-full" : "w-0 group-hover:w-10"}`} />
          </button>
        ))}
      </div>

      <div ref={stage} id="scenariusz-panel" role="tabpanel" aria-labelledby={`tab-${s.slug}`} className="relative lg:pl-10">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center">
          <div data-st="art" className="relative">
            <IsoVignette kind={s.illustration} className="mx-auto w-full max-w-[26rem]" />
          </div>
          <div>
            <p data-st="txt" className="label text-planb">Scenariusz {s.index}</p>
            <h3 data-st="txt" className="hl mt-3 text-3xl md:text-4xl">{s.kicker}</h3>
            <p data-st="txt" className="mt-4 text-muted">{s.short}</p>
            <div data-st="txt" className="mt-5 border-l-2 border-planb pl-4">
              <p className="meta">Według rządowego poradnika ({s.steps[0].page})</p>
              <p className="mt-1 text-[0.95rem]">{s.steps[0].text}</p>
            </div>
            <Link data-st="txt" href={`/plan-b/scenariusze/${s.slug}`} className="label mt-7 inline-flex min-h-12 items-center gap-2 bg-planb px-6 text-bg transition-colors hover:bg-text">
              Otwórz scenariusz <ArrowRight aria-hidden size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
