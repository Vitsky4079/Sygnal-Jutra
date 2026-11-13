import Link from "next/link";
import { getBreaking } from "@/lib/content";
import { SERIES } from "@/lib/site";

/** Pojawia się wyłącznie, gdy opublikowany materiał ma flagę breaking. */
export async function BreakingNewsBar() {
  const story = await getBreaking();
  if (!story) return null;
  return (
    <div className="bg-sygnal text-bg">
      <div className="wrap flex items-center gap-4 py-2">
        <span className="label shrink-0">Pilne</span>
        <Link href={`${SERIES[story.series].href}/${story.slug}`} className="truncate text-sm font-semibold hover:underline">
          {story.title}
        </Link>
      </div>
    </div>
  );
}
