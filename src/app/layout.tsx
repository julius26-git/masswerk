import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import { draftMode } from "next/headers";
import { stegaClean } from "next-sanity";
import { VisualEditing } from "next-sanity/visual-editing";

import "./globals.css";

import { Intro } from "@/components/intro";
import { Kopfleiste } from "@/components/kopfleiste";
import { Fussbereich } from "@/components/fussbereich";
import { Massband } from "@/components/massband";
import { Schraffuren } from "@/components/schraffuren";
import { siteUrl } from "@/sanity/env";
import { SanityLive } from "@/sanity/lib/live";
import { holeGrundeinstellungen } from "@/lib/inhalt";
import { organisationsDaten } from "@/lib/seo";

const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--schrift-display",
  display: "swap",
});

const text = Instrument_Sans({
  subsets: ["latin"],
  variable: "--schrift-text",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--schrift-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const einstellungen = await holeGrundeinstellungen();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${einstellungen.name} — ${einstellungen.claim}`,
      template: `%s — ${einstellungen.name}`,
    },
    description: einstellungen.seo.beschreibung ?? undefined,
    openGraph: {
      type: "website",
      locale: "de_DE",
      siteName: einstellungen.name,
      title: `${einstellungen.name} — ${einstellungen.claim}`,
      description: einstellungen.seo.beschreibung ?? undefined,
      url: siteUrl,
    },
    alternates: { canonical: "/" },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#16332b",
  colorScheme: "dark",
};

/**
 * Läuft vor dem ersten Anstrich: Wer die Startsequenz in dieser Sitzung schon
 * gesehen hat, bekommt sie nicht noch einmal. Ohne dieses Skript würde die
 * Sequenz kurz aufblitzen, bevor React sie entfernen könnte.
 */
const introSkript = `document.documentElement.dataset.js="1";try{if(sessionStorage.getItem("dd-intro")){document.documentElement.dataset.intro="aus"}else{sessionStorage.setItem("dd-intro","1")}}catch(e){}`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const einstellungen = await holeGrundeinstellungen();

  return (
    <html
      lang="de"
      data-scroll-behavior="smooth"
      // Das Skript im Kopf setzt data-js und data-intro, bevor React übernimmt.
      suppressHydrationWarning
      className={`${display.variable} ${text.variable} ${mono.variable}`}
    >
      <body className="matte">
        {/* Muss synchron laufen, bevor der erste Pixel steht — deshalb ein
            rohes Skript ganz oben im Body und nicht `next/script`, das
            Inline-Code erst nach dem ersten Anstrich ausführt. */}
        <script dangerouslySetInnerHTML={{ __html: introSkript }} />

        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="" />

        {/* Strukturierte Daten. `<` wird maskiert, damit sich über einen
            Inhalt aus dem Studio kein Skript einschleusen lässt. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              organisationsDaten(stegaClean(einstellungen), siteUrl),
            ).replace(/</g, "\\u003c"),
          }}
        />
        <Intro name={einstellungen.name} claim={einstellungen.claim} />
        <Schraffuren />

        <a href="#inhalt" className="sprungmarke">
          Zum Inhalt springen
        </a>

        <Massband />
        <Kopfleiste einstellungen={einstellungen} />

        <main id="inhalt">{children}</main>

        <Fussbereich einstellungen={einstellungen} />

        <SanityLive />
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
