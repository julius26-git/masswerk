/**
 * Legt Sanity-Daten über einen vollständigen Standardinhalt.
 *
 * Sanity liefert für nicht ausgefüllte Felder `null`, für leere Listen `[]`.
 * Beides soll den Standard nicht überschreiben – so ist die Website ab der
 * ersten Minute vollständig und wird durch gepflegte Inhalte Feld für Feld
 * abgelöst.
 */
export function verschmelze<T>(standard: T, daten: unknown): T {
  if (daten === null || daten === undefined) return standard;

  if (Array.isArray(daten)) {
    return (daten.length > 0 ? daten : standard) as T;
  }

  if (typeof daten === "string") {
    return (daten.trim() === "" ? standard : daten) as T;
  }

  if (
    typeof daten === "object" &&
    typeof standard === "object" &&
    standard !== null &&
    !Array.isArray(standard)
  ) {
    const ergebnis: Record<string, unknown> = {
      ...(standard as Record<string, unknown>),
    };

    for (const [schluessel, wert] of Object.entries(
      daten as Record<string, unknown>,
    )) {
      if (schluessel in ergebnis) {
        ergebnis[schluessel] = verschmelze(ergebnis[schluessel], wert);
      } else if (wert !== null && wert !== undefined) {
        ergebnis[schluessel] = wert;
      }
    }

    return ergebnis as T;
  }

  return daten as T;
}
