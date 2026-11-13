import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct } from "@/lib/content";
import { accent } from "@/components/ui";

export async function generateMetadata({ params }: PageProps<"/sklep/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProduct(slug);
  return p ? { title: p.name, description: p.summary, alternates: { canonical: `/sklep/${slug}` } } : {};
}

export default async function Page({ params }: PageProps<"/sklep/[slug]">) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) notFound();

  return (
    <div className="wrap grid gap-10 py-12 md:grid-cols-2" style={accent("var(--planb)")}>
      <div className="aspect-square border border-line bg-surface">
        {p.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.image.src} alt={p.image.alt} className="size-full object-cover" />
        )}
      </div>
      <div>
        <p className="label text-accent">{p.category}</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold">{p.name}</h1>
        <p className="mt-4 text-lg text-muted">{p.summary}</p>
        {p.price && (
          <p className="mt-6 font-display text-3xl font-bold">
            {new Intl.NumberFormat("pl-PL", { style: "currency", currency: p.price.currency }).format(p.price.amount)}
          </p>
        )}
        {p.description && <p className="mt-6">{p.description}</p>}
        {p.specs?.length ? (
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {p.specs.map((s) => (
              <div key={s.label} className="grid grid-cols-2 py-3"><dt className="text-muted">{s.label}</dt><dd>{s.value}</dd></div>
            ))}
          </dl>
        ) : null}
        {p.cautions?.length ? (
          <ul className="mt-6 list-disc space-y-1 pl-5 text-sm text-muted">{p.cautions.map((c) => <li key={c}>{c}</li>)}</ul>
        ) : null}
        {p.type === "affiliate" && p.affiliateUrl ? (
          <>
            <a href={p.affiliateUrl} target="_blank" rel="sponsored noopener noreferrer" className="label mt-8 inline-block bg-text px-6 py-4 text-bg hover:bg-planb">
              Zobacz u sprzedawcy{p.partner ? `: ${p.partner}` : ""}
            </a>
            <p className="mt-3 text-sm text-muted">Link partnerski: możemy otrzymać prowizję. Zakupu dokonujesz u zewnętrznego sprzedawcy, nie w Sygnał Jutra.</p>
          </>
        ) : null}
      </div>
    </div>
  );
}
