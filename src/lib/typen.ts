import type { PortableTextBlock } from "@portabletext/types";

export type SanityBild = {
  _type?: string;
  alt?: string | null;
  bildunterschrift?: string | null;
  asset?: { _ref?: string; _type?: string } | null;
} | null;

export type Kennzahl = {
  _key: string;
  wert: string;
  label: string;
  erlaeuterung?: string | null;
};

export type Merkmal = {
  _key: string;
  titel: string;
  text: string;
};

export type Aktion = {
  beschriftung: string;
  ziel: string;
};

export type SektionsKopf = {
  kennzeichnung?: string | null;
  titel: string;
  text?: string | null;
};

export type Seo = {
  titel?: string | null;
  beschreibung?: string | null;
  bild?: SanityBild;
  vonSucheAusschliessen?: boolean | null;
};

export type Grundeinstellungen = {
  name: string;
  claim: string;
  verfuegbarkeit: string;
  laufband: string[];
  telefon: string;
  email: string;
  erreichbarkeit: string;
  antwortzeit: string;
  inhaber: string;
  strasse: string;
  plz: string;
  ort: string;
  land: string;
  umsatzsteuerId: string | null;
  kleinunternehmer: boolean;
  seo: Seo;
};

export type Branche = {
  _id: string;
  titel: string;
  slug: string;
  beispiele: string[];
  beduerfnis: string;
  material: "beton" | "holz" | "stahl" | "daemmung";
};

export type Leistung = {
  _id: string;
  titel: string;
  slug: string;
  bereich: "website" | "sichtbarkeit" | "betreuung" | "medien";
  versprechen: string;
  teaser: string;
  umfang: string[];
  beschreibung?: PortableTextBlock[] | null;
};

export type Arbeitsschritt = {
  _id: string;
  titel: string;
  text: string;
  dauer: string;
  aufwandKunde: string;
};

export type Referenz = {
  _id: string;
  titel: string;
  slug: string;
  status: "live" | "inArbeit" | "platzhalter";
  jahr: number | null;
  auftrag: string;
  adresse: string | null;
  branche: { titel: string; material: Branche["material"] } | null;
  ergebnisse: Kennzahl[];
  bildNachher: SanityBild;
  bildVorher: SanityBild;
};

export type Stimme = {
  _id: string;
  zitat: string;
  name: string;
  rolle: string;
  portrait: SanityBild;
};

export type Frage = {
  _id: string;
  frage: string;
  antwort: PortableTextBlock[];
};

export type Startseite = {
  kennzeichnung: string;
  ueberschrift: string;
  hervorhebung: string;
  einleitung: string;
  hauptaktion: Aktion;
  nebenaktion: Aktion;
  kennzahlen: Kennzahl[];
  ausgangslage: SektionsKopf;
  maengel: string[];
  loesung: SektionsKopf;
  vorteile: Merkmal[];
  branchenKopf: SektionsKopf;
  leistungenKopf: SektionsKopf;
  ablaufKopf: SektionsKopf;
  referenzenKopf: SektionsKopf;
  medienKopf: SektionsKopf;
  medienAnzeigen: boolean;
  schlussKopf: SektionsKopf;
  schlussAktion: Aktion;
  seo: Seo;
};

export type Leistungsseite = {
  kopf: SektionsKopf;
  preishinweis: string;
  ablaufKopf: SektionsKopf;
  fragenKopf: SektionsKopf;
  seo: Seo;
};

export type Referenzseite = {
  kopf: SektionsKopf;
  platzhalterHinweis: string;
  seo: Seo;
};

export type UeberSeite = {
  kopf: SektionsKopf;
  portrait: SanityBild;
  text: PortableTextBlock[];
  grundsaetze: Merkmal[];
  seo: Seo;
};

export type Kontaktseite = {
  kopf: SektionsKopf;
  formularHinweis: string;
  ablauf: string[];
  seo: Seo;
};

export type Rechtstext = {
  titel: string;
  slug: string;
  stand: string | null;
  inhalt: PortableTextBlock[];
  seo: Seo;
};
