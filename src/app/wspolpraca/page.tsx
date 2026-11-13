import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Współpraca", alternates: { canonical: "/wspolpraca" } };

export default function Page() {
  return (
    <>
      <PageIntro eyebrow="Współpraca" title="Reklama i partnerstwa.">
        Treści sponsorowane są zawsze oznaczone, a reklamodawcy nie wpływają na brzmienie materiałów redakcyjnych.
      </PageIntro>
      <div className="wrap mt-10">
        <p className="text-muted">Szczegóły oferty zostaną opublikowane wkrótce. Zapytania prosimy kierować przez <Link href="/kontakt" className="underline">stronę kontaktu</Link>.</p>
      </div>
    </>
  );
}
