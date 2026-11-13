import type { Illustration } from "@/lib/preparedness";
import { IsoVignette } from "./Iso";

/** Okładka poradnika PDF: typografia + ilustracja 2.5D. */
export function GuideCover({ no, title, kind, className = "" }: { no: string; title: string; kind: Illustration; className?: string }) {
  return (
    <div className={`group relative aspect-[3/4] [perspective:900px] ${className}`}>
      {/* kartki pod spodem */}
      <div aria-hidden className="absolute inset-0 translate-x-2 translate-y-2 border border-line bg-surface" />
      <div aria-hidden className="absolute inset-0 translate-x-1 translate-y-1 border border-line bg-bg-2" />
      <div className="relative flex size-full origin-left flex-col justify-between overflow-hidden border border-line bg-[#0b1626] p-5 transition-transform duration-500 ease-out group-hover:[transform:rotateY(-14deg)] md:p-6">
        <svg aria-hidden viewBox="0 0 100 100" className="pointer-events-none absolute -right-10 -top-10 w-48 opacity-70" fill="none" stroke="#a4d37f">
          {[14, 26, 38, 50].map((r) => <circle key={r} cx="50" cy="50" r={r} strokeWidth="0.6" opacity={1 - r / 60} />)}
          <circle cx="50" cy="50" r="3" fill="#a4d37f" stroke="none" />
        </svg>
        <div className="relative flex items-center justify-between">
          <span className="label text-planb">PLAN B</span>
          <span className="meta">{no}</span>
        </div>
        <IsoVignette kind={kind} className="relative mx-auto -my-2 w-[88%]" />
        <div className="relative">
          <span className="block h-1 w-10 bg-planb" />
          <p className="hl mt-4 text-[1.55rem] leading-[1.02] md:text-[1.8rem]">{title}</p>
          <p className="meta mt-4">Sygnał Jutra · poradnik PDF</p>
        </div>
      </div>
    </div>
  );
}
