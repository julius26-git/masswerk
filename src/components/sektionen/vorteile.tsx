import { Abschnitt, Kopf } from "@/components/abschnitt";
import type { Merkmal, SektionsKopf } from "@/lib/typen";

const INK = "#121714";
const SIGNAL = "#ff5a1f";

/** Drei Sinnbilder in derselben Strichstärke wie der Bauplan im Aufmacher. */
const sinnbilder = [
  // Tempo: Zeigerinstrument
  <g key="tempo" fill="none" stroke={INK} strokeWidth="1.4">
    <path d="M6 34 A18 18 0 0 1 42 34" />
    <path d="M9 26 L11.5 27.5 M24 20 L24 23 M39 26 L36.5 27.5" strokeWidth="1" />
    <path d="M24 34 L35 23" stroke={SIGNAL} strokeWidth="2" strokeLinecap="round" />
    <circle cx="24" cy="34" r="2.4" fill={SIGNAL} stroke="none" />
    <path d="M6 39 H42" strokeWidth="1" opacity="0.4" />
  </g>,

  // Erreichbarkeit: ein Netz statt eines einzelnen Servers
  <g key="netz" fill="none" stroke={INK} strokeWidth="1.4">
    <circle cx="24" cy="24" r="15" />
    <path d="M24 9 C16 16 16 32 24 39 M24 9 C32 16 32 32 24 39" strokeWidth="1" />
    <path d="M9 24 H39" strokeWidth="1" />
    <circle cx="24" cy="9" r="2.6" fill={SIGNAL} stroke="none" />
    <circle cx="9" cy="24" r="2.6" fill={SIGNAL} stroke="none" />
    <circle cx="39" cy="24" r="2.6" fill={SIGNAL} stroke="none" />
    <circle cx="24" cy="39" r="2.6" fill={SIGNAL} stroke="none" />
  </g>,

  // Bewerbung: Handy mit Haken
  <g key="bewerbung" fill="none" stroke={INK} strokeWidth="1.4">
    <rect x="14" y="6" width="20" height="36" rx="3" />
    <path d="M21 10 H27" strokeWidth="1.2" />
    <path d="M18 22 H30 M18 28 H27" strokeWidth="1" opacity="0.5" />
    <path
      d="M18 34 L22 38 L31 29"
      stroke={SIGNAL}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </g>,
];

export function Vorteile({
  kopf,
  punkte,
}: {
  kopf: SektionsKopf;
  punkte: Merkmal[];
}) {
  if (punkte.length === 0) return null;

  return (
    <Abschnitt name="Lösung" id="loesung">
      <div className="bahn">
        <Kopf kopf={kopf} />

        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {punkte.map((punkt, index) => (
            <article
              key={punkt._key}
              className="blatt flex flex-col p-6 lg:p-8"
              data-auftritt="warten"
              style={{ "--verzug": `${index * 70}ms` } as React.CSSProperties}
            >
              <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
                {sinnbilder[index % sinnbilder.length]}
              </svg>
              <h3 className="schrift-display titel-s mt-7">{punkt.titel}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                {punkt.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </Abschnitt>
  );
}
