import Image from "next/image";
import Link from "next/link";

/** Oficjalne logo (przezroczysty wariant poziomy z public/brand). */
export function Logo({ className = "", height = 36 }: { className?: string; height?: number }) {
  return (
    <Link href="/" aria-label="Sygnał Jutra, strona główna" className={`inline-flex items-center ${className}`}>
      <Image src="/brand/logo.png" alt="Sygnał Jutra" width={Math.round(height * (910 / 320))} height={height} priority className="w-auto" style={{ height }} />
    </Link>
  );
}
