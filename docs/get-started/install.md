# 설치

funky-ui를 프로젝트에 추가하고 첫 화면을 올리는 방법입니다. React 18 이상이면 동작합니다.

## 패키지 추가

먼저 패키지를 설치합니다.

```bash
npm i @studio-baeks/funky-ui
```

## 스타일 import

컴포넌트의 모양은 전역 CSS가 그려냅니다. 앱 진입점에서 스타일시트를 한 번만 불러오면 토큰 변수(`--funky-*`)와 컴포넌트 클래스(`.funky-*`)가 등록됩니다. 보통은 `main.tsx`에서 불러옵니다.

```tsx
import "@studio-baeks/funky-ui/styles.css";
```

## 첫 화면

이제 컴포넌트를 가져와 화면을 구성합니다. 아래는 카드 안에 제목과 본문, 버튼과 태그를 올린 예시입니다.

```tsx
import { Card, Button, Tag, Text } from "@studio-baeks/funky-ui";

export const Hello = () => (
  <Card>
    <Text variant="heading">안녕, funky-ui</Text>
    <Text variant="body">크림 위 네온, 검정 테두리, 하드 그림자.</Text>
    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
      <Button variant="primary">시작하기</Button>
      <Tag color="yellow">neon</Tag>
    </div>
  </Card>
);
```

## 토큰만 쓰고 싶다면

컴포넌트 없이 색이나 간격 같은 값만 필요하면 토큰 시트만 따로 불러오면 됩니다.

```tsx
import "@studio-baeks/funky-ui/tokens.css";
```

이렇게 하면 `var(--funky-primary)`나 `var(--funky-shadow-md)`처럼 CSS 변수를 직접 참조할 수 있습니다. 값을 TS에서 다루는 방법은 [토큰](../foundations/tokens.md) 문서에서 이어집니다.
