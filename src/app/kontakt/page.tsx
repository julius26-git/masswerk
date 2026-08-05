import type { Metadata } from "next";

import { Abschnitt, Etikett } from "@/components/abschnitt";
import { Auftritte } from "@/components/auftritte";
import { Kontaktformular } from "@/components/kontaktformular";
import { holeGrundeinstellungen, holeKontaktseite } from "@/lib/inhalt";
import { metadatenAus } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seite = await holeKontaktseite({ stega: false });
  return metadatenAus(seite.seo, "/kontakt");
}

export default async function KontaktSeite() {
  const [seite, einstellungen] = await Promise.all([
    holeKontaktseite(),
    holeGrundeinstellungen(),
  ]);

  return (
    <>
      <Auftritte />

      <section data-abschnitt="Kontakt" className="pt-[calc(var(--leiste)+1.75rem)]">
        <div className="bahn">
          <div className="grid gap-3 lg:grid-cols-12">
            <div className="blatt flex flex-col p-6 sm:p-8 lg:col-span-5 lg:p-10">
              {seite.kopf.kennzeichnung ? (
                <Etikett>{seite.kopf.kennzeichnung}</Etikett>
              ) : null}
              <h1 className="schrift-display titel-l mt-6">{seite.kopf.titel}</h1>
              {seite.kopf.text ? (
                <p className="fliesstext mt-5 text-ink-2">{seite.kopf.text}</p>
              ) : null}

              <div className="mt-8 border-t border-ink/15 pt-7">
                <p className="schrift-etikett etikett-leise">Direkt anrufen</p>
                <a
                  href={`tel:${einstellungen.telefon.replace(/\s/g, "")}`}
                  className="schrift-display titel-m textlink mt-2 inline-block"
                >
                  {einstellungen.telefon}
                </a>
                <p className="mt-2 text-[0.9375rem] text-ink-3">
                  {einstellungen.erreichbarkeit}
                </p>
              </div>

              <div className="mt-7 border-t border-ink/15 pt-7">
                <p className="schrift-etikett etikett-leise">Schreiben</p>
                <a
                  href={`mailto:${einstellungen.email}`}
                  className="textlink mt-2 inline-block text-[1.0625rem]"
                >
                  {einstellungen.email}
                </a>
              </div>

              <ol className="mt-auto space-y-4 pt-10">
                {seite.ablauf.map((schritt, index) => (
                  <li key={schritt} className="flex gap-4 text-[0.9375rem] text-ink-2">
                    <span className="schrift-etikett etikett mt-[0.2em]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{schritt}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="lg:col-span-7">
              <Kontaktformular einleitung={seite.formularHinweis} />
            </div>
          </div>
        </div>
      </section>

      <Abschnitt name="Datenschutz" id="datenschutz-hinweis">
        <div className="bahn" data-auftritt="warten">
          <h2 className="schrift-etikett etikett">Was mit Ihren Daten passiert</h2>
          <p className="fliesstext mt-4 text-[0.9375rem] opacity-70">
            Ihre Angaben gehen ausschließlich an mich und dienen nur der Beantwortung
            Ihrer Anfrage. Es gibt kein Tracking, keine Weitergabe an Dritte und keine
            Newsletter-Anmeldung durch die Hintertür.
          </p>
        </div>
      </Abschnitt>
    </>
  );
}
