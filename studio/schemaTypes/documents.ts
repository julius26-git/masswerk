import { defineField, defineType, defineArrayMember } from "sanity";
import { CaseIcon } from "@sanity/icons/Case";
import { TagIcon } from "@sanity/icons/Tag";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { UserIcon } from "@sanity/icons/User";
import { BlockElementIcon } from "@sanity/icons/BlockElement";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";

const reihenfolge = defineField({
  name: "reihenfolge",
  title: "Reihenfolge",
  description: "Kleinere Zahl steht weiter oben.",
  type: "number",
  initialValue: 100,
  validation: (rule) => rule.required().integer().min(0),
});

/* ------------------------------------------------------------------ */
/* Leistung                                                            */
/* ------------------------------------------------------------------ */

export const leistung = defineType({
  name: "leistung",
  title: "Leistung",
  type: "document",
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "titel",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "slug",
      title: "Adresse",
      type: "slug",
      options: { source: "titel", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bereich",
      title: "Bereich",
      description:
        "Bestimmt, unter welcher Überschrift die Leistung auf der Leistungsseite steht.",
      type: "string",
      options: {
        list: [
          { title: "Website", value: "website" },
          { title: "Sichtbarkeit", value: "sichtbarkeit" },
          { title: "Betreuung", value: "betreuung" },
          { title: "Bild & Film", value: "medien" },
        ],
        layout: "radio",
      },
      initialValue: "website",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "versprechen",
      title: "Versprechen",
      description:
        'Ein Satz, der das Ergebnis benennt, nicht die Technik. Z. B. "Bewerbungen kommen von der Baustelle statt gar nicht."',
      type: "string",
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: "teaser",
      title: "Kurzbeschreibung",
      description: "2–3 Sätze für die Übersicht auf der Startseite.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(320),
    }),
    defineField({
      name: "umfang",
      title: "Das ist enthalten",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: "beschreibung",
      title: "Ausführliche Beschreibung",
      type: "inhaltstext",
    }),
    reihenfolge,
  ],
  orderings: [
    {
      title: "Reihenfolge",
      name: "reihenfolgeAsc",
      by: [{ field: "reihenfolge", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "titel", subtitle: "versprechen", bereich: "bereich" },
    prepare: ({ title, subtitle, bereich }) => ({
      title,
      subtitle: `${bereich} · ${subtitle ?? ""}`,
    }),
  },
});

/* ------------------------------------------------------------------ */
/* Branche                                                             */
/* ------------------------------------------------------------------ */

export const branche = defineType({
  name: "branche",
  title: "Branche",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "titel",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "slug",
      title: "Adresse",
      type: "slug",
      options: { source: "titel", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "beispiele",
      title: "Beispiele",
      description: 'Konkrete Gewerke oder Betriebsarten, z. B. "Elektrik", "Sanitär".',
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(2).max(6),
    }),
    defineField({
      name: "beduerfnis",
      title: "Wichtigstes Anliegen",
      description: 'Ein Satz: Woran hakt es in dieser Branche am meisten?',
      type: "string",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "material",
      title: "Schraffur",
      description:
        "Jede Branche bekommt eine eigene technische Schraffur, wie in einer Bauzeichnung.",
      type: "string",
      options: {
        list: [
          { title: "Beton", value: "beton" },
          { title: "Holz", value: "holz" },
          { title: "Stahl", value: "stahl" },
          { title: "Dämmung", value: "daemmung" },
        ],
        layout: "radio",
      },
      initialValue: "beton",
      validation: (rule) => rule.required(),
    }),
    reihenfolge,
  ],
  orderings: [
    {
      title: "Reihenfolge",
      name: "reihenfolgeAsc",
      by: [{ field: "reihenfolge", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "titel", subtitle: "beduerfnis" },
  },
});

/* ------------------------------------------------------------------ */
/* Referenz                                                            */
/* ------------------------------------------------------------------ */

export const referenz = defineType({
  name: "referenz",
  title: "Referenz",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "titel",
      title: "Betrieb",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "Adresse",
      type: "slug",
      options: { source: "titel", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      description:
        '"Platzhalter" markiert das Projekt sichtbar als Muster – solange noch keine echten Kundenprojekte veröffentlicht sind.',
      type: "string",
      options: {
        list: [
          { title: "Live", value: "live" },
          { title: "In Arbeit", value: "inArbeit" },
          { title: "Platzhalter", value: "platzhalter" },
        ],
        layout: "radio",
      },
      initialValue: "platzhalter",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "branche",
      title: "Branche",
      description:
        "Optional. Eigene Studien und Musterprojekte gehören in keine Kundenbranche.",
      type: "reference",
      to: [{ type: "branche" }],
    }),
    defineField({
      name: "jahr",
      title: "Jahr",
      type: "number",
      validation: (rule) => rule.integer().min(2015).max(2100),
    }),
    defineField({
      name: "auftrag",
      title: "Auftrag",
      description: "Ein Satz: Was sollte die Website leisten?",
      type: "string",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "leistungen",
      title: "Erbrachte Leistungen",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "leistung" }] })],
    }),
    defineField({
      name: "ergebnisse",
      title: "Ergebnisse",
      description: "Messbare Zahlen. Ohne echte Zahlen lieber leer lassen.",
      type: "array",
      of: [defineArrayMember({ type: "kennzahl" })],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: "bildNachher",
      title: "Bild: neue Website",
      type: "bildMitText",
    }),
    defineField({
      name: "bildVorher",
      title: "Bild: alte Website",
      description: "Optional. Zeigt den Vorher-Zustand im Vergleich.",
      type: "bildMitText",
    }),
    defineField({
      name: "adresse",
      title: "Link zur Website",
      type: "url",
      hidden: ({ parent }) => parent?.status === "platzhalter",
    }),
    defineField({
      name: "beschreibung",
      title: "Fallbeschreibung",
      type: "inhaltstext",
    }),
    reihenfolge,
  ],
  orderings: [
    {
      title: "Reihenfolge",
      name: "reihenfolgeAsc",
      by: [{ field: "reihenfolge", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "titel",
      subtitle: "auftrag",
      status: "status",
      media: "bildNachher",
    },
    prepare: ({ title, subtitle, status, media }) => ({
      title,
      subtitle: `${status === "platzhalter" ? "Platzhalter · " : ""}${subtitle ?? ""}`,
      media,
    }),
  },
});

/* ------------------------------------------------------------------ */
/* Stimme                                                              */
/* ------------------------------------------------------------------ */

export const stimme = defineType({
  name: "stimme",
  title: "Kundenstimme",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "zitat",
      title: "Zitat",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rolle",
      title: "Rolle und Betrieb",
      description: 'Z. B. "Geschäftsführer, Elektro Meier GmbH"',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "bildMitText",
    }),
    defineField({
      name: "referenz",
      title: "Gehört zu Referenz",
      type: "reference",
      to: [{ type: "referenz" }],
    }),
    reihenfolge,
  ],
  preview: {
    select: { title: "name", subtitle: "rolle", media: "portrait" },
  },
});

/* ------------------------------------------------------------------ */
/* Frage                                                               */
/* ------------------------------------------------------------------ */

export const frage = defineType({
  name: "frage",
  title: "Häufige Frage",
  type: "document",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "frage",
      title: "Frage",
      type: "string",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "antwort",
      title: "Antwort",
      type: "inhaltstext",
      validation: (rule) => rule.required(),
    }),
    reihenfolge,
  ],
  orderings: [
    {
      title: "Reihenfolge",
      name: "reihenfolgeAsc",
      by: [{ field: "reihenfolge", direction: "asc" }],
    },
  ],
  preview: { select: { title: "frage" } },
});

/* ------------------------------------------------------------------ */
/* Arbeitsschritt                                                      */
/* ------------------------------------------------------------------ */

export const arbeitsschritt = defineType({
  name: "arbeitsschritt",
  title: "Arbeitsschritt",
  type: "document",
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "titel",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "text",
      title: "Was passiert",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(320),
    }),
    defineField({
      name: "dauer",
      title: "Dauer",
      description: 'Z. B. "30 Minuten" oder "1 Woche"',
      type: "string",
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: "aufwandKunde",
      title: "Aufwand für den Kunden",
      description: 'Z. B. "Ein Telefonat" – macht sichtbar, wie wenig Zeit es kostet.',
      type: "string",
      validation: (rule) => rule.max(60),
    }),
    reihenfolge,
  ],
  orderings: [
    {
      title: "Reihenfolge",
      name: "reihenfolgeAsc",
      by: [{ field: "reihenfolge", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "titel", subtitle: "dauer" },
  },
});

/* ------------------------------------------------------------------ */
/* Rechtstext                                                          */
/* ------------------------------------------------------------------ */

export const rechtstext = defineType({
  name: "rechtstext",
  title: "Rechtstext",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "titel",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Adresse",
      type: "slug",
      options: { source: "titel", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "stand",
      title: "Stand",
      type: "date",
      options: { dateFormat: "DD.MM.YYYY" },
    }),
    defineField({
      name: "inhalt",
      title: "Inhalt",
      type: "inhaltstext",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "seo", title: "Suchmaschinen", type: "seo" }),
  ],
  preview: {
    select: { title: "titel", subtitle: "slug.current" },
  },
});
