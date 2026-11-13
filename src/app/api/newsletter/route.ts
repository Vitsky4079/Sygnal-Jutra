import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().email("Podaj poprawny adres e-mail."),
  consent: z.literal(true, { error: "Zgoda jest wymagana." }),
  website: z.string().max(0).optional(), // honeypot
});

/**
 * Wymaga skonfigurowanego dostawcy (zob. .env.example). Bez NEWSLETTER_* zwraca 503,
 * a formularz pokazuje uczciwy komunikat zamiast udawać zapis.
 */
export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? "Nieprawidłowe dane." }, { status: 400 });
  }
  const key = process.env.NEWSLETTER_API_KEY;
  const url = process.env.NEWSLETTER_ENDPOINT;
  if (!key || !url) {
    return NextResponse.json({ ok: false, error: "Zapisy do newslettera nie są jeszcze uruchomione." }, { status: 503 });
  }
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({ email: parsed.data.email }),
  }).catch(() => null);
  if (!res?.ok) return NextResponse.json({ ok: false, error: "Nie udało się zapisać. Spróbuj ponownie." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
