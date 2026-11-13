/**
 * Biblioteka PDF PLAN B. To zapowiedzi publikacji: nie podajemy liczby stron, cen ani opinii,
 * dopóki materiały nie są gotowe. Status zmienia się tutaj; pole `file` / `pricePLN`
 * dodamy dopiero przy prawdziwym pliku i skonfigurowanych płatnościach.
 */
export type PdfStatus = "w-przygotowaniu" | "bezplatny" | "w-sprzedazy";

export type Pdf = {
  slug: string;
  no: string;
  title: string;
  /** druga linia tytułu na okładce */
  cover: [string, string?, string?];
  image: string;
  lead: string;
  audience: string;
  topics: string[];
  status: PdfStatus;
  /** powiązany, już dostępny materiał na stronie */
  related?: { label: string; href: string };
};

export const PDF_STATUS: Record<PdfStatus, string> = {
  "w-przygotowaniu": "W przygotowaniu",
  bezplatny: "Bezpłatny",
  "w-sprzedazy": "Dostępny",
};

export const PDFS: Pdf[] = [
  {
    slug: "72-godziny-bez-pradu",
    no: "01",
    title: "72 godziny bez prądu",
    cover: ["72 godziny", "bez prądu"],
    image: "/visual/pdf-72h.jpg",
    lead: "Poradnik o tym, jak przejść pierwsze 72 godziny bez dostępu do prądu w domu lub mieszkaniu.",
    audience: "Dla mieszkańców bloków i domów, którzy chcą mieć plan na przerwę w dostawie prądu.",
    topics: ["Co przygotować przed awarią", "Pierwsza godzina bez prądu", "Łączność i źródła informacji", "Lodówka, jedzenie i woda"],
    status: "w-przygotowaniu",
    related: { label: "Scenariusz: blackout", href: "/plan-b/scenariusze/blackout" },
  },
  {
    slug: "plecak-ewakuacyjny",
    no: "02",
    title: "Plecak ewakuacyjny",
    cover: ["Plecak", "ewakuacyjny"],
    image: "/visual/pdf-plecak.jpg",
    lead: "Co spakować, jak dobrać wyposażenie i jak przygotować plecak na wypadek nagłej ewakuacji.",
    audience: "Dla osób i rodzin, które chcą mieć gotowy zestaw na wypadek nagłej ewakuacji.",
    topics: ["Lista wyposażenia", "Dokumenty i kopie", "Dopasowanie do dzieci i seniorów", "Przegląd co pół roku"],
    status: "w-przygotowaniu",
    related: { label: "Scenariusz: ewakuacja", href: "/plan-b/scenariusze/ewakuacja" },
  },
  {
    slug: "domowa-gotowosc-7-dni",
    no: "03",
    title: "Domowa gotowość na 7 dni",
    cover: ["Domowa", "gotowość", "na 7 dni"],
    image: "/visual/pdf-7dni.jpg",
    lead: "Jak przygotować zapasy, wodę, energię i niezbędne wyposażenie, aby Twój dom był samodzielny przez co najmniej 7 dni.",
    audience: "Dla gospodarstw domowych, które mają już podstawy i chcą wydłużyć swoją samodzielność.",
    topics: ["Woda: ilości i przechowywanie", "Żywność i rotacja zapasów", "Apteczka i leki", "Energia i ogrzewanie"],
    status: "w-przygotowaniu",
    related: { label: "Checklista 72 h", href: "/checklista" },
  },
  {
    slug: "plan-awaryjny-dla-rodziny",
    no: "04",
    title: "Plan awaryjny dla rodziny",
    cover: ["Plan awaryjny", "dla rodziny"],
    image: "/visual/pdf-rodzina.jpg",
    lead: "Krok po kroku: jak przygotować rodzinę, ustalić zasady działania i stworzyć własny plan na wypadek kryzysu.",
    audience: "Dla rodzin z dziećmi i opiekunów osób starszych.",
    topics: ["Miejsca spotkań", "Kontakty awaryjne", "Zadania dla każdego", "Jak przećwiczyć plan"],
    status: "w-przygotowaniu",
    related: { label: "Scenariusz: brak łączności", href: "/plan-b/scenariusze/brak-lacznosci" },
  },
];
