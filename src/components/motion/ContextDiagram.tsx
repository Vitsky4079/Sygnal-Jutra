/**
 * Dekoracyjny diagram połączeń (linie rysowane przy scrollu przez Reveal).
 * Nie prezentuje żadnych danych ani statystyk.
 */
export function ContextDiagram({ className = "" }: { className?: string }) {
  const nodes: [number, number][] = [[60, 220], [190, 110], [330, 170], [450, 60], [560, 150], [440, 240], [300, 270]];
  const links = ["0-1", "1-2", "2-3", "3-4", "2-5", "5-4", "5-6", "6-0", "1-6"];
  return (
    <svg aria-hidden viewBox="0 0 620 320" className={className} fill="none" stroke="#36cff0">
      {links.map((l) => {
        const [a, b] = l.split("-").map(Number);
        return <line key={l} data-draw x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} strokeWidth="1.25" opacity="0.55" />;
      })}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" opacity="0.25" />
          <circle cx={x} cy={y} r="3.5" fill="#36cff0" stroke="none" />
        </g>
      ))}
    </svg>
  );
}
