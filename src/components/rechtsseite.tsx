import { Auftritte } from "@/components/auftritte";
import { Reichtext } from "@/components/reichtext";
import { Etikett } from "@/components/abschnitt";
import type { Rechtstext } from "@/lib/typen";

export function Rechtsseite({ text }: { text: Rechtstext }) {
  const stand = text.stand
    ? new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(
        new Date(text.stand),
      )
    : null;

  return (
    <>
      <Auftritte />

      <section data-abschnitt={text.titel} className="pt-[calc(var(--leiste)+1.75rem)]">
        <div className="bahn">
          <article className="blatt p-6 sm:p-10 lg:p-14">
            <Etikett>Rechtliches</Etikett>
            <h1 className="schrift-display titel-l mt-6">{text.titel}</h1>
            {stand ? (
              <p className="schrift-etikett mt-4 text-ink-3">Stand: {stand}</p>
            ) : null}

            <div className="mt-10 text-ink-2">
              <Reichtext inhalt={text.inhalt} />
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
