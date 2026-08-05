/**
 * Technische Schraffuren, wie sie in Bauzeichnungen für Materialien stehen.
 * Jede Branche bekommt ihre eigene — das unterscheidet die Kacheln, ohne
 * dass dafür vier weitere Farben nötig wären.
 */
export function Schraffuren() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        <pattern
          id="schraffur-beton"
          width="26"
          height="26"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="26" stroke="#121714" strokeWidth="1" />
          <circle cx="13" cy="7" r="1.6" fill="#121714" />
          <circle cx="19" cy="19" r="1.1" fill="#121714" />
          <path d="M6 16 l4 0 l-2 -3.4 z" fill="#121714" />
        </pattern>

        <pattern
          id="schraffur-stahl"
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="7" stroke="#121714" strokeWidth="1.2" />
        </pattern>

        <pattern
          id="schraffur-holz"
          width="40"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 4 q10 -4 20 0 t20 0"
            fill="none"
            stroke="#121714"
            strokeWidth="1"
          />
          <path
            d="M0 11 q10 5 20 0 t20 0"
            fill="none"
            stroke="#121714"
            strokeWidth="1"
          />
          <path
            d="M0 16 q10 -3 20 0 t20 0"
            fill="none"
            stroke="#121714"
            strokeWidth="0.7"
          />
        </pattern>

        <pattern
          id="schraffur-daemmung"
          width="22"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 7 l5.5 -6 l5.5 12 l5.5 -12 l5.5 6"
            fill="none"
            stroke="#121714"
            strokeWidth="1.1"
          />
        </pattern>
      </defs>
    </svg>
  );
}

export const schraffurId = {
  beton: "url(#schraffur-beton)",
  stahl: "url(#schraffur-stahl)",
  holz: "url(#schraffur-holz)",
  daemmung: "url(#schraffur-daemmung)",
} as const;
