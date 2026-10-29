/** 표시용 대비 계산 — Foundations 표에 숫자를 찍을 때만 씁니다 (스타일에는 쓰지 않습니다) */
const lin = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);

function parse(color: string): [number, number, number, number] | null {
  const hex = color.match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const n = Number.parseInt(hex[1]!, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255, 1];
  }
  const rgba = color.match(/rgba?\(([^)]+)\)/);
  if (rgba) {
    const [r = 0, g = 0, b = 0, a = 1] = rgba[1]!.split(",").map((x) => Number.parseFloat(x));
    return [r, g, b, a];
  }
  return null;
}

/** 반투명 색은 바탕 위에 섞은 결과로 잽니다 */
function over(color: string, ground: string): [number, number, number] {
  const c = parse(color);
  const g = parse(ground) ?? [255, 255, 255, 1];
  if (!c) return [g[0], g[1], g[2]];
  const a = c[3];
  return [c[0] * a + g[0] * (1 - a), c[1] * a + g[1] * (1 - a), c[2] * a + g[2] * (1 - a)];
}

const lum = ([r, g, b]: [number, number, number]) => 0.2126 * lin(r / 255) + 0.7152 * lin(g / 255) + 0.0722 * lin(b / 255);

export function contrast(fg: string, bg: string, ground = "#ffffff"): number {
  const b = over(bg, ground);
  const f = over(fg, `rgb(${b.join(",")})`);
  const [x, y] = [lum(f), lum(b)].sort((p, q) => q - p) as [number, number];
  return (x + 0.05) / (y + 0.05);
}

export const ratio = (n: number) => `${n.toFixed(2)}:1`;
