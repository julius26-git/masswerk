import { defineQuery } from "next-sanity";

/*
 * Zu Listen: Elemente aus Sanity ersetzen den Standardinhalt vollständig —
 * anders ginge es nicht, weil sich einzelne Einträge nicht zuordnen lassen.
 * Damit dabei keine Lücke entsteht, liefert jedes Listenfeld hier schon eine
 * leere Liste statt null.
 */

const SEKTIONSKOPF = /* groq */ `{ kennzeichnung, titel, text }`;
const AKTION = /* groq */ `{ beschriftung, ziel }`;
const KENNZAHL = /* groq */ `{ _key, wert, label, erlaeuterung }`;
const MERKMAL = /* groq */ `{ _key, titel, text }`;
const BILD = /* groq */ `{ ..., alt, bildunterschrift, asset }`;
const SEO = /* groq */ `{ titel, beschreibung, bild ${BILD}, vonSucheAusschliessen }`;

export const GRUNDEINSTELLUNGEN_QUERY = defineQuery(`
  *[_id == "grundeinstellungen"][0]{
    name,
    claim,
    verfuegbarkeit,
    "laufband": coalesce(laufband, []),
    telefon,
    email,
    erreichbarkeit,
    antwortzeit,
    inhaber,
    strasse,
    plz,
    ort,
    land,
    umsatzsteuerId,
    kleinunternehmer,
    seo ${SEO}
  }
`);

export const BRANCHEN_QUERY = defineQuery(`
  *[_type == "branche"] | order(reihenfolge asc){
    _id,
    titel,
    "slug": slug.current,
    "beispiele": coalesce(beispiele, []),
    beduerfnis,
    material
  }
`);

export const LEISTUNGEN_QUERY = defineQuery(`
  *[_type == "leistung"] | order(reihenfolge asc){
    _id,
    titel,
    "slug": slug.current,
    bereich,
    versprechen,
    teaser,
    "umfang": coalesce(umfang, []),
    "beschreibung": coalesce(beschreibung, [])
  }
`);

export const ARBEITSSCHRITTE_QUERY = defineQuery(`
  *[_type == "arbeitsschritt"] | order(reihenfolge asc){
    _id,
    titel,
    text,
    dauer,
    aufwandKunde
  }
`);

export const REFERENZEN_QUERY = defineQuery(`
  *[_type == "referenz"] | order(reihenfolge asc){
    _id,
    titel,
    "slug": slug.current,
    status,
    jahr,
    auftrag,
    adresse,
    branche->{ titel, material },
    "ergebnisse": coalesce(ergebnisse[] ${KENNZAHL}, []),
    bildNachher ${BILD},
    bildVorher ${BILD},
    "beschreibung": coalesce(beschreibung, [])
  }
`);

export const STIMMEN_QUERY = defineQuery(`
  *[_type == "stimme"] | order(reihenfolge asc){
    _id,
    zitat,
    name,
    rolle,
    portrait ${BILD}
  }
`);

export const FRAGEN_QUERY = defineQuery(`
  *[_type == "frage"] | order(reihenfolge asc){
    _id,
    frage,
    "antwort": coalesce(antwort, [])
  }
`);

export const STARTSEITE_QUERY = defineQuery(`
  *[_id == "startseite"][0]{
    kennzeichnung,
    ueberschrift,
    hervorhebung,
    einleitung,
    hauptaktion ${AKTION},
    nebenaktion ${AKTION},
    "kennzahlen": coalesce(kennzahlen[] ${KENNZAHL}, []),
    ausgangslage ${SEKTIONSKOPF},
    "maengel": coalesce(maengel, []),
    loesung ${SEKTIONSKOPF},
    "vorteile": coalesce(vorteile[] ${MERKMAL}, []),
    branchenKopf ${SEKTIONSKOPF},
    leistungenKopf ${SEKTIONSKOPF},
    ablaufKopf ${SEKTIONSKOPF},
    referenzenKopf ${SEKTIONSKOPF},
    medienKopf ${SEKTIONSKOPF},
    medienAnzeigen,
    schlussKopf ${SEKTIONSKOPF},
    schlussAktion ${AKTION},
    seo ${SEO}
  }
`);

export const LEISTUNGSSEITE_QUERY = defineQuery(`
  *[_id == "leistungsseite"][0]{
    kopf ${SEKTIONSKOPF},
    preishinweis,
    ablaufKopf ${SEKTIONSKOPF},
    fragenKopf ${SEKTIONSKOPF},
    seo ${SEO}
  }
`);

export const REFERENZSEITE_QUERY = defineQuery(`
  *[_id == "referenzseite"][0]{
    kopf ${SEKTIONSKOPF},
    platzhalterHinweis,
    seo ${SEO}
  }
`);

export const UEBER_SEITE_QUERY = defineQuery(`
  *[_id == "ueberSeite"][0]{
    kopf ${SEKTIONSKOPF},
    portrait ${BILD},
    "text": coalesce(text, []),
    "grundsaetze": coalesce(grundsaetze[] ${MERKMAL}, []),
    seo ${SEO}
  }
`);

export const KONTAKTSEITE_QUERY = defineQuery(`
  *[_id == "kontaktseite"][0]{
    kopf ${SEKTIONSKOPF},
    formularHinweis,
    "ablauf": coalesce(ablauf, []),
    seo ${SEO}
  }
`);

export const RECHTSTEXT_QUERY = defineQuery(`
  *[_type == "rechtstext" && slug.current == $slug][0]{
    titel,
    "slug": slug.current,
    stand,
    "inhalt": coalesce(inhalt, []),
    seo ${SEO}
  }
`);

export const RECHTSTEXT_SLUGS_QUERY = defineQuery(`
  *[_type == "rechtstext" && defined(slug.current)]{ "slug": slug.current }
`);
