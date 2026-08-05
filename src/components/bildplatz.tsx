import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";
import type { SanityBild } from "@/lib/typen";

/**
 * Zeigt ein Bild — oder, solange keines gepflegt ist, den Platzhalter aus
 * der Bauzeichnung. Ehrlicher als ein gekauftes Stockfoto.
 */
export function Bildplatz({
  bild,
  hinweis,
  beschreibung,
  breite = 900,
  hoehe = 1125,
  className = "",
  sizes,
}: {
  bild: SanityBild;
  hinweis: string;
  /** Ersatz für den Alternativtext, falls im Bild keiner gepflegt ist. */
  beschreibung?: string;
  breite?: number;
  hoehe?: number;
  className?: string;
  sizes?: string;
}) {
  if (bild?.asset) {
    return (
      <Image
        src={urlFor(bild).width(breite).height(hoehe).url()}
        alt={bild.alt ?? beschreibung ?? ""}
        width={breite}
        height={hoehe}
        sizes={sizes}
        className={`h-auto w-full ${className}`}
      />
    );
  }

  return (
    <div
      className={`papier-raster relative grid place-items-center bg-paper-2 ${className}`}
      style={{ aspectRatio: `${breite} / ${hoehe}` }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="#121714" strokeWidth="1" opacity="0.2" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="#121714" strokeWidth="1" opacity="0.2" />
      </svg>
      <p className="schrift-etikett relative bg-paper-2 px-3 py-2 text-ink-3">
        {hinweis}
      </p>
    </div>
  );
}
