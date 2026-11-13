import { SeriesIndex, seriesMetadata } from "@/components/SeriesPages";

export const metadata = seriesMetadata("plan-b");

export default function Page() {
  return <SeriesIndex series="plan-b" />;
}
