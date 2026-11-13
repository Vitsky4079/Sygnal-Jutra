/**
 * Wizualizacja sygnału: koncentryczne okręgi, siatka redakcyjna i pulsy.
 * Czysty SVG (bez WebGL). Animacją steruje HeroMotion przez klasy .sj-pulse / .sj-ring.
 */
export function SignalRadar({ className = "" }: { className?: string }) {
  const rings = [70, 130, 195, 265, 340];
  return (
    <svg aria-hidden viewBox="0 0 800 800" className={`pointer-events-none ${className}`} fill="none">
      <defs>
        <radialGradient id="sj-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ff713d" stopOpacity="0.16" />
          <stop offset="1" stopColor="#ff713d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="400" cy="400" r="300" fill="url(#sj-glow)" />
      {/* siatka redakcyjna */}
      <g stroke="#27354a" strokeWidth="1" opacity="0.7">
        {[100, 200, 300, 400, 500, 600, 700].map((p) => (
          <g key={p}>
            <line x1={p} y1="0" x2={p} y2="800" />
            <line x1="0" y1={p} x2="800" y2={p} />
          </g>
        ))}
      </g>
      {/* krzyż celowniczy */}
      <g stroke="#ff713d" strokeWidth="1" opacity="0.35">
        <line x1="400" y1="40" x2="400" y2="760" />
        <line x1="40" y1="400" x2="760" y2="400" />
      </g>
      {/* stałe okręgi */}
      <g stroke="#ff713d">
        {rings.map((r, i) => (
          <circle key={r} className="sj-ring" cx="400" cy="400" r={r} strokeWidth="1" opacity={0.7 - i * 0.1} />
        ))}
      </g>
      {/* pulsy */}
      <g stroke="#ff713d">
        {[0, 1, 2].map((i) => (
          <circle key={i} className="sj-pulse" cx="400" cy="400" r="340" strokeWidth="2.5" opacity="0" />
        ))}
      </g>
      <circle cx="400" cy="400" r="4" fill="#ff713d" />
    </svg>
  );
}
