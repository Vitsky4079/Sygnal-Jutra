import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { SeriesKey } from "@/lib/site";
import type { Article, Product, Video } from "./types";

/**
 * Warstwa treści. Obecnie czyta pliki JSON z /content (puste do czasu publikacji
 * prawdziwych materiałów). Interfejs jest celowo wąski, żeby zastąpić go
 * CMS-em (Payload + PostgreSQL) bez zmian w komponentach. Zob. README.
 */
async function load<T>(file: string): Promise<T[]> {
  try {
    const raw = await readFile(path.join(process.cwd(), "content", file), "utf8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

const byDateDesc = (a: { publishedAt: string }, b: { publishedAt: string }) =>
  +new Date(b.publishedAt) - +new Date(a.publishedAt);

export async function getArticles(series?: SeriesKey): Promise<Article[]> {
  const now = Date.now();
  const all = await load<Article>("articles.json");
  return all
    .filter((a) => +new Date(a.publishedAt) <= now && (!series || a.series === series))
    .sort(byDateDesc);
}

export async function getArticle(series: SeriesKey, slug: string) {
  return (await getArticles(series)).find((a) => a.slug === slug) ?? null;
}

export async function getBreaking() {
  return (await getArticles()).find((a) => a.breaking) ?? null;
}

export async function getVideos(series?: SeriesKey): Promise<Video[]> {
  const now = Date.now();
  const all = await load<Video>("videos.json");
  return all.filter((v) => +new Date(v.publishedAt) <= now && (!series || v.series === series)).sort(byDateDesc);
}

export async function getProducts(): Promise<Product[]> {
  return load<Product>("products.json");
}

export async function getProduct(slug: string) {
  return (await getProducts()).find((p) => p.slug === slug) ?? null;
}

export async function search(q: string) {
  const needle = q.trim().toLocaleLowerCase("pl");
  if (!needle) return { articles: [], videos: [], products: [] };
  const hit = (...s: (string | undefined)[]) => s.some((x) => x?.toLocaleLowerCase("pl").includes(needle));
  const [articles, videos, products] = await Promise.all([getArticles(), getVideos(), getProducts()]);
  return {
    articles: articles.filter((a) => hit(a.title, a.deck)),
    videos: videos.filter((v) => hit(v.title, v.description)),
    products: products.filter((p) => hit(p.name, p.summary)),
  };
}
