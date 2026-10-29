/** Atoms — Button · Badge 는 축의 출발점이라 표본을 가장 많이 둡니다. 나머지는 atoms-more.tsx */
import { useState } from "react";
import { Badge, Button, Inline, Stack, Text, type Variant } from "@studio-baeks/funky-ui";
import { ACCENTS, ACCENT_ROLES, BADGE_SIZES, CONTROL_SIZES, VARIANTS } from "@studio-baeks/funky-ui/tokens";
import { ArrowRight, Check, Download, Eye, FlaskConical, RefreshCw, Trash2, X } from "lucide-react";

import { AccentVariantMatrix, Stage } from "../../kit";
import { icon } from "../icons";
import type { Spec } from "../schema";
import { ATOM_SPECS_MORE } from "./atoms-more";

const ACCENT_OPTIONS = [...ACCENTS, ...Object.keys(ACCENT_ROLES)] as const;

function TradeRow() {
  const [action, setAction] = useState<"keep" | "move" | "drop">("keep");
  const label = { keep: "유지", move: "이동", drop: "드랍" } as const;
  const accent = { keep: "black", move: "sky", drop: "pink" } as const;
  return (
    <Inline gap="xs">
      {(["keep", "move", "drop"] as const).map((a) => (
        <Button key={a} size="xs" accent={accent[a]} variant="muted" selected={action === a} onClick={() => setAction(a)}>
          {label[a]}
        </Button>
      ))}
    </Inline>
  );
}

function TermChips() {
  const [term, setTerm] = useState("2026-2");
  return (
    <Inline gap="sm">
      {["2025-2", "2026-1", "2026-2"].map((t) => (
        <Button key={t} size="sm" variant="muted" selected={term === t} onClick={() => setTerm(t)}>
          {t}
        </Button>
      ))}
    </Inline>
  );
}

const button: Spec = {
  name: "Button",
  summary:
    "accent(색) × variant(칠하는 방식) × size × shadow. 고르면 같은 accent 의 solid 로 바뀌고, 그림자를 켜면 hover 때 그림자 속으로 가라앉습니다. shadow=\"hover\" 면 평평하다가 hover 때 그림자가 올라옵니다.",
  controls: {
    accent: { kind: "select", options: ACCENT_OPTIONS },
    variant: { kind: "select", options: VARIANTS },
    size: { kind: "select", options: CONTROL_SIZES },
    shadow: { kind: "boolean" },
    selected: { kind: "boolean" },
    loading: { kind: "boolean" },
    disabled: { kind: "boolean" },
    icon: { kind: "icon" },
    iconEnd: { kind: "icon" },
    children: { kind: "text" },
  },
  initial: { accent: "cyan", variant: "tonal", shadow: true, icon: "Eye", iconEnd: "none", children: "Preview" },
  defaults: { accent: "black", variant: "outline", size: "md", shadow: false, selected: false, loading: false, disabled: false },
  render: (v) => (
    <Button
      accent={v.accent as never}
      variant={v.variant as Variant}
      size={v.size as never}
      shadow={Boolean(v.shadow)}
      selected={v.selected ? true : undefined}
      loading={Boolean(v.loading)}
      disabled={Boolean(v.disabled)}
      icon={icon(v.icon)}
      iconEnd={icon(v.iconEnd)}
    >
      {String(v.children ?? "")}
    </Button>
  ),
  sections: [
    {
      title: "Accent × Variant — 흰 면",
      note: "행 머리의 네 칸은 FG / BG / Border / Hover 입니다 (재원님 스케치의 표기). 칸에 마우스를 올려 hover 를 보세요. 같은 레시피에 색만 바뀝니다.",
      render: () => (
        <AccentVariantMatrix
          cell={(accent, variant) => (
            <Button size="sm" accent={accent} variant={variant}>
              {accent}
            </Button>
          )}
        />
      ),
    },
    {
      title: "Accent × Variant — 크림 바탕",
      note: "BG 가 — 인 variant 는 투명이라 바탕이 비칩니다. 페이지(크림) 위에 바로 놓일 때의 모습입니다.",
      render: () => (
        <AccentVariantMatrix
          bg="canvas"
          cell={(accent, variant) => (
            <Button size="sm" accent={accent} variant={variant}>
              {accent}
            </Button>
          )}
        />
      ),
    },
    {
      title: "Shadow — 눌림",
      note: "그림자는 4px 한 단뿐입니다. hover 때 본체가 그림자 자리로 가라앉고(translate 4px · 그림자 0), 누르는 순간 한 번 더 작아집니다. 테두리가 없는 ghost 는 가라앉을 상자가 없어 그림자를 받지 않습니다.",
      render: () => (
        <Stage bg="raised">
          {(["solid", "tonal", "outline", "plain", "frameline"] as const).map((v, i) => (
            <Button key={v} shadow variant={v} accent={(["black", "cyan", "black", "orange", "green"] as const)[i]}>
              {v}
            </Button>
          ))}
          <Button shadow selected>
            selected
          </Button>
        </Stage>
      ),
    },
    {
      title: "Shadow — 올라옴 (shadow=\"hover\")",
      note: "평평한 칩은 shadow=\"hover\" 를 줍니다. 쉴 때는 그림자가 없다가 hover 때 제자리에서 4px 그림자가 올라오고, 누르는 순간 다시 내려앉습니다 — 가라앉음을 거꾸로 돌린 몸짓(raise)입니다. 복사 버튼 · 과목 추가 칩이 이렇게 움직입니다.",
      render: () => (
        <Stage bg="raised">
          <Button size="xs" variant="outline" shadow="hover">
            복사
          </Button>
          <Button size="xs" accent="green" variant="plain" shadow="hover">
            + 세계사의이해
          </Button>
          <Button size="sm" accent="cyan" variant="tonal" shadow="hover">
            Preview
          </Button>
        </Stage>
      ),
    },
    {
      title: "Selected — 고르면 solid",
      note: "선택은 따로 된 variant 가 아니라 상태입니다. 안 골린 칸은 고른 variant, 골린 칸은 같은 accent 의 solid. 그림자를 켠 버튼은 골리면 눌린 채로 있습니다.",
      render: () => (
        <Stage bg="raised">
          <Stack gap="lg" align="center">
            <Text variant="overline">Trade · 유지 / 이동 / 드랍 (accent 가 뜻을 짊어짐)</Text>
            <TradeRow />
            <Text variant="overline">Admin · 학기 고르기 (muted → solid black)</Text>
            <TermChips />
          </Stack>
        </Stage>
      ),
    },
    {
      title: "Sizes",
      note: "높이 24 · 32 · 40 · 48. 아이콘 크기와 굵기는 버튼 크기가 정합니다 — 호출부에서 size·strokeWidth 를 적지 않습니다.",
      render: () => (
        <Stage bg="raised">
          {CONTROL_SIZES.map((s) => (
            <Button key={s} size={s} variant="tonal" accent="yellow" shadow icon={Download}>
              {s}
            </Button>
          ))}
        </Stage>
      ),
    },
    {
      title: "class-explorer 의 자리들",
      note: "지금 하드코딩된 버튼들을 새 API 로 옮긴 모습입니다. 왼쪽부터 SyllabusPanel 의 Preview · Download, MaterialReviewPanel 의 Approve · Reject, Admin 의 Refetch · Demo, 닫기 아이콘.",
      render: () => (
        <Stage bg="raised">
          <Button size="sm" accent="cyan" variant="tonal" shadow icon={Eye}>
            Preview
          </Button>
          <Button size="sm" variant="outline" shadow icon={Download}>
            Download
          </Button>
          <Button size="sm" accent="green" variant="tonal" shadow icon={Check}>
            Approve
          </Button>
          <Button size="sm" accent="pink" variant="tonal" shadow icon={X}>
            Reject
          </Button>
          <Button size="xs" variant="muted" icon={RefreshCw}>
            Refetch
          </Button>
          <Button size="xs" accent="orange" variant="muted" icon={FlaskConical}>
            Demo
          </Button>
          <Button size="xs" accent="red" variant="ghost" icon={Trash2}>
            삭제
          </Button>
          <Button as="a" href="#" accent="yellow" variant="tonal" shadow iconEnd={ArrowRight}>
            Trade 열기
          </Button>
        </Stage>
      ),
    },
    {
      title: "States",
      render: () => (
        <Stage bg="raised">
          <Button disabled>disabled</Button>
          <Button accent="green" variant="solid" loading>
            저장
          </Button>
          <Button variant="outline" fullWidth={false} icon={RefreshCw}>
            다시 시도
          </Button>
        </Stage>
      ),
    },
  ],
};

const badge: Spec = {
  name: "Badge",
  summary: "상태 · 개수 · 분류를 적는 작은 라벨. Button 과 같은 11 레시피를 쓰지만 읽는 물건이라 hover 에 반응하지 않습니다.",
  controls: {
    accent: { kind: "select", options: ACCENT_OPTIONS },
    variant: { kind: "select", options: VARIANTS },
    size: { kind: "select", options: BADGE_SIZES },
    icon: { kind: "icon" },
    children: { kind: "text" },
  },
  initial: { accent: "cyan", variant: "tonal", size: "md", icon: "none", children: "계획" },
  defaults: { accent: "black", variant: "outline", size: "md" },
  render: (v) => (
    <Badge accent={v.accent as never} variant={v.variant as Variant} size={v.size as never} icon={icon(v.icon)}>
      {String(v.children ?? "")}
    </Badge>
  ),
  sections: [
    {
      title: "Accent × Variant",
      render: () => (
        <AccentVariantMatrix
          cell={(accent, variant) => (
            <Badge accent={accent} variant={variant}>
              {accent}
            </Badge>
          )}
        />
      ),
    },
    {
      title: "Sizes",
      note: "높이 18 · 22 · 26. 같은 줄의 글자보다 크면 안 됩니다.",
      render: () => (
        <Stage bg="raised">
          {BADGE_SIZES.map((s) => (
            <Badge key={s} size={s} variant="solid">
              {s}
            </Badge>
          ))}
          <Badge variant="tonal" accent="cyan">
            계획 미리보기
          </Badge>
          <Badge variant="solid">이 기기</Badge>
          <Badge variant="muted">mobile</Badge>
          <Badge variant="plain" accent="pink">
            지금
          </Badge>
        </Stage>
      ),
    },
  ],
};

export const ATOM_SPECS: Record<string, Spec> = { Button: button, Badge: badge, ...ATOM_SPECS_MORE };
