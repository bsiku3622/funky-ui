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
