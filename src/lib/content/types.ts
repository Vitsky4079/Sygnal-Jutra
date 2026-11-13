import type { SeriesKey } from "@/lib/site";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export type Article = {
  slug: string;
  series: SeriesKey;
  title: string;
  deck?: string;
  publishedAt: string; // ISO; artykuły z przyszłą datą są ukryte (planowana publikacja)
  updatedAt?: string;
  author?: string;
  /** reporting = zweryfikowane doniesienia, analysis = analiza, simulation = symulacja (etykieta SYMULACJA) */
  kind: "reporting" | "analysis" | "simulation";
  breaking?: boolean;
  featured?: boolean;
  image?: { src: string; alt: string };
  body: Block[];
  sources?: { label: string; url: string }[];
  corrections?: { date: string; text: string }[];
};

export type Video = {
  slug: string;
  title: string;
  description?: string;
  series: SeriesKey;
  episode?: number;
  publishedAt: string;
  youtubeId: string;
  thumbnail?: string;
  relatedArticle?: string;
};

export type Product = {
  slug: string;
  name: string;
  type: "affiliate" | "digital" | "physical";
  category: string;
  summary: string;
  description?: string;
  image?: { src: string; alt: string };
  price?: { amount: number; currency: string };
  availability: "available" | "unavailable" | "soon";
  specs?: { label: string; value: string }[];
  cautions?: string[];
  affiliateUrl?: string;
  partner?: string;
};
