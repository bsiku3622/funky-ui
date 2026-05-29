# 아키텍처

funky-ui는 네 개의 레이어로 쌓여 있습니다. 위 레이어는 자기보다 아래 레이어만 가져다 씁니다.

```
Token → Atom → Component → Template
```

**Token** 은 색·크기·시간·그림자를 정의하는 유일한 곳입니다. `src/tokens.ts`가 정본(SSOT)이고, `src/tokens.css`는 거기서 codegen된 CSS 변수 시트입니다. 자세한 내용은 [토큰](tokens.md)에서 다룹니다.

**Atom** 은 더 쪼갤 수 없는 완성 단위입니다. raw HTML 하나를 렌더하고 variant나 size 정도를 받습니다. `Button · Input · SearchInput · Tag · Badge · Text · Icon`이 여기 속합니다.

**Component** 는 Atom을 합성하거나 열림·닫힘 같은 약간의 상태를 갖는 "껍데기"입니다. raw HTML을 직접 렌더하지 않습니다. `Card · StatTile · Accordion · Tabs · Modal`이 여기 속합니다.

**Template** 은 레이아웃만 맡습니다. nav chrome을 소유하고 콘텐츠는 슬롯으로 받습니다. 지금은 `AppShell` 하나입니다.

## 폴더 구조

라이브러리(`funky-ui/core`)와 이 사이트(`funky-ui/app`)는 폴더로 나뉘어 있습니다. npm에 배포되는 건 `core`뿐입니다.

```
funky-ui/
├── core/         # @studio-baeks/funky-ui (배포 대상)
│   ├── src/
│   │   ├── tokens.ts     # SSOT
│   │   ├── tokens.css    # codegen 산출물
│   │   ├── styles.css    # 모든 컴포넌트 CSS
│   │   ├── atoms/ components/ templates/
│   │   └── index.ts      # 공개 입구
│   └── scripts/gen-tokens.ts
└── app/          # 이 사이트 (랜딩 · playground · docs)
```

## 스타일링

funky-ui는 CSS-in-JS도 Tailwind도 쓰지 않습니다. 전역 CSS 클래스와 CSS 변수로만 그립니다. React 컴포넌트는 알맞은 className 문자열을 조립해 넘길 뿐이고, 실제 모양은 `styles.css`가 `var(--funky-*)`를 읽어 그려냅니다. 런타임에 스타일을 계산하지 않으니 그만큼 가볍습니다.
