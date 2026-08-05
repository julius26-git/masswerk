import Link from "next/link";

import { Abschnitt, Kopf } from "@/components/abschnitt";
import type { Leistung, SektionsKopf } from "@/lib/typen";

/**
 * Die Leistungen als Leistungsverzeichnis — die Form, in der Handwerker
 * ohnehin kalkulieren. Die Positionsnummern sind hier keine Deko: die
 * Liste ist eine Aufstellung, und Aufstellungen haben Positionen.
 */
export function Leistungsverzeichnis({
  kopf,
  leistungen,
  ausfuehrlich = false,
  weiterlesen,
}: {
  kopf: SektionsKopf;
  leistungen: Leistung[];
  ausfuehrlich?: boolean;
  weiterlesen?: { beschriftung: string; ziel: string };
}) {
  if (leistungen.length === 0) return null;

  return (
    <Abschnitt name="Leistungen" id="leistungen">
      <div className="bahn">
        <Kopf kopf={kopf} />

        <div className="blatt mt-12 overflow-hidden" data-auftritt="warten">
          {leistungen.map((leistung, index) => (
            <article
              key={leistung._id}
              className="grid gap-x-8 gap-y-3 border-t border-ink/15 p-6 first:border-t-0 lg:grid-cols-12 lg:p-8"
            >
              <p className="schrift-etikett etikett lg:col-span-2">
                Pos. {String(index + 1).padStart(2, "0")}
              </p>

              <div className="lg:col-span-5">
                <h3 className="schrift-display titel-s">{leistung.titel}</h3>
                <p className="mt-2.5 text-[0.9375rem] text-ink-2">
                  {leistung.versprechen}
                </p>
              </div>

              <div className="lg:col-span-5">
                <p className="text-[0.9375rem] leading-relaxed text-ink-2">
                  {leistung.teaser}
                </p>

                {ausfuehrlich && leistung.umfang.length > 0 ? (
                  <ul className="mt-5 space-y-2 border-t border-ink/15 pt-5">
                    {leistung.umfang.map((posten) => (
                      <li key={posten} className="relative pl-6 text-[0.9375rem]">
                        <span
                          aria-hidden="true"
                          className="absolute top-[0.62em] left-0 inline-block h-1.5 w-1.5 bg-signal"
                        />
                        {posten}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        {weiterlesen ? (
          <div className="mt-8" data-auftritt="warten">
            <Link href={weiterlesen.ziel} className="knopf knopf-papier">
              {weiterlesen.beschriftung}
              <span className="pfeil" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        ) : null}
      </div>
    </Abschnitt>
  );
}
