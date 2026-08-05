"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Das Maßband am linken Rand: eine Skala mit einem Schieber, der zeigt,
 * wo man auf der Seite steht — und wie der Abschnitt heißt, der gerade
 * unter dem Schieber liegt. Abschnitte melden sich über `data-abschnitt`.
 */
export function Massband() {
  const pfad = usePathname();
  const schieber = useRef<HTMLDivElement>(null);
  const [marke, setMarke] = useState<{ nummer: string; name: string } | null>(null);

  useEffect(() => {
    const element = schieber.current;
    if (!element) return;

    let angefordert = 0;
    let letzteMarke = "";

    const abschnitte = Array.from(
      document.querySelectorAll<HTMLElement>("[data-abschnitt]"),
    );

    const zeichnen = () => {
      angefordert = 0;

      const strecke = document.documentElement.scrollHeight - window.innerHeight;
      const anteil = strecke > 0 ? Math.min(1, Math.max(0, window.scrollY / strecke)) : 0;
      const weg = Math.max(0, window.innerHeight - element.offsetHeight - 24);

      element.style.transform = `translateY(${(anteil * weg).toFixed(1)}px)`;

      const grenze = window.scrollY + window.innerHeight * 0.35;
      let aktiv = -1;
      for (let i = 0; i < abschnitte.length; i += 1) {
        if (abschnitte[i].offsetTop <= grenze) aktiv = i;
      }

      const name = aktiv >= 0 ? (abschnitte[aktiv].dataset.abschnitt ?? "") : "";
      const kennung = `${aktiv}:${name}`;
      if (kennung !== letzteMarke) {
        letzteMarke = kennung;
        setMarke(
          aktiv >= 0
            ? { nummer: String(aktiv + 1).padStart(2, "0"), name }
            : null,
        );
      }
    };

    const anstossen = () => {
      if (!angefordert) angefordert = requestAnimationFrame(zeichnen);
    };

    zeichnen();
    window.addEventListener("scroll", anstossen, { passive: true });
    window.addEventListener("resize", anstossen);

    return () => {
      window.removeEventListener("scroll", anstossen);
      window.removeEventListener("resize", anstossen);
      if (angefordert) cancelAnimationFrame(angefordert);
    };
  }, [pfad]);

  return (
    <div className="massband" aria-hidden="true">
      <div className="massband-teilung" />
      <div className="massband-teilung-gross" />
      <div className="massband-schieber" ref={schieber}>
        <div className="massband-strich" />
        <div className="massband-nummer schrift-etikett">{marke?.nummer ?? "00"}</div>
        <div
          className="massband-name schrift-etikett"
          style={{ opacity: marke ? 1 : 0 }}
        >
          {marke?.name ?? ""}
        </div>
      </div>
    </div>
  );
}
