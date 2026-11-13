import type { Metadata } from "next";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Regulamin", robots: { index: false } };

export default function Page() {
  return (
    <>
      <PageIntro eyebrow="Dokument prawny" title="Regulamin" />
      <div className="wrap mt-10 max-w-2xl text-muted">
        {/* TODO: wstawić zatwierdzoną treść, w tym zasady sprzedaży po uruchomieniu sklepu. */}
        <p>Treść tego dokumentu jest w przygotowaniu i zostanie opublikowana po weryfikacji prawnej.</p>
      </div>
    </>
  );
}
