import type { StructureResolver } from "sanity/structure";
import { CogIcon } from "@sanity/icons/Cog";
import { HomeIcon } from "@sanity/icons/Home";
import { DocumentIcon } from "@sanity/icons/Document";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";

/** Dokumenttypen, die als Einzelstück existieren und daher nicht in Listen auftauchen. */
export const einzelstuecke = [
  "grundeinstellungen",
  "startseite",
  "leistungsseite",
  "referenzseite",
  "ueberSeite",
  "kontaktseite",
] as const;

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Maßwerk")
    .items([
      S.listItem()
        .title("Grundeinstellungen")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("grundeinstellungen")
            .documentId("grundeinstellungen")
            .title("Grundeinstellungen"),
        ),

      S.divider(),

      S.listItem()
        .title("Startseite")
        .icon(HomeIcon)
        .child(
          S.document().schemaType("startseite").documentId("startseite").title("Startseite"),
        ),
      S.listItem()
        .title("Seite: Leistungen")
        .icon(DocumentIcon)
        .child(
          S.document()
            .schemaType("leistungsseite")
            .documentId("leistungsseite")
            .title("Seite: Leistungen"),
        ),
      S.listItem()
        .title("Seite: Referenzen")
        .icon(DocumentIcon)
        .child(
          S.document()
            .schemaType("referenzseite")
            .documentId("referenzseite")
            .title("Seite: Referenzen"),
        ),
      S.listItem()
        .title("Seite: Über mich")
        .icon(DocumentIcon)
        .child(
          S.document()
            .schemaType("ueberSeite")
            .documentId("ueberSeite")
            .title("Seite: Über mich"),
        ),
      S.listItem()
        .title("Seite: Kontakt")
        .icon(DocumentIcon)
        .child(
          S.document()
            .schemaType("kontaktseite")
            .documentId("kontaktseite")
            .title("Seite: Kontakt"),
        ),

      S.divider(),

      S.documentTypeListItem("leistung").title("Leistungen"),
      S.documentTypeListItem("branche").title("Branchen"),
      S.documentTypeListItem("referenz").title("Referenzen"),
      S.documentTypeListItem("stimme").title("Kundenstimmen"),
      S.documentTypeListItem("arbeitsschritt").title("Arbeitsschritte"),
      S.documentTypeListItem("frage").title("Häufige Fragen"),

      S.divider(),

      S.listItem()
        .title("Rechtstexte")
        .icon(DocumentTextIcon)
        .child(S.documentTypeList("rechtstext").title("Rechtstexte")),
    ]);
