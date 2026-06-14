# Templates

레이아웃만 맡는 레이어입니다. 화면 chrome을 소유하고 콘텐츠는 슬롯으로 받습니다. 매크로 골격은 둘 중 하나를 고릅니다 — 여러 뷰를 오가는 멀티뷰 앱이면 **AppShell**, 하나의 작업 표면에 집중하는 단일 도구면 **ToolShell**. (자세한 선택 기준과 영역 분리 규칙은 [Composition](https://funky-ui.bsiku.dev/docs/api/foundations/composition.md).)

## AppShell

보라색 상단바(skew 워드마크 + account), 크림 사이드바(nav + 고정 푸터), 콘텐츠, 모바일 하단 nav로 이뤄진 앱 셸입니다. 원본 앱의 셸을 그대로 재현합니다.

아래는 brand·account·nav·푸터를 모두 채운 예시입니다.

```tsx
import { AppShell } from "@studio-baeks/funky-ui";
import type { NavItem } from "@studio-baeks/funky-ui";

const nav: NavItem[] = [
  { key: "home", label: "Search" },
  { key: "rooms", label: "Rooms" },
];

<AppShell
  brand={<button onClick={goHome}>funky ui</button>}
  account={<Button onClick={logout}>Logout</Button>}
  navLabel="Main navigation"
  navItems={nav}
  activeKey={active}
  onNavSelect={setActive}
  sidebarFooter={<StatusCard title="System status">All systems go</StatusCard>}
>
  {children}
</AppShell>
```

| prop | 설명 |
| --- | --- |
| `brand` | 좌상단 워드마크 (클릭 가능) |
| `account` | 우상단 액션 |
| `navItems` | `NavItem[]` — 사이드바 · 모바일 nav |
| `activeKey` | 활성 nav 키 |
| `onNavSelect` | `(key) => void` |
| `navLabel` | nav 리스트 위 라벨 |
| `sidebarTitle` | 사이드바 상단 제목 (없으면 표시하지 않음) |
| `sidebarFooter` | 사이드바 하단에 고정되는 카드 |

### NavItem

nav 항목 하나의 형태입니다. `href`가 있으면 `<a>`로, 없으면 `<button>`으로 렌더합니다.

```ts
interface NavItem {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  href?: string;
}
```

### StatusCard

사이드바 푸터에 넣는 제목+본문 카드입니다.

```tsx
<StatusCard title="System status">All systems go</StatusCard>
```

> 이 사이트의 [Playground](/playground)가 바로 AppShell로 만들어졌습니다.

## ToolShell

세로 스택 셸입니다 — 상단 `toolbar`, 가변 `stage`(작업 표면), 선택적 `footer`. 영역 사이는 3px 검정 테두리로 끊깁니다(toolbar/footer가 테두리를 들고 옵니다). stage는 텍스처를 입힐 수 있습니다: 크림 `plain`, 투명도 표시 `checker`(체커보드), 캔버스 `dots`(도트 그리드). 에디터·캔버스·뷰어·제너레이터처럼 단일 작업에 집중하는 도구 앱에 씁니다.

```tsx
import { ToolShell, Toolbar, Button } from "@studio-baeks/funky-ui";

<ToolShell
  stage="checker"
  toolbar={
    <Toolbar>
      <Toolbar.Group><Button size="sm">Open</Button></Toolbar.Group>
      <Toolbar.Spacer />
      <Toolbar.Group><Button size="sm" variant="primary">Export</Button></Toolbar.Group>
    </Toolbar>
  }
  footer={<div style={{ padding: "0.75rem 1.5rem" }}>hint / status</div>}
>
  <Card>작업 표면</Card>
</ToolShell>
```

| prop | 설명 | 기본 |
| --- | --- | --- |
| `toolbar` | 상단 바 (보통 `<Toolbar>`) | — |
| `footer` | 하단 바 (editor·hint·status); 3px 위 테두리로 분리 | — |
| `stage` | `plain` · `checker` · `dots` | `plain` |
| `children` | stage 안 작업 표면 (가운데 정렬) | — |

## SiteHeader

docs·마케팅 같은 **읽기 화면**의 상단바입니다. 보라색 sticky 바에 skew 워드마크와 ghost nav를 얹습니다 — AppShell·ToolShell이 상호작용 화면의 골격이라면, SiteHeader·DocsSidebar는 읽기 화면(docs·리포트)의 골격을 맡습니다.

router 비의존입니다. 링크는 `href`로, 버튼은 `onNavSelect`로 받고 `active`는 consumer가 직접 계산합니다. react-router 같은 라우터를 끼우고 싶으면 `renderNavItem` escape hatch로 `<Link>`를 주입합니다.

```tsx
import { SiteHeader } from "@studio-baeks/funky-ui";
import type { SiteNavItem } from "@studio-baeks/funky-ui";
import { Link, useLocation } from "react-router-dom";

const nav: SiteNavItem[] = [
  { key: "docs", label: "Docs", href: "/docs" },
  { key: "playground", label: "Playground", href: "/playground" },
];

const { pathname } = useLocation();

<SiteHeader
  brand={<span>funky ui</span>}
  onBrandClick={goHome}
  navItems={nav.map((n) => ({ ...n, active: pathname.startsWith(n.href!) }))}
  actions={<ThemeToggle />}
  renderNavItem={(item, label, className) => (
    <Link to={item.href!} className={className}>{label}</Link>
  )}
/>
```

| prop | 설명 |
| --- | --- |
| `brand` | skew 워드마크 / 브랜드 |
| `onBrandClick` | 설정 시 brand를 클릭 가능하게 만듦 (예: go home) |
| `navItems` | `SiteNavItem[]` |
| `onNavSelect` | `(key) => void` — `href` 없는(버튼) 항목에서 호출 |
| `actions` | 우측 extras (검색·테마 토글…) |
| `renderNavItem` | nav 항목을 직접 감싸는 escape hatch — `(item, label, className)` 전달 (예: 라우터 `<Link>`) |

### SiteNavItem

nav 항목 하나의 형태입니다. `href`가 있으면 `<a>`로, 없으면 `<button>`(→ `onNavSelect`)으로 렌더합니다. `active`는 consumer가 직접 계산해 넘깁니다.

```ts
interface SiteNavItem {
  key: string;
  label: ReactNode;
  href?: string;
  active?: boolean;
}
```

## DocsSidebar

읽기 화면(docs·리포트)의 좌측 nav 레일입니다. 크림 bg에 우측 검정 보더로 끊고, 링크는 투명하다가 active 하나만 검정으로 채웁니다 — AppShell 사이드바의 읽기 화면 짝입니다.

router 비의존입니다. docs를 `{title, items}` 그룹으로 묶고, 링크는 `href`로·버튼은 `onSelect`로 받습니다. 라우터를 끼우려면 `renderItem` escape hatch로 `<Link>`를 주입하고, 같은 레일 아래에 `children`(예: `<Toc />`)을 고정할 수 있습니다.

```tsx
import { DocsSidebar, Toc } from "@studio-baeks/funky-ui";
import type { DocsNavGroup } from "@studio-baeks/funky-ui";
import { Link } from "react-router-dom";

const groups: DocsNavGroup[] = [
  {
    title: "Get Started",
    items: [
      { key: "intro", label: "Introduction", href: "/docs/intro", active: true },
      { key: "install", label: "Install", href: "/docs/install" },
    ],
  },
];

<DocsSidebar
  groups={groups}
  renderItem={(item, label, className) => (
    <Link to={item.href!} className={className}>{label}</Link>
  )}
>
  <Toc items={toc} />
</DocsSidebar>
```

| prop | 설명 |
| --- | --- |
| `groups` | `DocsNavGroup[]` — `{ title?, items }` |
| `onSelect` | `(key) => void` — `href` 없는(버튼) 항목에서 호출 |
| `renderItem` | 항목을 직접 감싸는 escape hatch — `(item, label, className)` 전달 (예: 라우터 `<Link>`) |
| `children` | nav 아래에 고정되는 추가 콘텐츠 (예: 같은 레일의 `<Toc />`) |

### DocsNavGroup · DocsNavItem

nav를 그룹으로 묶습니다. `title`은 대문자 chrome 그룹 라벨이고, 각 항목은 `href` 유무로 `<a>` / `<button>`(→ `onSelect`)이 갈립니다. `active`는 consumer가 계산합니다.

```ts
interface DocsNavGroup {
  title?: ReactNode;
  items: DocsNavItem[];
}

interface DocsNavItem {
  key: string;
  label: ReactNode;
  href?: string;
  active?: boolean;
}
```
