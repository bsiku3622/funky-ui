/** 컴포넌트 상세 — 미리보기 · 컨트롤 · 코드 · 표본 절 */
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Inline, SegmentedControl, Stack, Text } from "@studio-baeks/funky-ui";

import { groupLabel } from "../site/nav";
import { code as codeClass } from "../site/site.css";
import { Controls } from "./Controls";
import { LayerBadge, PageHead, Section, Stage } from "./kit";
import * as k from "./kit.css";
import { printJsx } from "./registry/code";
import { ENTRY_BY_PATH } from "./registry";
import type { Entry, Values } from "./registry/schema";

/** 바탕 고르기 — 크림과 흰 면 둘입니다. 바 위에만 서는 항목(stage: brand)은 고를 것이 없어 줄을 그리지 않습니다 */
const STAGES = [
  { value: "canvas", label: "Canvas" },
  { value: "raised", label: "Surface" },
] as const;

export function Detail() {
  const { layer = "", slug = "" } = useParams();
  const entry = ENTRY_BY_PATH[`${layer}/${slug}`];
  if (!entry) return <Text>없는 항목입니다: {layer}/{slug}</Text>;
  return <EntryView key={`${layer}/${slug}`} entry={entry} />;
}

function EntryView({ entry }: { entry: Entry }) {
  const [values, setValues] = useState<Values>({ ...entry.defaults, ...entry.initial });
  const [bg, setBg] = useState<"canvas" | "raised">(entry.stage === "raised" ? "raised" : "canvas");
  const onBar = entry.stage === "brand";
  const code = useMemo(
    () => (entry.code ? entry.code(values) : printJsx(entry.name, values, entry.defaults, entry.controls)),
    [entry, values],
  );
  return (
    <div>
      <PageHead layer={`${entry.layer} · ${groupLabel(entry.layer, entry.group)}`} title={entry.name} summary={entry.summary}>
        <Inline gap="sm">
          <LayerBadge layer={entry.layer} />
        </Inline>
      </PageHead>

      <div className={k.detailGrid}>
        <Stack gap="lg">
          <Inline justify="between" gap="md" wrap>
            <Text variant="overline">Preview</Text>
            {!onBar && <SegmentedControl aria-label="판 바탕" size="xs" options={STAGES} value={bg} onChange={setBg} />}
          </Inline>
          <Stage bg={onBar ? "brand" : bg}>{entry.render(values)}</Stage>
          <Text variant="overline">Code</Text>
          <pre className={codeClass}>{code}</pre>
        </Stack>
        {entry.controls && Object.keys(entry.controls).length > 0 && (
          <Controls controls={entry.controls} values={values} onChange={(key, v) => setValues((prev) => ({ ...prev, [key]: v }))} />
        )}
      </div>

      {entry.sections?.map((s) => (
        <Section key={s.title} title={s.title} note={s.note}>
          {s.render()}
        </Section>
      ))}
    </div>
  );
}
