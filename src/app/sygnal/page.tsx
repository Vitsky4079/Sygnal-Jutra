import { SeriesIndex, seriesMetadata } from "@/components/SeriesPages";

export const metadata = seriesMetadata("sygnal");

export default function Page() {
  return <SeriesIndex series="sygnal" />;
}
