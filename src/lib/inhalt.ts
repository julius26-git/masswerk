import { sanityFetch } from "@/sanity/lib/live";
import {
  ARBEITSSCHRITTE_QUERY,
  BRANCHEN_QUERY,
  FRAGEN_QUERY,
  GRUNDEINSTELLUNGEN_QUERY,
  KONTAKTSEITE_QUERY,
  LEISTUNGEN_QUERY,
  LEISTUNGSSEITE_QUERY,
  RECHTSTEXT_QUERY,
  REFERENZEN_QUERY,
  REFERENZSEITE_QUERY,
  STARTSEITE_QUERY,
  STIMMEN_QUERY,
  UEBER_SEITE_QUERY,
} from "@/sanity/lib/queries";

import { standardDatenschutz, standardImpressum } from "./rechtstexte";
import {
  standardArbeitsschritte,
  standardBranchen,
  standardFragen,
  standardGrundeinstellungen,
  standardKontaktseite,
  standardLeistungen,
  standardLeistungsseite,
  standardReferenzen,
  standardReferenzseite,
  standardStartseite,
  standardStimmen,
  standardUeberSeite,
} from "./standardinhalt";
import type {
  Arbeitsschritt,
  Branche,
  Frage,
  Grundeinstellungen,
  Kontaktseite,
  Leistung,
  Leistungsseite,
  Referenz,
  Referenzseite,
  Rechtstext,
  Startseite,
  Stimme,
  UeberSeite,
} from "./typen";
import { verschmelze } from "./verschmelze";

type Optionen = { stega?: boolean };

/**
 * Holt Daten aus Sanity. Fällt die Verbindung aus oder ist das Feld leer,
 * bleibt der Standardinhalt stehen — die Seite bleibt vollständig.
 */
async function hole<T>(
  query: Parameters<typeof sanityFetch>[0]["query"],
  standard: T,
  { stega = true }: Optionen = {},
): Promise<T> {
  try {
    const { data } = await sanityFetch({ query, stega });
    return verschmelze(standard, data);
  } catch (fehler) {
    console.error("Sanity nicht erreichbar, verwende Standardinhalt.", fehler);
    return standard;
  }
}

export const holeGrundeinstellungen = (o?: Optionen) =>
  hole<Grundeinstellungen>(GRUNDEINSTELLUNGEN_QUERY, standardGrundeinstellungen, o);

export const holeStartseite = (o?: Optionen) =>
  hole<Startseite>(STARTSEITE_QUERY, standardStartseite, o);

export const holeBranchen = (o?: Optionen) =>
  hole<Branche[]>(BRANCHEN_QUERY, standardBranchen, o);

export const holeLeistungen = (o?: Optionen) =>
  hole<Leistung[]>(LEISTUNGEN_QUERY, standardLeistungen, o);

export const holeArbeitsschritte = (o?: Optionen) =>
  hole<Arbeitsschritt[]>(ARBEITSSCHRITTE_QUERY, standardArbeitsschritte, o);

export const holeReferenzen = (o?: Optionen) =>
  hole<Referenz[]>(REFERENZEN_QUERY, standardReferenzen, o);

export const holeStimmen = (o?: Optionen) =>
  hole<Stimme[]>(STIMMEN_QUERY, standardStimmen, o);

export const holeFragen = (o?: Optionen) =>
  hole<Frage[]>(FRAGEN_QUERY, standardFragen, o);

export const holeLeistungsseite = (o?: Optionen) =>
  hole<Leistungsseite>(LEISTUNGSSEITE_QUERY, standardLeistungsseite, o);

export const holeReferenzseite = (o?: Optionen) =>
  hole<Referenzseite>(REFERENZSEITE_QUERY, standardReferenzseite, o);

export const holeUeberSeite = (o?: Optionen) =>
  hole<UeberSeite>(UEBER_SEITE_QUERY, standardUeberSeite, o);

export const holeKontaktseite = (o?: Optionen) =>
  hole<Kontaktseite>(KONTAKTSEITE_QUERY, standardKontaktseite, o);

export async function holeRechtstext(
  slug: "impressum" | "datenschutz",
  optionen: Optionen = {},
): Promise<Rechtstext> {
  const einstellungen = await holeGrundeinstellungen(optionen);
  const standard =
    slug === "impressum"
      ? standardImpressum(einstellungen)
      : standardDatenschutz(einstellungen);

  try {
    const { data } = await sanityFetch({
      query: RECHTSTEXT_QUERY,
      params: { slug },
      stega: optionen.stega ?? true,
    });
    return verschmelze(standard, data);
  } catch (fehler) {
    console.error("Sanity nicht erreichbar, verwende Standardinhalt.", fehler);
    return standard;
  }
}
