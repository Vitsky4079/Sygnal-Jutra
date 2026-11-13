import products from "../../content/shop-products.json";

/**
 * Kuratorowany sklep PLAN B: 6 kategorii × 3 poziomy rekomendacji.
 * Dane produktów żyją w content/shop-products.json (źródła i data weryfikacji przy każdym wpisie).
 * Ceny są orientacyjne. Linki prowadzą do zwykłych stron sprzedawców; nie mamy umów partnerskich,
 * więc `affiliate` jest false, dopóki takie umowy nie zostaną podpisane.
 */
export type Tier = "budzetowy" | "polecany" | "premium";
export type CategoryId = "zasilanie" | "oswietlenie" | "lacznosc" | "woda" | "ewakuacja" | "dom";

export type Product = {
  id: string;
  category: CategoryId;
  tier: Tier;
  brand: string;
  model: string;
  description: string;
  specs: { label: string; value: string }[];
  pricePLN: number | null;
  currency: "PLN";
  retailer: string;
  retailerUrl: string;
  manufacturerUrl: string;
  useCase: string;
  pros: string[];
  cons: string[];
  /** Zdjęcie produktu tylko z potwierdzoną zgodą; do tego czasu null */
  image: { src: string; credit: string } | null;
  affiliate: boolean;
  availability: "dostepny" | "sprawdz";
  lastVerified: string;
  notes?: string;
  /** Jedna porównywalna wartość w kategorii (np. Wh, lm), pokazywana jako skala */
  metric?: { label: string; value: number; unit: string; note?: string };
};

export type Category = {
  id: CategoryId;
  name: string;
  short: string;
  image: string;
  imageAlt: string;
  /** object-position kadru (klasa Tailwind), by produkt był czytelny także w kadrze 4:3 na telefonie */
  focus?: string;
  lead: string;
  /** Rozróżnienia, które trzeba znać przed zakupem */
  explainer: { title: string; points: string[] };
};

export const TIERS: Record<Tier, { label: string; hint: string }> = {
  budzetowy: { label: "Budżetowy", hint: "Rozsądny start. Nie zawsze najtańszy, ale sensowny." },
  polecany: { label: "Polecany", hint: "Najlepszy balans jakości, możliwości i ceny." },
  premium: { label: "Premium", hint: "Więcej możliwości. Piszemy wprost, za co dopłacasz." },
};
export const TIER_ORDER: Tier[] = ["budzetowy", "polecany", "premium"];

export const CATEGORIES: Category[] = [
  {
    id: "zasilanie",
    name: "Zasilanie awaryjne",
    short: "Powerbanki i stacje zasilania",
    image: "/visual/cat-zasilanie.jpg",
    imageAlt: "Stacja zasilania i powerbank na skale o zmierzchu",
    focus: "object-[68%_55%]",
    lead: "Prąd do telefonu, radia i światła, gdy sieć przestaje działać. Od kieszonkowego powerbanku po stację, która uruchomi lodówkę.",
    explainer: {
      title: "Powerbank to nie stacja zasilania",
      points: [
        "Powerbank ładuje małe urządzenia przez USB. Pojemność w mAh podaje się dla ogniwa (ok. 3,6–3,85 V), więc 10 000 mAh to ok. 36–38 Wh, a realnie do telefonu trafia mniej.",
        "Stacja zasilania ma gniazda 230 V i pojemność rzędu setek Wh. Moc wyjściowa (W) mówi, co uruchomisz, a pojemność (Wh), jak długo.",
        "Sprawdź pobór swoich urządzeń: router to kilka–kilkanaście W, lodówka średnio kilkadziesiąt W, czajnik ponad 2000 W.",
      ],
    },
  },
  {
    id: "oswietlenie",
    name: "Oświetlenie",
    short: "Latarki, czołówki, lampy",
    image: "/visual/cat-oswietlenie.jpg",
    imageAlt: "Latarka oświetlająca ciemną skałę obok latarki czołowej",
    lead: "Bezpieczne światło zamiast świec. Czołówka zostawia wolne ręce, lampa oświetla cały pokój.",
    explainer: {
      title: "Światło punktowe i światło do pomieszczenia",
      points: [
        "Lumeny mówią o jasności, ale ważniejszy bywa czas świecenia na niższym trybie. Sprawdzaj oba parametry.",
        "Akumulator ładowany przez USB-C dobrze współpracuje z powerbankiem. Na dłuższą awarię przydaje się też model na zwykłe baterie.",
        "Otwarty ogień zwiększa ryzyko pożaru. Rządowy Poradnik bezpieczeństwa wskazuje latarki z zapasem baterii jako alternatywne źródło światła (s. 33).",
      ],
    },
  },
  {
    id: "lacznosc",
    name: "Łączność",
    short: "Radia i odbiór informacji",
    image: "/visual/cat-lacznosc.jpg",
    imageAlt: "Radio awaryjne z korbką i panelem słonecznym o zmierzchu",
    lead: "Gdy nie ma internetu ani zasięgu, radio na baterie bywa jedynym źródłem komunikatów.",
    explainer: {
      title: "Odbiór to nie nadawanie",
      points: [
        "Radio AM/FM i DAB+ tylko odbiera komunikaty. Nie zastąpi telefonu, ale działa niezależnie od sieci komórkowej.",
        "DAB+ wymaga działających nadajników cyfrowych. FM to najbardziej uniwersalny wybór, więc dobre radio ma oba pasma.",
        "Krótkofalówki PMR446 nie wymagają w UE pozwolenia, ale mają mały zasięg. Do nadawania na innych pasmach potrzebne są uprawnienia.",
      ],
    },
  },
  {
    id: "woda",
    name: "Woda i filtracja",
    short: "Przechowywanie i uzdatnianie",
    image: "/visual/cat-woda.jpg",
    imageAlt: "Kanister na wodę i filtr na kamieniach nad strumieniem o zmierzchu",
    lead: "Zapas wody, filtr i sposób na jej uzdatnienie. To trzy różne rzeczy i warto je odróżniać.",
    explainer: {
      title: "Przechowywanie, filtracja, dezynfekcja",
      points: [
        "Kanister służy do przechowywania. Wybieraj pojemniki przeznaczone do kontaktu z żywnością.",
        "Filtr mechaniczny usuwa zwykle bakterie i pierwotniaki, ale najczęściej nie wirusy ani zanieczyszczeń chemicznych.",
        "Wirusy usuwają dopiero urządzenia oznaczone jako oczyszczacze (purifier), gotowanie lub dezynfekcja chemiczna. Żaden filtr nie czyni bezpieczną każdej wody.",
      ],
    },
  },
  {
    id: "ewakuacja",
    name: "Plecaki i ewakuacja",
    short: "Plecaki na szybkie wyjście",
    image: "/visual/cat-ewakuacja.jpg",
    imageAlt: "Plecak turystyczny na grani górskiej o zmierzchu",
    lead: "Plecak, który uniesiesz i szybko spakujesz. Pojemność, waga i wygoda liczą się bardziej niż wygląd.",
    explainer: {
      title: "Jak dobrać plecak ewakuacyjny",
      points: [
        "Na 72 godziny zwykle wystarcza 35–45 l. Większy plecak kusi, żeby zabrać za dużo.",
        "Regulowany system nośny i pas biodrowy przenoszą ciężar na biodra. Ma to znaczenie przy kilkukilometrowym marszu.",
        "Liczy się masa pustego plecaka: różnica 1 kg zostaje z Tobą przez całą drogę.",
      ],
    },
  },
  {
    id: "dom",
    name: "Domowa gotowość",
    short: "Apteczki i gotowe zestawy",
    image: "/visual/cat-dom.jpg",
    imageAlt: "Zapasy domowe na półce: słoiki, puszki, woda, apteczka i lampa",
    lead: "Apteczka i gotowe zestawy awaryjne sprzedawane jako jeden produkt, dla tych, którzy nie chcą kompletować wszystkiego sami.",
    explainer: {
      title: "Gotowy zestaw czy własna lista",
      points: [
        "Gotowy zestaw oszczędza czas, ale zwykle kosztuje więcej niż te same rzeczy kupione osobno.",
        "Sprawdź, ile wody zawiera zestaw. Rządowy poradnik mówi o minimum 3 l na osobę na dobę (s. 21), więc zapas wody i tak trzeba uzupełnić.",
        "Apteczkę dopasuj do domowników: leki stałe, opatrunki na większe rany, środki dla dzieci.",
      ],
    },
  },
];

export const PRODUCTS = products as Product[];

export const getCategory = (id: string) => CATEGORIES.find((c) => c.id === id);
export const productsFor = (id: CategoryId) =>
  TIER_ORDER.map((t) => PRODUCTS.find((p) => p.category === id && p.tier === t)).filter((p): p is Product => Boolean(p));

export const formatPLN = (v: number | null) =>
  v == null ? "Cena do sprawdzenia" : new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: v % 1 ? 2 : 0 }).format(v);
