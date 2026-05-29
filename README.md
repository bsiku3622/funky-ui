# funky-ui

Neo-brutalist React 디자인 시스템. 크림 바탕 위 네온, 두꺼운 검정 테두리, 하드 그림자, 그리고 누르면 그림자 속으로 가라앉는 인터랙션.

당분간은 Studio Baeks 가 한국과학영재학교(KSA)를 위해 만드는 모든 앱의 공통 디자인 언어를 담고 있습니다.

📦 **npm**: `@studio-baeks/funky-ui`

---

## Quick Start

스타일시트를 앱 진입점에서 한 번 불러오고, 컴포넌트를 가져다 씁니다.

```bash
npm i @studio-baeks/funky-ui
```

```tsx
import "@studio-baeks/funky-ui/styles.css";
import { Button, StatTile } from "@studio-baeks/funky-ui";

export const App = () => (
  <>
    <StatTile color="cyan" label="Active students" value="357" />
    <Button variant="primary">Press me</Button>
  </>
);
```

더 자세한 안내는 [`docs/get-started/install.md`](./docs/get-started/install.md) 를 참고하세요.

## Key Features

- **Loud by default** — 조용한 기본값은 없습니다. 각 컴포넌트가 별다른 설정 없이 가장 과감한 모습으로 놓입니다.
- **Press into shadow** — 요소가 그림자 위에 떠 있다가 누르면 가라앉습니다. 클릭이 손끝에 만져지는 시그니처 인터랙션입니다.
- **Fewer choices** — 옵션을 일부러 적게 둡니다. 고를 게 줄면 서로 다른 사람이 만든 앱들이 저절로 닮아갑니다.

이 결들이 어떻게 코드로 이어지는지는 [`docs/get-started/principles.md`](./docs/get-started/principles.md) 에서 다룹니다.

## Repository Structure

이 저장소는 라이브러리와 프로모 사이트로 나뉩니다. npm 에 배포되는 건 `core` 뿐입니다.

```
funky-ui/
├── core/    # @studio-baeks/funky-ui — 배포되는 디자인 시스템 패키지
├── app/     # 랜딩 · playground · docs 사이트 (Vite + React)
└── docs/    # 마크다운 문서 (사이트가 읽어 렌더)
```

- **[`core/`](./core/)** — 토큰 · atom · component · template. `src/tokens.ts` 가 정본이고 `tokens.css` 는 codegen 됩니다. `npm run build` 로 `dist`(JS + 타입 + CSS)를 만듭니다.
- **[`app/`](./app/)** — 시스템을 직접 써서 만든 소개 사이트. `npm run dev` 로 띄웁니다.
- **[`docs/`](./docs/)** — 설치 · 원칙 · 아키텍처 · 토큰 · 컴포넌트 레퍼런스.

## Development

`app` 과 데모 앱은 `core/src` 를 Vite alias 로 직접 소비하므로, 토큰이나 컴포넌트를 고치면 곧바로 반영됩니다.

```bash
# 사이트 띄우기
cd app && npm install && npm run dev

# 패키지 빌드 (배포 산출물)
cd core && npm install && npm run build

# 토큰만 다시 생성 (tokens.ts → tokens.css)
cd core && npm run gen:tokens
```

## License

MIT
