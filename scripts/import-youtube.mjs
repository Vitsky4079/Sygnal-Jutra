#!/usr/bin/env node
/**
 * Import filmów z oficjalnego, publicznego kanału RSS YouTube (bez scrapowania i bez klucza API).
 *   node scripts/import-youtube.mjs
 *
 * UWAGA: kanał RSS zwraca tylko ~15 najnowszych filmów. Pełne archiwum wymaga YouTube Data API v3
 * (klucz YOUTUBE_API_KEY, playlistItems.list). Skrypt MERGUJE z content/videos.json, więc
 * starsze, dodane ręcznie wpisy nie są kasowane.
 *
 * Seria i numer odcinka są odczytywane z tytułu ("... | SYGNAŁ #16"). Wpisy bez znacznika
 * trafiają do serii wg reguł w classify() poniżej; popraw je ręcznie w content/videos.json.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID ?? "UC76IUEAKn6L-AFoh4G5pMig";
const OUT = path.join(process.cwd(), "content", "videos.json");

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'");

function classify(title) {
  const t = title.toUpperCase();
  const ep = title.match(/#\s?(\d+)/)?.[1];
  const base = { episode: ep ? Number(ep) : undefined };
  if (t.includes("PLAN B")) return { ...base, series: "plan-b" };
  if (t.includes("KONTEKST")) return { ...base, series: "kontekst" };
  if (t.includes("SYMULACJA")) return { ...base, series: "plan-b", simulation: true };
  if (t.includes("SYGNAŁ TERAZ")) return { ...base, series: "sygnal", live: true };
  return { ...base, series: "sygnal" };
}

const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`);
if (!res.ok) {
  console.error(`Import nieudany: HTTP ${res.status}`);
  process.exit(1);
}
const xml = await res.text();
const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => m[1]);
if (!entries.length) {
  console.error("Import nieudany: brak wpisów w kanale.");
  process.exit(1);
}

const imported = entries.map((e) => {
  const get = (re) => decode(e.match(re)?.[1] ?? "");
  const id = get(/<yt:videoId>(.*?)<\/yt:videoId>/);
  const full = get(/<title>(.*?)<\/title>/);
  const desc = get(/<media:description>([\s\S]*?)<\/media:description>/).split("\n")[0].replace(/^[^\p{L}\p{N}]+/u, "").trim();
  const meta = classify(full);
  return {
    slug: id,
    youtubeId: id,
    title: full.replace(/\s*\|\s*(SYGNAŁ|KONTEKST|PLAN B)[^|]*$/i, "").replace(/\s*\|\s*SYMULACJA$/i, "").trim(),
    fullTitle: full,
    description: desc || undefined,
    publishedAt: get(/<published>(.*?)<\/published>/),
    // pionowa klatka 9:16 z oficjalnego CDN miniatur YouTube
    thumbnail: `https://i.ytimg.com/vi/${id}/oar2.jpg`,
    ...meta,
  };
});

let existing = [];
try {
  existing = JSON.parse(await readFile(OUT, "utf8"));
} catch {}
const byId = new Map(existing.map((v) => [v.youtubeId, v]));
for (const v of imported) byId.set(v.youtubeId, { ...byId.get(v.youtubeId), ...v });
const merged = [...byId.values()].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));

await writeFile(OUT, JSON.stringify(merged, null, 2) + "\n");
console.log(`Zaimportowano ${imported.length} filmów, razem w pliku: ${merged.length}.`);
