"use client";

import { useEffect, useRef } from "react";

/**
 * Startsequenz: eine Linie wird gezogen wie ein Maßband, darauf erscheint
 * der Name. Die Sequenz selbst läuft über CSS und endet auch dann sauber,
 * wenn JavaScript ausfällt. Sie erscheint nur beim ersten Aufruf pro Sitzung
 * (siehe Skript im Layout) und nie bei reduzierter Bewegung.
 *
 * JavaScript kümmert sich nur um eines: Wer nicht warten will, tippt oder
 * drückt eine Taste — dann ist sie sofort vorbei.
 */
export function Intro({ name, claim }: { name: string; claim: string }) {
  const flaeche = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = flaeche.current;
    if (!element) return;

    const ueberspringen = () => {
      element.dataset.uebersprungen = "ja";
    };

    const timer = window.setTimeout(ueberspringen, 2200);
    window.addEventListener("pointerdown", ueberspringen, { once: true });
    window.addEventListener("keydown", ueberspringen, { once: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointerdown", ueberspringen);
      window.removeEventListener("keydown", ueberspringen);
    };
  }, []);

  return (
    <div className="intro" aria-hidden="true" ref={flaeche}>
      <div className="intro-satz">
        <div className="intro-linie" />
        <div className="intro-teilung" />
        <div className="intro-marke schrift-marke">{name}</div>
        <div className="intro-claim schrift-etikett">{claim}</div>
      </div>
    </div>
  );
}
