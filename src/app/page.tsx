import type { Metadata } from "next";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowRight, Hourglass } from "lucide-react";
import { CinematicHero } from "@/components/cinematic/CinematicHero";
import { PdfCover } from "@/components/cinematic/PdfCover";
import { CategoryTile } from "@/components/shop/ShopView";
import { Reveal } from "@/components/motion/Reveal";
import { CATEGORIES } from "@/lib/shop";
import { PDFS } from "@/lib/pdfs";

export const metadata: Metadata = {
  title: { absolute: "Sygnał Jutra PLAN B: sprzęt, instrukcje i poradniki na sytuacje kryzysowe" },
  description: "Sprawdzone wyposażenie, praktyczne instrukcje i wiedza, która pomoże Ci przygotować się na sytuacje kryzysowe.",
  alternates: { canonical: "/" },
};

function Eyebrow({ n, children, tone = "text-sygnal" }: { n: string; children: React.ReactNode; tone?: string }) {
  return (
    <p className={`flex items-center gap-4 text-[0.9rem] font-bold uppercase tracking-[0.16em] ${tone}`}>
      <span className="text-text/50">{n}</span>{children}<span aria-hidden className="h-0.5 w-12 bg-text/40" />
    </p>
  );
}

export default function Home() {
  // Art direction: kadr poziomy dla ekranów szerokich, pionowy z produktami w dolnej połowie dla telefonów
  const common = { alt: "", sizes: "100vw" };
  const { props: { srcSet: desktopSrcSet } } = getImageProps({ ...common, src: "/visual/hero-sprzet-desktop.jpg", width: 1376, height: 768 });
  const { props: { srcSet: mobileSrcSet, ...rest } } = getImageProps({ ...common, src: "/visual/hero-sprzet-mobile.jpg", width: 768, height: 1376 });

  return (
    <>
      <CinematicHero desktopSrcSet={desktopSrcSet ?? ""} mobileSrcSet={mobileSrcSet ?? ""} fallback={rest} />

      {/* SKLEP: kafle kategorii jak w dolnym pasku sklepu */}
      <Reveal as="section" aria-labelledby="h-sklep" className="relative overflow-hidden py-20 md:py-28">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(45%_60%_at_100%_0%,rgba(255,113,61,.16),transparent_70%)]" />
        <div className="wrap relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow n="01">Sklep</Eyebrow>
              <h2 id="h-sklep" data-reveal="mask" className="display mt-4 text-[clamp(2rem,3.6vw,3.6rem)]">Sprzęt, który ma znaczenie<span className="text-sygnal">.</span></h2>
              <p className="mt-4 max-w-xl text-lg text-text/80">Sześć kategorii, w każdej trzy poziomy: budżetowy, polecany i premium. Zawsze z ograniczeniami, nie tylko zaletami.</p>
            </div>
            <Link href="/sklep" className="group inline-flex min-h-12 items-center gap-3 rounded-[5px] bg-sygnal px-6 font-bold text-bg-3 transition-colors hover:bg-[#ff8a5c]">
              Odkryj sprzęt <ArrowRight aria-hidden size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => <li key={c.id} data-reveal><CategoryTile id={c.id} /></li>)}
          </ul>
        </div>
      </Reveal>

      {/* INSTRUKCJE: zapowiedź z przekrojem bloku i domu */}
      <Reveal as="section" aria-labelledby="h-ins" className="relative overflow-hidden border-y border-line bg-[linear-gradient(180deg,#0a1a2c,#071321)]">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(35%_45%_at_0%_100%,rgba(164,211,127,.18),transparent_70%)]" />
        <div className="relative h-72 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[62%]">
          <Image src="/visual/instrukcje-przekroj.jpg" alt="Wizualizacja: przekrój bloku i domu jednorodzinnego o zmierzchu" fill sizes="(min-width: 768px) 62vw, 100vw" className="object-cover object-[75%_50%] [mask-image:linear-gradient(180deg,#000_65%,transparent)] md:[mask-image:linear-gradient(90deg,transparent,#000_30%)]" />
        </div>
        <div className="wrap relative py-14 md:py-28">
          <div className="max-w-lg">
            <Eyebrow n="02" tone="text-planb">Instrukcje</Eyebrow>
            <h2 id="h-ins" data-reveal="mask" className="display mt-4 text-[clamp(2rem,3.6vw,3.6rem)]">Wiedza, zanim będzie potrzebna<span className="text-sygnal">.</span></h2>
            <p data-reveal className="mt-6 inline-flex items-center gap-3 rounded-lg border-2 border-planb/90 bg-bg-3/50 px-4 py-3 backdrop-blur-sm">
              <Hourglass aria-hidden size={20} className="shrink-0 text-planb" />
              <span>Interaktywne centrum instrukcji <strong className="font-bold text-planb">w przygotowaniu.</strong></span>
            </p>
            <p data-reveal className="mt-5 text-lg text-text/80">Wybierzesz mieszkanie w bloku albo dom jednorodzinny i scenariusz: blackout, ewakuację, brak wody lub łączności. Do tego czasu każdy scenariusz ma już poradnik.</p>
            <Link data-reveal href="/instrukcje" className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-[5px] border-2 border-planb px-6 font-bold transition-colors hover:bg-planb/10">
              Poznaj instrukcje <ArrowRight aria-hidden size={18} className="text-planb transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Reveal>

      {/* PDF-Y: okładki publikacji */}
      <Reveal as="section" aria-labelledby="h-pdf" className="relative overflow-hidden py-20 md:py-28">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(40%_50%_at_0%_40%,rgba(164,211,127,.12),transparent_70%)]" />
        <div className="wrap relative grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:items-center">
          <div>
            <Eyebrow n="03" tone="text-planb">PDF-y</Eyebrow>
            <h2 id="h-pdf" data-reveal="mask" className="display mt-4 text-[clamp(2rem,3.6vw,3.6rem)]">Przygotuj swój plan<span className="text-sygnal">.</span></h2>
            <p className="mt-4 text-lg text-text/80">Poradniki i checklisty do pobrania i wydruku. Pierwsze cztery tytuły są w przygotowaniu.</p>
            <Link href="/pdfy" className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-[5px] border-2 border-planb px-6 font-bold transition-colors hover:bg-planb/10">
              Zobacz bibliotekę <ArrowRight aria-hidden size={18} className="text-planb transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {PDFS.map((p) => (
              <li key={p.slug} data-reveal>
                <Link href={`/pdfy#${p.slug}`} className="block pl-2 transition-transform duration-500 hover:-translate-y-1.5" aria-label={`PLAN B: ${p.title}`}>
                  <PdfCover pdf={p} sizes="(min-width: 768px) 16vw, 45vw" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </>
  );
}
