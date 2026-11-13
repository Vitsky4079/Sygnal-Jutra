import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Building2, Droplet, Footprints, Hourglass, House, Radio, Zap } from "lucide-react";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export const metadata: Metadata = {
  title: "Instrukcje PLAN B: Twoje miejsce, Twój plan",
  description: "Zapowiedź interaktywnego centrum instrukcji PLAN B: wybierz typ mieszkania i scenariusz kryzysowy, a dowiesz się, co zrobić i gdzie trzymać zapasy.",
  alternates: { canonical: "/instrukcje" },
};

const HOMES = [
  { icon: Building2, t: "Mieszkanie w bloku", d: "Praktyczne instrukcje dopasowane do warunków życia w bloku." },
  { icon: House, t: "Dom jednorodzinny", d: "Kompleksowe przygotowanie domu, instalacji i otoczenia." },
];

const SCEN = [
  { icon: Zap, t: "Blackout", d: "Jak działać bez prądu i zachować bezpieczeństwo.", href: "/plan-b/scenariusze/blackout" },
  { icon: Footprints, t: "Ewakuacja", d: "Co zabrać, co wyłączyć i jak bezpiecznie opuścić dom.", href: "/plan-b/scenariusze/ewakuacja" },
  { icon: Droplet, t: "Brak wody", d: "Jak zabezpieczyć zapas i racjonalnie go wykorzystać.", href: "/plan-b/scenariusze/brak-wody" },
  { icon: Radio, t: "Brak internetu i łączności", d: "Jak pozostać poinformowanym i utrzymać kontakt z bliskimi.", href: "/plan-b/scenariusze/brak-lacznosci" },
];

/**
 * Instrukcje (Reference B): strona-zapowiedź. Wizualizacja przekroju bloku i domu zajmuje prawą część,
 * tło to granat z zieloną poświatą. Interaktywny przekrój 3D podepniemy w miejscu <figure> (InstructionsStage).
 */
export default function Page() {
  return (
    <>
      <section aria-labelledby="ins-h" className="relative -mt-16 overflow-hidden md:-mt-24">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(40%_35%_at_0%_72%,rgba(164,211,127,.22),transparent_70%),radial-gradient(35%_30%_at_100%_78%,rgba(164,211,127,.14),transparent_70%),linear-gradient(180deg,#0a1a2c_0%,#071321_70%,#06111d_100%)]" />

        {/* InstructionsStage: obecnie statyczna wizualizacja, w kolejnej fazie interaktywny przekrój 3D */}
        <figure className="relative h-[54vh] min-h-[340px] md:absolute md:inset-y-0 md:right-0 md:h-[78%] md:w-[72%] md:min-h-0 lg:h-[74%] lg:w-[68%]">
          <Image
            src="/visual/instrukcje-przekroj.jpg"
            alt="Wizualizacja: przekrój typowego bloku mieszkalnego i domu jednorodzinnego o zmierzchu, z oświetlonymi pokojami"
            fill
            priority
            sizes="(min-width: 768px) 70vw, 100vw"
            className="object-cover object-[78%_50%] [mask-image:linear-gradient(180deg,#000_70%,transparent_100%)] md:[mask-image:linear-gradient(90deg,transparent_0%,#000_28%,#000_100%),linear-gradient(180deg,#000_70%,transparent_100%)] md:[mask-composite:intersect]"
          />
        </figure>

        <div className="wrap relative pb-14 md:pb-16 md:pt-36 lg:pt-40">
          <div className="max-w-2xl max-md:-mt-16">
            <p className="flex items-center gap-4 text-[0.95rem] font-bold uppercase tracking-[0.16em] text-planb">Instrukcje PLAN B <span aria-hidden className="h-0.5 w-12 bg-text/60" /></p>
            <h1 id="ins-h" className="display mt-4 text-[clamp(2.4rem,4.4vw,4.9rem)] lg:whitespace-nowrap">Twoje miejsce.<br />Twój plan<span className="text-sygnal">.</span></h1>
            <p className="mt-7 inline-flex items-center gap-3 rounded-lg border-2 border-planb/90 bg-bg-3/50 px-4 py-3 text-[1.02rem] backdrop-blur-sm md:text-[1.1rem]">
              <Hourglass aria-hidden size={22} className="shrink-0 text-planb" />
              <span>Interaktywne centrum instrukcji <strong className="font-bold text-planb">w przygotowaniu.</strong></span>
            </p>
            <p className="mt-6 max-w-[33rem] text-[1.05rem] leading-relaxed text-text/85 md:text-lg">
              Już wkrótce uruchomimy interaktywne narzędzie, które pomoże Ci przygotować się na różne sytuacje kryzysowe, dopasowane do Twojego miejsca zamieszkania.
            </p>
          </div>

          <ul className="mt-12 grid gap-8 md:mt-[min(18vh,10rem)] md:max-w-4xl md:grid-cols-2 md:gap-0 md:pl-[8%]">
            {HOMES.map(({ icon: Icon, t, d }, i) => (
              <li key={t} className={`flex gap-5 md:px-10 ${i ? "md:border-l md:border-text/20" : ""}`}>
                <Icon aria-hidden size={56} strokeWidth={1.4} className="shrink-0 text-planb" />
                <div>
                  <h2 className="text-xl font-bold md:text-2xl">{t}</h2>
                  <p className="mt-1.5 text-text/75">{d}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-12 border-t border-text/15 pt-8 md:mt-14">
            <h2 className="flex items-center gap-4 text-[0.95rem] font-bold uppercase tracking-[0.16em] text-planb">Scenariusze kryzysowe <span aria-hidden className="h-0.5 w-12 bg-text/60" /></h2>
            <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {SCEN.map(({ icon: Icon, t, d, href }, i) => (
                <li key={t} className={`lg:px-8 ${i ? "lg:border-l lg:border-text/20" : "lg:pl-0"}`}>
                  <Link href={href} className="group flex gap-5">
                    <Icon aria-hidden size={46} strokeWidth={1.6} className="shrink-0 text-sygnal" />
                    <span>
                      <span className="block text-xl font-bold decoration-sygnal decoration-2 underline-offset-4 group-hover:underline">{t}</span>
                      <span className="mt-1.5 block text-[0.95rem] text-text/75">{d}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted">Do czasu startu centrum każdy scenariusz otwiera poradnik oparty na rządowym Poradniku bezpieczeństwa.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="start" className="wrap grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-20">
        <div>
          <h2 id="start" className="display text-3xl md:text-4xl">Powiadomimy Cię o starcie<span className="text-sygnal">.</span></h2>
          <p className="mt-4 max-w-md text-muted">Jeden e-mail, gdy centrum instrukcji będzie gotowe. W międzyczasie sprawdź <Link href="/checklista" className="text-text underline underline-offset-4">checklistę 72 h</Link>.</p>
        </div>
        <NewsletterSignup />
      </section>
    </>
  );
}
