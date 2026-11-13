import { SeriesIndex, seriesMetadata } from "@/components/SeriesPages";

export const metadata = seriesMetadata("kontekst");

export default function Page() {
  return <SeriesIndex series="kontekst" />;
}
