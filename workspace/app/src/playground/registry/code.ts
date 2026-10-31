/**
 * props → JSX 문자열. 기본값과 같은 prop · 빈 값은 생략합니다.
 *
 * - 문자열 → `name="v"`, 숫자 → `name={1}`, true → `name`, false → 기본이 true 일 때만 `name={false}`
 * - `children` 은 태그 사이에, 아이콘 컨트롤(이름 문자열)은 `{Search}` 로
 */
import type { Control, Values } from "./schema";

export function printJsx(name: string, values: Values, defaults: Values = {}, controls: Record<string, Control> = {}): string {
  const attrs: string[] = [];
  let children: unknown;
  for (const [key, value] of Object.entries(values)) {
    if (key === "children") {
      children = value;
      continue;
    }
    if (value === undefined || value === "" || value === "none") continue;
    if (defaults[key] === value) continue;
    if (controls[key]?.kind === "icon") attrs.push(`${key}={${String(value)}}`);
    else if (value === true) attrs.push(key);
    else if (value === false) attrs.push(`${key}={false}`);
    else if (typeof value === "number") attrs.push(`${key}={${value}}`);
    else if (typeof value === "string") attrs.push(`${key}="${value}"`);
  }
  const open = attrs.length ? `<${name} ${attrs.join(" ")}` : `<${name}`;
  const oneLine = open.length + String(children ?? "").length < 80;
  if (children === undefined || children === "") return `${open} />`;
  if (oneLine) return `${open}>${String(children)}</${name}>`;
  return `${open}>\n  ${String(children)}\n</${name}>`;
}
