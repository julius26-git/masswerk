import type { Metadata } from "next";

import { Auftritte } from "@/components/auftritte";
import { Seitenkopf } from "@/components/seitenkopf";
import { Referenzen } from "@/components/sektionen/referenzen";
import { Schlussruf } from "@/components/sektionen/schlussruf";
import {
  holeGrundeinstellungen,
  holeReferenzen,
  holeReferenzseite,
  holeStartseite,
} from "@/lib/inhalt";
import { metadatenAus } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seite = await holeReferenzseite({ stega: false });
  return metadatenAus(seite.seo, "/referenzen");
}

export default async function ReferenzenSeite() {
  const [seite, referenzen, einstellungen, startseite] = await Promise.all([
    holeReferenzseite(),
    holeReferenzen(),
    holeGrundeinstellungen(),
    holeStartseite(),
  ]);

  return (
    <>
      <Auftritte />

      <Seitenkopf kopf={seite.kopf} name="Referenzen" />

      <Referenzen
        referenzen={referenzen}
        hinweis={seite.platzhalterHinweis}
      />

      <Schlussruf
        kopf={startseite.schlussKopf}
        aktion={startseite.schlussAktion}
        einstellungen={einstellungen}
      />
    </>
  );
}
