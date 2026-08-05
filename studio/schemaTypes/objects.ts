import { defineField, defineType, defineArrayMember } from "sanity";

/**
 * Wiederverwendbare Bausteine. Alles hier ist bewusst "Inhalt", nicht "Aussehen":
 * kein `farbe`, kein `spaltenzahl`, kein `grosseUeberschrift`.
 */

export const sektionsKopf = defineType({
  name: "sektionsKopf",
  title: "Abschnitts-Kopf",
  type: "object",
  fields: [
    defineField({
      name: "kennzeichnung",
      title: "Kennzeichnung",
      description:
        'Kurzes Label über der Überschrift, z. B. "Ausgangslage" oder "Leistungen".',
      type: "string",
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: "titel",
      title: "Überschrift",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "text",
      title: "Einleitung",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(400),
    }),
  ],
  preview: {
    select: { title: "titel", subtitle: "kennzeichnung" },
  },
});

export const aktion = defineType({
  name: "aktion",
  title: "Schaltfläche",
  type: "object",
  fields: [
    defineField({
      name: "beschriftung",
      title: "Beschriftung",
      description: 'Sagt, was passiert. Also "Erstgespräch vereinbaren", nicht "Mehr".',
      type: "string",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "ziel",
      title: "Ziel",
      description: 'Interner Pfad wie "/kontakt" oder vollständige Adresse mit https://',
      type: "string",
      validation: (rule) =>
        rule.required().custom((value) => {
          if (typeof value !== "string") return "Ziel fehlt";
          if (value.startsWith("/")) return true;
          if (/^(https?:|mailto:|tel:)/.test(value)) return true;
          return 'Bitte mit "/", "https://", "mailto:" oder "tel:" beginnen';
        }),
    }),
  ],
  preview: {
    select: { title: "beschriftung", subtitle: "ziel" },
  },
});

export const kennzahl = defineType({
  name: "kennzahl",
  title: "Kennzahl",
  type: "object",
  fields: [
    defineField({
      name: "wert",
      title: "Wert",
      description: 'Die Zahl mit Einheit, z. B. "0,8 s", "100 %", "60 Sek."',
      type: "string",
      validation: (rule) => rule.required().max(16),
    }),
    defineField({
      name: "label",
      title: "Bezeichnung",
      type: "string",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "erlaeuterung",
      title: "Erläuterung",
      type: "string",
      validation: (rule) => rule.max(140),
    }),
  ],
  preview: {
    select: { title: "wert", subtitle: "label" },
  },
});

export const merkmal = defineType({
  name: "merkmal",
  title: "Merkmal",
  type: "object",
  fields: [
    defineField({
      name: "titel",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(320),
    }),
  ],
  preview: {
    select: { title: "titel", subtitle: "text" },
  },
});

export const seo = defineType({
  name: "seo",
  title: "Suchmaschinen",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "titel",
      title: "Seitentitel",
      description: "Erscheint im Browser-Tab und bei Google. Rund 55 Zeichen.",
      type: "string",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "beschreibung",
      title: "Beschreibung",
      description: "Der Text unter dem Google-Treffer. Rund 155 Zeichen.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "bild",
      title: "Vorschaubild",
      description: "Wird beim Teilen in WhatsApp, LinkedIn & Co. angezeigt.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "vonSucheAusschliessen",
      title: "Von Suchmaschinen ausschließen",
      type: "boolean",
      initialValue: false,
    }),
  ],
});

export const bildMitText = defineType({
  name: "bildMitText",
  title: "Bild",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Bildbeschreibung",
      description:
        "Beschreibt das Bild für Screenreader und für den Fall, dass es nicht lädt. Pflicht.",
      type: "string",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "bildunterschrift",
      title: "Bildunterschrift",
      type: "string",
    }),
  ],
});

export const inhaltstext = defineType({
  name: "inhaltstext",
  title: "Fließtext",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Absatz", value: "normal" },
        { title: "Überschrift", value: "h2" },
        { title: "Unterüberschrift", value: "h3" },
        { title: "Zitat", value: "blockquote" },
      ],
      lists: [
        { title: "Aufzählung", value: "bullet" },
        { title: "Nummeriert", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Fett", value: "strong" },
          { title: "Kursiv", value: "em" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "Ziel",
                type: "string",
                validation: (rule) => rule.required(),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({ type: "bildMitText" }),
  ],
});
