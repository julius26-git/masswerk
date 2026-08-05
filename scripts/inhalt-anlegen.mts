/**
 * Legt den Standardinhalt einmalig in Sanity an, damit im Studio nichts leer
 * ist und du sofort etwas zum Bearbeiten hast.
 *
 * Aufruf:  SANITY_WRITE_TOKEN=... npx tsx scripts/inhalt-anlegen.ts
 *
 * Vorhandene Dokumente werden nicht überschrieben (createIfNotExists).
 * Mit --ueberschreiben werden sie durch den Standardinhalt ersetzt.
 */
import { createClient } from "@sanity/client";

import { standardDatenschutz, standardImpressum } from "../src/lib/rechtstexte";
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
  standardUeberSeite,
} from "../src/lib/standardinhalt";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("SANITY_WRITE_TOKEN fehlt.");
  process.exit(1);
}

const ueberschreiben = process.argv.includes("--ueberschreiben");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "z88uzayz",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-02-01",
  token,
  useCdn: false,
});

type Dokument = Record<string, unknown> & { _id: string; _type: string };

/** Felder, die Bilder halten. Sie entstehen im Studio, nicht hier. */
const BILDFELDER = ["bildNachher", "bildVorher", "portrait"] as const;

async function anlegen(dokumente: Dokument[]) {
  let angelegt = 0;

  for (const dokument of dokumente) {
    if (ueberschreiben) {
      // Hochgeladene Bilder überleben das Überschreiben. Sonst würde ein
      // Lauf dieses Skripts jeden Screenshot aus den Referenzen werfen.
      const vorhanden = (await client.getDocument(dokument._id)) as
        | Record<string, unknown>
        | undefined;
      const bilder = Object.fromEntries(
        BILDFELDER.filter((feld) => vorhanden?.[feld] !== undefined).map(
          (feld) => [feld, vorhanden![feld]],
        ),
      );

      await client.createOrReplace({ ...dokument, ...bilder });
      angelegt += 1;
    } else {
      const vorhanden = await client.getDocument(dokument._id);
      if (vorhanden) continue;
      await client.create(dokument);
      angelegt += 1;
    }
  }

  return angelegt;
}

/** Sanity braucht in Listen einen _key; die Standarddaten bringen ihn teils schon mit. */
function mitSchluessel<T extends Record<string, unknown>>(
  eintraege: T[],
  praefix: string,
): T[] {
  return eintraege.map((eintrag, index) => ({
    _key: (eintrag._key as string) ?? `${praefix}-${index}`,
    ...eintrag,
  }));
}

/** Welche Referenz zu welcher Branche gehört. Fehlt ein Eintrag, bleibt das Feld leer. */
const BRANCHE_JE_REFERENZ: Record<string, string> = {
  "referenz-reuther": "branche-handwerk",
};

const s = standardStartseite;
const g = standardGrundeinstellungen;

const dokumente: Dokument[] = [
  {
    _id: "grundeinstellungen",
    _type: "grundeinstellungen",
    name: g.name,
    claim: g.claim,
    verfuegbarkeit: g.verfuegbarkeit,
    laufband: g.laufband,
    telefon: g.telefon,
    email: g.email,
    erreichbarkeit: g.erreichbarkeit,
    antwortzeit: g.antwortzeit,
    inhaber: g.inhaber,
    strasse: g.strasse,
    plz: g.plz,
    ort: g.ort,
    land: g.land,
    kleinunternehmer: g.kleinunternehmer,
    seo: {
      _type: "seo",
      titel: g.seo.titel,
      beschreibung: g.seo.beschreibung,
      vonSucheAusschliessen: false,
    },
  },

  {
    _id: "startseite",
    _type: "startseite",
    kennzeichnung: s.kennzeichnung,
    ueberschrift: s.ueberschrift,
    hervorhebung: s.hervorhebung,
    einleitung: s.einleitung,
    hauptaktion: { _type: "aktion", ...s.hauptaktion },
    nebenaktion: { _type: "aktion", ...s.nebenaktion },
    kennzahlen: mitSchluessel(
      s.kennzahlen.map((k) => ({ _type: "kennzahl", ...k })),
      "kennzahl",
    ),
    ausgangslage: { _type: "sektionsKopf", ...s.ausgangslage },
    maengel: s.maengel,
    loesung: { _type: "sektionsKopf", ...s.loesung },
    vorteile: mitSchluessel(
      s.vorteile.map((v) => ({ _type: "merkmal", ...v })),
      "vorteil",
    ),
    branchenKopf: { _type: "sektionsKopf", ...s.branchenKopf },
    leistungenKopf: { _type: "sektionsKopf", ...s.leistungenKopf },
    ablaufKopf: { _type: "sektionsKopf", ...s.ablaufKopf },
    referenzenKopf: { _type: "sektionsKopf", ...s.referenzenKopf },
    medienKopf: { _type: "sektionsKopf", ...s.medienKopf },
    medienAnzeigen: false,
    schlussKopf: { _type: "sektionsKopf", ...s.schlussKopf },
    schlussAktion: { _type: "aktion", ...s.schlussAktion },
    seo: { _type: "seo", ...s.seo, bild: undefined },
  },

  {
    _id: "leistungsseite",
    _type: "leistungsseite",
    kopf: { _type: "sektionsKopf", ...standardLeistungsseite.kopf },
    preishinweis: standardLeistungsseite.preishinweis,
    ablaufKopf: { _type: "sektionsKopf", ...standardLeistungsseite.ablaufKopf },
    fragenKopf: { _type: "sektionsKopf", ...standardLeistungsseite.fragenKopf },
    seo: { _type: "seo", ...standardLeistungsseite.seo, bild: undefined },
  },

  {
    _id: "referenzseite",
    _type: "referenzseite",
    kopf: { _type: "sektionsKopf", ...standardReferenzseite.kopf },
    platzhalterHinweis: standardReferenzseite.platzhalterHinweis,
    seo: { _type: "seo", ...standardReferenzseite.seo, bild: undefined },
  },

  {
    _id: "ueberSeite",
    _type: "ueberSeite",
    kopf: { _type: "sektionsKopf", ...standardUeberSeite.kopf },
    text: standardUeberSeite.text,
    grundsaetze: mitSchluessel(
      standardUeberSeite.grundsaetze.map((m) => ({ _type: "merkmal", ...m })),
      "grundsatz",
    ),
    seo: { _type: "seo", ...standardUeberSeite.seo, bild: undefined },
  },

  {
    _id: "kontaktseite",
    _type: "kontaktseite",
    kopf: { _type: "sektionsKopf", ...standardKontaktseite.kopf },
    formularHinweis: standardKontaktseite.formularHinweis,
    ablauf: standardKontaktseite.ablauf,
    seo: { _type: "seo", ...standardKontaktseite.seo, bild: undefined },
  },

  ...standardBranchen.map((branche, index) => ({
    _id: branche._id,
    _type: "branche",
    titel: branche.titel,
    slug: { _type: "slug", current: branche.slug },
    beispiele: branche.beispiele,
    beduerfnis: branche.beduerfnis,
    material: branche.material,
    reihenfolge: (index + 1) * 10,
  })),

  ...standardLeistungen.map((leistung, index) => ({
    _id: leistung._id,
    _type: "leistung",
    titel: leistung.titel,
    slug: { _type: "slug", current: leistung.slug },
    bereich: leistung.bereich,
    versprechen: leistung.versprechen,
    teaser: leistung.teaser,
    umfang: leistung.umfang,
    reihenfolge: (index + 1) * 10,
  })),

  ...standardArbeitsschritte.map((schritt, index) => ({
    _id: schritt._id,
    _type: "arbeitsschritt",
    titel: schritt.titel,
    text: schritt.text,
    dauer: schritt.dauer,
    aufwandKunde: schritt.aufwandKunde,
    reihenfolge: (index + 1) * 10,
  })),

  ...standardFragen.map((frage, index) => ({
    _id: frage._id,
    _type: "frage",
    frage: frage.frage,
    antwort: frage.antwort,
    reihenfolge: (index + 1) * 10,
  })),

  ...standardReferenzen.map((referenz, index) => ({
    _id: referenz._id,
    _type: "referenz",
    titel: referenz.titel,
    slug: { _type: "slug", current: referenz.slug },
    status: referenz.status,
    jahr: referenz.jahr ?? undefined,
    adresse: referenz.adresse ?? undefined,
    auftrag: referenz.auftrag,
    // Nicht jede Referenz gehört in eine Kundenbranche — Studien nicht.
    ...(BRANCHE_JE_REFERENZ[referenz._id]
      ? {
          branche: {
            _type: "reference",
            _ref: BRANCHE_JE_REFERENZ[referenz._id],
          },
        }
      : {}),
    reihenfolge: (index + 1) * 10,
  })),

  {
    _id: "rechtstext-impressum",
    _type: "rechtstext",
    titel: "Impressum",
    slug: { _type: "slug", current: "impressum" },
    inhalt: standardImpressum(g).inhalt,
    seo: { _type: "seo", ...standardImpressum(g).seo, bild: undefined },
  },
  {
    _id: "rechtstext-datenschutz",
    _type: "rechtstext",
    titel: "Datenschutz",
    slug: { _type: "slug", current: "datenschutz" },
    inhalt: standardDatenschutz(g).inhalt,
    seo: { _type: "seo", ...standardDatenschutz(g).seo, bild: undefined },
  },
];

anlegen(dokumente)
  .then((anzahl) => {
    console.log(
      ueberschreiben
        ? `${anzahl} Dokumente ersetzt.`
        : `${anzahl} von ${dokumente.length} Dokumenten neu angelegt (vorhandene blieben unberührt).`,
    );
  })
  .catch((fehler) => {
    console.error(fehler);
    process.exit(1);
  });
