import type { ReactNode } from "react";

import { Etikett } from "./abschnitt";
import type { SektionsKopf } from "@/lib/typen";

export function Seitenkopf({
  kopf,
  name,
  beiwerk,
}: {
  kopf: SektionsKopf;
  name: string;
  beiwerk?: ReactNode;
}) {
  return (
    <section
      data-abschnitt={name}
      className="pt-[calc(var(--leiste)+1.75rem)]"
    >
      <div className="bahn">
        <div className="blatt grid gap-x-10 gap-y-8 p-6 sm:p-8 lg:grid-cols-12 lg:p-12">
          <div className="lg:col-span-8">
            {kopf.kennzeichnung ? <Etikett>{kopf.kennzeichnung}</Etikett> : null}
            <h1 className="schrift-display titel-l mt-6 max-w-[16ch]">{kopf.titel}</h1>
            {kopf.text ? (
              <p className="fliesstext mt-6 text-[1.0625rem] text-ink-2">{kopf.text}</p>
            ) : null}
          </div>

          {beiwerk ? (
            <div className="lg:col-span-4 lg:justify-self-end">{beiwerk}</div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
