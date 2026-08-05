# Maßwerk

Website der Webdesign-Agentur **Maßwerk** — Next.js 16 (App Router, Turbopack),
Tailwind CSS 4 und Sanity als Redaktionssystem.

---

## Schnellstart

```bash
npm install            # einmalig, im Studio zusätzlich: npm --prefix studio install
npm run dev            # Website  → http://localhost:3000
npm run studio         # Studio   → http://localhost:3333
```

Die Zugangsdaten stehen in `.env.local` (nicht im Git). Vorlage: `.env.example`.

---

## Was vor dem Livegang ausgefüllt werden muss

Alles Folgende steht im Studio unter **Grundeinstellungen** und ist derzeit mit
Platzhaltern belegt:

| Feld | aktuell |
| --- | --- |
| Telefon | `+49 151 00000000` |
| E-Mail | `hallo@masswerk.de` |
| Straße, PLZ, Ort | `Musterstraße 1, 42551 Velbert` |
| Umsatzsteuer-ID | leer, Kleinunternehmerregelung ist aktiv |

Dazu:

- **Vorschaubild fürs Teilen** in den Grundeinstellungen unter *Suchmaschinen*
  hinterlegen (1200 × 630 px). Ohne dieses Bild zeigen WhatsApp und LinkedIn beim
  Teilen nur Text.
- **Portrait** auf „Seite: Über mich“ hochladen (bis dahin steht dort ein
  gezeichneter Platzhalter mit dem Hinweis „Portrait folgt“).
- **Referenzen**: Beide Projekte sind als *Platzhalter* markiert und werden auf
  der Seite ehrlich als Prototypen ausgewiesen — ohne erfundene Erfolgszahlen.
  Sobald echte Kundenprojekte online sind: Status auf *Live* setzen, Bild und
  Link ergänzen.
- **Rechtstexte**: Impressum und Datenschutzerklärung sind vorbereitet und
  beschreiben genau das, was diese Website tatsächlich tut (Vercel, Sanity,
  Resend, keine Cookies, selbst ausgelieferte Schriften).
  **Beides gehört trotzdem einmal anwaltlich geprüft, bevor die Seite live geht.**

---

## Inhalte pflegen

Alles Sichtbare kommt aus Sanity. Im Studio liegen:

- **Grundeinstellungen** — Name, Claim, Kontakt, Anbieterangaben, Laufband
- **Startseite / Seite: Leistungen / Referenzen / Über mich / Kontakt** — je ein
  Dokument pro Seite, unterteilt in Abschnitte
- **Leistungen, Branchen, Referenzen, Arbeitsschritte, Häufige Fragen** — Listen,
  über das Feld *Reihenfolge* sortiert
- **Rechtstexte** — Impressum und Datenschutz

Ein Detail, das Ärger erspart: Jedes Feld hat im Code einen vollständigen
Standardtext (`src/lib/standardinhalt.ts`). Wird ein Feld im Studio geleert oder
ist Sanity kurz nicht erreichbar, erscheint dieser Standard statt einer Lücke.
Die Seite kann also nicht kaputtgehen, weil irgendwo ein Feld fehlt.

Den Standardinhalt erneut ins Dataset schreiben (überschreibt Bestehendes).
Dafür braucht es einmalig ein Schreib-Token — danach gehört es gelöscht:

```bash
npx sanity tokens add "seed" --role editor --project-id z88uzayz
SANITY_WRITE_TOKEN=<token> npm run inhalt:anlegen -- --ueberschreiben
npx sanity tokens delete <token-id> --project-id z88uzayz
```

Im Projekt liegt dauerhaft nur ein Lese-Token (`masswerk-web-read-2`, Rolle
*Viewer*) in `.env.local`. Es darf nichts verändern.

### Später: Fotos und Video anbieten

Der Bereich ist vorbereitet und nur ausgeschaltet:

1. Im Studio unter **Leistungen** liegt „Fotos & Film“ mit dem Bereich
   *Bild & Film*. Texte anpassen.
2. Auf der **Startseite** im Reiter *Abschnitte* den Schalter
   **„Abschnitt Bild & Film anzeigen“** einschalten.

Der Abschnitt erscheint dann auf Startseite und Leistungsseite. Kein Code nötig.

---

## Struktur

```
src/
  app/              Seiten, Server Actions, sitemap, robots
  components/       Bausteine; sektionen/ enthält die Seitenabschnitte
  lib/              Standardinhalt, Typen, Datenzugriff, SEO
  sanity/           Client, Live Content, GROQ-Abfragen, generierte Typen
studio/             Sanity Studio (eigene Anwendung, eigenes package.json)
scripts/            Skript zum Anlegen des Standardinhalts
```

Nach Änderungen an Schema oder GROQ-Abfragen die Typen neu erzeugen:

```bash
npm run typegen
```

---

## Deployment

**Website (Vercel):** Repository verbinden, Root-Verzeichnis auf `/` lassen.
Umgebungsvariablen aus `.env.example` setzen. Danach die Produktionsadresse in
Sanity als CORS-Ursprung eintragen:

```bash
npx sanity cors add https://masswerk.de --credentials
```

**Studio:** `npm run studio:deploy` → erreichbar unter `masswerk.sanity.studio`.

**Kontaktformular:** Ohne `RESEND_API_KEY`, `KONTAKT_EMPFAENGER` und
`KONTAKT_ABSENDER` nimmt das Formular Anfragen an und schreibt sie ins
Server-Log, verschickt aber keine E-Mail. Für den Livebetrieb bei
[resend.com](https://resend.com) die Absenderdomain verifizieren und die drei
Variablen setzen.

**Git:** Commits brauchen die Gmail-Adresse als Autor, sonst blockiert Vercel das
Deployment.

---

## Datenschutz

Die Seite kommt ohne Cookie-Banner aus, und das ist kein Trick, sondern eine
Folge der Bauweise:

- Schriften werden über `next/font` beim Build heruntergeladen und vom eigenen
  Server ausgeliefert. Keine Verbindung zu Google.
- Keine Analyse, kein Tracking, keine eingebetteten Fremdinhalte.
- Das Kontaktformular verlangt eine ausdrückliche Einwilligung und verschickt
  ausschließlich das, was eingegeben wurde. Gegen Massenversand laufen ein
  unsichtbares Honigtopf-Feld und eine Bremse von fünf Anfragen je zehn Minuten
  und Anschluss.

Wer später doch Zahlen sehen möchte: Plausible oder Matomo lassen sich
einwilligungsfrei betreiben — dann muss die Datenschutzerklärung ergänzt werden.
