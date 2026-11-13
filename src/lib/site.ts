export const SITE = {
  name: "Sygnał Jutra",
  tagline: "Świat się zmienia. Zrozum dlaczego.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Niezależny polski serwis informacyjny i edukacyjny o bezpieczeństwie, technologii, geopolityce i gotowości kryzysowej.",
  social: {
    youtube: "https://www.youtube.com/@Sygna%C5%82Jutra",
    tiktok: "https://www.tiktok.com/@sygnal.jutra",
    instagram: "https://www.instagram.com/sygnal.jutra/",
    // TODO: podać oficjalny adres Facebooka (NEXT_PUBLIC_FACEBOOK_URL)
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
  },
} as const;

export type SeriesKey = "sygnal" | "kontekst" | "plan-b";

export const SERIES: Record<
  SeriesKey,
  { key: SeriesKey; name: string; kind: string; color: string; blurb: string; href: string }
> = {
  sygnal: {
    key: "sygnal",
    name: "SYGNAŁ",
    kind: "Newsy",
    color: "#ff713d",
    href: "/sygnal",
    blurb: "Ważne wydarzenia w Polsce, Europie i na świecie: bezpieczeństwo, cyberprzestrzeń, infrastruktura.",
  },
  kontekst: {
    key: "kontekst",
    name: "KONTEKST",
    kind: "Wyjaśniamy",
    color: "#36cff0",
    href: "/kontekst",
    blurb: "Systemy, technologie i konflikty, które kształtują świat. Wyjaśnione od podstaw.",
  },
  "plan-b": {
    key: "plan-b",
    name: "PLAN B",
    kind: "Gotowość",
    color: "#a4d37f",
    href: "/plan-b",
    blurb: "Praktyczna wiedza na wypadek blackoutu, braku łączności czy ewakuacji.",
  },
};

export const NAV = [
  { label: "SYGNAŁ", href: "/sygnal", series: "sygnal" as SeriesKey },
  { label: "KONTEKST", href: "/kontekst", series: "kontekst" as SeriesKey },
  { label: "PLAN B", href: "/plan-b", series: "plan-b" as SeriesKey },
  { label: "Wideo", href: "/wideo" },
  { label: "Sklep", href: "/sklep" },
];

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}

export const PLANB_CATEGORIES = [
  "Blackout i zasilanie awaryjne",
  "Woda i żywność",
  "Łączność w kryzysie",
  "Ewakuacja i plecak awaryjny",
  "Gotowość domowa",
  "Listy kontrolne",
];
