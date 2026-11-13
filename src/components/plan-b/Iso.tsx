/**
 * Ilustracje 2.5D w rzucie izometrycznym (czysty SVG, bez zewnętrznych assetów).
 * Ogólne, niemarkowe przedmioty. Światło z lewej-góry: góra najjaśniejsza,
 * ściana +y (lewa) średnia, ściana +x (prawa) najciemniejsza.
 */
import type { Illustration } from "@/lib/preparedness";

const C = 0.866;
type P = [number, number];
export const iso = (x: number, y: number, z: number): P => [(x - y) * C, (x + y) * 0.5 - z];
const pts = (a: P[]) => a.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

type Faces = { top: string; left: string; right: string };

export function Box({ x, y, z = 0, w, d, h, c, stroke }: { x: number; y: number; z?: number; w: number; d: number; h: number; c: Faces; stroke?: string }) {
  const s = stroke ? { stroke, strokeWidth: 0.6, strokeLinejoin: "round" as const } : {};
  return (
    <g>
      <polygon points={pts([iso(x + w, y, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x + w, y, z + h)])} fill={c.right} {...s} />
      <polygon points={pts([iso(x, y + d, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x, y + d, z + h)])} fill={c.left} {...s} />
      <polygon points={pts([iso(x, y, z + h), iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x, y + d, z + h)])} fill={c.top} {...s} />
    </g>
  );
}

/** Prostokąt na ścianie +y (lewej): oś x i z */
function FaceY({ y, x1, x2, z1, z2, fill, opacity }: { y: number; x1: number; x2: number; z1: number; z2: number; fill: string; opacity?: number }) {
  return <polygon points={pts([iso(x1, y, z1), iso(x2, y, z1), iso(x2, y, z2), iso(x1, y, z2)])} fill={fill} opacity={opacity} />;
}
/** Prostokąt na ścianie +x (prawej): oś y i z */
function FaceX({ x, y1, y2, z1, z2, fill, opacity }: { x: number; y1: number; y2: number; z1: number; z2: number; fill: string; opacity?: number }) {
  return <polygon points={pts([iso(x, y1, z1), iso(x, y2, z1), iso(x, y2, z2), iso(x, y1, z2)])} fill={fill} opacity={opacity} />;
}
/** Okrąg na ścianie +y */
function CircleY({ y, cx, cz, r, fill, stroke, sw = 1 }: { y: number; cx: number; cz: number; r: number; fill?: string; stroke?: string; sw?: number }) {
  const a = Array.from({ length: 28 }, (_, i) => {
    const t = (i / 28) * Math.PI * 2;
    return iso(cx + Math.cos(t) * r, y, cz + Math.sin(t) * r);
  });
  return <polygon points={pts(a)} fill={fill ?? "none"} stroke={stroke} strokeWidth={sw} />;
}
function Shadow({ x, y, w, d }: { x: number; y: number; w: number; d: number }) {
  const [cx, cy] = iso(x + w / 2 + 6, y + d / 2 + 6, 0);
  return <ellipse cx={cx} cy={cy} rx={(w + d) * 0.52} ry={(w + d) * 0.26} fill="#000" opacity="0.35" filter="url(#sj-soft)" />;
}

/* ---------------- Obiekty ---------------- */

export function PowerStation({ x, y, z = 0 }: { x: number; y: number; z?: number }) {
  const w = 120, d = 72, h = 82;
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      <Box x={x} y={y} z={z} w={w} d={d} h={h} c={{ top: "#3b4f6b", left: "#2b3b52", right: "#1d2a3d" }} />
      {/* panel przedni z wyświetlaczem */}
      <FaceY y={y + d} x1={x + 10} x2={x + 62} z1={z + 40} z2={z + 70} fill="#0b1422" />
      <FaceY y={y + d} x1={x + 14} x2={x + 58} z1={z + 46} z2={z + 64} fill="#a4d37f" opacity={0.9} />
      <FaceY y={y + d} x1={x + 18} x2={x + 40} z1={z + 52} z2={z + 58} fill="#0b1422" opacity={0.55} />
      {/* gniazda */}
      {[74, 92].map((cx) => <CircleY key={cx} y={y + d} cx={x + cx} cz={z + 52} r={6} fill="#0b1422" stroke="#4a5f7d" />)}
      {[16, 30, 44].map((cx) => <FaceY key={cx} y={y + d} x1={x + cx} x2={x + cx + 9} z1={z + 18} z2={z + 26} fill="#0b1422" />)}
      <FaceY y={y + d} x1={x} x2={x + w} z1={z + 4} z2={z + 7} fill="#a4d37f" opacity={0.7} />
      {/* kratka wentylacyjna */}
      {[20, 30, 40, 50].map((yy) => <FaceX key={yy} x={x + w} y1={y + yy} y2={y + yy + 4} z1={z + 20} z2={z + 62} fill="#141f30" />)}
      {/* uchwyt */}
      <Box x={x + 22} y={y + 30} z={z + h} w={8} d={12} h={14} c={{ top: "#566b89", left: "#3b4f6b", right: "#2b3b52" }} />
      <Box x={x + 90} y={y + 30} z={z + h} w={8} d={12} h={14} c={{ top: "#566b89", left: "#3b4f6b", right: "#2b3b52" }} />
      <Box x={x + 22} y={y + 30} z={z + h + 14} w={76} d={12} h={6} c={{ top: "#6b81a0", left: "#455a78", right: "#33465f" }} />
    </g>
  );
}

export function Radio({ x, y, z = 0 }: { x: number; y: number; z?: number }) {
  const w = 96, d = 40, h = 58;
  const [ax, ay] = iso(x + 12, y + 10, z + h);
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      <line x1={ax} y1={ay} x2={ax - 26} y2={ay - 64} stroke="#c3ccd5" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx={ax - 26} cy={ay - 64} r="3" fill="#e6ecf1" />
      <Box x={x} y={y} z={z} w={w} d={d} h={h} c={{ top: "#e9eef3", left: "#c3ccd6", right: "#97a3b1" }} />
      <CircleY y={y + d} cx={x + 30} cz={z + 29} r={18} fill="#2b3647" />
      {[6, 11, 16].map((r) => <CircleY key={r} y={y + d} cx={x + 30} cz={z + 29} r={r} stroke="#4b586c" sw={1.1} />)}
      <FaceY y={y + d} x1={x + 58} x2={x + 88} z1={z + 36} z2={z + 48} fill="#2b3647" />
      <FaceY y={y + d} x1={x + 61} x2={x + 74} z1={z + 39} z2={z + 45} fill="#ff713d" opacity={0.9} />
      <CircleY y={y + d} cx={x + 66} cz={z + 18} r={6} fill="#97a3b1" stroke="#6f7c8c" />
      <CircleY y={y + d} cx={x + 82} cz={z + 18} r={6} fill="#97a3b1" stroke="#6f7c8c" />
      {/* korbka */}
      <FaceX x={x + w} y1={y + 12} y2={y + 28} z1={z + 20} z2={z + 26} fill="#6f7c8c" />
    </g>
  );
}

export function Flashlight({ x, y, z = 0, beam = true }: { x: number; y: number; z?: number; beam?: boolean }) {
  const w = 96, d = 24, h = 24;
  const lens = [iso(x + w + 6, y - 1, z - 1), iso(x + w + 6, y + d + 1, z - 1), iso(x + w + 6, y + d + 1, z + h + 1), iso(x + w + 6, y - 1, z + h + 1)];
  const far = [iso(x + w + 150, y - 34, z), iso(x + w + 150, y + d + 34, z), iso(x + w + 150, y + d + 34, z + h + 22), iso(x + w + 150, y - 34, z + h + 22)];
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      {beam && (
        <polygon points={pts([lens[0], lens[1], far[1], far[2], far[3], far[0]])} fill="url(#sj-beam)" opacity="0.9" />
      )}
      <Box x={x} y={y} z={z} w={w - 22} d={d} h={h} c={{ top: "#2f3d52", left: "#222e40", right: "#18222f" }} />
      <Box x={x + w - 22} y={y - 1} z={z - 1} w={28} d={d + 2} h={h + 2} c={{ top: "#455a78", left: "#33465f", right: "#26364c" }} />
      <polygon points={pts(lens)} fill="#fff6dc" />
      <FaceY y={y + d} x1={x + 20} x2={x + 30} z1={z + 6} z2={z + 12} fill="#a4d37f" />
    </g>
  );
}

export function WaterCan({ x, y, z = 0 }: { x: number; y: number; z?: number }) {
  const w = 62, d = 62, h = 112;
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d} />
      <Box x={x} y={y} z={z} w={w} d={d} h={h} c={{ top: "#7fd8ec", left: "#3fa6c4", right: "#2a7d98" }} />
      <FaceY y={y + d} x1={x} x2={x + w} z1={z} z2={z + 70} fill="#1f6a86" opacity={0.45} />
      <FaceX x={x + w} y1={y} y2={y + d} z1={z} z2={z + 70} fill="#134c63" opacity={0.45} />
      <FaceY y={y + d} x1={x + 6} x2={x + 10} z1={z + 12} z2={z + 100} fill="#bdeffa" opacity={0.6} />
      {/* poziom wody */}
      <FaceY y={y + d} x1={x} x2={x + w} z1={z + 69} z2={z + 71} fill="#bdeffa" opacity={0.8} />
      {/* uchwyt i korek */}
      <Box x={x + 8} y={y + 22} z={z + h} w={30} d={18} h={8} c={{ top: "#9be3f2", left: "#4db3cf", right: "#348aa6" }} />
      <Box x={x + 42} y={y + 44} z={z + h} w={12} d={12} h={12} c={{ top: "#f3f6f9", left: "#cfd8e1", right: "#aab6c3" }} />
    </g>
  );
}

export function Backpack({ x, y, z = 0 }: { x: number; y: number; z?: number }) {
  const w = 74, d = 50, h = 104;
  return (
    <g>
      <Shadow x={x} y={y} w={w} d={d + 12} />
      <Box x={x} y={y} z={z} w={w} d={d} h={h} c={{ top: "#93bd6e", left: "#6c9350", right: "#4f723a" }} />
      {/* klapa */}
      <Box x={x - 1} y={y + 18} z={z + h - 26} w={w + 2} d={d - 17} h={28} c={{ top: "#a4d37f", left: "#7aa45b", right: "#5b8244" }} />
      {/* kieszeń przednia */}
      <Box x={x + 10} y={y + d} z={z + 10} w={w - 20} d={12} h={46} c={{ top: "#86b062", left: "#628a47", right: "#4a6c35" }} />
      <FaceY y={y + d + 12} x1={x + 12} x2={x + w - 12} z1={z + 50} z2={z + 51.5} fill="#2e4421" />
      {/* paski */}
      <FaceX x={x + w} y1={y + 10} y2={y + 18} z1={z + 8} z2={z + h - 4} fill="#3c5a2b" />
      <FaceX x={x + w} y1={y + 32} y2={y + 40} z1={z + 8} z2={z + h - 4} fill="#3c5a2b" />
      {/* odblask */}
      <FaceY y={y + d + 12} x1={x + 14} x2={x + w - 14} z1={z + 28} z2={z + 32} fill="#f3f6f9" opacity={0.85} />
    </g>
  );
}

export function Siren({ x, y, z = 0 }: { x: number; y: number; z?: number }) {
  const [sx, sy] = iso(x + 30, y + 30, z + 150);
  return (
    <g>
      <Shadow x={x} y={y} w={60} d={60} />
      <Box x={x + 24} y={y + 24} z={z} w={12} d={12} h={120} c={{ top: "#566b89", left: "#3b4f6b", right: "#2b3b52" }} />
      <Box x={x} y={y} z={z + 120} w={60} d={60} h={34} c={{ top: "#f3f6f9", left: "#cfd8e1", right: "#9aa6b3" }} />
      {[0, 1, 2, 3].map((i) => (
        <FaceY key={i} y={y + 60} x1={x + 6 + i * 13} x2={x + 14 + i * 13} z1={z + 124} z2={z + 150} fill="#2b3647" />
      ))}
      <Box x={x + 20} y={y + 20} z={z + 154} w={20} d={20} h={8} c={{ top: "#ff8a5c", left: "#ff713d", right: "#c9542a" }} />
      {[28, 46, 64].map((r, i) => (
        <path key={r} className="sj-wave" style={{ animationDelay: `${i * 0.35}s` }} d={`M ${sx + r * 0.7} ${sy - r * 0.6} A ${r} ${r} 0 0 1 ${sx + r * 0.7} ${sy + r * 0.6}`} stroke="#ff713d" strokeWidth="2" fill="none" opacity={0.8 - i * 0.2} />
      ))}
    </g>
  );
}

/* ---------------- Wspólne definicje i platforma ---------------- */

export function IsoDefs() {
  return (
    <defs>
      <filter id="sj-soft" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
      <linearGradient id="sj-beam" x1="0" y1="0" x2="1" y2="0.4">
        <stop offset="0" stopColor="#fff6dc" stopOpacity="0.55" />
        <stop offset="1" stopColor="#fff6dc" stopOpacity="0" />
      </linearGradient>
      <radialGradient id="sj-floor-light" cx="50%" cy="45%" r="55%">
        <stop offset="0" stopColor="#a4d37f" stopOpacity="0.14" />
        <stop offset="1" stopColor="#a4d37f" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

export function Platform({ w, d, h = 14 }: { w: number; d: number; h?: number }) {
  const grid = [];
  for (let i = 40; i < w; i += 40) grid.push(<line key={`x${i}`} x1={iso(i, 0, h)[0]} y1={iso(i, 0, h)[1]} x2={iso(i, d, h)[0]} y2={iso(i, d, h)[1]} />);
  for (let j = 40; j < d; j += 40) grid.push(<line key={`y${j}`} x1={iso(0, j, h)[0]} y1={iso(0, j, h)[1]} x2={iso(w, j, h)[0]} y2={iso(w, j, h)[1]} />);
  const top = [iso(0, 0, h), iso(w, 0, h), iso(w, d, h), iso(0, d, h)];
  return (
    <g>
      <Box x={0} y={0} w={w} d={d} h={h} c={{ top: "#14243a", left: "#0f1c2e", right: "#0a1524" }} />
      <polygon points={pts(top)} fill="url(#sj-floor-light)" />
      <g stroke="#27354a" strokeWidth="0.8" opacity="0.8">{grid}</g>
      <polyline points={pts([iso(0, d, h), iso(w, d, h), iso(w, 0, h)])} fill="none" stroke="#a4d37f" strokeWidth="1.2" opacity="0.6" />
    </g>
  );
}

/** Pojedynczy przedmiot na małej platformie (karty kategorii, scenariusze). */
export function IsoVignette({ kind, className = "" }: { kind: Illustration; className?: string }) {
  const O = { power: <PowerStation x={40} y={44} z={10} />, radio: <Radio x={52} y={62} z={10} />, flashlight: <Flashlight x={34} y={80} z={10} />, water: <WaterCan x={60} y={50} z={10} />, backpack: <Backpack x={54} y={52} z={10} />, siren: <Siren x={58} y={58} z={10} /> }[kind];
  return (
    <svg viewBox="-170 -110 360 300" className={className} aria-hidden>
      <IsoDefs />
      <Platform w={200} d={170} h={10} />
      <g data-float>{O}</g>
    </svg>
  );
}
