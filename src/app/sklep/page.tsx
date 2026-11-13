import type { Metadata } from "next";
import { ShopView } from "@/components/shop/ShopView";

export const metadata: Metadata = {
  title: "Sklep PLAN B: sprzęt, który ma znaczenie",
  description: "Wyselekcjonowane wyposażenie na sytuacje kryzysowe: zasilanie, oświetlenie, łączność, woda, plecaki i domowa gotowość. Trzy poziomy rekomendacji w każdej kategorii.",
  alternates: { canonical: "/sklep" },
};

export default function Page() {
  return <ShopView active="zasilanie" />;
}
