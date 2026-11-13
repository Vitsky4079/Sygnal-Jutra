"use client";

import { useState } from "react";

type State = "idle" | "loading" | "ok" | "error";

export function NewsletterSignup() {
  const [state, setState] = useState<State>("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: fd.get("email"), consent: fd.get("consent") === "on", website: fd.get("website") ?? "" }),
      });
      const data = await res.json();
      if (data.ok) {
        setState("ok");
        setMsg("Gotowe. Dziękujemy za zapis.");
      } else {
        setState("error");
        setMsg(data.error ?? "Coś poszło nie tak.");
      }
    } catch {
      setState("error");
      setMsg("Brak połączenia. Spróbuj ponownie.");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate={false} className="w-full max-w-xl">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="nl-email" className="sr-only">Adres e-mail</label>
          <input
            id="nl-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Twój adres e-mail"
            className="min-h-12 w-full border border-line bg-bg px-4 outline-none placeholder:text-muted focus:border-text"
          />
        </div>
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
        <button
          type="submit"
          disabled={state === "loading" || state === "ok"}
          className="label min-h-12 bg-text px-6 text-bg transition-colors hover:bg-sygnal disabled:opacity-60"
        >
          {state === "loading" ? "Zapisuję…" : "Zapisz mnie"}
        </button>
      </div>
      <label className="mt-3 flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" name="consent" required className="mt-1 size-4 accent-[#ff713d]" />
        <span>
          Zgadzam się na otrzymywanie newslettera Sygnał Jutra. Szczegóły w{" "}
          <a href="/polityka-prywatnosci" className="underline">polityce prywatności</a>.
        </span>
      </label>
      <p role="status" aria-live="polite" className={`mt-3 min-h-6 text-sm ${state === "error" ? "text-sygnal" : "text-planb"}`}>
        {msg}
      </p>
    </form>
  );
}
