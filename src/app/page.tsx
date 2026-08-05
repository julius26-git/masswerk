import type { Metadata } from "next";

import { Auftritte } from "@/components/auftritte";
import { Ablauf } from "@/components/sektionen/ablauf";
import { Aufmacher } from "@/components/sektionen/aufmacher";
import { Branchen } from "@/components/sektionen/branchen";
import { Leistungsverzeichnis } from "@/components/sektionen/leistungsverzeichnis";
import { Maengelliste } from "@/components/sektionen/maengelliste";
import { Medien } from "@/components/sektionen/medien";
import { Referenzen } from "@/components/sektionen/referenzen";
import { Schlussruf } from "@/components/sektionen/schlussruf";
import { Vorteile } from "@/components/sektionen/vorteile";
import {
  holeArbeitsschritte,
  holeBranchen,
  holeGrundeinstellungen,
  holeLeistungen,
  holeReferenzen,
  holeReferenzseite,
  holeStartseite,
} from "@/lib/inhalt";
import { metadatenAus } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seite = await holeStartseite({ stega: false });
  return metadatenAus(seite.seo, "/");
}

export default async function Startseite() {
  const [
    seite,
    einstellungen,
    branchen,
    leistungen,
    schritte,
    referenzen,
    referenzseite,
  ] = await Promise.all([
    holeStartseite(),
    holeGrundeinstellungen(),
    holeBranchen(),
    holeLeistungen(),
    holeArbeitsschritte(),
    holeReferenzen(),
    holeReferenzseite(),
  ]);

  const webLeistungen = leistungen.filter((l) => l.bereich !== "medien");
  const medienLeistungen = leistungen.filter((l) => l.bereich === "medien");

  return (
    <>
      <Auftritte />

      <Aufmacher seite={seite} einstellungen={einstellungen} />

      <Maengelliste kopf={seite.ausgangslage} punkte={seite.maengel} />

      <Vorteile kopf={seite.loesung} punkte={seite.vorteile} />

      <Branchen kopf={seite.branchenKopf} branchen={branchen} />

      <Leistungsverzeichnis
        kopf={seite.leistungenKopf}
        leistungen={webLeistungen}
        weiterlesen={{ beschriftung: "Alle Leistungen im Detail", ziel: "/leistungen" }}
      />

      <Ablauf kopf={seite.ablaufKopf} schritte={schritte} />

      {seite.medienAnzeigen ? (
        <Medien kopf={seite.medienKopf} leistungen={medienLeistungen} />
      ) : null}

      <Referenzen
        kopf={seite.referenzenKopf}
        referenzen={referenzen.slice(0, 2)}
        hinweis={referenzseite.platzhalterHinweis}
        weiterlesen={{ beschriftung: "Alle Referenzen", ziel: "/referenzen" }}
      />

      <Schlussruf
        kopf={seite.schlussKopf}
        aktion={seite.schlussAktion}
        einstellungen={einstellungen}
      />
    </>
  );
}
