import Image from "next/image";
import Link from "next/link";

/** Oficjalne logo (przezroczysty wariant z public/brand). `imgClassName` pozwala ustawić wysokość responsywnie. */
export function Logo({ className = "", height = 36, imgClassName }: { className?: string; height?: number; imgClassName?: string }) {
  return (
    <Link href="/" aria-label="Sygnał Jutra, strona główna" className={`inline-flex items-center ${className}`}>
      <Image src="/brand/logo.png" alt="Sygnał Jutra" width={Math.round(height * (910 / 320))} height={height} priority className={imgClassName ?? "w-auto"} style={imgClassName ? undefined : { height }} />
    </Link>
  );
}
