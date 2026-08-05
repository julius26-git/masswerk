import Link from "next/link";

import { Abschnitt, Etikett } from "@/components/abschnitt";
import type { Aktion, Grundeinstellungen, SektionsKopf } from "@/lib/typen";

export function Schlussruf({
  kopf,
  aktion,
  einstellungen,
}: {
  kopf: SektionsKopf;
  aktion: Aktion;
  einstellungen: Grundeinstellungen;
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

          <div className="flex flex-col justify-end gap-6 lg:col-span-5">
            <Link href={aktion.ziel} className="knopf knopf-tinte w-full sm:w-auto">
              {aktion.beschriftung}
              <span className="pfeil" aria-hidden="true">
                →
              </span>
            </Link>

            <div className="border-t border-[var(--trennlinie)] pt-6">
              <p className="schrift-etikett etikett-leise">Oder einfach anrufen</p>
              <a
                href={`tel:${einstellungen.telefon.replace(/\s/g, "")}`}
                className="schrift-display titel-m textlink mt-2 inline-block"
              >
                {einstellungen.telefon}
              </a>
              <p className="mt-2 text-[0.9375rem] etikett-leise">
                {einstellungen.erreichbarkeit}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Abschnitt>
  );
}
