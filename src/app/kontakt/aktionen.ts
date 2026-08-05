"use server";

import { headers } from "next/headers";

export type Formularzustand = {
  status: "leer" | "fehler" | "gesendet";
  meldung?: string;
  fehler?: Partial<Record<Feldname, string>>;
  werte?: Partial<Record<Feldname, string>>;
};

type Feldname = "name" | "betrieb" | "telefon" | "email" | "anliegen" | "einwilligung";

const FELDER: Feldname[] = ["name", "betrieb", "telefon", "email", "anliegen"];

/**
 * Einfache Bremse gegen Formular-Spam. Der Speicher gilt pro Serverinstanz —
 * das reicht gegen Massenversand, ersetzt aber keine echte Firewall.
 */
const versuche = new Map<string, number[]>();
const FENSTER_MS = 10 * 60 * 1000;
const MAX_PRO_FENSTER = 5;

function zuOft(kennung: string): boolean {
  const jetzt = Date.now();
  const bisher = (versuche.get(kennung) ?? []).filter((z) => jetzt - z < FENSTER_MS);

  if (bisher.length >= MAX_PRO_FENSTER) {
    versuche.set(kennung, bisher);
    return true;
  }

  bisher.push(jetzt);
  versuche.set(kennung, bisher);

  if (versuche.size > 5000) versuche.clear();
  return false;
}

function text(daten: FormData, feld: string): string {
  const wert = daten.get(feld);
  return typeof wert === "string" ? wert.trim() : "";
}

export async function anfrageSenden(
  _zustand: Formularzustand,
  daten: FormData,
): Promise<Formularzustand> {
  // Unsichtbares Feld: nur automatische Ausfüller schreiben hier hinein.
  if (text(daten, "webseite") !== "") {
    return { status: "gesendet" };
  }

  const werte = Object.fromEntries(
    FELDER.map((feld) => [feld, text(daten, feld)]),
  ) as Record<Feldname, string>;

  const fehler: Partial<Record<Feldname, string>> = {};

  if (werte.name.length < 2) {
    fehler.name = "Bitte tragen Sie Ihren Namen ein.";
  }
  if (werte.telefon.replace(/[^0-9]/g, "").length < 6 && werte.email === "") {
    fehler.telefon = "Bitte eine Telefonnummer oder eine E-Mail-Adresse angeben.";
  }
  if (werte.email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(werte.email)) {
    fehler.email = "Diese E-Mail-Adresse sieht nicht vollständig aus.";
  }
  if (werte.anliegen.length < 10) {
    fehler.anliegen = "Ein oder zwei Sätze helfen mir, mich vorzubereiten.";
  }
  if (daten.get("einwilligung") !== "ja") {
    fehler.einwilligung = "Ohne Ihr Einverständnis darf ich die Angaben nicht verarbeiten.";
  }

  if (Object.keys(fehler).length > 0) {
    return {
      status: "fehler",
      meldung: "Bitte prüfen Sie die markierten Felder.",
      fehler,
      werte,
    };
  }

  const kopfzeilen = await headers();
  const kennung =
    kopfzeilen.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unbekannt";

  if (zuOft(kennung)) {
    return {
      status: "fehler",
      meldung:
        "Es sind gerade viele Anfragen von diesem Anschluss eingegangen. Rufen Sie mich gerne direkt an.",
      werte,
    };
  }

  const empfaenger = process.env.KONTAKT_EMPFAENGER;
  const absender = process.env.KONTAKT_ABSENDER;
  const schluessel = process.env.RESEND_API_KEY;

  const nachricht = [
    `Name: ${werte.name}`,
    `Betrieb: ${werte.betrieb || "—"}`,
    `Telefon: ${werte.telefon || "—"}`,
    `E-Mail: ${werte.email || "—"}`,
    "",
    werte.anliegen,
  ].join("\n");

  if (!schluessel || !empfaenger || !absender) {
    console.warn(
      "Kein Versanddienst eingerichtet (RESEND_API_KEY, KONTAKT_EMPFAENGER, KONTAKT_ABSENDER). Anfrage:\n" +
        nachricht,
    );
    return {
      status: "gesendet",
      meldung: "Ihre Anfrage ist angekommen.",
    };
  }

  try {
    const antwort = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${schluessel}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: absender,
        to: [empfaenger],
        subject: `Anfrage von ${werte.name}${werte.betrieb ? ` (${werte.betrieb})` : ""}`,
        text: nachricht,
        ...(werte.email ? { reply_to: werte.email } : {}),
      }),
    });

    if (!antwort.ok) {
      throw new Error(`Resend antwortete mit ${antwort.status}`);
    }
  } catch (fehlerBeimVersand) {
    console.error("Anfrage konnte nicht versendet werden.", fehlerBeimVersand);
    return {
      status: "fehler",
      meldung:
        "Das Formular konnte die Nachricht gerade nicht zustellen. Bitte rufen Sie an — dann geht es sofort.",
      werte,
    };
  }

  return { status: "gesendet", meldung: "Ihre Anfrage ist angekommen." };
}
