/**
 * Lädt einen Screenshot als Bild zu einer Referenz hoch.
 *
 * Aufruf:
 *   SANITY_WRITE_TOKEN=… npx tsx scripts/referenzbild.mts <dokument-id> <datei> "<Bildbeschreibung>"
 *
 * Beispiel:
 *   … scripts/referenzbild.mts referenz-reuther ~/bilder/reuther.jpg "Startseite mit …"
 *
 * Ein Schreib-Token erzeugst du mit
 *   npx sanity tokens add "bild" --role editor --project-id z88uzayz
 * und löschst es danach wieder mit `npx sanity tokens delete <id>`.
 */
import { readFileSync } from "node:fs";
import { basename } from "node:path";
import { createClient } from "@sanity/client";

const [dokumentId, datei, alt] = process.argv.slice(2);

if (!process.env.SANITY_WRITE_TOKEN || !dokumentId || !datei || !alt) {
  console.error(
    "Aufruf: SANITY_WRITE_TOKEN=… npx tsx scripts/referenzbild.mts <dokument-id> <datei> \"<Bildbeschreibung>\"",
  );
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "z88uzayz",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-02-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

async function lauf() {
  const asset = await client.assets.upload("image", readFileSync(datei), {
    filename: basename(datei),
  });

  await client
    .patch(dokumentId)
    .set({
      bildNachher: {
        _type: "bildMitText",
        alt,
        asset: { _type: "reference", _ref: asset._id },
      },
    })
    .commit();

  console.log(`${dokumentId} → ${asset._id}`);
}

lauf().catch((fehler) => {
  console.error(fehler.message);
  process.exit(1);
});
