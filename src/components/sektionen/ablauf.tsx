import { Abschnitt, Kopf } from "@/components/abschnitt";
import type { Arbeitsschritt, SektionsKopf } from "@/lib/typen";

/**
 * Der Ablauf als Maßkette: vier Abschnitte auf einer Linie, jeder mit
 * seinem Maß — der Dauer. Nummeriert, weil hier die Reihenfolge zählt.
 */
export function Ablauf({
  kopf,
  schritte,
}: {
  kopf: SektionsKopf;
  schritte: Arbeitsschritt[];
}) {
  if (schritte.length === 0) return null;

  return (
    <Abschnitt name="Ablauf" id="ablauf">
      <div className="bahn">
        <Kopf kopf={kopf} />

        <ol className="mt-14 grid gap-x-3 gap-y-10 lg:grid-cols-4">
          {schritte.map((schritt, index) => (
            <li
              key={schritt._id}
              className="relative border-t border-[var(--trennlinie)] pt-7"
              data-auftritt="warten"
              style={{ "--verzug": `${index * 70}ms` } as React.CSSProperties}
            >
              <span
                aria-hidden="true"
                className="absolute -top-[9px] left-0 block h-[18px] w-[1.5px] rotate-45 bg-signal"
              />

              <div className="flex items-baseline gap-3">
                <span className="schrift-etikett etikett-leise">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="schrift-etikett etikett">{schritt.dauer}</span>
              </div>

              <h3 className="schrift-display titel-s mt-4">{schritt.titel}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed opacity-75">
                {schritt.text}
              </p>

              {schritt.aufwandKunde ? (
                <p className="schrift-etikett mt-5 inline-block border border-[var(--trennlinie)] px-2.5 py-1.5 opacity-70">
                  Ihr Aufwand: {schritt.aufwandKunde}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </Abschnitt>
  );
}
