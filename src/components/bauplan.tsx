const INK = "#121714";
const SIGNAL = "#ff5a1f";

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
      viewBox="0 0 640 660"
      role="img"
      aria-label="Technische Zeichnung eines Smartphones mit einer Handwerker-Website. Die Maßketten sind beschriftet mit: schnell auch mobil, zuerst fürs Handy, Anruf mit einem Tippen, eigene Bilder, Bewerben ohne Unterlagen."
    >
      {/* --- Gerät ------------------------------------------------- */}
      <g fill="none" stroke={INK} className="zug" style={{ animationDelay: "220ms" }}>
        <path
          pathLength={1}
          strokeWidth="1.6"
          d="M168,48 H332 A18,18 0 0 1 350,66 V574 A18,18 0 0 1 332,592 H168 A18,18 0 0 1 150,574 V66 A18,18 0 0 1 168,48 Z"
        />
      </g>
      <g fill="none" stroke={INK} className="zug" style={{ animationDelay: "460ms" }}>
        <path pathLength={1} strokeWidth="1" d="M160,76 H340 V564 H160 Z" />
        <path
          pathLength={1}
          strokeWidth="3"
          strokeLinecap="round"
          d="M222,62 H278"
        />
        <path
          pathLength={1}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.35"
          d="M215,578 H285"
        />
      </g>

      {/* --- Inhalt der Seite --------------------------------------- */}
      <g className="fuellung" style={{ animationDelay: "700ms" }}>
        <rect x="170" y="88" width="30" height="10" fill={INK} />
        {[90, 94.5, 99].map((y) => (
          <rect key={y} x="308" y={y} width="22" height="1.6" fill={INK} />
        ))}
        <path d="M160,110 H340" stroke={INK} strokeWidth="1" />
      </g>

      <g className="fuellung" style={{ animationDelay: "790ms" }}>
        <rect x="170" y="122" width="146" height="11" fill={INK} />
        <rect x="170" y="139" width="108" height="11" fill={INK} />
        <rect x="170" y="160" width="140" height="4.5" fill={INK} opacity="0.3" />
        <rect x="170" y="170" width="150" height="4.5" fill={INK} opacity="0.3" />
        <rect x="170" y="180" width="94" height="4.5" fill={INK} opacity="0.3" />
      </g>

      <g className="fuellung" style={{ animationDelay: "880ms" }}>
        <rect
          x="170"
          y="196"
          width="88"
          height="26"
          rx="2"
          fill={SIGNAL}
          stroke={INK}
          strokeWidth="1.2"
        />
        <rect x="182" y="206" width="64" height="6" fill={INK} />
        <rect
          x="266"
          y="196"
          width="54"
          height="26"
          rx="2"
          fill="none"
          stroke={INK}
          strokeWidth="1.2"
        />
      </g>

      {/* Bildfläche mit dem Kreuz, das in Zeichnungen für ein Bild steht */}
      <g
        className="zug"
        style={{ animationDelay: "970ms" }}
        fill="none"
        stroke={INK}
      >
        <path pathLength={1} strokeWidth="1.2" d="M170,236 H320 V320 H170 Z" />
        <path pathLength={1} strokeWidth="0.8" opacity="0.45" d="M170,236 L320,320" />
        <path pathLength={1} strokeWidth="0.8" opacity="0.45" d="M320,236 L170,320" />
      </g>

      <g className="fuellung" style={{ animationDelay: "1080ms" }}>
        <rect x="170" y="338" width="64" height="8" fill={INK} />
        {[356, 382, 408].map((y) => (
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
        <rect x="178" y="363" width="42" height="5" fill={INK} opacity="0.4" />
        <rect x="178" y="389" width="56" height="5" fill={INK} opacity="0.4" />
        <rect x="178" y="415" width="34" height="5" fill={INK} opacity="0.4" />
        <rect
          x="170"
          y="436"
          width="96"
          height="24"
          rx="2"
          fill={SIGNAL}
          stroke={INK}
          strokeWidth="1.2"
        />
        <rect x="182" y="445" width="72" height="6" fill={INK} />
      </g>

      <g className="fuellung" style={{ animationDelay: "1170ms" }}>
        <path d="M160,480 H340" stroke={INK} strokeWidth="1" />
        <rect x="170" y="494" width="110" height="4.5" fill={INK} opacity="0.3" />
        <rect x="170" y="504" width="76" height="4.5" fill={INK} opacity="0.3" />
      </g>

      {/* --- Maßketten ---------------------------------------------- */}
      <g stroke={INK} fill="none">
        <g className="zug" style={{ animationDelay: "1260ms" }}>
          <path pathLength={1} strokeWidth="0.8" opacity="0.6" d="M146,48 H104" />
          <path pathLength={1} strokeWidth="0.8" opacity="0.6" d="M146,592 H104" />
          <path pathLength={1} strokeWidth="1" d="M112,48 V592" />
        </g>
        <g className="fuellung" style={{ animationDelay: "1520ms" }}>
          <Massstrich x={112} y={48} />
          <Massstrich x={112} y={592} />
        </g>

        <g className="zug" style={{ animationDelay: "1360ms" }}>
          <path pathLength={1} strokeWidth="0.8" opacity="0.6" d="M150,44 V24" />
          <path pathLength={1} strokeWidth="0.8" opacity="0.6" d="M350,44 V24" />
          <path pathLength={1} strokeWidth="1" d="M150,32 H350" />
        </g>
        <g className="fuellung" style={{ animationDelay: "1580ms" }}>
          <Massstrich x={150} y={32} />
          <Massstrich x={350} y={32} />
        </g>
      </g>

      {/* --- Hinweislinien ------------------------------------------ */}
      <g stroke={SIGNAL} fill="none" strokeWidth="1.2">
        <g className="zug" style={{ animationDelay: "1460ms" }}>
          <path pathLength={1} d="M262,209 L372,196 H392" />
        </g>
        <g className="zug" style={{ animationDelay: "1560ms" }}>
          <path pathLength={1} d="M322,278 L372,288 H392" />
        </g>
        <g className="zug" style={{ animationDelay: "1660ms" }}>
          <path pathLength={1} d="M322,448 L372,462 H392" />
        </g>
      </g>

      <g fill={SIGNAL}>
        <circle
          cx="262"
          cy="209"
          r="2.6"
          className="fuellung"
          style={{ animationDelay: "1620ms" }}
        />
        <circle
          cx="322"
          cy="278"
          r="2.6"
          className="fuellung"
          style={{ animationDelay: "1720ms" }}
        />
        <circle
          cx="322"
          cy="448"
          r="2.6"
          className="fuellung"
          style={{ animationDelay: "1820ms" }}
        />
      </g>

      {/* --- Beschriftung -------------------------------------------- */}
      <text
        className="beschriftung"
        x="107"
        y="320"
        textAnchor="middle"
        transform="rotate(-90 107 320)"
        style={{ animationDelay: "1740ms" }}
      >
        Schnell auch mobil
      </text>
      <text
        className="beschriftung"
        x="250"
        y="22"
        textAnchor="middle"
        style={{ animationDelay: "1780ms" }}
      >
        Zuerst fürs Handy
      </text>

      <text className="beschriftung" x="398" y="193" style={{ animationDelay: "1820ms" }}>
        Anruf mit einem Tippen
      </text>
      <text className="beschriftung" x="398" y="285" style={{ animationDelay: "1880ms" }}>
        Eigene Bilder, kein Archiv
      </text>
      <text className="beschriftung" x="398" y="459" style={{ animationDelay: "1940ms" }}>
        Bewerben ohne Unterlagen
      </text>

      {/* Zeichnungskopf unten rechts, wie auf jedem Plan */}
      <g className="fuellung" style={{ animationDelay: "2020ms" }}>
        <path d="M392,560 H620" stroke={INK} strokeWidth="1" opacity="0.35" />
        <text className="beschriftung" x="392" y="580" fill={INK} opacity="0.45">
          Dörmann Digital · Blatt 01
        </text>
        <text className="beschriftung" x="392" y="598" fill={INK} opacity="0.45">
          Gebaut, nicht gemalt
        </text>
      </g>
    </svg>
  );
}
