import type { Metadata } from "next";

import { Rechtsseite } from "@/components/rechtsseite";
import { holeRechtstext } from "@/lib/inhalt";
import { metadatenAus } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const text = await holeRechtstext("impressum", { stega: false });
  return metadatenAus(text.seo, "/impressum");
}

export default async function ImpressumSeite() {
  const text = await holeRechtstext("impressum");
  return <Rechtsseite text={text} />;
}
