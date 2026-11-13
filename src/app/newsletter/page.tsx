import type { Metadata } from "next";
import { PageIntro } from "@/components/ui";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export const metadata: Metadata = { title: "Newsletter", alternates: { canonical: "/newsletter" } };

export default function Page() {
  return (
    <>
      <PageIntro eyebrow="Newsletter" title="Najważniejsze sygnały. Bez informacyjnego szumu.">
        Wybrane materiały z serii SYGNAŁ, KONTEKST i PLAN B.
      </PageIntro>
      <div className="wrap mt-10"><NewsletterSignup /></div>
    </>
  );
}
