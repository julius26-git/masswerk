import type { PortableTextBlock } from "@portabletext/types";

let zaehler = 0;
const schluessel = () => `s${(zaehler += 1).toString(36)}`;

/** Baut einen Portable-Text-Absatz, damit Standardtexte dieselbe Form haben wie Sanity-Inhalte. */
export function absatz(text: string): PortableTextBlock {
  return {
    _type: "block",
    _key: schluessel(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: schluessel(), text, marks: [] }],
  } as unknown as PortableTextBlock;
}

export function ueberschrift(
  text: string,
  stufe: "h2" | "h3" = "h2",
): PortableTextBlock {
  return {
    _type: "block",
    _key: schluessel(),
    style: stufe,
    markDefs: [],
    children: [{ _type: "span", _key: schluessel(), text, marks: [] }],
  } as unknown as PortableTextBlock;
}

export function liste(punkte: string[]): PortableTextBlock[] {
  return punkte.map(
    (punkt) =>
      ({
        _type: "block",
        _key: schluessel(),
        style: "normal",
        listItem: "bullet",
        level: 1,
        markDefs: [],
        children: [{ _type: "span", _key: schluessel(), text: punkt, marks: [] }],
      }) as unknown as PortableTextBlock,
  );
}
