import type { Metadata } from "next";

import { urlFor } from "@/sanity/lib/image";
import type { Frage, Grundeinstellungen, Seo } from "./typen";

export function metadatenAus(seo: Seo, pfad: string): Metadata {
  const bild = seo.bild?.asset
    ? urlFor(seo.bild).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title: seo.titel ?? undefined,
    description: seo.beschreibung ?? undefined,
    alternates: { canonical: pfad },
    robots: seo.vonSucheAusschliessen
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title: seo.titel ?? undefined,
      description: seo.beschreibung ?? undefined,
      url: pfad,
      ...(bild ? { images: [{ url: bild, width: 1200, height: 630 }] } : {}),
    },
  };
}

/** Strukturierte Daten, damit Google und Antwortmaschinen den Betrieb einordnen können. */
export function organisationsDaten(e: Grundeinstellungen, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}#organisation`,
    name: e.name,
    description: e.seo.beschreibung ?? e.claim,
    url: siteUrl,
    telephone: e.telefon,
    email: e.email,
    founder: { "@type": "Person", name: e.inhaber },
    address: {
      "@type": "PostalAddress",
      streetAddress: e.strasse,
      postalCode: e.plz,
      addressLocality: e.ort,
      addressCountry: "DE",
    },
    areaServed: { "@type": "Country", name: "Deutschland" },
    knowsAbout: [
      "Webdesign für Handwerksbetriebe",
      "Local SEO",
      "Mitarbeitergewinnung über die Website",
    ],
  };
}

/** Antworten auf häufige Fragen so auszeichnen, dass Google und Antwortmaschinen sie zitieren können. */
export function fragenDaten(fragen: Frage[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: fragen.map((frage) => ({
      "@type": "Question",
      name: frage.frage,
      acceptedAnswer: {
        "@type": "Answer",
        text: nurText(frage.antwort),
      },
    })),
  };
}

/** Portable Text auf reinen Text herunterbrechen — mehr braucht die Auszeichnung nicht. */
function nurText(bloecke: Frage["antwort"]): string {
  return bloecke
    .map((block) => {
      const kinder = (block as { children?: { text?: string }[] }).children ?? [];
      return kinder.map((kind) => kind.text ?? "").join("");
    })
    .filter(Boolean)
    .join(" ");
}
