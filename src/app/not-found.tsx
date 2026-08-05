import Link from "next/link";

import { Etikett } from "@/components/abschnitt";

export default function NichtGefunden() {
  return (
    <section className="pt-[calc(var(--leiste)+1.75rem)]">
      <div className="bahn">
        <div className="blatt p-6 sm:p-10 lg:p-16">
          <Etikett>Fehler 404</Etikett>
          <h1 className="schrift-display titel-l mt-6 max-w-[16ch]">
            Diese Seite steht nicht im Plan.
          </h1>
          <p className="fliesstext mt-6 text-ink-2">
            Die Adresse gibt es nicht — oder nicht mehr. Von hier kommen Sie
            überall hin:
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/" className="knopf knopf-signal">
              Zur Startseite
              <span className="pfeil" aria-hidden="true">
                →
              </span>
            </Link>
            <Link href="/kontakt" className="knopf knopf-umriss">
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
