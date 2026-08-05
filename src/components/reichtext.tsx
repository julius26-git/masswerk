import Image from "next/image";
import Link from "next/link";
import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { urlFor } from "@/sanity/lib/image";
import type { SanityBild } from "@/lib/typen";

/**
 * Die Maße stecken in der Sanity-Referenz (image-<hash>-<breite>x<hoehe>-<typ>).
 * Sie auszulesen ist genauer als eine feste Höhe zu raten — und verhindert,
 * dass die Seite beim Laden des Bildes springt.
 */
function masseAus(bild: SanityBild) {
  const treffer = /-(\d+)x(\d+)-/.exec(bild?.asset?._ref ?? "");
  if (!treffer) return { breite: 1400, hoehe: 933 };

  const breite = Number(treffer[1]);
  const hoehe = Number(treffer[2]);
  return { breite: 1400, hoehe: Math.round((1400 * hoehe) / breite) };
}

const bausteine: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 whitespace-pre-line first:mt-0">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="schrift-display mt-12 text-[1.375rem] first:mt-0 sm:text-[1.5rem]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="schrift-display mt-9 text-[1.125rem] first:mt-0">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-signal pl-5 text-[1.125rem] italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-5 space-y-2">{children}</ul>,
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-5">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="relative pl-6">
        <span
          aria-hidden="true"
          className="absolute top-[0.6em] left-0 inline-block h-1.5 w-1.5 bg-signal"
        />
        {children}
      </li>
    ),
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    link: ({ children, value }) => {
      const ziel = (value as { href?: string })?.href ?? "#";
      const intern = ziel.startsWith("/");

      if (intern) {
        return (
          <Link href={ziel} className="textlink text-blueprint">
            {children}
          </Link>
        );
      }

      return (
        <a
          href={ziel}
          className="textlink text-blueprint"
          rel="noreferrer noopener"
          target="_blank"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    bildMitText: ({ value }) => {
      const bild = value as SanityBild;
      if (!bild?.asset) return null;

      const masse = masseAus(bild);

      return (
        <figure className="mt-8">
          <div className="blatt-flach overflow-hidden">
            <Image
              src={urlFor(bild).width(1400).url()}
              alt={bild.alt ?? ""}
              width={masse.breite}
              height={masse.hoehe}
              sizes="(min-width: 1024px) 62ch, 100vw"
              className="h-auto w-full"
            />
          </div>
          {bild.bildunterschrift ? (
            <figcaption className="schrift-etikett mt-3 text-ink-3">
              {bild.bildunterschrift}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

export function Reichtext({ inhalt }: { inhalt: PortableTextBlock[] }) {
  return (
    <div className="fliesstext">
      <PortableText value={inhalt} components={bausteine} />
    </div>
  );
}
