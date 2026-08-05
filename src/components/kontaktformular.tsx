"use client";

import Link from "next/link";
import { useActionState, useEffect, useId, useRef } from "react";
import { useFormStatus } from "react-dom";

import { anfrageSenden, type Formularzustand } from "@/app/kontakt/aktionen";

const start: Formularzustand = { status: "leer" };

function Absendeknopf() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="knopf knopf-signal w-full sm:w-auto" disabled={pending}>
      {pending ? "Wird gesendet …" : "Anfrage senden"}
      <span className="pfeil" aria-hidden="true">
        →
      </span>
    </button>
  );
}

function Feld({
  name,
  beschriftung,
  hinweis,
  fehler,
  wert,
  mehrzeilig = false,
  typ = "text",
  pflicht = false,
  autoComplete,
  eingabeart,
  rechtschreibung = true,
}: {
  name: string;
  beschriftung: string;
  hinweis?: string;
  fehler?: string;
  wert?: string;
  mehrzeilig?: boolean;
  typ?: string;
  pflicht?: boolean;
  autoComplete?: string;
  eingabeart?: "tel" | "email" | "text";
  rechtschreibung?: boolean;
}) {
  const id = useId();
  const hinweisId = `${id}-hinweis`;
  const fehlerId = `${id}-fehler`;

  const gemeinsam = {
    id,
    name,
    defaultValue: wert,
    autoComplete,
    inputMode: eingabeart,
    spellCheck: rechtschreibung,
    "aria-invalid": fehler ? (true as const) : undefined,
    "aria-describedby":
      [hinweis ? hinweisId : null, fehler ? fehlerId : null].filter(Boolean).join(" ") ||
      undefined,
    className: `feld ${fehler ? "feld-fehler" : ""}`,
  };

  return (
    <div>
      <label htmlFor={id} className="schrift-etikett flex items-baseline gap-2 text-ink-2">
        {beschriftung}
        {!pflicht ? <span className="text-ink-3 normal-case">optional</span> : null}
      </label>

      {mehrzeilig ? (
        <textarea {...gemeinsam} rows={5} required={pflicht} />
      ) : (
        <input {...gemeinsam} type={typ} required={pflicht} />
      )}

      {hinweis ? (
        <p id={hinweisId} className="mt-2 text-[0.8125rem] text-ink-3">
          {hinweis}
        </p>
      ) : null}
      {fehler ? (
        <p id={fehlerId} className="mt-2 text-[0.8125rem] font-medium text-[var(--color-signal-dunkel)]">
          {fehler}
        </p>
      ) : null}
    </div>
  );
}

export function Kontaktformular({ einleitung }: { einleitung?: string | null }) {
  const [zustand, aktion] = useActionState(anfrageSenden, start);
  const meldung = useRef<HTMLParagraphElement>(null);
  const bestaetigung = useRef<HTMLHeadingElement>(null);

  // Nach einem fehlgeschlagenen Absenden springt der Fokus auf die Meldung,
  // damit auch Screenreader und Tastaturnutzer sofort erfahren, was fehlt.
  useEffect(() => {
    if (zustand.status === "fehler") meldung.current?.focus();
    // Nach dem Absenden verschwindet das Formular; ohne diesen Sprung
    // landete der Fokus im Nichts und die Bestätigung bliebe ungelesen.
    if (zustand.status === "gesendet") bestaetigung.current?.focus();
  }, [zustand]);

  if (zustand.status === "gesendet") {
    return (
      <div className="blatt p-6 sm:p-10" role="status">
        <p className="schrift-etikett etikett">Angekommen</p>
        <h2
          ref={bestaetigung}
          tabIndex={-1}
          className="schrift-display titel-m mt-5"
        >
          Danke, ich melde mich.
        </h2>
        <p className="fliesstext mt-4 text-ink-2">
          Ihre Anfrage liegt bei mir. Sie hören innerhalb von 24 Stunden von mir,
          werktags meist deutlich schneller.
        </p>
        <p className="mt-8">
          <Link href="/" className="knopf knopf-papier">
            Zurück zur Startseite
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form action={aktion} className="blatt p-6 sm:p-10" noValidate>
      {einleitung ? (
        <p className="fliesstext text-ink-2">{einleitung}</p>
      ) : null}

      {zustand.status === "fehler" && zustand.meldung ? (
        <p
          ref={meldung}
          role="alert"
          tabIndex={-1}
          className="mt-6 border-l-2 border-signal bg-paper-2 px-5 py-4 text-[0.9375rem]"
        >
          {zustand.meldung}
        </p>
      ) : null}

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Feld
          name="name"
          beschriftung="Name"
          pflicht
          autoComplete="name"
          wert={zustand.werte?.name}
          fehler={zustand.fehler?.name}
        />
        <Feld
          name="betrieb"
          beschriftung="Betrieb"
          autoComplete="organization"
          wert={zustand.werte?.betrieb}
          fehler={zustand.fehler?.betrieb}
        />
        <Feld
          name="telefon"
          beschriftung="Telefon"
          typ="tel"
          autoComplete="tel"
          eingabeart="tel"
          rechtschreibung={false}
          hinweis="Am schnellsten geht es, wenn ich zurückrufen darf."
          wert={zustand.werte?.telefon}
          fehler={zustand.fehler?.telefon}
        />
        <Feld
          name="email"
          beschriftung="E-Mail"
          typ="email"
          autoComplete="email"
          eingabeart="email"
          rechtschreibung={false}
          wert={zustand.werte?.email}
          fehler={zustand.fehler?.email}
        />
      </div>

      <div className="mt-6">
        <Feld
          name="anliegen"
          beschriftung="Worum geht es?"
          mehrzeilig
          pflicht
          hinweis="Zwei Sätze genügen. Zum Beispiel: welcher Betrieb, was gerade nicht funktioniert."
          wert={zustand.werte?.anliegen}
          fehler={zustand.fehler?.anliegen}
        />
      </div>

      {/* Unsichtbar für Menschen, verlockend für automatische Ausfüller. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="webseite">Website</label>
        <input id="webseite" name="webseite" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-8 border-t border-ink/15 pt-6">
        <label className="flex items-start gap-3 text-[0.9375rem] text-ink-2">
          <input
            type="checkbox"
            name="einwilligung"
            value="ja"
            className="kaestchen mt-0.5"
            aria-invalid={zustand.fehler?.einwilligung ? true : undefined}
            aria-describedby={
              zustand.fehler?.einwilligung ? "einwilligung-fehler" : undefined
            }
          />
          <span>
            Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner
            Anfrage gespeichert und verarbeitet werden. Näheres steht in der{" "}
            <Link href="/datenschutz" className="textlink text-blueprint">
              Datenschutzerklärung
            </Link>
            .
          </span>
        </label>
        {zustand.fehler?.einwilligung ? (
          <p
            id="einwilligung-fehler"
            className="mt-2 text-[0.8125rem] font-medium text-[var(--color-signal-dunkel)]"
          >
            {zustand.fehler.einwilligung}
          </p>
        ) : null}
      </div>

      <div className="mt-8">
        <Absendeknopf />
      </div>
    </form>
  );
}
