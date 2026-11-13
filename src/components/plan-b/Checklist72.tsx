"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Check, Printer, RotateCcw } from "lucide-react";
import { CHECKLIST, CHECKLIST_TOTAL, GEAR, SOURCE } from "@/lib/preparedness";

const KEY = "sj-checklista-72h-v1";
const R = 52;
const LEN = 2 * Math.PI * R;

/**
 * Checklista 72 h. Postęp zapisywany wyłącznie w przeglądarce (localStorage).
 * Procent = odsetek zaznaczonych pozycji listy, NIE ocena bezpieczeństwa.
 */
export function Checklist72({ compact = false }: { compact?: boolean }) {
  const [done, setDone] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);
  const ring = useRef<SVGCircleElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- odczyt stanu z localStorage po montażu
      if (raw) setDone(new Set(JSON.parse(raw) as string[]));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(KEY, JSON.stringify([...done])); } catch {}
  }, [done, loaded]);

  const count = done.size;
  const pct = Math.round((count / CHECKLIST_TOTAL) * 100);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = LEN * (1 - count / CHECKLIST_TOTAL);
    if (ring.current) gsap.to(ring.current, { strokeDashoffset: target, duration: reduce ? 0 : 0.7, ease: "power3.out" });
    if (num.current) {
      const o = { v: Number(num.current.textContent) || 0 };
      gsap.to(o, { v: pct, duration: reduce ? 0 : 0.6, ease: "power2.out", onUpdate: () => { if (num.current) num.current.textContent = String(Math.round(o.v)); } });
    }
  }, [count, pct]);

  const toggle = (id: string) =>
    setDone((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });

  const groupDone = useMemo(() => Object.fromEntries(CHECKLIST.map((g) => [g.id, g.items.filter((i) => done.has(i.id)).length])), [done]);
  const message = count === 0 ? "Zaznacz to, co już masz w domu." : count === CHECKLIST_TOTAL ? "Cała lista odhaczona. Pamiętaj o przeglądzie zapasów co kilka miesięcy." : `Brakuje jeszcze ${CHECKLIST_TOTAL - count} z ${CHECKLIST_TOTAL} pozycji.`;

  return (
    <div id="checklista-druk" className="grid gap-10 lg:grid-cols-[18rem_1fr] lg:gap-14">
      {/* panel postępu */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="flex items-center gap-6 lg:block">
          <div className="relative size-32 shrink-0 lg:size-44">
            <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden>
              <circle cx="60" cy="60" r={R} fill="none" stroke="#27354a" strokeWidth="6" />
              <circle ref={ring} cx="60" cy="60" r={R} fill="none" stroke="#a4d37f" strokeWidth="6" strokeLinecap="butt" strokeDasharray={LEN} strokeDashoffset={LEN} />
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center">
              <p className="font-display text-4xl font-extrabold lg:text-5xl"><span ref={num}>0</span><span className="text-xl text-muted lg:text-2xl">%</span></p>
            </div>
          </div>
          <div className="lg:mt-6">
            <p className="font-display text-lg font-bold" aria-live="polite">{count} / {CHECKLIST_TOTAL} pozycji</p>
            <p className="mt-1 text-sm text-muted">{message}</p>
          </div>
        </div>
        <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-muted">
          Wynik to tylko odsetek zaznaczonych pozycji, a nie ocena bezpieczeństwa. Lista na podstawie:{" "}
          <a href={SOURCE.url} target="_blank" rel="noopener noreferrer" className="underline">{SOURCE.label}</a>, „Zapasy domowe na minimum 3 dni”.
          Postęp zapisuje się tylko w tej przeglądarce na tym urządzeniu.
        </p>
        <div className="no-print mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={() => window.print()} className="label inline-flex min-h-11 items-center gap-2 border border-line px-4 hover:border-planb hover:text-planb">
            <Printer aria-hidden size={15} /> Drukuj listę
          </button>
          <button type="button" onClick={() => setDone(new Set())} disabled={count === 0} className="label inline-flex min-h-11 items-center gap-2 px-3 text-muted hover:text-text disabled:opacity-40">
            <RotateCcw aria-hidden size={14} /> Wyczyść
          </button>
        </div>
      </div>

      {/* grupy (+ przyklejony pasek postępu na telefonach) */}
      <div className="grid gap-x-10 md:grid-cols-2">
        <div aria-hidden className="no-print sticky top-16 z-10 -mx-5 md:top-24 md:-mx-8 md:px-8 flex items-center gap-3 border-b border-line bg-bg/95 px-5 py-2.5 backdrop-blur-sm md:col-span-2 lg:hidden">
          <span className="meta w-14 shrink-0 text-planb">{pct}%</span>
          <span className="relative h-1 flex-1 bg-line">
            <span className="absolute inset-y-0 left-0 bg-planb transition-[width] duration-500" style={{ width: `${pct}%` }} />
          </span>
          <span className="meta shrink-0">{count}/{CHECKLIST_TOTAL}</span>
        </div>
        {CHECKLIST.map((g) => {
          const gd = groupDone[g.id];
          const complete = gd === g.items.length;
          const gear = g.gear ? GEAR.find((x) => x.id === g.gear) : undefined;
          return (
            <fieldset key={g.id} className="border-t border-line py-5">
              <legend className="sr-only">{g.title}</legend>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className={`font-display text-lg font-bold transition-colors ${complete ? "text-planb" : ""}`}>{g.title}</h3>
                <span className="meta">{gd}/{g.items.length}</span>
              </div>
              <ul className="mt-3 space-y-1">
                {g.items.map((it) => {
                  const on = done.has(it.id);
                  return (
                    <li key={it.id}>
                      <label className="group flex min-h-11 cursor-pointer items-start gap-3 py-1.5">
                        <input type="checkbox" checked={on} onChange={() => toggle(it.id)} className="peer sr-only" />
                        <span aria-hidden className={`mt-0.5 grid size-5 shrink-0 place-items-center border transition-all duration-200 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-planb ${on ? "scale-100 border-planb bg-planb text-bg" : "border-muted/60 group-hover:border-text"}`}>
                          <Check size={14} strokeWidth={3} className={`transition-transform duration-200 ${on ? "scale-100" : "scale-0"}`} />
                        </span>
                        <span className={`text-[0.95rem] leading-snug transition-colors ${on ? "text-muted line-through decoration-planb/60" : ""}`}>{it.label}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              {!compact && (g.scenario || gear) && (
                <p className="no-print meta mt-2 flex flex-wrap gap-x-4">
                  {g.scenario && <Link href={`/plan-b/scenariusze/${g.scenario}`} className="hover:text-planb">Scenariusz →</Link>}
                  {gear && <Link href={`/sklep#${gear.id}`} className="hover:text-planb">{gear.name} →</Link>}
                </p>
              )}
            </fieldset>
          );
        })}
      </div>
    </div>
  );
}
