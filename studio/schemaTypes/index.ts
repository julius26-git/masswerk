import type { SchemaTypeDefinition } from "sanity";

import {
  sektionsKopf,
  aktion,
  kennzahl,
  merkmal,
  seo,
  bildMitText,
  inhaltstext,
} from "./objects";

import {
  leistung,
  branche,
  referenz,
  stimme,
  frage,
  arbeitsschritt,
  rechtstext,
} from "./documents";

import {
  grundeinstellungen,
  startseite,
  leistungsseite,
  referenzseite,
  ueberSeite,
  kontaktseite,
} from "./singletons";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Bausteine
  sektionsKopf,
  aktion,
  kennzahl,
  merkmal,
  seo,
  bildMitText,
  inhaltstext,
  // Inhalte
  leistung,
  branche,
  referenz,
  stimme,
  frage,
  arbeitsschritt,
  rechtstext,
  // Seiten
  grundeinstellungen,
  startseite,
  leistungsseite,
  referenzseite,
  ueberSeite,
  kontaktseite,
];
