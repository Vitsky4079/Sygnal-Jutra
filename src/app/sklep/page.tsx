import type { Metadata } from "next";
import { getProducts } from "@/lib/content";
import { SERIES } from "@/lib/site";
import { EmptyState, PageIntro, ProductCard } from "@/components/ui";

export const metadata: Metadata = { title: "Sklep PLAN B", description: "Wyselekcjonowany sprzęt i materiały do przygotowań kryzysowych.", alternates: { canonical: "/sklep" } };

export default async function Page() {
  const products = await getProducts();
  return (
    <>
      <PageIntro series="plan-b" eyebrow="PLAN B · Sklep" title="Sprzęt, który ma sens.">
        Wyselekcjonowana lista. Linki partnerskie są zawsze oznaczone, a produkty polecane redakcyjnie nie są płatnymi miejscami.
      </PageIntro>
      <div className="wrap mt-10">
        {products.length ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => <li key={p.slug}><ProductCard product={p} /></li>)}
          </ul>
        ) : (
          <EmptyState title="Katalog jest w przygotowaniu." color={SERIES["plan-b"].color}>
            Pierwsze produkty pojawią się po zatwierdzeniu oferty i warunków sprzedaży.
          </EmptyState>
        )}
      </div>
    </>
  );
}
