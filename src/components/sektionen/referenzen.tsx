import Image from "next/image";
import Link from "next/link";

import { Abschnitt, Kopf } from "@/components/abschnitt";
import { schraffurId } from "@/components/schraffuren";
import { urlFor } from "@/sanity/lib/image";
import type { Referenz, SektionsKopf } from "@/lib/typen";

const statusText = {
  live: "Live",
  inArbeit: "In Arbeit",
  platzhalter: "Prototyp",
} as const;

/** Was hinter dem Link steckt, hängt am Status — eine Vorschau ist keine Website. */
const linkText = {
  live: "Website ansehen",
  inArbeit: "Vorschau ansehen",
  platzhalter: "Studie ansehen",
} as const;

function Statuszeichen({ status }: { status: Referenz["status"] }) {
  const istEcht = status === "live";

  return (
    <span
      className={`schrift-etikett border px-2 py-1 ${
        istEcht
          ? "border-ink bg-signal text-ink"
          : "border-ink/30 text-ink-3"
      }`}
    >
      {statusText[status]}
    </span>
  );
}

export function Referenzen({
  kopf,
  referenzen,
  hinweis,
  weiterlesen,
}: {
  kopf?: SektionsKopf;
  referenzen: Referenz[];
  hinweis?: string | null;
  weiterlesen?: { beschriftung: string; ziel: string };
}) {
  if (referenzen.length === 0) return null;

  const zeigtPlatzhalter = referenzen.some((r) => r.status === "platzhalter");

  return (
    <Abschnitt name="Referenzen" id="referenzen">
      <div className="bahn">
        {kopf ? <Kopf kopf={kopf} /> : null}

        {hinweis && zeigtPlatzhalter ? (
          <p
            className={`fliesstext border-l-2 border-signal pl-5 text-[0.9375rem] opacity-70 ${kopf ? "mt-8" : ""}`}
            data-auftritt="warten"
          >
            {hinweis}
          </p>
        ) : null}

        <div className="mt-10 grid gap-3 lg:grid-cols-2">
          {referenzen.map((referenz, index) => (
            <article
              key={referenz._id}
              className="blatt flex flex-col overflow-hidden"
              data-auftritt="warten"
              style={{ "--verzug": `${index * 70}ms` } as React.CSSProperties}
            >
              <div className="border-b border-ink bg-paper-2">
                {referenz.bildNachher?.asset ? (
                  <Image
                    src={urlFor(referenz.bildNachher).width(1200).height(750).url()}
                    alt={referenz.bildNachher.alt ?? referenz.titel}
                    width={1200}
                    height={750}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    // Das erste Bild ist meist das größte Element beim Laden.
                    priority={index === 0}
                    className="aspect-[8/5] w-full object-cover"
                  />
                ) : (
                  <svg className="block aspect-[8/5] w-full" aria-hidden="true">
                    <rect
                      width="100%"
                      height="100%"
                      fill={schraffurId[referenz.branche?.material ?? "beton"]}
                      opacity="0.4"
                    />
                  </svg>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6 lg:p-8">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Statuszeichen status={referenz.status} />
                  {referenz.branche ? (
                    <span className="schrift-etikett text-ink-3">
                      {referenz.branche.titel}
                    </span>
                  ) : null}
                  {referenz.jahr ? (
                    <span className="schrift-etikett text-ink-3">{referenz.jahr}</span>
                  ) : null}
                </div>

                <h3 className="schrift-display titel-m mt-5">{referenz.titel}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                  {referenz.auftrag}
                </p>

                {referenz.ergebnisse.length > 0 ? (
                  <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-4 border-t border-ink/15 pt-6">
                    {referenz.ergebnisse.map((ergebnis) => (
                      <div key={ergebnis._key} className="flex flex-col">
                        <dt className="schrift-etikett order-2 mt-1.5 text-ink-3">
                          {ergebnis.label}
                        </dt>
                        <dd className="schrift-wert order-1 text-[1.75rem]">
                          {ergebnis.wert}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}

                {referenz.adresse ? (
                  <p className="mt-auto pt-7">
                    <a
                      href={referenz.adresse}
                      className="textlink text-blueprint"
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      {linkText[referenz.status]}
                    </a>
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        {weiterlesen ? (
          <div className="mt-8" data-auftritt="warten">
            <Link href={weiterlesen.ziel} className="knopf knopf-papier">
              {weiterlesen.beschriftung}
              <span className="pfeil" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        ) : null}
      </div>
    </Abschnitt>
  );
}
