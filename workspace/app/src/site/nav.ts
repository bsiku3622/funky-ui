/**
 * 사이트 지도 — Playground 사이드바와 순서는 패키지 인벤토리에서 파생합니다.
 */
import { FOUNDATIONS, INVENTORY, PRIMITIVE_TIERS, type Layer } from "@studio-baeks/funky-ui";

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
  primitives: "두 단입니다. 1차는 서로 기대지 않는 바탕(Box · Text · Icon · 접근성), 2차는 Box 위에 능력 하나 — 칠(Surface · Paint · Glass) · 누름(Pressable) · 골라짐(Selectable) · 띄우기(Floating) · 배치. accent 는 Paint 만 갖습니다.",
  atoms: "한 가지 일을 하는 컨트롤. 버튼은 Pressable(누름) · Selectable(골라짐)에 Paint(칠)를 얹고 크기 · 아이콘을 더한 것입니다.",
  molecules: "Atom 을 묶은 범용 조합. 어떤 앱에도 쓸 수 있습니다.",
  components: "class-explorer 전용 — 앱 셸 · 사람 · 시간표.",
};

export interface NavItem {
  name: string;
  slug: string;
  path: string;
}

export type Tier = keyof typeof PRIMITIVE_TIERS;

/** Primitive 의 단 이름 — 사이드바는 긴 이름, Overview · 상세 머리는 짧은 이름을 씁니다 */
export const TIER_LABEL: Record<Tier, { short: string; long: string }> = {
  first: { short: "1차", long: "1차 — 바탕" },
  second: { short: "2차", long: "2차 — Box + 능력 하나" },
};

const TIER_OF: Record<string, Tier> = Object.fromEntries(
  (Object.entries(PRIMITIVE_TIERS) as [Tier, readonly string[]][]).flatMap(([tier, groups]) => groups.map((group) => [group, tier])),
);

/** 그룹이 몇 차인지 — primitive 가 아니면 undefined */
export const tierOf = (layer: Layer, group: string): Tier | undefined => (layer === "primitives" ? TIER_OF[group] : undefined);

/** 그룹 이름표 — primitive 는 단을 앞에 붙입니다 ("2차 · paint") */
export const groupLabel = (layer: Layer, group: string) => {
  const tier = tierOf(layer, group);
  return tier ? `${TIER_LABEL[tier].short} · ${group}` : group;
};

export interface NavGroup {
  layer: Layer;
  group: string;
  tier?: Tier;
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
      tier: tierOf(layer, group),
      items: names.map((name) => ({ name, slug: slugOf(name), path: `/playground/${layer}/${slugOf(name)}` })),
    })),
  ),
];

/** 층마다 몇 개인지 — 홈의 층 지도 */
export const LAYER_COUNT = NAV.reduce<Record<string, number>>((acc, g) => ({ ...acc, [g.layer]: (acc[g.layer] ?? 0) + g.items.length }), {});
