/**
 * Registry — 인벤토리 순서대로 항목을 세웁니다. 이름 · 층 · 그룹 · slug 는 인벤토리에서 오고,
 * Spec 은 층별 entries 파일이 이름으로 줍니다.
 */
import { INVENTORY } from "@studio-baeks/funky-ui";

import { slugOf } from "../../site/nav";
import { ATOM_SPECS } from "./entries/atoms";
import { COMPONENT_SPECS } from "./entries/components";
import { MOLECULE_SPECS } from "./entries/molecules";
import { PRIMITIVE_SPECS } from "./entries/primitives";
import type { Entry, Spec } from "./schema";

const SPECS: Record<string, Spec> = { ...PRIMITIVE_SPECS, ...ATOM_SPECS, ...MOLECULE_SPECS, ...COMPONENT_SPECS };

export const ENTRIES: Entry[] = (Object.entries(INVENTORY) as [Entry["layer"], Record<string, readonly string[]>][]).flatMap(([layer, groups]) =>
  Object.entries(groups).flatMap(([group, names]) =>
    names.map((name) => ({
      ...(SPECS[name] ?? { name, summary: "아직 표본이 없습니다.", render: () => null }),
      layer,
      group,
      slug: slugOf(name),
    })),
  ),
);

export const ENTRY_BY_PATH: Record<string, Entry> = Object.fromEntries(ENTRIES.map((e) => [`${e.layer}/${e.slug}`, e]));
