import { Abschnitt, Kopf } from "@/components/abschnitt";
import { Reichtext } from "@/components/reichtext";
import type { Frage, SektionsKopf } from "@/lib/typen";

/**
 * Häufige Fragen als natives Aufklappen — funktioniert mit Tastatur,
 * Screenreader und ohne JavaScript.
 */
export function Fragen({ kopf, fragen }: { kopf: SektionsKopf; fragen: Frage[] }) {
  if (fragen.length === 0) return null;

  return (
    <Abschnitt name="Häufige Fragen" id="fragen">
      <div className="bahn">
        <Kopf kopf={kopf} />

        <div className="blatt mt-12">
          {fragen.map((frage) => (
            <details key={frage._id} className="frage border-t border-ink/15 first:border-t-0">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 p-6 lg:p-8">
                <h3 className="schrift-display titel-s max-w-[46ch]">
                  {frage.frage}
                </h3>
                <span
                  aria-hidden="true"
                  className="frage-zeichen mt-1 shrink-0 text-signal"
                >
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                    <path
                      d="M8 1 V15 M1 8 H15"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-7 text-ink-2 lg:px-8 lg:pb-9">
                <Reichtext inhalt={frage.antwort} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </Abschnitt>
  );
}
