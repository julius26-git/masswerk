"use client";

import { useState } from "react";

/**
 * Das Laufband unter dem Aufmacher. Die Aussagen laufen zweimal hintereinander,
 * damit der Umlauf nahtlos ist. Es hält an, wenn man darauf zeigt oder mit der
 * Tastatur hineinspringt — und über den Schalter dauerhaft, auch am Handy.
 */
export function Laufband({ posten }: { posten: string[] }) {
  const [laeuft, setLaeuft] = useState(true);

  if (posten.length === 0) return null;

  return (
    <div className="laufband mt-4" data-lauf={laeuft ? "an" : "aus"}>
      <div className="laufband-spur">
        {[0, 1].map((durchlauf) => (
          <div
            key={durchlauf}
            className="laufband-posten"
            aria-hidden={durchlauf === 1 ? "true" : undefined}
          >
            {posten.map((eintrag) => (
              <span key={eintrag} className="flex items-center gap-6">
                <span className="schrift-etikett">{eintrag}</span>
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rotate-45 bg-ink/45"
                />
              </span>
            ))}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="laufband-schalter"
        onClick={() => setLaeuft((wert) => !wert)}
        aria-pressed={!laeuft}
      >
        <span className="sr-only">
          {laeuft ? "Laufband anhalten" : "Laufband weiterlaufen lassen"}
        </span>
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
          {laeuft ? (
            <path d="M4 2h3v12H4zM9 2h3v12H9z" fill="currentColor" />
          ) : (
            <path d="M4 2l10 6-10 6z" fill="currentColor" />
          )}
        </svg>
      </button>
    </div>
  );
}
