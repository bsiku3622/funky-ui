/** Playground Overview — 층마다 모든 항목을 한 장씩. 표본은 각 Spec 의 처음 값으로 그립니다 */
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Card, LAYERS, Stack, Text } from "@studio-baeks/funky-ui";

import { LAYER_LABEL, LAYER_NOTE, NAV, groupLabel } from "../site/nav";
import { PageHead, Section } from "./kit";
import * as k from "./kit.css";
import { ENTRIES } from "./registry";

/**
 * 카드 하나 — 카드는 div 이고, 이름 링크가 카드 전체로 늘어납니다(stretched link).
 * ⚠️ 카드를 통째로 `<a>` 로 그리면 표본 속 링크 · 버튼이 `<a>` 안에 들어가 HTML 이 깨집니다.
 */
function OverviewCard({ to, name, group, sample }: { to: string; name: string; group?: string; sample?: ReactNode }) {
  return (
    <Card as="div" motion="lift" padding="0" className={k.overviewCard}>
      {sample !== undefined && (
        <div className={k.overviewSample} aria-hidden="true" inert>
          {sample}
        </div>
      )}
      <Stack gap="xs" padding="xl">
        <Link to={to} className={k.stretchedLink}>
          <Text variant={sample === undefined ? "heading" : "caption"} weight="black">
            {name}
          </Text>
        </Link>
        {group && (
          <Text variant="micro" tone="muted" weight="bold">
            {group}
          </Text>
        )}
      </Stack>
    </Card>
  );
}

export function Overview() {
  return (
    <div>
      <PageHead
        layer="playground"
        title="Overview"
        summary="Foundations → Primitives → Atoms → Molecules → Components. 각 층은 자기보다 아래 층만 씁니다. Atoms · Molecules 까지는 범용이고, Components 는 class-explorer 전용입니다."
      />
      {LAYERS.map((layer) => (
        <Section key={layer} title={LAYER_LABEL[layer]} note={LAYER_NOTE[layer]}>
          <div className={k.overviewGrid}>
            {layer === "foundations"
              ? NAV.filter((g) => g.layer === "foundations")
                  .flatMap((g) => g.items)
                  .map((item) => <OverviewCard key={item.slug} to={item.path} name={item.name} />)
              : ENTRIES.filter((e) => e.layer === layer).map((e) => (
                  <OverviewCard
                    key={e.slug}
                    to={`/playground/${e.layer}/${e.slug}`}
                    name={e.name}
                    group={groupLabel(e.layer, e.group)}
                    sample={e.render({ ...e.defaults, ...e.initial })}
                  />
                ))}
          </div>
        </Section>
      ))}
    </div>
  );
}
