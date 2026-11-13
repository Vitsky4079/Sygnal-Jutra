import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategory } from "@/lib/shop";
import { ShopView } from "@/components/shop/ShopView";

export const dynamicParams = false;
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ kategoria: c.id }));
}

export async function generateMetadata({ params }: PageProps<"/sklep/[kategoria]">): Promise<Metadata> {
  const c = getCategory((await params).kategoria);
  if (!c) return {};
  return {
    title: `${c.name}: trzy poziomy rekomendacji`,
    description: `${c.lead} Budżetowy, polecany i premium.`,
    alternates: { canonical: c.id === "zasilanie" ? "/sklep" : `/sklep/${c.id}` },
  };
}

export default async function Page({ params }: PageProps<"/sklep/[kategoria]">) {
  const c = getCategory((await params).kategoria);
  if (!c) notFound();
  return <ShopView active={c.id} />;
}
