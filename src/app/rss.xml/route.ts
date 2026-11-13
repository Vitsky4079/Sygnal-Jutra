import { getArticles } from "@/lib/content";
import { SERIES, SITE } from "@/lib/site";

const esc = (s: string) => s.replace(/[<>&"']/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[c]!);

export async function GET() {
  const articles = (await getArticles()).slice(0, 30);
  const items = articles
    .map((a) => `<item><title>${esc(a.title)}</title><link>${SITE.url}${SERIES[a.series].href}/${a.slug}</link><guid>${SITE.url}${SERIES[a.series].href}/${a.slug}</guid><pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>${a.deck ? `<description>${esc(a.deck)}</description>` : ""}</item>`)
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${SITE.name}</title><link>${SITE.url}</link><description>${esc(SITE.description)}</description><language>pl-PL</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
