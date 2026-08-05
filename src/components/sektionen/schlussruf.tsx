import Link from "next/link";

import { Abschnitt, Etikett } from "@/components/abschnitt";
import type { Aktion, SektionsKopf } from "@/lib/typen";

export function Schlussruf({
  kopf,
  aktion,
}: {
  kopf: SektionsKopf;
  aktion: Aktion;
}) {
  return (
    <Abschnitt name="Nächster Schritt" id="naechster-schritt">
      <div className="bahn">
        <div
          className="auf-signal grid gap-x-10 gap-y-9 rounded-[3px] border-[1.5px] border-ink p-7 sm:p-10 lg:grid-cols-12 lg:p-14"
          data-auftritt="warten"
        >
          <div className="lg:col-span-7">
            {kopf.kennzeichnung ? <Etikett>{kopf.kennzeichnung}</Etikett> : null}
            <h2 className="schrift-display titel-l mt-6 max-w-[16ch]">{kopf.titel}</h2>
            {kopf.text ? (
              <p className="fliesstext mt-6 text-[1.0625rem]">{kopf.text}</p>
            ) : null}
          </div>

          {/* Telefonnummer und Zeiten stehen im Fußbereich derselben Seite.
              Sie hier zu wiederholen, machte sie dreimal je Seite. */}
          <div className="flex items-end lg:col-span-5">
            <Link href={aktion.ziel} className="knopf knopf-tinte w-full sm:w-auto">
              {aktion.beschriftung}
              <span className="pfeil" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Abschnitt>
  );
}
