import type { Metadata } from "next";

import { Abschnitt, Kopf } from "@/components/abschnitt";
import { Auftritte } from "@/components/auftritte";
import { Bildplatz } from "@/components/bildplatz";
import { Reichtext } from "@/components/reichtext";
import { Seitenkopf } from "@/components/seitenkopf";
import { Schlussruf } from "@/components/sektionen/schlussruf";
import {
  holeGrundeinstellungen,
  holeStartseite,
  holeUeberSeite,
} from "@/lib/inhalt";
import { metadatenAus } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seite = await holeUeberSeite({ stega: false });
  return metadatenAus(seite.seo, "/ueber-mich");
}

export default async function UeberMichSeite() {
  const [seite, einstellungen, startseite] = await Promise.all([
    holeUeberSeite(),
    holeGrundeinstellungen(),
    holeStartseite(),
  ]);

  return (
    <>
      <Auftritte />

      <Seitenkopf
        kopf={seite.kopf}
        name="Über mich"
        beiwerk={
          <figure className="lg:w-64">
            <div className="blatt-flach overflow-hidden">
              <Bildplatz
                bild={seite.portrait}
                hinweis="Portrait folgt"
                beschreibung={`${einstellungen.inhaber}, Inhaber von ${einstellungen.name}`}
                breite={640}
                hoehe={800}
                sizes="(min-width: 1024px) 16rem, 100vw"
              />
            </div>
            <figcaption className="schrift-etikett mt-3 text-ink-3">
              {einstellungen.inhaber}
            </figcaption>
          </figure>
        }
      />

      <Abschnitt name="Haltung" id="haltung">
        <div className="bahn">
          <div className="blatt p-6 sm:p-10 lg:p-14" data-auftritt="warten">
            <div className="text-[1.0625rem] text-ink-2 sm:text-[1.125rem]">
              <Reichtext inhalt={seite.text} />
            </div>
          </div>
        </div>
      </Abschnitt>

      <Abschnitt name="Arbeitsweise" id="arbeitsweise">
        <div className="bahn">
          <Kopf
            kopf={{
              kennzeichnung: "Arbeitsweise",
              titel: "Vier Zusagen, an denen Sie mich messen können",
              text: null,
            }}
          />

          <ul className="mt-12 grid gap-x-10 border-t border-[var(--trennlinie)] md:grid-cols-2">
            {seite.grundsaetze.map((grundsatz, index) => (
              <li
                key={grundsatz._key}
                className="border-b border-[var(--trennlinie)] py-7"
                data-auftritt="warten"
                style={{ "--verzug": `${index * 60}ms` } as React.CSSProperties}
              >
                <h3 className="schrift-display titel-s">{grundsatz.titel}</h3>
                <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed opacity-75">
                  {grundsatz.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Abschnitt>

      <Schlussruf
        kopf={startseite.schlussKopf}
        aktion={startseite.schlussAktion}
        einstellungen={einstellungen}
      />
    </>
  );
}
