/** 홈 — 시스템을 한 장에: 정체성 · 층 지도 · 대표 표본 */
import { Link } from "react-router-dom";
import { Badge, Button, Card, Grid, Inline, LAYERS, Stack, StudentBadge, Text } from "@studio-baeks/funky-ui";
import { ArrowRight, BookOpen, Eye } from "lucide-react";

import { LAYER_COUNT, LAYER_LABEL, LAYER_NOTE } from "../site/nav";
import { narrow } from "../site/site.css";
import { home, hero, layerCard } from "./home.css";

const PRINCIPLES = [
  ["구조는 loud, 내용은 quiet", "네온 solid · 하드 그림자 · 900 대문자는 구조(바 · 상태 · 지표 · 활성)에 몰아 줍니다. 읽는 내용은 흰 면 위 검정 글자로 물러납니다."],
  ["accent × variant", "색 9 × 칠하는 방식 11. 버튼 · 배지 · 알림 · 선택이 같은 레시피를 씁니다. 하드코딩된 버튼 102종이 이 두 축 안으로 들어옵니다."],
  ["그림자는 두 단", "떠 있는 물건은 4px, 모달만 6px. hover 때 본체가 그림자 자리로 가라앉습니다."],
  ["시스템이 형태를 정한다", "hex 는 palette.ts 한 파일, 숫자는 Foundations 에만. 컴포넌트는 역할과 크기만 고릅니다."],
] as const;

export function Home() {
  return (
    <div className={home}>
      <div className={narrow}>
        <section className={hero}>
          <Text variant="overline">Studio Baeks · for Class Explorer</Text>
          <Text as="h1" variant="display" style={{ fontSize: "3.5rem", lineHeight: 1 }}>
            funky-ui
          </Text>
          <Text as="p" variant="subheading" weight="bold" tone="secondary" style={{ margin: 0, maxWidth: 640 }}>
            크림 위 네온, 2px 검정 선, 하드 그림자. 누르면 그림자 속으로 가라앉는 neo-brutalist 디자인 시스템.
          </Text>
          <Inline gap="md" wrap>
            <Button as={Link} to="/playground" accent="cyan" variant="tonal" size="lg" shadow iconEnd={ArrowRight}>
              Playground
            </Button>
            <Button as={Link} to="/docs" size="lg" shadow icon={BookOpen}>
              Docs
            </Button>
          </Inline>
          <Inline gap="sm" wrap>
            <Button size="xs" accent="green" variant="solid">
              유지
            </Button>
            <Button size="xs" accent="green" variant="outline">
              자동
            </Button>
            <Button size="xs" accent="orange" variant="plain">
              3분반
            </Button>
            <Button size="xs" accent="green" variant="tonalMuted">
              세계사의이해
            </Button>
            <Button size="xs" variant="muted">
              이름 바꾸기
            </Button>
            <Button size="xs" accent="cyan" variant="tonal" shadow icon={Eye}>
              Preview
            </Button>
            <Badge accent="cyan" variant="tonal">
              계획
            </Badge>
            <StudentBadge cohort="25" name="김예시" color="#00b327" />
          </Inline>
        </section>

        <Stack gap="xl">
          <Text as="h2" variant="subtitle">
            층 지도
          </Text>
          <Grid columns="repeat(auto-fill, minmax(190px, 1fr))" gap="xl">
            {LAYERS.map((layer, i) => (
              <Card key={layer} as={Link} to="/playground" motion="lift" padding="xl" className={layerCard}>
                <Stack gap="md">
                  <Inline justify="between">
                    <Text variant="overline">0{i + 1}</Text>
                    <Badge size="sm" accent={layer === "components" ? "purple" : undefined} variant={layer === "components" ? "tonal" : "solid"}>
                      {LAYER_COUNT[layer]}
                    </Badge>
                  </Inline>
                  <Text variant="heading">{LAYER_LABEL[layer]}</Text>
                  <Text variant="caption" tone="secondary">
                    {LAYER_NOTE[layer]}
                  </Text>
                </Stack>
              </Card>
            ))}
          </Grid>
        </Stack>

        <Stack gap="xl" style={{ marginTop: 56 }}>
          <Text as="h2" variant="subtitle">
            원칙
          </Text>
          <Grid columns="repeat(auto-fill, minmax(240px, 1fr))" gap="xl">
            {PRINCIPLES.map(([title, body]) => (
              <Card key={title} padding="xl">
                <Stack gap="md">
                  <Text variant="subheading">{title}</Text>
                  <Text variant="caption" tone="secondary">
                    {body}
                  </Text>
                </Stack>
              </Card>
            ))}
          </Grid>
        </Stack>
      </div>
    </div>
  );
}
