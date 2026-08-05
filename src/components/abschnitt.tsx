import type { ReactNode } from "react";

import type { SektionsKopf } from "@/lib/typen";

/**
 * Ein Abschnitt der Seite. `name` meldet ihn beim Maßband am linken Rand an.
 */
export function Abschnitt({
  id,
  name,
  children,
  className = "",
}: {
  id?: string;
  name: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      data-abschnitt={name}
      className={`mt-20 scroll-mt-28 lg:mt-32 ${className}`}
    >
      {children}
    </section>
  );
}

export function Etikett({
  children,
  ton = "signal",
}: {
  children: ReactNode;
  ton?: "signal" | "leise";
}) {
  return (
    <p
      className={`schrift-etikett flex items-start gap-2 ${
        ton === "signal" ? "etikett" : "etikett-leise"
      }`}
    >
      <span
        aria-hidden="true"
        className="mt-[0.35em] inline-block h-1.5 w-1.5 shrink-0 bg-current"
      />
      {children}
    </p>
  );
}

/**
 * Abschnittskopf im Zeichnungslayout: links das Etikett, rechts die
 * Überschrift mit Einleitung.
 */
export function Kopf({
  kopf,
  ton = "signal",
  className = "",
}: {
  kopf: SektionsKopf;
  ton?: "signal" | "leise";
  className?: string;
}) {
  return (
    <div
      className={`grid gap-x-8 gap-y-4 lg:grid-cols-12 ${className}`}
      data-auftritt="warten"
    >
      <div className="lg:col-span-3">
        {kopf.kennzeichnung ? <Etikett ton={ton}>{kopf.kennzeichnung}</Etikett> : null}
      </div>
      <div className="lg:col-span-9">
        <h2 className="schrift-display titel-l max-w-[18ch]">{kopf.titel}</h2>
        {kopf.text ? (
          <p className="fliesstext mt-5 text-[1.0625rem] opacity-75">{kopf.text}</p>
        ) : null}
      </div>
    </div>
  );
}
