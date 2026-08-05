import type { Metadata } from "next";

import { Rechtsseite } from "@/components/rechtsseite";
import { holeRechtstext } from "@/lib/inhalt";
import { metadatenAus } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const text = await holeRechtstext("datenschutz", { stega: false });
  return metadatenAus(text.seo, "/datenschutz");
}

export default async function DatenschutzSeite() {
  const text = await holeRechtstext("datenschutz");
  return <Rechtsseite text={text} />;
}
