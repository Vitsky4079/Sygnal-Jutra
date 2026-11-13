import Link from "next/link";

/** Tymczasowy wordmark typograficzny, do podmiany na oficjalne logo. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Sygnał Jutra, strona główna" className={`group inline-flex items-center gap-3 ${className}`}>
      <span aria-hidden className="flex h-6 items-end gap-[3px]">
        <i className="block h-3 w-[3px] bg-sygnal" />
        <i className="block h-6 w-[3px] bg-kontekst" />
        <i className="block h-4 w-[3px] bg-planb" />
      </span>
      <span className="font-display text-[1.05rem] font-800 font-extrabold uppercase leading-none tracking-[0.06em]">
        Sygnał<span className="text-muted"> Jutra</span>
      </span>
    </Link>
  );
}
