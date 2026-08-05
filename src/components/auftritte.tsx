"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Blendet Elemente mit `data-auftritt` ein, sobald sie ins Bild kommen.
 * Ein einziger Beobachter für die ganze Seite — das spart pro Abschnitt
 * eine eigene Client-Komponente.
 */
export function Auftritte() {
  const pfad = usePathname();

  useEffect(() => {
    const elemente = document.querySelectorAll<HTMLElement>(
      '[data-auftritt=""], [data-auftritt="warten"]',
    );

    if (!("IntersectionObserver" in window)) {
      elemente.forEach((element) => (element.dataset.auftritt = "sichtbar"));
      return;
    }

    const beobachter = new IntersectionObserver(
      (eintraege) => {
        for (const eintrag of eintraege) {
          if (!eintrag.isIntersecting) continue;
          (eintrag.target as HTMLElement).dataset.auftritt = "sichtbar";
          beobachter.unobserve(eintrag.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    elemente.forEach((element) => beobachter.observe(element));
    return () => beobachter.disconnect();
  }, [pfad]);

  return null;
}
