import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/content";
import { CATEGORIES } from "@/lib/shop";
import { SERIES, SITE } from "@/lib/site";
import { SCENARIOS } from "@/lib/preparedness";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();
  const fixed = ["", "/checklista", "/poradniki", "/sygnal", "/kontekst", "/plan-b", "/wideo", "/sklep", "/instrukcje", "/pdfy", "/newsletter", "/o-nas", "/kontakt", "/wspolpraca"];
  return [
    ...fixed.map((p) => ({ url: `${SITE.url}${p}` })),
    ...articles.map((a) => ({ url: `${SITE.url}${SERIES[a.series].href}/${a.slug}`, lastModified: a.updatedAt ?? a.publishedAt })),
    ...SCENARIOS.map((x) => ({ url: `${SITE.url}/plan-b/scenariusze/${x.slug}` })),
    ...CATEGORIES.filter((c) => c.id !== "zasilanie").map((c) => ({ url: `${SITE.url}/sklep/${c.id}` })),
  ];
}
