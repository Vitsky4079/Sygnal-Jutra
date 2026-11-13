import type { Metadata } from "next";
import { getImageProps } from "next/image";
import { CinematicHero } from "@/components/cinematic/CinematicHero";

export const metadata: Metadata = {
  title: { absolute: "Sygnał Jutra PLAN B: sprzęt, instrukcje i poradniki na sytuacje kryzysowe" },
  description: "Sprawdzone wyposażenie, praktyczne instrukcje i wiedza, która pomoże Ci przygotować się na sytuacje kryzysowe.",
  alternates: { canonical: "/" },
};

export default function Home() {
  // Art direction: kadr poziomy dla ekranów szerokich, pionowy z produktami w dolnej połowie dla telefonów
  const common = { alt: "", sizes: "100vw" };
  const { props: { srcSet: desktopSrcSet } } = getImageProps({ ...common, src: "/visual/hero-desktop.jpg", width: 1376, height: 768 });
  const { props: { srcSet: mobileSrcSet, ...rest } } = getImageProps({ ...common, src: "/visual/hero-mobile.jpg", width: 768, height: 1376 });

  return (
    <>
      <CinematicHero desktopSrcSet={desktopSrcSet ?? ""} mobileSrcSet={mobileSrcSet ?? ""} fallback={rest} />
      {/* Sekcje Sklep / Instrukcje / PDF-y: kolejny etap, po akceptacji hero i kategorii sklepu */}
    </>
  );
}
