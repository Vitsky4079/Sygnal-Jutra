import Link from "next/link";
import { SERIES, SITE } from "@/lib/site";
import { Logo } from "./Logo";

const socials = [
  { label: "YouTube", href: SITE.social.youtube },
  { label: "TikTok", href: SITE.social.tiktok },
  { label: "Instagram", href: SITE.social.instagram },
  { label: "Facebook", href: SITE.social.facebook },
].filter((s) => s.href);

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-bg-2">
      <div className="wrap grid gap-12 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-5 max-w-sm text-muted">{SITE.description}</p>
          <p className="mt-6 font-display text-xl font-semibold">{SITE.tagline}</p>
        </div>

        <nav aria-label="Serie" className="md:col-span-2">
          <h2 className="label text-muted">Serie</h2>
          <ul className="mt-4 space-y-2">
            {Object.values(SERIES).map((s) => (
              <li key={s.key}>
                <Link href={s.href} className="inline-flex items-center gap-2 hover:underline">
                  <span aria-hidden className="size-2" style={{ background: s.color }} />
                  {s.name}
                </Link>
              </li>
            ))}
            <li><Link href="/wideo" className="hover:underline">Wideo</Link></li>
            <li><Link href="/sklep" className="hover:underline">Sklep PLAN B</Link></li>
          </ul>
        </nav>

        <nav aria-label="Serwis" className="md:col-span-2">
          <h2 className="label text-muted">Serwis</h2>
          <ul className="mt-4 space-y-2">
            <li><Link href="/o-nas" className="hover:underline">O nas</Link></li>
            <li><Link href="/kontakt" className="hover:underline">Kontakt</Link></li>
            <li><Link href="/wspolpraca" className="hover:underline">Współpraca</Link></li>
            <li><Link href="/newsletter" className="hover:underline">Newsletter</Link></li>
            <li><a href="/rss.xml" className="hover:underline">RSS</a></li>
          </ul>
        </nav>

        <nav aria-label="Social media" className="md:col-span-3">
          <h2 className="label text-muted">Obserwuj</h2>
          <ul className="mt-4 space-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-3 py-6 text-sm text-muted md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}</p>
          <ul className="flex gap-5">
            <li><Link href="/polityka-prywatnosci" className="hover:text-text">Polityka prywatności</Link></li>
            <li><Link href="/regulamin" className="hover:text-text">Regulamin</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
