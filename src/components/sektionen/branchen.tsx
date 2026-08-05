import { Abschnitt, Kopf } from "@/components/abschnitt";
import { schraffurId } from "@/components/schraffuren";
import type { Branche, SektionsKopf } from "@/lib/typen";

export function Branchen({
  kopf,
  branchen,
}: {
  kopf: SektionsKopf;
  branchen: Branche[];
}) {
  if (branchen.length === 0) return null;

  return (
    <Abschnitt name="Branchen" id="branchen">
      <div className="bahn">
        <Kopf kopf={kopf} />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {branchen.map((branche, index) => (
            <article
              key={branche._id}
              className="blatt flex flex-col overflow-hidden"
              data-auftritt="warten"
              style={{ "--verzug": `${index * 60}ms` } as React.CSSProperties}
            >
              {/* Jede Branche bekommt die Schraffur, die in einer Bauzeichnung
                  für ihr Material stünde. */}
              <div className="border-b border-ink bg-paper-2">
                <svg className="block h-24 w-full" aria-hidden="true">
                  <rect
                    width="100%"
                    height="100%"
                    fill={schraffurId[branche.material]}
                    opacity="0.55"
                  />
                </svg>
              </div>

              <div className="flex flex-1 flex-col p-5 lg:p-6">
                <h3 className="schrift-display titel-s">{branche.titel}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                  {branche.beduerfnis}
                </p>

                <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
                  {branche.beispiele.map((beispiel) => (
                    <li
                      key={beispiel}
                      className="schrift-etikett border border-ink/20 px-2 py-1 text-ink-3"
                    >
                      {beispiel}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Abschnitt>
  );
}
