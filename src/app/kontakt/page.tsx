import type { Metadata } from "next";
import { PageIntro } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Kontakt", alternates: { canonical: "/kontakt" } };

export default function Page() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  return (
    <>
      <PageIntro eyebrow="Kontakt" title="Napisz do redakcji." />
      <div className="wrap mt-10 max-w-2xl space-y-4">
        {email ? (
          <p>E-mail: <a className="underline" href={`mailto:${email}`}>{email}</a></p>
        ) : (
          <p className="text-muted">Adres kontaktowy zostanie opublikowany wkrótce. Do tego czasu napisz do nas w mediach społecznościowych.</p>
        )}
        <p>
          <a className="underline" href={SITE.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>{" · "}
          <a className="underline" href={SITE.social.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>{" · "}
          <a className="underline" href={SITE.social.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
        </p>
      </div>
    </>
  );
}
