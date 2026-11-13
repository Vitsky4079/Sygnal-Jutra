import Image from "next/image";
import type { Pdf } from "@/lib/pdfs";

/**
 * Okładka publikacji PLAN B: fotografia z rodziny „blue hour”, typografia redakcyjna,
 * grzbiet i delikatne światło krawędzi zamiast generycznego mockupu e-booka.
 */
export function PdfCover({ pdf, sizes = "(min-width: 1024px) 22vw, 70vw", className = "" }: { pdf: Pdf; sizes?: string; className?: string }) {
  return (
    <div className={`relative aspect-[3/4] overflow-hidden bg-bg-3 shadow-[0_30px_60px_-30px_rgba(0,0,0,.9)] ${className}`}>
      <Image src={pdf.image} alt="" fill sizes={sizes} className="object-cover object-bottom" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-bg-3/85 via-bg-3/25 to-transparent" />
      {/* grzbiet */}
      <div aria-hidden className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/60 via-white/[.06] to-transparent" />
      <div aria-hidden className="absolute right-0 top-0 h-[42%] w-[3px] bg-planb" />

      <div className="relative flex h-full flex-col p-[9%] pl-[11%]">
        <div className="flex items-center justify-between">
          <span className="font-display text-[0.6rem] font-bold uppercase tracking-[0.16em] text-text/80">Sygnał Jutra</span>
          <span className="bg-planb px-1.5 py-0.5 font-display text-[0.55rem] font-extrabold uppercase tracking-[0.1em] text-bg-3">Plan B</span>
        </div>
        <p className="mt-[14%] font-mono text-[0.6rem] uppercase tracking-[0.12em] text-planb">Nr {pdf.no}</p>
        <p className="display mt-2 text-[clamp(1.25rem,2.1vw,1.85rem)] leading-[0.98]">
          {pdf.cover.filter(Boolean).map((l) => <span key={l} className="block">{l}</span>)}
        </p>
        <span aria-hidden className="mt-4 h-[3px] w-8 bg-sygnal" />
      </div>
    </div>
  );
}
