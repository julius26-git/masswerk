import type { MetadataRoute } from "next";

import { siteUrl } from "@/sanity/env";

const seiten = [
  { pfad: "/", prioritaet: 1 },
  { pfad: "/leistungen", prioritaet: 0.9 },
  { pfad: "/referenzen", prioritaet: 0.8 },
  { pfad: "/ueber-mich", prioritaet: 0.7 },
  { pfad: "/kontakt", prioritaet: 0.9 },
  { pfad: "/impressum", prioritaet: 0.2 },
  { pfad: "/datenschutz", prioritaet: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const jetzt = new Date();

  return seiten.map(({ pfad, prioritaet }) => ({
    url: `${siteUrl}${pfad}`,
    lastModified: jetzt,
    changeFrequency: "monthly",
    priority: prioritaet,
  }));
}
