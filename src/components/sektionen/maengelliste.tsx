import { Abschnitt, Kopf } from "@/components/abschnitt";
import type { SektionsKopf } from "@/lib/typen";

/** Das Kästchen aus einem Abnahmeprotokoll — hier durchgestrichen: nicht erfüllt. */
function Mangelzeichen() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="mt-[0.3em] h-4 w-4 shrink-0"
      fill="none"
    >
      <rect
        x="0.75"
        y="0.75"
        width="14.5"
        height="14.5"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.5"
      />
      <path
        d="M4 4 L12 12 M12 4 L4 12"
        stroke="#ff7a45"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Maengelliste({
  kopf,
  punkte,
}: {
  kopf: SektionsKopf;
  punkte: string[];
}) {
  if (punkte.length === 0) return null;

  return (
    <Abschnitt name="Ausgangslage" id="ausgangslage">
      <div className="bahn">
        <Kopf kopf={kopf} />

        <ul className="mt-12 grid gap-x-10 border-t border-[var(--trennlinie)] sm:grid-cols-2">
          {punkte.map((punkt, index) => (
            <li
              key={punkt}
              className="flex gap-4 border-b border-[var(--trennlinie)] py-5"
              data-auftritt="warten"
              style={{ "--verzug": `${index * 45}ms` } as React.CSSProperties}
            >
              <Mangelzeichen />
              <span className="text-[1.0625rem] opacity-85">{punkt}</span>
            </li>
          ))}
        </ul>
      </div>
    </Abschnitt>
  );
}
