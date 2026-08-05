import Link from "next/link";
import { stegaClean } from "next-sanity";

import { Bauplan } from "@/components/bauplan";
import { Etikett } from "@/components/abschnitt";
import { Laufband } from "@/components/laufband";
import type { Grundeinstellungen, Startseite } from "@/lib/typen";

/** Hebt den markierten Teil der Überschrift mit einem Textmarker-Strich hervor. */
function Ueberschrift({ satz, marke }: { satz: string; marke: string }) {
  const reiner = stegaClean(satz) ?? satz;
  const reineMarke = stegaClean(marke) ?? marke;
  const stelle = reineMarke ? reiner.indexOf(reineMarke) : -1;

  if (stelle < 0) {
    return <h1 className="schrift-display titel-xl mt-6">{reiner}</h1>;
  }

  return (
    <h1 className="schrift-display titel-xl mt-6">
      {reiner.slice(0, stelle)}
      <span className="markierung">{reineMarke}</span>
      {reiner.slice(stelle + reineMarke.length)}
    </h1>
  );
}

export function Aufmacher({
  seite,
  einstellungen,
}: {
  seite: Startseite;
  einstellungen: Grundeinstellungen;
}) {
  return (
    <section data-abschnitt="Start" className="pt-[calc(var(--leiste)+1.75rem)]">
      <div className="bahn">
        <div className="grid gap-3 lg:grid-cols-12">
          <div className="blatt flex flex-col p-6 sm:p-8 lg:col-span-7 lg:p-10">
            <Etikett>{seite.kennzeichnung}</Etikett>

            <Ueberschrift satz={seite.ueberschrift} marke={seite.hervorhebung} />

            <p className="fliesstext mt-7 text-[1.0625rem] text-ink-2 sm:text-[1.125rem]">
              {seite.einleitung}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={seite.hauptaktion.ziel} className="knopf knopf-signal">
                {seite.hauptaktion.beschriftung}
                <span className="pfeil" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link
                href={seite.nebenaktion.ziel}
                className="knopf knopf-umriss"
              >
                {seite.nebenaktion.beschriftung}
              </Link>
            </div>

            <p className="schrift-etikett etikett-leise mt-5 flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-full bg-signal"
                style={{ animation: "blinken 2.4s ease-in-out infinite" }}
              />
              {einstellungen.verfuegbarkeit}
            </p>

            <dl className="mt-auto grid grid-cols-1 gap-px border-t border-[var(--trennlinie)] pt-8 sm:grid-cols-3">
              {seite.kennzahlen.map((kennzahl) => (
                <div
                  key={kennzahl._key}
                  className="flex flex-col pt-5 sm:pt-0 sm:pr-5"
                >
                  {/* Begriff vor Beschreibung im Markup, Wert oben in der
                      Darstellung — dafür sorgt die Reihenfolge im Raster. */}
                  <dt className="schrift-etikett order-2 mt-2">{kennzahl.label}</dt>
                  <dd className="schrift-wert order-1 text-[clamp(2rem,3.4vw,2.75rem)]">
                    {kennzahl.wert}
                  </dd>
                  {kennzahl.erlaeuterung ? (
                    <p className="order-3 mt-1.5 text-[0.875rem] leading-snug text-ink-3">
                      {kennzahl.erlaeuterung}
                    </p>
                  ) : null}
                </div>
              ))}
            </dl>
          </div>

          <div className="blatt papier-raster flex items-center justify-center overflow-hidden p-4 sm:p-6 lg:col-span-5">
            <Bauplan />
          </div>
        </div>
      </div>

      <Laufband posten={einstellungen.laufband} />
    </section>
  );
}
