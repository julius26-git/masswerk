"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { navigation } from "@/lib/navigation";
import type { Grundeinstellungen } from "@/lib/typen";

export function Kopfleiste({ einstellungen }: { einstellungen: Grundeinstellungen }) {
  const pfad = usePathname();
  const [offen, setOffen] = useState(false);
  const ausloeser = useRef<HTMLButtonElement>(null);
  const flaeche = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!offen) {
      // Beim Schließen zurück auf den Knopf, der das Menü geöffnet hat.
      if (document.activeElement === document.body) ausloeser.current?.focus();
      return;
    }

    const panel = flaeche.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const fokussierbare = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
      );

    const beiTaste = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOffen(false);
        ausloeser.current?.focus();
        return;
      }

      // Der Fokus bleibt im Menü, solange es offen ist.
      if (e.key !== "Tab") return;
      const elemente = fokussierbare();
      if (elemente.length === 0) return;

      const erstes = elemente[0];
      const letztes = elemente[elemente.length - 1];
      const aktiv = document.activeElement;

      if (e.shiftKey && (aktiv === erstes || !panel?.contains(aktiv))) {
        e.preventDefault();
        letztes.focus();
      } else if (!e.shiftKey && aktiv === letztes) {
        e.preventDefault();
        erstes.focus();
      }
    };

    document.addEventListener("keydown", beiTaste);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", beiTaste);
      document.body.style.overflow = "";
    };
  }, [offen]);

  return (
    <>
      <header className="kopfleiste">
        <div className="bahn">
          <nav className="kopfleiste-balken blatt" aria-label="Hauptnavigation">
            <Link
              href="/"
              className="flex items-center gap-2.5 px-2 py-1"
              aria-label={`${einstellungen.name} — Startseite`}
            >
              <span className="schrift-marke text-[1.0625rem] leading-none">
                {einstellungen.name}
              </span>
              <span
                className="hidden h-3 w-px bg-ink/25 xl:block"
                aria-hidden="true"
              />
              <span className="schrift-etikett hidden text-ink-3 xl:block">
                {einstellungen.claim}
              </span>
            </Link>

            <div className="ml-auto hidden items-center gap-0.5 lg:flex">
              {navigation.slice(0, 3).map((posten) => (
                <Link
                  key={posten.ziel}
                  href={posten.ziel}
                  className="navi-link schrift-etikett"
                  aria-current={pfad === posten.ziel ? "page" : undefined}
                >
                  {posten.name}
                </Link>
              ))}
            </div>

            <Link
              href="/kontakt"
              className="knopf knopf-signal ml-auto hidden !min-h-[2.25rem] !px-4 !py-2 text-[0.8125rem] lg:ml-2 lg:flex"
            >
              Erstgespräch
              <span className="pfeil" aria-hidden="true">
                →
              </span>
            </Link>

            <button
              ref={ausloeser}
              type="button"
              className="knopf knopf-papier ml-auto !px-4 text-[0.8125rem] lg:hidden"
              aria-expanded={offen}
              aria-controls="hauptmenue"
              onClick={() => setOffen((wert) => !wert)}
            >
              {offen ? "Schließen" : "Menü"}
            </button>
          </nav>
        </div>
      </header>

      <div
        id="hauptmenue"
        className="menue-flaeche lg:hidden"
        data-offen={offen ? "ja" : "nein"}
        role="dialog"
        aria-modal="true"
        aria-label="Menü"
        inert={!offen}
        ref={flaeche}
      >
        <div className="bahn pt-[0.625rem]">
          <div className="menue-blatt blatt mt-0 p-2">
            <div className="kopfleiste-balken !px-0">
              <span className="schrift-marke px-2 text-[1.0625rem] leading-none">
                {einstellungen.name}
              </span>
              <button
                type="button"
                className="knopf knopf-papier ml-auto !px-4 text-[0.8125rem]"
                onClick={() => {
                  setOffen(false);
                  ausloeser.current?.focus();
                }}
              >
                Schließen
              </button>
            </div>

            <ul className="border-t border-ink/15">
              {navigation.map((posten) => (
                <li key={posten.ziel} className="border-b border-ink/15">
                  <Link
                    href={posten.ziel}
                    className="schrift-display titel-s flex items-center justify-between px-2 py-4"
                    aria-current={pfad === posten.ziel ? "page" : undefined}
                    onClick={() => setOffen(false)}
                  >
                    {posten.name}
                    <span className="pfeil text-signal" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-2 p-2 pt-4">
              <a
                href={`tel:${einstellungen.telefon.replace(/\s/g, "")}`}
                className="knopf knopf-signal w-full"
                onClick={() => setOffen(false)}
              >
                {einstellungen.telefon}
              </a>
              <p className="schrift-etikett px-1 text-ink-3">
                {einstellungen.erreichbarkeit}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
