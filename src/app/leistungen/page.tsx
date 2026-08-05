import type { Metadata } from "next";
import { stegaClean } from "next-sanity";

import { Auftritte } from "@/components/auftritte";
import { Seitenkopf } from "@/components/seitenkopf";
import { Ablauf } from "@/components/sektionen/ablauf";
import { Fragen } from "@/components/sektionen/fragen";
import { Leistungsverzeichnis } from "@/components/sektionen/leistungsverzeichnis";
import { Medien } from "@/components/sektionen/medien";
import { Schlussruf } from "@/components/sektionen/schlussruf";
import {
  holeArbeitsschritte,
  holeFragen,
  holeLeistungen,
  holeLeistungsseite,
  holeStartseite,
} from "@/lib/inhalt";
import { fragenDaten, metadatenAus } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seite = await holeLeistungsseite({ stega: false });
  return metadatenAus(seite.seo, "/leistungen");
}

export default async function LeistungenSeite() {
  const [seite, leistungen, schritte, fragen, startseite] = await Promise.all([
    holeLeistungsseite(),
    holeLeistungen(),
    holeArbeitsschritte(),
    holeFragen(),
    holeStartseite(),
  ]);

  const webLeistungen = leistungen.filter((l) => l.bereich !== "medien");
  const medienLeistungen = leistungen.filter((l) => l.bereich === "medien");

  return (
    <>
      <Auftritte />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(fragenDaten(stegaClean(fragen))),
        }}
      />

      <Seitenkopf
        kopf={seite.kopf}
        name="Leistungen"
        beiwerk={
          seite.preishinweis ? (
            <div className="border-t border-ink/15 pt-6 lg:max-w-xs lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <p className="schrift-etikett etikett">Preise</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                {seite.preishinweis}
              </p>
            </div>
          ) : null
        }
      />

      <Leistungsverzeichnis
        kopf={{ kennzeichnung: "Umfang", titel: "Im Einzelnen", text: null }}
        leistungen={webLeistungen}
        ausfuehrlich
      />

      {startseite.medienAnzeigen ? (
        <Medien kopf={startseite.medienKopf} leistungen={medienLeistungen} />
      ) : null}

      <Ablauf kopf={seite.ablaufKopf} schritte={schritte} />

      <Fragen kopf={seite.fragenKopf} fragen={fragen} />

      <Schlussruf
        kopf={startseite.schlussKopf}
        aktion={startseite.schlussAktion}
      />
    </>
  );
}
