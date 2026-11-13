import type { MetadataRoute } from "next";
import { getArticles, getProducts } from "@/lib/content";
import { SERIES, SITE } from "@/lib/site";
import { SCENARIOS } from "@/lib/preparedness";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, products] = await Promise.all([getArticles(), getProducts()]);
  const fixed = ["", "/checklista", "/poradniki", "/sygnal", "/kontekst", "/plan-b", "/wideo", "/sklep", "/newsletter", "/o-nas", "/kontakt", "/wspolpraca"];
  return [
    ...fixed.map((p) => ({ url: `${SITE.url}${p}` })),
    ...articles.map((a) => ({ url: `${SITE.url}${SERIES[a.series].href}/${a.slug}`, lastModified: a.updatedAt ?? a.publishedAt })),
    ...SCENARIOS.map((x) => ({ url: `${SITE.url}/plan-b/scenariusze/${x.slug}` })),
    ...products.map((p) => ({ url: `${SITE.url}/sklep/${p.slug}` })),
  ];
}
