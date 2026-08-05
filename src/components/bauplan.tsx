const INK = "#121714";
const SIGNAL = "#ff5a1f";

/**
 * Maße des Geräts. Ein aktuelles Smartphone liegt bei rund 1 : 2,1
 * (iPhone 16: 71,6 × 147 mm). Die Zeichnung hält sich daran — der Inhalt
 * richtet sich nach dem Gerät, nicht das Gerät nach der freien Fläche.
 */
const GERAET = { x: 150, y: 48, breite: 200, hoehe: 422 };
const SCHIRM = { x: 160, y: 76, breite: 180, hoehe: 366 };

const unten = GERAET.y + GERAET.hoehe;
const rechts = GERAET.x + GERAET.breite;

/** Maßketten enden in Architektenzeichnungen nicht mit Pfeilen, sondern mit 45°-Strichen. */
function Massstrich({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x - 4},${y + 4} L${x + 4},${y - 4}`}
      stroke={INK}
      strokeWidth="1"
    />
  );
}

/**
 * Der Aufmacher: die Website als Bauzeichnung. Was ich verkaufe, gezeigt
 * in der Sprache derer, die es kaufen — und an den Maßketten stehen die
 * Versprechen statt der Maße.
 *
 * Gezeichnet wird sie beim Laden Zug um Zug: erst das Gerät, dann der
 * Inhalt, dann die Bemaßung.
 */
export function Bauplan() {
  return (
    <svg
      className="riss"
      viewBox="0 0 640 520"
      role="img"
      aria-label="Technische Zeichnung eines Smartphones mit einer Handwerker-Website. Die Maßketten sind beschriftet mit: schnell auch mobil, zuerst fürs Handy, Anruf mit einem Tippen, eigene Bilder, Bewerben ohne Unterlagen."
    >
      {/* --- Gerät ------------------------------------------------- */}
      <g fill="none" stroke={INK} className="zug" style={{ animationDelay: "220ms" }}>
        <path
          pathLength={1}
          strokeWidth="1.6"
          d={`M${GERAET.x + 18},${GERAET.y} H${rechts - 18} A18,18 0 0 1 ${rechts},${GERAET.y + 18} V${unten - 18} A18,18 0 0 1 ${rechts - 18},${unten} H${GERAET.x + 18} A18,18 0 0 1 ${GERAET.x},${unten - 18} V${GERAET.y + 18} A18,18 0 0 1 ${GERAET.x + 18},${GERAET.y} Z`}
        />
      </g>
      <g fill="none" stroke={INK} className="zug" style={{ animationDelay: "460ms" }}>
        <path
          pathLength={1}
          strokeWidth="1"
          d={`M${SCHIRM.x},${SCHIRM.y} H${SCHIRM.x + SCHIRM.breite} V${SCHIRM.y + SCHIRM.hoehe} H${SCHIRM.x} Z`}
        />
        <path pathLength={1} strokeWidth="3" strokeLinecap="round" d="M222,62 H278" />
        <path
          pathLength={1}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.35"
          d="M215,458 H285"
        />
      </g>

      {/* --- Inhalt der Seite --------------------------------------- */}
      <g className="fuellung" style={{ animationDelay: "700ms" }}>
        <rect x="170" y="86" width="30" height="10" fill={INK} />
        {[88, 92.5, 97].map((y) => (
          <rect key={y} x="308" y={y} width="22" height="1.6" fill={INK} />
        ))}
        <path d="M160,106 H340" stroke={INK} strokeWidth="1" />
      </g>

      <g className="fuellung" style={{ animationDelay: "790ms" }}>
        <rect x="170" y="116" width="146" height="11" fill={INK} />
        <rect x="170" y="132" width="108" height="11" fill={INK} />
        <rect x="170" y="152" width="140" height="4.5" fill={INK} opacity="0.3" />
        <rect x="170" y="161" width="150" height="4.5" fill={INK} opacity="0.3" />
        <rect x="170" y="170" width="94" height="4.5" fill={INK} opacity="0.3" />
      </g>

      <g className="fuellung" style={{ animationDelay: "880ms" }}>
        <rect
          x="170"
          y="184"
          width="88"
          height="24"
          rx="2"
          fill={SIGNAL}
          stroke={INK}
          strokeWidth="1.2"
        />
        <rect x="182" y="193" width="64" height="6" fill={INK} />
        <rect
          x="266"
          y="184"
          width="54"
          height="24"
          rx="2"
          fill="none"
          stroke={INK}
          strokeWidth="1.2"
        />
      </g>

      {/* Bildfläche mit dem Kreuz, das in Zeichnungen für ein Bild steht */}
      <g className="zug" style={{ animationDelay: "970ms" }} fill="none" stroke={INK}>
        <path pathLength={1} strokeWidth="1.2" d="M170,220 H320 V292 H170 Z" />
        <path pathLength={1} strokeWidth="0.8" opacity="0.45" d="M170,220 L320,292" />
        <path pathLength={1} strokeWidth="0.8" opacity="0.45" d="M320,220 L170,292" />
      </g>

      <g className="fuellung" style={{ animationDelay: "1080ms" }}>
        <rect x="170" y="306" width="64" height="8" fill={INK} />
        {[320, 344, 368].map((y) => (
          <rect
            key={y}
            x="170"
            y={y}
            width="150"
            height="20"
            rx="2"
            fill="#e9e3d1"
            stroke={INK}
            strokeWidth="1"
          />
        ))}
        <rect x="178" y="327" width="42" height="5" fill={INK} opacity="0.4" />
        <rect x="178" y="351" width="56" height="5" fill={INK} opacity="0.4" />
        <rect x="178" y="375" width="34" height="5" fill={INK} opacity="0.4" />
        <rect
          x="170"
          y="396"
          width="96"
          height="22"
          rx="2"
          fill={SIGNAL}
          stroke={INK}
          strokeWidth="1.2"
        />
        <rect x="182" y="404" width="72" height="6" fill={INK} />
      </g>

      {/* --- Maßketten ---------------------------------------------- */}
      <g stroke={INK} fill="none">
        <g className="zug" style={{ animationDelay: "1180ms" }}>
          <path pathLength={1} strokeWidth="0.8" opacity="0.6" d="M146,48 H104" />
          <path pathLength={1} strokeWidth="0.8" opacity="0.6" d="M146,470 H104" />
          <path pathLength={1} strokeWidth="1" d="M112,48 V470" />
        </g>
        <g className="fuellung" style={{ animationDelay: "1440ms" }}>
          <Massstrich x={112} y={48} />
          <Massstrich x={112} y={470} />
        </g>

        <g className="zug" style={{ animationDelay: "1280ms" }}>
          <path pathLength={1} strokeWidth="0.8" opacity="0.6" d="M150,44 V24" />
          <path pathLength={1} strokeWidth="0.8" opacity="0.6" d="M350,44 V24" />
          <path pathLength={1} strokeWidth="1" d="M150,32 H350" />
        </g>
        <g className="fuellung" style={{ animationDelay: "1500ms" }}>
          <Massstrich x={150} y={32} />
          <Massstrich x={350} y={32} />
        </g>
      </g>

      {/* --- Hinweislinien ------------------------------------------ */}
      <g stroke={SIGNAL} fill="none" strokeWidth="1.2">
        <g className="zug" style={{ animationDelay: "1380ms" }}>
          <path pathLength={1} d="M258,196 L372,186 H392" />
        </g>
        <g className="zug" style={{ animationDelay: "1480ms" }}>
          <path pathLength={1} d="M320,256 L372,266 H392" />
        </g>
        <g className="zug" style={{ animationDelay: "1580ms" }}>
          <path pathLength={1} d="M320,356 L372,376 H392" />
        </g>
      </g>

      <g fill={SIGNAL}>
        <circle
          cx="258"
          cy="196"
          r="2.6"
          className="fuellung"
          style={{ animationDelay: "1540ms" }}
        />
        <circle
          cx="320"
          cy="256"
          r="2.6"
          className="fuellung"
          style={{ animationDelay: "1640ms" }}
        />
        <circle
          cx="320"
          cy="356"
          r="2.6"
          className="fuellung"
          style={{ animationDelay: "1740ms" }}
        />
      </g>

      {/* --- Beschriftung -------------------------------------------- */}
      <text
        className="beschriftung"
        x="107"
        y="259"
        textAnchor="middle"
        transform="rotate(-90 107 259)"
        style={{ animationDelay: "1660ms" }}
      >
        Schnell auch mobil
      </text>
      <text
        className="beschriftung"
        x="250"
        y="22"
        textAnchor="middle"
        style={{ animationDelay: "1700ms" }}
      >
        Zuerst fürs Handy
      </text>

      <text className="beschriftung" x="398" y="183" style={{ animationDelay: "1740ms" }}>
        Anruf mit einem Tippen
      </text>
      <text className="beschriftung" x="398" y="263" style={{ animationDelay: "1800ms" }}>
        Eigene Bilder, kein Archiv
      </text>
      <text className="beschriftung" x="398" y="373" style={{ animationDelay: "1860ms" }}>
        Bewerben ohne Unterlagen
      </text>

      {/* Zeichnungskopf unten rechts, wie auf jedem Plan */}
      <g className="fuellung" style={{ animationDelay: "1940ms" }}>
        <path d="M392,438 H620" stroke={INK} strokeWidth="1" opacity="0.35" />
        <text className="beschriftung" x="392" y="458" fill={INK} opacity="0.45">
          Dörmann Digital · Blatt 01
        </text>
        <text className="beschriftung" x="392" y="476" fill={INK} opacity="0.45">
          Gebaut, nicht gemalt
        </text>
      </g>
    </svg>
  );
}
