import Link from "next/link";

import { navigation, rechtliches } from "@/lib/navigation";
import type { Grundeinstellungen } from "@/lib/typen";

export function Fussbereich({
  einstellungen,
}: {
  einstellungen: Grundeinstellungen;
}) {
  return (
    <footer className="mt-24 border-t border-paper/15 pt-14 lg:mt-32">
      <div className="bahn">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="schrift-etikett etikett">Kontakt</p>
            <a
              href={`tel:${einstellungen.telefon.replace(/\s/g, "")}`}
              className="schrift-display titel-m textlink mt-3 inline-block"
            >
              {einstellungen.telefon}
            </a>
            <p className="mt-2">
              <a href={`mailto:${einstellungen.email}`} className="textlink">
                {einstellungen.email}
              </a>
            </p>
            <p className="mt-4 max-w-sm text-[0.9375rem] text-paper/60">
              {einstellungen.erreichbarkeit}. {einstellungen.antwortzeit}
            </p>
          </div>

          <nav aria-label="Seiten">
            <p className="schrift-etikett text-paper/60">Seiten</p>
            <ul className="mt-3 space-y-2">
              {navigation.map((posten) => (
                <li key={posten.ziel}>
                  <Link href={posten.ziel} className="textlink">
                    {posten.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Rechtliches">
            <p className="schrift-etikett text-paper/60">Rechtliches</p>
            <ul className="mt-3 space-y-2">
              {rechtliches.map((posten) => (
                <li key={posten.ziel}>
                  <Link href={posten.ziel} className="textlink">
                    {posten.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.9375rem] text-paper/60">
              Keine Cookies, kein Tracking, keine fremden Schriften.
            </p>
          </nav>
        </div>

        <div className="mt-14 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-paper/15 pt-5">
          <p className="schrift-etikett text-paper/60">
            © {new Date().getFullYear()} {einstellungen.name} · {einstellungen.inhaber}
          </p>
          <p className="schrift-etikett text-paper/60">
            Gebaut mit Next.js und Sanity
          </p>
        </div>
      </div>

      {/* Der Name als Schriftzug am unteren Rand. Über textLength läuft er
          auf jeder Breite exakt bis zum Rand — ohne Umbruch, ohne Anschnitt. */}
      <div className="mt-10 px-[clamp(1rem,4vw,2.5rem)]" aria-hidden="true">
        <svg viewBox="0 0 1000 150" className="block w-full">
          <text
            x="0"
            y="122"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            fontSize="150"
            className="schrift-marke"
            fill="currentColor"
            opacity="0.1"
          >
            {einstellungen.name}
          </text>
        </svg>
      </div>
    </footer>
  );
}
