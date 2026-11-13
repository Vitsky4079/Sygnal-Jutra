import Image from "next/image";
import { Backpack, BatteryMedium, BriefcaseMedical, ClipboardCheck, Droplet, House, Lightbulb, Milk, Package, Radio, Users, Zap, type LucideIcon } from "lucide-react";
import type { Pdf } from "@/lib/pdfs";

const ICONS: Record<string, LucideIcon[]> = {
  "72-godziny-bez-pradu": [Zap, Lightbulb, BatteryMedium],
  "plecak-ewakuacyjny": [Backpack, BriefcaseMedical, Milk],
  "domowa-gotowosc-7-dni": [House, Package, Droplet],
  "plan-awaryjny-dla-rodziny": [Users, ClipboardCheck, Radio],
};

/**
 * Okładka publikacji PLAN B (Reference D): książka z grzbietem, zielony skos w rogu,
 * „PLAN B —” w zieleni, tytuł w wersalikach, pomarańczowa kreska, zdjęcie w dolnej części i rząd ikon.
 */
export function PdfCover({ pdf, sizes = "(min-width: 1024px) 22vw, 80vw", className = "" }: { pdf: Pdf; sizes?: string; className?: string }) {
  const icons = ICONS[pdf.slug] ?? [];
  return (
    <div className={`relative ${className}`}>
      {/* grzbiet i krawędź kartek */}
      <div aria-hidden className="absolute -left-2 bottom-1 top-1 w-3 rounded-l-sm bg-[linear-gradient(90deg,#03080f,#16263a_60%,#0b1626)]" />
      <div className="relative aspect-[5/6.6] overflow-hidden rounded-r-[6px] rounded-l-[2px] bg-[#081423] shadow-[18px_30px_50px_-20px_rgba(0,0,0,.95),0_0_0_1px_rgba(255,255,255,.05)]">
        <Image src={pdf.image} alt="" fill sizes={sizes} className="object-cover object-bottom" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,#081423_0%,#081423_30%,rgba(8,20,35,.75)_48%,rgba(8,20,35,0)_70%,rgba(8,20,35,.55)_100%)]" />
        {/* zielony skos */}
        <div aria-hidden className="absolute right-[9%] top-0 h-[34%] w-[7%] origin-top skew-x-[-24deg] bg-[linear-gradient(180deg,#a4d37f,rgba(164,211,127,0))] opacity-90" />
        <div aria-hidden className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/50 to-transparent" />

        <div className="relative flex h-full flex-col px-[9%] pb-[7%] pt-[8%]">
          <div className="flex items-center gap-1.5 text-[clamp(0.5rem,0.7vw,0.66rem)] font-bold uppercase tracking-wide text-text/90">
            <Image src="/brand/mark.png" alt="" width={14} height={14} className="size-[1.4em]" />
            Sygnał Jutra
            <span aria-hidden className="mx-1 h-[1.1em] w-px bg-text/40" />
            <span className="-skew-x-12 rounded-[2px] bg-planb px-1 text-[0.85em] font-extrabold text-bg-3"><span className="inline-block skew-x-12">Plan B</span></span>
            <span aria-hidden className="italic text-planb">/</span>
          </div>
          <p className="mt-[16%] text-[clamp(1.05rem,1.9vw,1.75rem)] font-extrabold uppercase leading-[1.04] tracking-tight">
            <span className="block text-planb">Plan B —</span>
            {pdf.cover.filter(Boolean).map((l) => <span key={l} className="block">{l}</span>)}
          </p>
          <span aria-hidden className="mt-[7%] h-[3px] w-[16%] bg-sygnal" />
          <div aria-hidden className="mt-auto flex justify-center gap-[12%] text-text/90">
            {icons.map((Icon, i) => <Icon key={i} className="size-[clamp(1rem,1.7vw,1.6rem)]" strokeWidth={1.4} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
