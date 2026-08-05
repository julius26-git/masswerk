# Designsystem Maßwerk

## Die Idee

Der Name kommt aus der Architektur: Maßwerk ist die steinerne Gliederung eines
gotischen Fensters — Präzision im Handwerk. Das Bild der Website ist deshalb ein
**Zeichentisch**: Der Hintergrund ist eine Schneidematte mit Raster, jeder Inhalt
liegt als Blatt Papier darauf. Wer Websites an Betriebe verkauft, die von
Bauplänen leben, zeigt sie am besten in deren eigener Sprache.

Die Formensprache ist an das ausgewählte Vorbild angelehnt (units., Awwwards):
schwebende Karten mit kräftiger Kontur auf einem gerasterten Grund, ein Laufband,
Kacheln mit Flächenmustern. Übersetzt wurde sie in eine technische
Bauplan-Ästhetik statt in die bunte Memphis-Palette des Vorbilds.

## Farben

| Rolle | Wert | Verwendung |
| --- | --- | --- |
| Matte | `#16332B` | Seitenhintergrund samt 10er-Raster |
| Matte tief | `#0E241E` | Startsequenz, Menüfläche |
| Papier | `#F4F1E6` | Blätter, Karten, Formularflächen |
| Papier 2 | `#E9E3D1` | eingelegte Flächen, Eingabefelder |
| Tusche | `#121714` | Schrift und Konturen auf Papier |
| Signal | `#FF5A1F` | Flächen, Rahmen, Marker |
| Signal dunkel | `#B8350A` | kleine Schrift **auf Papier** |
| Signal hell | `#FF7A45` | kleine Schrift **auf der Matte** |
| Bauplan-Blau | `#2E56C8` | Links im Fließtext |

Das kräftige Orange trägt als Fläche genug Kontrast, als 11-px-Schrift aber
nicht. Deshalb gibt es zwei abgestimmte Varianten, die über die
Custom-Properties `--etikett` und `--etikett-leise` automatisch je nach
Untergrund greifen: `.blatt` schaltet auf die dunkle Variante um, der
Seitenhintergrund auf die helle. Wer eine neue Fläche baut, erbt das Verhalten,
indem er `.blatt`, `.blatt-flach`, `.auf-papier` oder `.auf-signal` setzt.

Nach demselben Muster wechselt der Fokusring die Farbe: `--fokus` ist auf der
Matte Signalorange (4,4 : 1) und auf Papier Tusche (15 : 1). Ein orangener Ring
auf cremefarbenem Papier käme nur auf 2,8 : 1 und wäre damit unzulässig.

Überschriften werden nie orange gesetzt. Hervorhebungen bekommen stattdessen
einen Textmarker-Strich (`.markierung`) hinter der Schrift — die Schrift bleibt
tiefschwarz, der Kontrast stimmt.

## Schrift

| Rolle | Schrift | Einsatz |
| --- | --- | --- |
| Display | Archivo, Breite 112 | Überschriften |
| Marke | Archivo, Breite 125, versal | Wortmarke |
| Text | Instrument Sans | Fließtext |
| Daten | IBM Plex Mono, versal, weit | Etiketten, Maße, Positionsnummern |

Die Mono-Schrift trägt alles, was auf einer Zeichnung beschriftet wäre:
Abschnittsetiketten, Positionsnummern, Dauern, Zahlenwerte am Maßband. Sie ist
das akustische Gegengewicht zur breiten Display-Schrift.

Größen sind fließend (`clamp`) und heißen `.titel-xl` bis `.titel-s`.

## Wiederkehrende Bauteile

- **`.blatt`** — Papier mit 1,5-px-Kontur, 3 px Radius und weichem Schatten.
- **`.knopf`** — Schaltflächen mit versetztem Vollton-Schatten; beim Zeigen
  wandert das Blatt einen Pixel nach oben, beim Drücken schrumpft es auf 0,97.
- **Etikett** — Mono-Label mit vorangestelltem Quadrat, markiert jeden Abschnitt.
- **Abschnittskopf** — dreispaltiges Etikett links, neunspaltige Überschrift
  rechts. Das ist der Rand eines Zeichnungsblatts, kein Zufall.
- **Schraffuren** — vier technische Materialmuster (Beton, Stahl, Holz, Dämmung)
  als SVG-Pattern in `components/schraffuren.tsx`. Jede Branche bekommt eines.
  So unterscheiden sich die Kacheln, ohne dass vier weitere Farben nötig wären.

## Die Signaturen

Drei Dinge tragen den Auftritt; alles andere bleibt bewusst ruhig.

1. **Das Maßband am linken Rand.** Ab 1024 px läuft eine Skala mit Schieber mit,
   die anzeigt, an welcher Stelle der Seite man steht und wie der Abschnitt
   heißt. Abschnitte melden sich über `data-abschnitt="…"` an; die Nummerierung
   entsteht daraus automatisch.
2. **Der Bauplan im Aufmacher.** Die verkaufte Website als Bauzeichnung, mit
   Maßketten, deren Maße die Versprechen sind: „Vollbild in 0,8 s“,
   „Bewerbung in 60 Sekunden“. Wird beim Laden Zug um Zug gezeichnet.
3. **Die Startsequenz.** Eine Linie wird gezogen wie ein Maßband, darauf
   erscheint der Name. Läuft rein über CSS, dauert 1,9 Sekunden, erscheint nur
   beim ersten Aufruf pro Sitzung und nie bei reduzierter Bewegung.

## Bewegung

```css
--ease-out:     cubic-bezier(0.23, 1, 0.32, 1);     /* Ein- und Austritte */
--ease-in-out:  cubic-bezier(0.77, 0, 0.175, 1);    /* Bewegung im Bild */
--ease-blende:  cubic-bezier(0.32, 0.72, 0, 1);     /* Flächen, Schubladen */
```

Regeln, an die sich der Code hält:

- Bedienelemente unter 300 ms, Erklärendes darf länger dauern.
- Kein `ease-in` in der Bedienoberfläche.
- Nichts startet bei `scale(0)`.
- Zeigen-Effekte stecken hinter `@media (hover: hover) and (pointer: fine)`.
- Einblendungen beim Scrollen laufen über **einen** Beobachter
  (`components/auftritte.tsx`) und über `data-auftritt`. Der versteckte
  Startzustand gilt nur, wenn JavaScript läuft (`html[data-js]`) — sonst wäre
  der Inhalt ohne JavaScript unsichtbar.
- `prefers-reduced-motion` schaltet Bewegung ab, nicht Inhalt.

## Zugänglichkeit

- Sprungmarke zum Inhalt als erstes fokussierbares Element.
- Sichtbarer Fokusrahmen, 3 px, mit Abstand — Farbe je nach Untergrund (`--fokus`).
- Häufige Fragen als natives `<details>` — Tastatur und Screenreader inklusive,
  auch ohne JavaScript.
- Formularfehler stehen im Text neben dem Feld, sind über `aria-describedby`
  verknüpft, und nach einem Fehlversuch springt der Fokus auf die Meldung.
- Das mobile Menü hält den Fokus fest und gibt ihn beim Schließen an den
  Auslöser zurück.
- Das Laufband hat einen Schalter zum Anhalten — Zeigen allein genügt nicht,
  weil Touch- und Tastaturnutzer damit nichts anfangen können.
- Alle Klickflächen mindestens 44 px hoch.

## CSS-Ebenen

Eigene Klassen liegen in `@layer base` und `@layer components`. Nur so gewinnen
Tailwind-Hilfsklassen wie `hidden` oder `lg:flex` gegen eigene Regeln wie
`.knopf { display: inline-flex }` — ohne die Ebenen wäre es umgekehrt, und
`lg:hidden` würde still versagen.
