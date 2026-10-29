/**
 * 사이트 지도 — Playground 사이드바와 순서는 패키지 인벤토리에서 파생합니다.
 */
import { FOUNDATIONS, INVENTORY, type Layer } from "@studio-baeks/funky-ui";

export const slugOf = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

export const LAYER_LABEL: Record<Layer, string> = {
  foundations: "Foundations",
  primitives: "Primitives",
  atoms: "Atoms",
  molecules: "Molecules",
  components: "Components",
};

/** 층 설명 — 홈과 Overview 가 같이 씁니다 */
export const LAYER_NOTE: Record<Layer, string> = {
  foundations: "Color · Typography → Shape → Layout → Motion. 숫자와 hex 는 여기에만 삽니다.",
  primitives: "배치 · 칠(Surface — 박스, Paint — 요소) · 글자 · 아이콘 · 누름 · 접근성. 모양이 없는 바탕입니다.",
  atoms: "한 가지 일을 하는 컨트롤. 버튼 · 배지는 Paint 위에 크기와 아이콘을 얹은 것입니다.",
  molecules: "Atom 을 묶은 범용 조합. 어떤 앱에도 쓸 수 있습니다.",
  components: "class-explorer 전용 — 앱 셸 · 사람 · 시간표.",
};

export interface NavItem {
  name: string;
  slug: string;
  path: string;
}

export interface NavGroup {
  layer: Layer;
  group: string;
  items: NavItem[];
}

const FOUNDATION_NAME: Record<(typeof FOUNDATIONS)[number], string> = {
  color: "Color",
  typography: "Typography",
  shape: "Shape",
  layout: "Layout",
  motion: "Motion",
};

export const NAV: NavGroup[] = [
  {
    layer: "foundations",
    group: "systems",
    items: FOUNDATIONS.map((f) => ({ name: FOUNDATION_NAME[f], slug: f, path: `/playground/foundations/${f}` })),
  },
  ...(Object.entries(INVENTORY) as [Exclude<Layer, "foundations">, Record<string, readonly string[]>][]).flatMap(([layer, groups]) =>
    Object.entries(groups).map(([group, names]) => ({
      layer,
      group,
      items: names.map((name) => ({ name, slug: slugOf(name), path: `/playground/${layer}/${slugOf(name)}` })),
    })),
  ),
];

/** 층마다 몇 개인지 — 홈의 층 지도 */
export const LAYER_COUNT = NAV.reduce<Record<string, number>>((acc, g) => ({ ...acc, [g.layer]: (acc[g.layer] ?? 0) + g.items.length }), {});
