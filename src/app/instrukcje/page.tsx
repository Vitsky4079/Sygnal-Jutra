import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Droplet, Home, Hourglass, Radio, Footprints, Zap } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export const metadata: Metadata = {
  title: "Instrukcje PLAN B: Twoje miejsce, Twój plan",
  description: "Zapowiedź interaktywnego centrum instrukcji PLAN B: wybierz typ mieszkania i scenariusz kryzysowy, a dowiesz się, co zrobić i gdzie trzymać zapasy.",
  alternates: { canonical: "/instrukcje" },
};

/**
 * Strona-zapowiedź. Interaktywny przekrój 3D domu powstanie w kolejnej fazie;
 * miejsce na niego rezerwuje <InstructionsStage /> (obecnie statyczna wizualizacja, bez fałszywych kontrolek).
 */
const HOMES = [
  { icon: Building2, t: "Mieszkanie w bloku", d: "Klatka schodowa, piwnica, brak własnego ujęcia wody i ograniczone miejsce na zapasy." },
  { icon: Home, t: "Dom jednorodzinny", d: "Instalacje, ogrzewanie, garaż i otoczenie domu: więcej miejsca i więcej odpowiedzialności." },
];

const SCEN = [
  { icon: Zap, t: "Blackout", d: "Jak działać bez prądu i zachować bezpieczeństwo.", href: "/plan-b/scenariusze/blackout" },
  { icon: Footprints, t: "Ewakuacja", d: "Co zabrać, co wyłączyć i jak bezpiecznie opuścić dom.", href: "/plan-b/scenariusze/ewakuacja" },
  { icon: Droplet, t: "Brak wody", d: "Jak zabezpieczyć zapas i rozsądnie go wykorzystać.", href: "/plan-b/scenariusze/brak-wody" },
  { icon: Radio, t: "Brak internetu i łączności", d: "Jak pozostać poinformowanym i utrzymać kontakt z bliskimi.", href: "/plan-b/scenariusze/brak-lacznosci" },
];

const STEPS = [
  ["Wybierasz dom", "Mieszkanie w bloku albo dom jednorodzinny."],
  ["Wybierasz sytuację", "Blackout, ewakuacja, brak wody, brak łączności i kolejne scenariusze."],
  ["Poznajesz swój plan", "Przekrój domu pokaże, co zrobić w każdym pomieszczeniu i gdzie trzymać zapasy."],
];

export default function Page() {
  return (
    <>
      <section aria-labelledby="ins-h" className="grain relative -mt-16 overflow-hidden bg-bg-3 md:-mt-20">
        {/* InstructionsStage: tu zostanie podpięty interaktywny przekrój 3D */}
        <div className="relative h-[78svh] min-h-[560px] lg:h-[88svh]">
          <Image src="/visual/instrukcje.jpg" alt="Wizualizacja: przekrój bloku mieszkalnego i domu jednorodzinnego o zmierzchu, z oświetlonymi pokojami" fill priority sizes="100vw" className="object-cover object-[72%_50%]" />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,13,24,.9)_0%,rgba(5,13,24,.55)_40%,rgba(5,13,24,0)_70%)] max-md:bg-[linear-gradient(180deg,rgba(5,13,24,.85)_0%,rgba(5,13,24,.5)_50%,rgba(5,13,24,.2)_100%)]" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
          <div className="wrap relative flex h-full flex-col justify-center pt-16 md:pt-20">
            <p className="label flex items-center gap-3 text-planb">Instrukcje PLAN B <span aria-hidden className="h-px w-10 bg-planb/60" /></p>
            <h1 id="ins-h" className="display mt-5 text-[clamp(2.6rem,6.6vw,6rem)]">Twoje miejsce.<br />Twój plan<span className="text-sygnal">.</span></h1>
            <p className="mt-7 inline-flex max-w-max items-center gap-3 border border-planb/70 bg-bg-3/60 px-4 py-3 backdrop-blur-sm">
              <Hourglass aria-hidden size={18} className="shrink-0 text-planb" />
              <span>Interaktywne centrum instrukcji <strong className="font-semibold text-planb">w przygotowaniu</strong>.</span>
            </p>
            <p className="mt-6 max-w-lg text-lg text-text/85">
              Budujemy narzędzie, które pomoże przygotować się na różne sytuacje kryzysowe, dopasowane do miejsca, w którym mieszkasz.
            </p>
          </div>
        </div>
      </section>

      <Reveal as="section" aria-labelledby="jak" className="wrap py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div>
            <p className="label text-planb">Jak to będzie działać</p>
            <h2 id="jak" data-reveal="mask" className="hl mt-3 text-3xl md:text-5xl">Trzy kroki do planu dla Twojego domu.</h2>
          </div>
          <ol className="divide-y divide-line border-y border-line">
            {STEPS.map(([t, d], i) => (
              <li key={t} data-reveal className="grid grid-cols-[3.5rem_1fr] gap-4 py-6">
                <span className="font-display text-3xl font-extrabold text-line">{String(i + 1).padStart(2, "0")}</span>
                <div><h3 className="font-display text-xl font-bold">{t}</h3><p className="mt-1 text-muted">{d}</p></div>
              </li>
            ))}
          </ol>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
          {HOMES.map(({ icon: Icon, t, d }) => (
            <li key={t} data-reveal className="flex gap-5 bg-bg p-7 md:p-9">
              <Icon aria-hidden size={40} strokeWidth={1.4} className="shrink-0 text-planb" />
              <div><h3 className="font-display text-2xl font-bold">{t}</h3><p className="mt-2 max-w-md text-muted">{d}</p></div>
            </li>
          ))}
        </ul>
        <p className="meta mt-4">Wybór typu domu będzie dostępny po uruchomieniu centrum instrukcji.</p>
      </Reveal>

      <Reveal as="section" aria-labelledby="scen" className="border-t border-line bg-bg-3">
        <div className="wrap py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label text-sygnal">Scenariusze kryzysowe</p>
              <h2 id="scen" data-reveal="mask" className="hl mt-3 text-3xl md:text-4xl">Już teraz: poradniki do każdego scenariusza.</h2>
            </div>
            <p className="max-w-sm text-sm text-muted">Oparte na rządowym Poradniku bezpieczeństwa, z odnośnikami do konkretnych stron źródła.</p>
          </div>
          <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4">
            {SCEN.map(({ icon: Icon, t, d, href }) => (
              <li key={t} data-reveal className="border-line max-lg:border-b sm:odd:border-r lg:border-r lg:last:border-r-0">
                <Link href={href} className="group flex h-full flex-col p-6 lg:px-7">
                  <Icon aria-hidden size={30} strokeWidth={1.6} className="text-sygnal" />
                  <h3 className="mt-5 font-display text-xl font-bold decoration-sygnal decoration-2 underline-offset-4 group-hover:underline">{t}</h3>
                  <p className="mt-2 text-sm text-muted">{d}</p>
                  <span className="label mt-auto inline-flex items-center gap-2 pt-6 text-text/80 group-hover:text-text">Czytaj poradnik <ArrowRight aria-hidden size={14} /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <section aria-labelledby="start" className="wrap grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-20">
        <div>
          <h2 id="start" className="hl text-3xl md:text-4xl">Powiadomimy Cię o starcie.</h2>
          <p className="mt-4 max-w-md text-muted">Jeden e-mail, gdy centrum instrukcji będzie gotowe. W międzyczasie sprawdź <Link href="/checklista" className="text-text underline underline-offset-4">checklistę 72 h</Link>.</p>
        </div>
        <NewsletterSignup />
      </section>
    </>
  );
}
