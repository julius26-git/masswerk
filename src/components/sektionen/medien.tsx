import { Abschnitt, Kopf } from "@/components/abschnitt";
import type { Leistung, SektionsKopf } from "@/lib/typen";

/**
 * Der Bereich Bild & Film. Er erscheint erst, wenn er in den Grundeinstellungen
 * der Startseite eingeschaltet wird — bis dahin bleibt das Angebot vorbereitet,
 * aber unsichtbar.
 */
export function Medien({
  kopf,
  leistungen,
}: {
  kopf: SektionsKopf;
  leistungen: Leistung[];
}) {
  if (leistungen.length === 0) return null;

  return (
    <Abschnitt name="Bild & Film" id="bild-film">
      <div className="bahn">
        <Kopf kopf={kopf} />

        <div className="mt-12 grid gap-3 lg:grid-cols-2">
          {leistungen.map((leistung, index) => (
            <article
              key={leistung._id}
              className="blatt p-6 lg:p-8"
              data-auftritt="warten"
              style={{ "--verzug": `${index * 70}ms` } as React.CSSProperties}
            >
              <h3 className="schrift-display titel-s">{leistung.titel}</h3>
              <p className="mt-2.5 text-[0.9375rem] text-ink-2">
                {leistung.versprechen}
              </p>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-2">
                {leistung.teaser}
              </p>

              {leistung.umfang.length > 0 ? (
                <ul className="mt-6 space-y-2 border-t border-ink/15 pt-5">
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
            </article>
          ))}
        </div>
      </div>
    </Abschnitt>
  );
}
