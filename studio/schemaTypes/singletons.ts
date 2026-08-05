import { defineField, defineType, defineArrayMember } from "sanity";
import { CogIcon } from "@sanity/icons/Cog";
import { HomeIcon } from "@sanity/icons/Home";
import { DocumentIcon } from "@sanity/icons/Document";

/* ------------------------------------------------------------------ */
/* Grundeinstellungen                                                  */
/* ------------------------------------------------------------------ */

export const grundeinstellungen = defineType({
  name: "grundeinstellungen",
  title: "Grundeinstellungen",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "identitaet", title: "Identität", default: true },
    { name: "kontakt", title: "Kontakt" },
    { name: "anbieter", title: "Anbieterangaben" },
    { name: "suche", title: "Suchmaschinen" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "identitaet",
      initialValue: "Maßwerk",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "claim",
      title: "Claim",
      description: "Ein Halbsatz unter dem Namen. Erscheint im Kopf und im Fuß.",
      type: "string",
      group: "identitaet",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "verfuegbarkeit",
      title: "Verfügbarkeit",
      description:
        'Läuft als Laufband im Kopf der Seite, z. B. "Ab Oktober wieder 2 Projektplätze frei".',
      type: "string",
      group: "identitaet",
      validation: (rule) => rule.max(90),
    }),
    defineField({
      name: "laufband",
      title: "Laufband",
      description: "Kurze Aussagen, die oben durchlaufen. 3 bis 6 Stück.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      group: "identitaet",
      validation: (rule) => rule.max(8),
    }),

    defineField({
      name: "telefon",
      title: "Telefon",
      type: "string",
      group: "kontakt",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "E-Mail",
      type: "string",
      group: "kontakt",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "erreichbarkeit",
      title: "Erreichbarkeit",
      description: 'Z. B. "Mo–Fr, 8–18 Uhr"',
      type: "string",
      group: "kontakt",
    }),
    defineField({
      name: "antwortzeit",
      title: "Antwortversprechen",
      description: 'Ein Satz zur Erwartung, z. B. "Rückmeldung innerhalb von 24 Stunden."',
      type: "string",
      group: "kontakt",
      validation: (rule) => rule.max(160),
    }),

    defineField({
      name: "inhaber",
      title: "Inhaber",
      type: "string",
      group: "anbieter",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "strasse",
      title: "Straße und Hausnummer",
      type: "string",
      group: "anbieter",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "plz",
      title: "Postleitzahl",
      type: "string",
      group: "anbieter",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ort",
      title: "Ort",
      type: "string",
      group: "anbieter",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "land",
      title: "Land",
      type: "string",
      group: "anbieter",
      initialValue: "Deutschland",
    }),
    defineField({
      name: "umsatzsteuerId",
      title: "Umsatzsteuer-ID",
      type: "string",
      group: "anbieter",
    }),
    defineField({
      name: "kleinunternehmer",
      title: "Kleinunternehmerregelung (§ 19 UStG)",
      description: "Wenn aktiv, wird der entsprechende Hinweis im Impressum ergänzt.",
      type: "boolean",
      group: "anbieter",
      initialValue: false,
    }),

    defineField({
      name: "seo",
      title: "Standard für Suchmaschinen",
      description: "Wird verwendet, wenn eine Seite keine eigenen Angaben hat.",
      type: "seo",
      group: "suche",
      options: { collapsible: false },
    }),
  ],
  preview: {
    prepare: () => ({ title: "Grundeinstellungen" }),
  },
});

/* ------------------------------------------------------------------ */
/* Startseite                                                          */
/* ------------------------------------------------------------------ */

export const startseite = defineType({
  name: "startseite",
  title: "Startseite",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "kopf", title: "Aufmacher", default: true },
    { name: "argumente", title: "Argumente" },
    { name: "abschnitte", title: "Abschnitte" },
    { name: "suche", title: "Suchmaschinen" },
  ],
  fields: [
    defineField({
      name: "kennzeichnung",
      title: "Kennzeichnung",
      description: "Kleines Label über der Hauptüberschrift.",
      type: "string",
      group: "kopf",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "ueberschrift",
      title: "Hauptüberschrift",
      description: "Das Versprechen in einem Satz.",
      type: "text",
      rows: 2,
      group: "kopf",
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: "hervorhebung",
      title: "Hervorgehobener Teil",
      description:
        "Ein Wort oder eine Wortgruppe aus der Überschrift, die farbig ausgezeichnet wird. Muss genau so in der Überschrift stehen.",
      type: "string",
      group: "kopf",
      validation: (rule) =>
        rule.max(40).custom((value, context) => {
          const parent = context.document as { ueberschrift?: string } | undefined;
          if (!value) return true;
          if (!parent?.ueberschrift?.includes(value)) {
            return "Dieser Text kommt so nicht in der Überschrift vor.";
          }
          return true;
        }),
    }),
    defineField({
      name: "einleitung",
      title: "Einleitung",
      type: "text",
      rows: 4,
      group: "kopf",
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: "hauptaktion",
      title: "Wichtigste Schaltfläche",
      type: "aktion",
      group: "kopf",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "nebenaktion",
      title: "Zweite Schaltfläche",
      type: "aktion",
      group: "kopf",
    }),
    defineField({
      name: "kennzahlen",
      title: "Kennzahlen im Aufmacher",
      description: "Genau drei Werte wirken am ruhigsten.",
      type: "array",
      of: [defineArrayMember({ type: "kennzahl" })],
      group: "kopf",
      validation: (rule) => rule.max(4),
    }),

    defineField({
      name: "ausgangslage",
      title: "Ausgangslage",
      type: "sektionsKopf",
      group: "argumente",
    }),
    defineField({
      name: "maengel",
      title: "Mängelliste",
      description: "Die Punkte, die Besucher bei sich selbst wiedererkennen sollen.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      group: "argumente",
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "loesung",
      title: "Lösung",
      type: "sektionsKopf",
      group: "argumente",
    }),
    defineField({
      name: "vorteile",
      title: "Vorteile",
      type: "array",
      of: [defineArrayMember({ type: "merkmal" })],
      group: "argumente",
      validation: (rule) => rule.max(4),
    }),

    defineField({
      name: "branchenKopf",
      title: "Abschnitt: Branchen",
      type: "sektionsKopf",
      group: "abschnitte",
    }),
    defineField({
      name: "leistungenKopf",
      title: "Abschnitt: Leistungen",
      type: "sektionsKopf",
      group: "abschnitte",
    }),
    defineField({
      name: "ablaufKopf",
      title: "Abschnitt: Ablauf",
      type: "sektionsKopf",
      group: "abschnitte",
    }),
    defineField({
      name: "referenzenKopf",
      title: "Abschnitt: Referenzen",
      type: "sektionsKopf",
      group: "abschnitte",
    }),
    defineField({
      name: "medienKopf",
      title: "Abschnitt: Bild & Film",
      description:
        "Für den späteren Ausbau um Foto- und Videoproduktion. Wird nur angezeigt, wenn unten aktiviert.",
      type: "sektionsKopf",
      group: "abschnitte",
    }),
    defineField({
      name: "medienAnzeigen",
      title: "Abschnitt Bild & Film anzeigen",
      type: "boolean",
      group: "abschnitte",
      initialValue: false,
    }),
    defineField({
      name: "schlussKopf",
      title: "Abschnitt: Abschluss",
      type: "sektionsKopf",
      group: "abschnitte",
    }),
    defineField({
      name: "schlussAktion",
      title: "Schaltfläche im Abschluss",
      type: "aktion",
      group: "abschnitte",
    }),

    defineField({ name: "seo", title: "Suchmaschinen", type: "seo", group: "suche" }),
  ],
  preview: { prepare: () => ({ title: "Startseite" }) },
});

/* ------------------------------------------------------------------ */
/* Leistungsseite                                                      */
/* ------------------------------------------------------------------ */

export const leistungsseite = defineType({
  name: "leistungsseite",
  title: "Seite: Leistungen",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "kopf",
      title: "Seitenkopf",
      type: "sektionsKopf",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "preishinweis",
      title: "Hinweis zu Preisen",
      description:
        "Handwerker misstrauen Websites ohne Preisangabe. Hier gehört eine ehrliche Einordnung hin.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ablaufKopf",
      title: "Abschnitt: Ablauf",
      type: "sektionsKopf",
    }),
    defineField({
      name: "fragenKopf",
      title: "Abschnitt: Häufige Fragen",
      type: "sektionsKopf",
    }),
    defineField({ name: "seo", title: "Suchmaschinen", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Seite: Leistungen" }) },
});

/* ------------------------------------------------------------------ */
/* Referenzseite                                                       */
/* ------------------------------------------------------------------ */

export const referenzseite = defineType({
  name: "referenzseite",
  title: "Seite: Referenzen",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "kopf",
      title: "Seitenkopf",
      type: "sektionsKopf",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "platzhalterHinweis",
      title: "Hinweis zu Platzhaltern",
      description:
        "Erscheint über Projekten mit Status „Platzhalter“. Ehrlich formulieren – das schafft mehr Vertrauen als so zu tun, als wären es echte Kunden.",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "seo", title: "Suchmaschinen", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Seite: Referenzen" }) },
});

/* ------------------------------------------------------------------ */
/* Über mich                                                           */
/* ------------------------------------------------------------------ */

export const ueberSeite = defineType({
  name: "ueberSeite",
  title: "Seite: Über mich",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "kopf",
      title: "Seitenkopf",
      type: "sektionsKopf",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "bildMitText",
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "inhaltstext",
    }),
    defineField({
      name: "grundsaetze",
      title: "Arbeitsweise",
      description: "Wenige, konkrete Zusagen. Keine Floskeln.",
      type: "array",
      of: [defineArrayMember({ type: "merkmal" })],
      validation: (rule) => rule.max(5),
    }),
    defineField({ name: "seo", title: "Suchmaschinen", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Seite: Über mich" }) },
});

/* ------------------------------------------------------------------ */
/* Kontaktseite                                                        */
/* ------------------------------------------------------------------ */

export const kontaktseite = defineType({
  name: "kontaktseite",
  title: "Seite: Kontakt",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "kopf",
      title: "Seitenkopf",
      type: "sektionsKopf",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "formularHinweis",
      title: "Hinweis über dem Formular",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "ablauf",
      title: "Was danach passiert",
      description: "Drei Schritte, damit klar ist, worauf sich jemand einlässt.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(4),
    }),
    defineField({ name: "seo", title: "Suchmaschinen", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Seite: Kontakt" }) },
});
